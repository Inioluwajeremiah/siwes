from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.databaseModel import User, StudentWeeklySummary, StudentActivity
from app.status_codes import  HTTP_200_OK, HTTP_201_CREATED, \
    HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED_ACCESS, HTTP_404_NOT_FOUND, \
    HTTP_409_CONFLICT, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_204_NO_CONTENT
from functools import wraps
from datetime import datetime
from markupsafe import Markup
from flask_login import login_required, current_user

# Create the blueprint instance
student_blueprint = Blueprint('students', __name__)

# create a student only decorator to limit access to students only
def student_only(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        user = User.query.filter_by(id=current_user).first()
        if user and user.role == 'student':
            return func(*args, **kwargs)
        else:
            return jsonify({"message": "You don't have permission to access this page."}), HTTP_401_UNAUTHORIZED_ACCESS

    return wrapper

# get students daily activities
# endpoint and function to get all activities of students under a particular supervisor 
@student_blueprint.route('/daily-activities', methods=['GET'])
@login_required
def get_daily_activities(): 
    return {"message": f"message"}

# get students daily activities
# endpoint and function to get all activities of students under a particular supervisor 
@student_blueprint.route('/weekly-activities', methods=['GET'])
@login_required
@student_only
def get_weekly_activities():

    student = User.query.filter_by(id=current_user.id).first()
    if student is  None:
        return {"error_message": "User not found"}
    
    weekly_activities_query = StudentWeeklySummary.query.filter_by(student_id=current_user)
    weekly_activities = weekly_activities_query.all()

    if weekly_activities is None:
        return {"error_message": "No data found"}

    # Query weekly activities per student
    student_weekly_data = [
            {
            "activity_id": student_weekly_activity.id, 
            "summary": student_weekly_activity.summary,
            "departmentAttached": student_weekly_activity.departmentAttached,
            "studentComment": student_weekly_activity.studentComment,
            "weekNo": student_weekly_activity.weekNo,
            "date": student_weekly_activity.date,
        } 
        for student_weekly_activity in weekly_activities
    ]
        
    # Create a response JSON object
    response_data = {
        "data": student_weekly_data
    }

    # Return the response as JSON
    return jsonify(response_data), HTTP_200_OK


# Add daily activity
@student_blueprint.route('/add-daily-activity', methods=['POST'])
@login_required
def add_daily_activities():

    activity = request.json.get('activity')
    weekno = request.json.get('weekno')
    date = request.json.get('date')

    activity = Markup.escape(activity)
    weekno = Markup.escape(weekno)
    date = Markup.escape(date)

    if not activity:
        return {"error_message": "Insert activity"}
    if not weekno:
        return {"error_message": "Insert week number"}
    if not date:
        return {"error_message": "Insert date"}

    # import pdb
    # pdb.set_trace()

    # access_token = request.cookies.get('access_token')
    user_id = current_user.id
    # user_id = 1

    if user_id:
        # date = datetime.strptime(date, '%Y-%m-%d')
        student =  StudentActivity(actvity=activity, weekNo = weekno, date=date, student_id= user_id)
        db.session.add(student)
        db.session.commit()

        return jsonify({'message': 'record added successfully!'}), HTTP_200_OK
  
    return jsonify({'error_message': 'User not found'}), HTTP_404_NOT_FOUND

# Add weekly activity
@student_blueprint.route('/add-weekly-summary', methods=['POST'])
@login_required
@student_only
def add_weekly_activities():
    user_id = get_jwt_identity()
    summary = request.json.get("summary")
    department = request.json.get("departmentAttached")
    comment = request.json.get("studentComment")
    weekNo = request.json.get("weekNo")
    date = request.json.get('date')

    summary = Markup.escape(summary)
    department = Markup.escape(department)
    comment = Markup.escape(comment)
    weekNo = Markup.escape(weekNo)
    date = Markup.escape(date)

    if not summary:
        return {"error_message": "Insert summary"}, HTTP_400_BAD_REQUEST
    if not department:
        return {"error_message": "Insert department"}, HTTP_400_BAD_REQUEST
    if not comment:
        return {"error_message": "Insert comment"}, HTTP_400_BAD_REQUEST
    if not weekNo:
        return {"error_message": "Insert week number"}, HTTP_400_BAD_REQUEST
    if not date:
        return {"error_message": "Insert date"}, HTTP_400_BAD_REQUEST
    
    if user_id:
        date = datetime.strftime(date, '%Y-%m-%d')
        user = Student(summary=summary, departmentAttached = department, studentComment=comment, weekNo=weekNo, data=date)
        db.session.add(user)
        db.session.commit()
        return {"success_message": "Activity added successfully"}, HTTP_200_OK
    else:
        return jsonify({'message': 'Unauthorized'}), HTTP_401_UNAUTHORIZED_ACCESS
    

# update student daily activity
@student_blueprint.get('update-activity/<int:student_id>')
@login_required
@student_only
def edit_activity(id):
    user_id = current_user.id
    activity = request.json.get('activity', '')
    weekNo = request.json.get('weekNo', '')
    date = request.json.get('date','')

    activity = Markup.escape(activity)
    weekno = Markup.escape(weekno)
    date = Markup.escape(date)

    if not activity:
        return {"error_message": "Insert activity"}, HTTP_400_BAD_REQUEST
    if not weekno:
        return {"error_message": "Insert week number"}, HTTP_400_BAD_REQUEST
    if not date:
        return {"error_message": "Insert date"},  HTTP_400_BAD_REQUEST
    
    if user_id:
        record = StudentActivity.query.filter_by(id=id, student_id=user_id).first()
        date = datetime.strptime(date)

        if not record:
            return {'error_message': 'Record not found'}, HTTP_404_NOT_FOUND
    
        record.activity = activity
        record.weekNo = weekNo
        record.date = date

        db.session.commit()

        return {"activity": record.activity, "weekNo":record.weekNom, "date":record.date}, HTTP_200_OK
    return {"error_message": "User does not exist"}, HTTP_401_UNAUTHORIZED_ACCESS

# update student weekly summary
@student_blueprint.get('update-summary/<int:id>')
@login_required
@student_only
def edit_summary(id):
    user_id = current_user.id
    summary = request.json.get('summary', '')
    department = request.json.get('department', '')
    comment = request.json.get('comment', '')
    weekNo = request.json.get('weekno', '')
    date = request.json.get('date')

    summary = Markup.escape(summary)
    department = Markup.escape(department)
    comment = Markup.escape(comment)
    weekNo = Markup.escape(weekNo)
    date = Markup.escape(date)

    if not summary:
        return {"error_message": "Insert summary"}, HTTP_400_BAD_REQUEST
    if not department:
        return {"error_message": "Insert department"}, HTTP_400_BAD_REQUEST
    if not comment:
        return {"error_message": "Insert comment"}, HTTP_400_BAD_REQUEST
    if not weekNo:
        return {"error_message": "Insert week number"}, HTTP_400_BAD_REQUEST
    if not date:
        return {"error_message": "Insert date"}, HTTP_400_BAD_REQUEST

    if user_id:
        date = datetime.strptime(date, '%Y-%m-%d')
        record = StudentWeeklySummary.filter_by(id=id, student_id=user_id).first()
        
        if not record:
            return {'error_message': 'Record not found'}, HTTP_404_NOT_FOUND
        
        record.summary = summary
        record.departmentAttached = department
        record.comment = comment
        record.weekNo = weekNo
        record.date = date

        db.session.commit()

        return {
            "summary": record.summary, "department": record.departmentAttached,
            "comment": record.studentComment, "weekNo":record.weekNom, "date":record.date}, HTTP_200_OK


# delete daily activity
@student_blueprint.delete('/delete-activity/<int:id>')
@login_required
@student_only
def delete_daily_record(id):
    user_id = current_user.id
    record = StudentActivity.query.filter_by(id=id, student_id=user_id).first()
    if not record:
        return jsonify({
            'error_message': 'Record not found'
        }), HTTP_404_NOT_FOUND

    db.session.delete(record)
    db.session.commit()

    return jsonify({}), HTTP_204_NO_CONTENT


# delete weekly activity
@student_blueprint.delete('/delete-summary/<int:id>')
@login_required
@student_only
def delete_weekly_record(id):
    user_id = current_user.id
    record = StudentWeeklySummary.query.filter_by(id=id, user_id=user_id).first()

    if not record:
        return jsonify({'error_message': 'Record not found'}), HTTP_404_NOT_FOUND
    
    db.session.delete(record)
    db.session.commit()

    return jsonify({}), HTTP_204_NO_CONTENT


