from flask import Flask,request,make_response,jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
import requests
from datetime import datetime
from flask_cors import CORS
from prometheus_flask_exporter import PrometheusMetrics


app = Flask(__name__)

metrics = PrometheusMetrics(app)

metrics.info('polite_info', 'Polite info', version='1')

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_CONNECTION_DAUNE')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class InsuranceClaim(db.Model):
    __tablename__ = 'insurance_claim'

    id = db.Column(db.Integer, primary_key=True)
    id_policy = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date_reported = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)
    status = db.Column(db.String(255), nullable=False)

    def json_claim(self):
        return {'id': self.id, 'id_policy': self.id_policy, 'description': self.description, 'date_reported': self.date_reported, 'status': self.status}


@app.route('/claim', methods=['POST'])
def file_claim():
    try:
        data = request.get_json()

        if not check_policy_exists(data['id_policy']):
            return make_response(jsonify({'message': 'Invalid id_policy. Polita nu a fost gasita.'}), 400)


        if 'date_reported' in data:
            date_reported = data['date_reported']
        else:
            date_reported = datetime.utcnow()    

        new_claim = InsuranceClaim(
            id_policy=data['id_policy'],
            description=data['description'],
            date_reported=date_reported,
            status='Pending'
        )

        db.session.add(new_claim)
        db.session.commit()

        return make_response(jsonify({'message': 'Claim filed successfully'}), 201)
    except Exception as e:
        return make_response(jsonify({'message': f'Error filing claim: {str(e)}'}), 500)


@app.route('/claim/<int:claim_id>', methods=['GET'])
def get_claim_by_id(claim_id):
    try:
        claim = InsuranceClaim.query.get(claim_id)
        if claim:
            return make_response(jsonify(claim.json_claim()), 200)
        else:
            return make_response(jsonify({'message': 'Claim not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': f'Error getting claim: {str(e)}'}), 500)


@app.route('/claim/policy/<int:policy_id>', methods=['GET'])
def get_claims_by_policy(policy_id):
    try:
        if not check_policy_exists(policy_id):
            return make_response(jsonify({'message': 'Invalid id_policy. Polita nu a fost gasita.'}), 400)

        claims = InsuranceClaim.query.filter_by(id_policy=policy_id).all()
        return make_response(jsonify([claim.json_claim() for claim in claims]), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'Error getting claims for policy: {str(e)}'}), 500)


@app.route('/claim/<int:claim_id>/status', methods=['PUT'])
def update_claim_status(claim_id):
    try:
        claim = InsuranceClaim.query.get(claim_id)
        if not claim:
            return make_response(jsonify({'message': 'Claim not found'}), 404)

        data = request.get_json()
        new_status = data.get('status')

        if new_status not in ['Pending', 'Approved', 'Rejected','Canceled']:
            return make_response(jsonify({'message': 'Invalid status'}), 400)

        if not new_status:
            return make_response(jsonify({'message': 'Invalid request. Please provide a new status.'}), 400)

        claim.status = new_status
        db.session.commit()

        return make_response(jsonify({'message': 'Claim status updated successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'Error updating claim status: {str(e)}'}), 500)


@app.route('/claim/status/<status>', methods=['GET'])
def get_claims_by_status(status):
    try:
        if status not in ['Pending', 'Approved', 'Rejected','Canceled']:
            return make_response(jsonify({'message': 'Invalid status'}), 400)

        claims = InsuranceClaim.query.filter_by(status=status).all()

        return make_response(jsonify([claim.json_claim() for claim in claims]), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'Error getting claims by status: {str(e)}'}), 500)


def check_policy_exists(id_policy):
    try:
        policy_service_url = f"http://serviciu-polite:81/policy/{id_policy}"
        response = requests.get(policy_service_url)
        return response.status_code == 200 
    except Exception as e:
        return False