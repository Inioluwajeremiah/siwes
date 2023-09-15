from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask import Flask
from flask_cors import CORS


'''
    # absolute import
    from app.blueprints.students_blueprint import student_blueprint
    from app.blueprints.lecturer_blueprint import lecturer_blueprint
    from app.blueprints.auth_blueprint import auth_blueprint
    from app.config import Config
'''

from .config import Config, TestConfig
from flask_mail import Mail

db = SQLAlchemy() 
mail = Mail()

def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True) 

    if test_config is None:

        app.config.from_object(Config)

    else:
        app.config.from_object(test_config)

    db.init_app(app)
    mail.init_app(app)
    migrate = Migrate(app, db)
    JWTManager(app)
    # cors = CORS(app)
    CORS(app, supports_credentials=True, origins=["https://siwes-mu.vercel.app"])
    

    # @app.route('/')
    # def appIndex():
    #     return "app home page"


    # relative imports
    from .blueprints.students_blueprint import student_blueprint
    from .blueprints.admin_blueprint import admin_blueprint
    from .blueprints.auth_blueprint import auth_blueprint
    from .blueprints.supervisors_blueprint import supervisor_blueprint

    # Register blueprints
    app.register_blueprint(auth_blueprint, url_prefix="/auth")
    app.register_blueprint(student_blueprint, url_prefix='/student')
    app.register_blueprint(admin_blueprint, url_prefix='/admin')
    app.register_blueprint(supervisor_blueprint, url_prefix="/supervisor")


    # create database table and remove it since flask migration willl tcreate our table
    # with app.app_context():
    #     db.create_all()

    return app

