from flask import Flask,request,make_response,jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
import requests
from flask_cors import CORS
from datetime import datetime
from prometheus_flask_exporter import PrometheusMetrics


app = Flask(__name__)
metrics = PrometheusMetrics(app)

metrics.info('polite_info', 'Polite info', version='1')

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_CONNECTION_POLITE')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class InsurancePolicy(db.Model):
    __tablename__ = 'insurance_policy'

    id = db.Column(db.Integer, primary_key=True)
    id_insured = db.Column(db.Integer,nullable=False)
    policy_no = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.TIMESTAMP, nullable=False)
    end_date = db.Column(db.TIMESTAMP)
    amount = db.Column(db.Numeric(10, 2))
    status = db.Column(db.String(255), nullable=False)


    def json_policy(self):
        return {'id': self.id, 'id_insured': self.id_insured, 'policy_no': self.policy_no, 'start_date' : self.start_date, 'end_date':self.end_date, 
                'amount':self.amount, 'status':self.status }
    
@app.route('/policy', methods=['GET'])
def get_insured():
  try:
    pol = InsurancePolicy.query.all()
    return make_response(jsonify([i.json_policy() for i in pol]), 200)
  except Exception as e:
        return make_response(jsonify({'message': f'error getting policies: {str(e)}'}), 500)
  

@app.route('/policy/<int:policy_id>', methods=['GET'])
def get_policy_by_id(policy_id):
    try:
        pol = InsurancePolicy.query.get(policy_id)
        if pol:
            return make_response(jsonify(pol.json_policy()), 200)
        else:
            return make_response(jsonify({'message': 'Policy not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': f'error getting policy: {str(e)}'}), 500)

@app.route('/policy/<int:policy_id>', methods=['DELETE'])
def delete_policy(policy_id):
    try:
        pol = InsurancePolicy.query.get(policy_id)
        if not pol:
            return make_response(jsonify({'message': 'Policy not found'}), 404)

        db.session.delete(pol)
        db.session.commit()

        return make_response(jsonify({'message': 'Policy deleted successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'error deleting policy: {str(e)}'}), 500)

@app.route('/policy/status/<status>', methods=['GET'])
def get_policies_by_status(status):
    try:
        pol = InsurancePolicy.query.filter_by(status=status).all()
        return make_response(jsonify([i.json_policy() for i in pol]), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'error getting policies by status: {str(e)}'}), 500)


@app.route('/policy/expiring', methods=['GET'])
def get_expiring_policies():
    try:
        start_date_str = request.args.get('start_date')
        end_date_str = request.args.get('end_date')

        if not start_date_str or not end_date_str:
            return make_response(jsonify({'message': 'Please provide both start_date and end_date parameters.'}), 400)

        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

        expiring_policies = InsurancePolicy.query.filter(
            InsurancePolicy.end_date.between(start_date, end_date)
        ).all()

        insured_ids = set(policy.id_insured for policy in expiring_policies)

        return make_response(jsonify({'expiring_client_ids': list(insured_ids)}), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'Error getting expiring client IDs: {str(e)}'}), 500)
    
    

@app.route('/policy/payments/<int:policy_id>', methods=['GET'])
def get_policy_and_payments(policy_id):
    try:
        policy = InsurancePolicy.query.get(policy_id)
        if not policy:
            return make_response(jsonify({'message': 'Policy not found'}), 404)

        payments_url = f"http://serviciu_plati:82/payment/policy/{policy_id}"
        payments_response = requests.get(payments_url)

        if payments_response.status_code == 200:
            payments = payments_response.json()
        else:
            return make_response(jsonify({'message': 'Error getting payments for policy'}), 500)

        return make_response(jsonify({'policy': policy.json_policy(), 'payments': payments}), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'Error getting policy and payments: {str(e)}'}), 500)
    

@app.route('/policy/<int:policy_id>', methods=['PUT'])
def update_policy(policy_id):
    try:
        policy = InsurancePolicy.query.get(policy_id)
        if not policy:
            return make_response(jsonify({'message': 'Policy not found'}), 404)

        data = request.get_json()

        if not check_insured_exists(data.get('id_insured', policy.id_insured)):
            return make_response(jsonify({'message': 'Invalid id_insured. Asiguratul nu exista.'}), 400)
        
        policy.id_insured = data.get('id_insured', policy.id_insured)
        policy.policy_no = data.get('policy_no', policy.policy_no)
        policy.start_date = data.get('start_date', policy.start_date)
        policy.end_date = data.get('end_date', policy.end_date)
        policy.amount = data.get('amount', policy.amount)
        policy.status = data.get('status', policy.status)

        db.session.commit()

        return make_response(jsonify({'message': 'Policy updated successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'Error updating policy: {str(e)}'}), 500)

@app.route('/policy', methods=['POST'])
def add_policy():
    try:
        data = request.get_json()

        if not check_insured_exists(data['id_insured']):
            return make_response(jsonify({'message': 'Invalid id_insured. Asiguratul nu exista.'}), 400)

        new_policy = InsurancePolicy(
            id_insured=data['id_insured'],
            policy_no=data['policy_no'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            amount=data['amount'],
            status=data['status']
        )

        db.session.add(new_policy)
        db.session.commit()

        return make_response(jsonify({'message': 'policy added successfully'}), 201)
    except Exception as e:
        return make_response(jsonify({'message': f'error adding policy: {str(e)}'}), 500)


def check_insured_exists(id_insured):
    try:
        insured_service_url = f"http://serviciu-clienti:80/insured/{id_insured}"
        response = requests.get(insured_service_url)
        return response.status_code == 200
    except Exception as e:
        return False

      