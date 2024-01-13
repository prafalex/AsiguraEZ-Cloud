from flask import Flask,request,make_response,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_CONNECTION_CLIENTI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Insured(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    surname = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)

    def json_insured(self):
        return { 'id': self.id,
            'firstName': self.first_name,
            'surname': self.surname,
            'email': self.email,
            'phone': self.phone,
            'address': self.address }
    
@app.route('/insured', methods=['GET'])
def get_insured():
  try:
    ins = Insured.query.all()
    return make_response(jsonify([i.json_insured() for i in ins]), 200)
  except Exception as e:
        return make_response(jsonify({'message': f'error adding user: {str(e)}'}), 500)
  

@app.route('/insured', methods=['POST'])
def add_insured():
    try:
        data = request.get_json()

        new_insured = Insured(
            first_name=data['first_name'],
            surname=data['surname'],
            phone=data['phone'],
            address=data['address'],
            email=data['email']
        )

        db.session.add(new_insured)
        db.session.commit()

        return make_response(jsonify({'message': 'user added successfully'}), 201)
    except Exception as e:
        return make_response(jsonify({'message': f'error adding user: {str(e)}'}), 500)


@app.route('/insured/<int:insured_id>', methods=['GET'])
def get_insured_by_id(insured_id):
    try:
        ins = Insured.query.filter_by(id=insured_id).first()
        if ins:
            return make_response(jsonify(ins.json_insured()), 200)
        else:
            return make_response(jsonify({'message': 'Insured not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': f'error getting insured: {str(e)}'}), 500)


@app.route('/insured/<int:insured_id>', methods=['PUT'])
def update_insured(insured_id):
    try:
        ins = Insured.query.get(insured_id)
        if not ins:
            return make_response(jsonify({'message': 'Insured not found'}), 404)

        data = request.get_json()

        ins.first_name = data.get('first_name', ins.first_name)
        ins.surname = data.get('surname', ins.surname)
        ins.phone = data.get('phone', ins.phone)
        ins.address = data.get('address', ins.address)
        ins.email = data.get('email', ins.email)

        db.session.commit()

        return make_response(jsonify({'message': 'Insured updated successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'error updating insured: {str(e)}'}), 500)


@app.route('/insured/<int:insured_id>', methods=['DELETE'])
def delete_insured(insured_id):
    try:
        ins = Insured.query.get(insured_id)
        if not ins:
            return make_response(jsonify({'message': 'Insured not found'}), 404)

        db.session.delete(ins)
        db.session.commit()

        return make_response(jsonify({'message': 'Insured deleted successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'error deleting insured: {str(e)}'}), 500)




@app.route('/insured/name/<name>', methods=['GET'])
def get_insured_by_name(name):
    try:
        ins = Insured.query.filter((Insured.first_name + ' ' + Insured.surname).ilike(f'%{name}%')).all()
        return make_response(jsonify([i.json_insured() for i in ins]), 200)
    except Exception as e:
        return make_response(jsonify({'message': f'error getting insureds by name: {str(e)}'}), 500)




@app.route('/insured/expiring', methods=['GET'])
def get_expiring_policies_info():
    try:
        start_date_str = request.args.get('start_date')
        end_date_str = request.args.get('end_date')

        if not start_date_str or not end_date_str:
            return make_response(jsonify({'message': 'Please provide both start_date and end_date parameters.'}), 400)

        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

        insurance_policy_service_url = f"http://serviciu-polite:81/policy/expiring?start_date={start_date}&end_date={end_date}"
        response = requests.get(insurance_policy_service_url)

        if response.status_code == 200:
            expiring_policies = response.json()

            if 'expiring_client_ids' in expiring_policies:
                insured_ids = expiring_policies['expiring_client_ids']

                insured_info = {}
                for insured_id in insured_ids:
                    ins = Insured.query.get(insured_id)

                    if ins:
                        insured_info[insured_id] = ins.json_insured()
                    else:
                        insured_info[insured_id] = {'error': 'Insured not found'}


                return make_response(jsonify(insured_info), 200)
            else:
                return make_response(jsonify({'message': 'Invalid response from insurance_policy service.'}), 500)
        else:
            return make_response(jsonify({'message': f'Error getting expiring policies from insurance_policy service: {response.text}'}), response.status_code)
    except Exception as e:
        return make_response(jsonify({'message': f'Error getting expiring policies info: {str(e)}'}), 500)
