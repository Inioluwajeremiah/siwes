from functools import wraps
from flask import Blueprint, jsonify, request
from app.databaseModel import User, Supervisor
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.status_codes import HTTP_200_OK, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED_ACCESS

supervisor_blueprint = Blueprint('__name__', __name__ )

def supervisor_only(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        user = User.query.filter_by(id=current_user['id']).first()
        if user and user.role == 'supervisor':
            return func(*args, **kwargs)
        else:
            return jsonify({"message": "You don't have permission to access this page."}), HTTP_401_UNAUTHORIZED_ACCESS

    return wrapper

@supervisor_blueprint.route('/supervisor', methods=['GET', 'POST'])
@jwt_required()
@supervisor_only
def supervisor():

    weekno = request.json['weekno']
    remark = request.json["remark"]
    date = request.json['date']

    return "Hello world"