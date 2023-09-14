from functools import wraps
from flask import Blueprint, jsonify, request
from app.databaseModel import db, Supervisor, Student, StudentActivity, StudentWeeklySummary, SupervisorActivity
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.status_codes import HTTP_200_OK, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED_ACCESS
from datetime import datetime
from markupsafe import Markup

supervisor_blueprint = Blueprint('supervisor', __name__ )

def supervisor_only(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        user = Supervisor.query.filter_by(id=current_user).first()
        if user and user.role == 'supervisor':
            return func(*args, **kwargs)
        else:
            return jsonify({"message": "You don't have permission to access this page."}), HTTP_401_UNAUTHORIZED_ACCESS

    return wrapper

@supervisor_blueprint.get('/home')
def home():
    return {"msg": "home"}


# endpoint and function to get all activities of students under a particular supervisor 
@supervisor_blueprint.route('/students', methods=['GET'])
@jwt_required()
@supervisor_only
def get_atudents_activities():

    csrf_token = request.cookies.get('csrf_token')
    # access_token = request.cookies.get('access_token')
    client_csrf_token = request.headers.get('X-CSRF-TOKEN')

    if csrf_token == client_csrf_token:
        # first get the supervisor's full name
        current_user = get_jwt_identity()
        supervisor = Supervisor.query.filter_by(id=current_user).first()

        firstname = supervisor.firstName
        middlename = supervisor.middleName
        lastname = supervisor.lastName
        fullname = f"{firstname} {middlename} {lastname}"

        # then filter the students table by the supervisor's full name
        supervisor_students = Student.query.filter_by(supervisorName = fullname).all()

        # convert the returned list to a list of dictionary 
        students_json = [
            {"id": student.id, "firstname": student.firstName, "middleName": student.middleName, 
            "lastName":student.lastName, "email":student.email, "startDate":student.startDate, 
            "endDate":student.endDate, "supervisorName":student.supervisorName, "gender":student.gender, 
            "matricNo":student.matricNo, " department":student.department, "course":student.course, 
            "level":student.level, "ppa":student.ppa 
            } 
            for student in supervisor_students
        ]

        if request.method == "GET":

            # Initialize dictionaries to store daily and weekly activities
            students_daily_activities = {}
            students_weekly_activities = {}

            # Iterate over each student
            for student in supervisor_students:
                # Query daily activities per student
                daily_activities_query = StudentActivity.query.filter_by(student_id=student.id)
                daily_activities = daily_activities_query.all()

                # Query weekly activities per student
                weekly_activities_query = StudentWeeklySummary.query.filter_by(student_id=student.id)
                weekly_activities = weekly_activities_query.all()

                # jsonify daily  activities per/for each of the student
                student_daily_data = [
                    {
                        "activity_id": activity.id, 
                        "actvity": activity.actvity,
                        'weekNo': activity.weekNo,
                        'date': activity.date
                    } 
                    for activity in daily_activities
                ]

                # jsonify  weekly activities per/for each student
                student_weekly_data = [
                    {
                        "activity_id": activity.id, 
                        "summary": activity.summary,
                        "departmentAttached": activity.departmentAttached,
                        "studentComment": activity.studentComment,
                        "weekNo": activity.weekNo,
                        "date": activity.date,
                    } 
                    for activity in weekly_activities
                ]

                # Store the data in the dictionaries
                students_daily_activities[student.id] = student_daily_data
                students_weekly_activities[student.id] = student_weekly_data

            # Create a response JSON object
            response_data = {
                "daily_activities": students_daily_activities,
                "weekly_activities": students_weekly_activities
            }

            # Return the response as JSON
            return jsonify(response_data), HTTP_200_OK
    return {'error_message':"Unauthorized access"}, HTTP_401_UNAUTHORIZED_ACCESS


# get students under your supervision - query student table and filter by department
@supervisor_blueprint.route('/add_remark', methods=['POST'])
@jwt_required()
@supervisor_only
def add_remark():

    current_user_id= get_jwt_identity()

    csrf_token = request.cookies.get('csrf_token')
    client_csrf_token = request.headers.get('X-CSRF-TOKEN')
    student_id =  request.json.get('student_id')
    weekno = request.json.get('weekno')
    remark = request.json.get("remark")
    date = request.json.get('date')

    client_csrf_token = Markup.escape(client_csrf_token)
    student_id = Markup.escape(student_id)
    weekno = Markup.escape(weekno)
    remark = Markup.escape(remark)
    date = Markup.escape(date)

    if not weekno:
        return {"error_message": "Insert the week number"}
    if not remark:
        return {"error_message": "Insert remark"}
    if not date:
        return {"error_message": "Insert date"}

    if csrf_token == client_csrf_token:
        date = datetime.strptime(date, '%Y-%m-%d')
    
        supervisor_activity = SupervisorActivity(student_id = student_id, weekNo=weekno, remark = remark, date=date, supervisor_id = current_user_id )
        db.session.add(supervisor_activity)
        db.session.commit()
        
        return  {"success_message": "Remark added"}, HTTP_200_OK
    return{"error_message": "Unauthorized access"}, HTTP_401_UNAUTHORIZED_ACCESS