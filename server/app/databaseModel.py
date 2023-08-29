from app import db

# app = create_app()
# db = app.db

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(100), nullable=False)
    middleName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)  
    startDate = db.Column(db.DateTime, nullable=False)
    endDate   =  db.Column(db.DateTime, nullable=False)
    gender  = db.Column(db.String(100), nullable=False) 
    matricNo = db.Column(db.String(300), unique=True, nullable=False)
    department = db.Column(db.String(300), nullable=False)
    course = db.Column(db.String(50), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    ppa = db.Column(db.String(300), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    otp = db.Column(db.String(6), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    role = db.Column(db.String(20), nullable=False)
    expiration_time = db.Column(db.DateTime, nullable=False)

    student_activities = db.relationship("StudentActivity", backref="student")
    student_weekly_summary = db.relationship("StudentWeeklySummary", backref="student")

    def __repr__(self):
        return f'User: \n{self.id} \n{self.email}'
    

class StudentActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    actvity = db.Column(db.String(500), nullable=False)
    weekNo = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    # relationships: 
    # Foreign key to link with StudentProfile (based on id)
    student_id =db.Column(db.Integer, db.ForeignKey('student.id'), unique=True, nullable=False)

    def __repr__(self):
        return f'Student activities: \n{self.id} \n{self.activity} \n{self.weekNo} \n{self.date}'

    

class StudentWeeklySummary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    summary = db.Column(db.String(300), nullable=False)
    departmentAttached = db.Column(db.String(70), nullable=False)
    studentComment = db.Column(db.String(200), nullable=False)
    weekNo = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    # relationship
    student_id =db.Column(db.Integer, db.ForeignKey('student.id'), unique=True, nullable=False)

    def __repr__(self):
        return f'Weekly summary: \n{self.id} \n{self.summary} \n{self.departmentAttached} \n{self.studentComment}'


class Supervisor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(100), nullable=False)
    middleName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    gender  = db.Column(db.String(100), nullable=False) 
    email = db.Column(db.String(100), unique=True, nullable=False) 
    department = db.Column(db.String(300), nullable=False)
    salutation = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f'Supervisor Profile: \n{self.id} \n{self.name} \n{self.department}'

    # relationship:  
    # One-to-Many relationship with SupervisorActivity (based on id)
    supervisor_activities = db.relationship('SupervisorActivity', backref='supervisor', lazy=True)
    

class SupervisorActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    remark = db.Column(db.String(200), nullable = False)
    date = db.Column(db.DateTime, nullable = False)

    # relationship: Foreign key to link with SupervisorProfile (based on id)
    supervisor_id = db.Column(db.Integer, db.ForeignKey('supervisor.id'), nullable=False)

    def __repr__(self):
        return f'Supervisor Activity: \n{self.id} \n{self.remark} \n{self.date}'
