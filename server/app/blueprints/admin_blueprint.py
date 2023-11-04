# app/blueprints/admin_blueprint.py

from flask import Blueprint, jsonify, request
from app.status_codes import HTTP_200_OK, HTTP_201_CREATED, \
    HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED_ACCESS, HTTP_404_NOT_FOUND, \
    HTTP_409_CONFLICT, HTTP_500_INTERNAL_SERVER_ERROR
from functools import wraps
from flask_jwt_extended import get_jwt_identity
from app.databaseModel import User

# Create the blueprint instance
admin_blueprint = Blueprint('admin', __name__)


def admin_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        current_user = get_jwt_identity()
        user = Userilter_by(id=current_user['id']).first()
        if user and user.role == 'admin':
            return func(*args, **kwargs)
        else:
            return jsonify({"message": "You don't have permission to access this page."}), 403

    return decorated_function


# Define routes and views for the lecturer blueprint
@admin_blueprint.get('/lecturers')
@admin_required
def get_lecturers():

    cookies = request.cookies
    csrf_token = cookies.get('csrf_token')
    csrf_token_from_frontend = request.headers.get('X-CSRF-TOKEN')

    if csrf_token != csrf_token_from_frontend:
        return {'error_message': "Innvalid tokrn"}, HTTP_401_UNAUTHORIZED_ACCESS
    else:
        return {'data': 'Get all lecturers'}, HTTP_200_OK
       

@admin_blueprint.route('/<int:admin_id>', methods=['GET'])
def get_lecturer(lecturer_id):
    return f'Get lecturer with ID: {lecturer_id}'
