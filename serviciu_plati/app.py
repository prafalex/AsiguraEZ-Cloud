from flask import Flask,request,make_response,jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_CONNECTION_PLATI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class InsurancePayments(db.Model):
    __tablename__ = 'insurance_payments'

    id = db.Column(db.Integer, primary_key=True)
    id_policy = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    payment_date = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=True)

    def json_payment(self):
        return {'id': self.id, 'id_policy': self.id_policy, 'amount': self.amount, 'payment_date': self.payment_date}

@app.route('/payment', methods=['GET'])
def get_insured():
  try:
    paym = InsurancePayments.query.all()
    return make_response(jsonify([p.json_payment() for p in paym]), 200)
  except Exception as e:
        return make_response(jsonify({'message': f'error getting payments: {str(e)}'}), 500)
  

@app.route('/payment/<int:payment_id>', methods=['GET'])
def get_payment_by_id(payment_id):
    try:
        paym = InsurancePayments.query.get(payment_id)
        if paym:
            return make_response(jsonify(paym.json_payment()), 200)
        else:
            return make_response(jsonify({'message': 'Payment not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': f'Error getting payment: {str(e)}'}), 500)
  
@app.route('/payment/policy/<int:policy_id>', methods=['GET'])
def get_payments_by_policy(policy_id):
    try:
        paym = InsurancePayments.query.filter_by(id_policy=policy_id).all()
        return make_response(jsonify([p.json_payment() for p in paym]), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'Error getting payments for policy: {str(e)}'}), 500)
    

@app.route('/payment/<int:payment_id>', methods=['PUT'])
def update_payment(payment_id):
    try:
        paym = InsurancePayments.query.get(payment_id)
        if not paym:
            return make_response(jsonify({'message': 'Payment not found'}), 404)

        data = request.get_json()

        paym.amount = data.get('amount', paym.amount)
        paym.payment_date = data.get('payment_date', paym.payment_date)

        db.session.commit()

        return make_response(jsonify({'message': 'Payment updated successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'Error updating payment: {str(e)}'}), 500)


@app.route('/payment', methods=['POST'])
def add_payment():
    try:
        data = request.get_json()

        if not check_policy_exists(data['id_policy']):
            return make_response(jsonify({'message': 'Invalid id_policy. Polita nu a fost gasita.'}), 400)

        if 'payment_date' in data:
            payment_date = data['payment_date']
        else:
            payment_date = datetime.utcnow()

        new_payment = InsurancePayments(
            id_policy=data['id_policy'],
            amount=data['amount'],
            payment_date=payment_date
        )

        db.session.add(new_payment)
        db.session.commit()

        return make_response(jsonify({'message': 'payment added successfully'}), 201)
    except Exception as e:
        return make_response(jsonify({'message': f'error adding payment: {str(e)}'}), 500)


def check_policy_exists(id_policy):
    try:
        policy_service_url = f"http://serviciu-polite:5001/policy/{id_policy}"
        response = requests.get(policy_service_url)
        return response.status_code == 200 
    except Exception as e:
        return False


