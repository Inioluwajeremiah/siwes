from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.databaseModel import Student, StudentWeeklySummary, StudentActivity
from app.status_codes import  HTTP_200_OK, HTTP_201_CREATED, \
    HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED_ACCESS, HTTP_404_NOT_FOUND, \
    HTTP_409_CONFLICT, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_204_NO_CONTENT
from functools import wraps
from datetime import datetime


# Create the blueprint instance
student_blueprint = Blueprint('students', __name__)

# create a student only decorator to limit access to students only
def student_only(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        user = Student.query.filter_by(id=current_user['id']).first()
        if user and user.role == 'student':
            return func(*args, **kwargs)
        else:
            return jsonify({"message": "You don't have permission to access this page."}), HTTP_401_UNAUTHORIZED_ACCESS

    return wrapper

# Add daily activity
@student_blueprint.route('/add-daily-activity', methods=['POST'])
@jwt_required()
@student_only
def get_daily_activities():
    activity = request.json.get('activity')
    date = datetime.now()

    # import pdb
    # pdb.set_trace()

    # access_token = request.cookies.get('access_token')
    user_id = get_jwt_identity()

    if user_id:
        user = Student.query.filter_by(id=user_id).first();
        return jsonify({'user_id': user.id, "email":user.email}), HTTP_200_OK
    else:
        return jsonify({'message': 'Unauthorized'}), HTTP_401_UNAUTHORIZED_ACCESS

# Add weekly activity
@student_blueprint.route('/add-weekly-summary', methods=['POST'])
@jwt_required()
@student_only
def get_weekly_activities():
    user_id = get_jwt_identity()
    summary = request.json.get("summary")
    department = request.json.get("departmentAttached")
    comment = request.json.get("studentComment")
    weekNo = request.json.get("weekNo")
    date = datetime.now()

    if user_id:
        user = Student(summary=summary, departmentAttached = department, studentComment=comment, weekNo=weekNo, data=date)
        db.session.add(user)
        db.session.commit()
        return {"success_message": "Activity added successfully"}, HTTP_200_OK
    else:
        return jsonify({'message': 'Unauthorized'}), HTTP_401_UNAUTHORIZED_ACCESS
    

# update student daily activity
@student_blueprint.get('update-activity/<int:student_id>')
@jwt_required()
@student_only
def edit_activity(student_id):
    current_user = get_jwt_identity()
    activity = request.json.get('activity', '')
    weekNo = request.json.get('weekNo', '')
    current_date = datetime.now()
    record = StudentActivity.query.filter_by(user_id=current_user, id=id).first()

    if not record:
        return {'error_message': 'Item not found'}, HTTP_404_NOT_FOUND
    
    record.activity = activity
    record.weekNo = weekNo
    record.date = current_date

    db.session.commit()

    return {"activity": record.activity, "weekNo":record.weekNom, "date":record.date}, HTTP_200_OK


# update student weekly summary
@student_blueprint.get('update-summary/<int:student_id>')
@jwt_required()
@student_only
def edit_summary(student_id):
    current_user = get_jwt_identity()
    summary = request.json.get('summary', '')
    department = request.json.get('department', '')
    comment = request.json.get('comment', '')
    weekNo = request.json.get('weekno', '')
    current_date = datetime.now()
    record = StudentWeeklySummary.filter_by(user_id=current_user, id=id).first()

    if not record:
        return {'error_message': 'Item not found'}, HTTP_404_NOT_FOUND
    
    record.summary = summary
    record.departmentAttached = department
    record.comment = comment
    record.weekNo = weekNo
    record.date = current_date

    db.session.commit()

    return {
        "summary": record.summary, "department": record.departmentAttached,
        "comment": record.studentComment, "weekNo":record.weekNom, "date":record.date}, HTTP_200_OK


# delete daily activity
@student_blueprint.delete('/delete-activity/<int:id>')
@jwt_required()
@student_only
def delete_daily_record(id):
    record = StudentActivity.query.filter_by(id=id).first()
    if not record:
        return jsonify({
            'error_message': 'Item not found'
        }), HTTP_404_NOT_FOUND

    db.session.delete(record)
    db.session.commit()

    return jsonify({}), HTTP_204_NO_CONTENT


# delete weekly activity
@student_blueprint.delete('/update-summary/<int:id>')
@jwt_required()
@student_only
def delete_weekly_record(id):
    user_id = get_jwt_identity()
    record = StudentWeeklySummary.query.filter_by(user_id=user_id, id=id).first()

    if not record:
        return jsonify({'error_message': 'Record not found'}), HTTP_404_NOT_FOUND
    
    db.session.delete(record)
    db.session.commit()

    return jsonify({}), HTTP_204_NO_CONTENT


