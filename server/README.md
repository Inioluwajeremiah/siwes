# siwes
### Overview
# Flask Application Configuration and Setup Documentation

This technical documentation provides an overview of the Flask application setup and configuration. It focuses on the key components and configurations used in the provided Flask application code.

## Table of Contents

1. [Introduction](#introduction)
2. [Application Structure](#application-structure)
3. [Configuration](#configuration)
4. [Database](#database)
5. [Mail Integration](#mail-integration)
6. [Migrations](#migrations)
7. [JWT Authentication](#jwt-authentication)
8. [CORS Configuration](#cors-configuration)
9. [Blueprint Registration](#blueprint-registration)

### Introduction <a name="introduction"></a>

This Flask application serves as a template for building web applications. It incorporates various components and configurations to handle different aspects of a web application.

### Application Structure <a name="application-structure"></a>

The application structure follows best practices for organizing Flask applications. It includes blueprints for different functional areas of the application:

- `auth_blueprint`: Handles authentication and user management.
- `student_blueprint`: Contains endpoints related to student functionality.
- `admin_blueprint`: Manages administrative features.
- `supervisor_blueprint`: Provides features for supervisors.

### Configuration <a name="configuration"></a>

- **Configuration Files**: The application uses configuration files, including `Config` and `TestConfig`, to manage environment-specific settings.

```python
from .config import Config, TestConfig
```

- **App Initialization**: The Flask app is created with instance-relative configuration, allowing different configurations for development and testing.

```python
app = Flask(__name__, instance_relative_config=True)
```

- **Configuration Loading**: The app is configured based on the selected environment (production, development, or testing).

```python
if test_config is None:
    app.config.from_object(Config)
else:
    app.config.from_object(test_config)
```

### Database <a name="database"></a>

- **Database Setup**: SQLAlchemy is used to manage the application's database. The `db` object is initialized with the Flask app.

```python
db = SQLAlchemy()
```

- **Migrations**: The application includes database migrations using Flask-Migrate. The `Migrate` object is created to handle migrations.

```python
migrate = Migrate(app, db)
```

### Mail Integration <a name="mail-integration"></a>

- **Mail Support**: Flask-Mail is integrated into the application to handle email functionality.

```python
mail = Mail()
```

- **Mail Initialization**: The `mail` object is initialized with the Flask app.

```python
mail.init_app(app)
```

### Migrations <a name="migrations"></a>

- **Database Migrations**: Database migrations are managed using Flask-Migrate. This allows for seamless updates to the database schema.

### JWT Authentication <a name="jwt-authentication"></a>

- **JWT Manager**: Flask-JWT-Extended is used to manage JSON Web Tokens (JWT) for user authentication and authorization.

```python
JWTManager(app)
```

### CORS Configuration <a name="cors-configuration"></a>

- **Cross-Origin Resource Sharing (CORS)**: CORS support is enabled to allow cross-origin requests. It supports credentials and specifies allowed origins.

```python
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
```

### Blueprint Registration <a name="blueprint-registration"></a>

- **Blueprints**: The application uses blueprints to modularize functionality. Several blueprints are registered to handle different parts of the application, such as authentication, student-related features, admin features, and supervisor features.

```python
app.register_blueprint(auth_blueprint, url_prefix="/auth")
app.register_blueprint(student_blueprint, url_prefix='/student')
app.register_blueprint(admin_blueprint, url_prefix='/admin')
app.register_blueprint(supervisor_blueprint, url_prefix="/supervisor")
```




## Authentication Blueprint

The Flask Authentication Blueprint includes several endpoints for different authentication actions:

### Student Endpoints:

- **Register Student**: `POST /student/register`
  - Allows students to register with their details.

- **Student Login**: `POST /student/login`
  - Handles student login using email and password.

### Supervisor Endpoints:

- **Register Supervisor**: `POST /supervisor/register`
  - Allows supervisors to register with their details.

- **Supervisor Login**: `POST /supervisor/login`
  - Handles supervisor login using email and password.

### Shared Endpoints:

- **Verify Email**: `GET /verify-email/<token>`
  - Allows users to verify their email using a token sent to their email.

- **Verify User**: `POST /verify-user`
  - Allows users to verify their accounts using an authentication code.

- **Resend Verification Code**: `POST /resend_code`
  - Allows users to request a resend of the verification code.

- **Logout**: `POST /logout`
  - Logs out the user and clears JWT cookies.


## Student Blueprint

This documentation provides an overview of the endpoints available in the Flask Student Blueprint for managing student-related activities. These endpoints are designed to handle daily and weekly activities, including adding, updating, and deleting student records.

## Table of Contents

1. [Add Daily Activity](#add-daily-activity)
2. [Add Weekly Activity](#add-weekly-activity)
3. [Update Student Daily Activity](#update-student-daily-activity)
4. [Update Student Weekly Summary](#update-student-weekly-summary)
5. [Delete Daily Activity](#delete-daily-activity)
6. [Delete Weekly Activity](#delete-weekly-activity)

### Add Daily Activity <a name="add-daily-activity"></a>

- **Endpoint**: `POST /add-daily-activity`
- **Description**: Allows students to add their daily activities.
- **Request Body**:
  - `activity` (string, required): The description of the daily activity.
  - `weekno` (string, required): The week number of the activity.
  - `date` (string, required): The date of the activity in 'YYYY-MM-DD' format.
- **Response**:
  - HTTP 200 OK: Successfully added the daily activity.
  - HTTP 401 UNAUTHORIZED: Unauthorized access.
  - HTTP 400 BAD REQUEST: Invalid or missing request parameters.

### Add Weekly Activity <a name="add-weekly-activity"></a>

- **Endpoint**: `POST /add-weekly-summary`
- **Description**: Allows students to add their weekly activity summaries.
- **Request Body**:
  - `summary` (string, required): The summary of the weekly activity.
  - `departmentAttached` (string, required): The department where the activity was attached.
  - `studentComment` (string, required): Additional comments by the student.
  - `weekNo` (string, required): The week number of the summary.
  - `date` (string, required): The date of the summary in 'YYYY-MM-DD' format.
- **Response**:
  - HTTP 200 OK: Successfully added the weekly summary.
  - HTTP 401 UNAUTHORIZED: Unauthorized access.
  - HTTP 400 BAD REQUEST: Invalid or missing request parameters.

### Update Student Daily Activity <a name="update-student-daily-activity"></a>

- **Endpoint**: `GET /update-activity/<int:student_id>`
- **Description**: Allows students to update their existing daily activities.
- **Request Parameters**:
  - `student_id` (integer, required): The ID of the daily activity to be updated.
- **Request Body**:
  - `activity` (string, optional): The updated description of the daily activity.
  - `weekNo` (string, optional): The updated week number of the activity.
  - `date` (string, optional): The updated date of the activity in 'YYYY-MM-DD' format.
- **Response**:
  - HTTP 200 OK: Successfully updated the daily activity.
  - HTTP 401 UNAUTHORIZED: Unauthorized access.
  - HTTP 404 NOT FOUND: The requested activity record was not found.
  - HTTP 400 BAD REQUEST: Invalid or missing request parameters.

### Update Student Weekly Summary <a name="update-student-weekly-summary"></a>

- **Endpoint**: `GET /update-summary/<int:id>`
- **Description**: Allows students to update their existing weekly activity summaries.
- **Request Parameters**:
  - `id` (integer, required): The ID of the weekly summary to be updated.
- **Request Body**:
  - `summary` (string, optional): The updated summary of the weekly activity.
  - `department` (string, optional): The updated department where the activity was attached.
  - `comment` (string, optional): The updated additional comments by the student.
  - `weekNo` (string, optional): The updated week number of the summary.
  - `date` (string, optional): The updated date of the summary in 'YYYY-MM-DD' format.
- **Response**:
  - HTTP 200 OK: Successfully updated the weekly summary.
  - HTTP 401 UNAUTHORIZED: Unauthorized access.
  - HTTP 404 NOT FOUND: The requested summary record was not found.
  - HTTP 400 BAD REQUEST: Invalid or missing request parameters.

### Delete Daily Activity <a name="delete-daily-activity"></a>

- **Endpoint**: `DELETE /delete-activity/<int:id>`
- **Description**: Allows students to delete their daily activity records.
- **Request Parameters**:
  - `id` (integer, required): The ID of the daily activity to be deleted.
- **Response**:
  - HTTP 204 NO CONTENT: Successfully deleted the daily activity.
  - HTTP 401 UNAUTHORIZED: Unauthorized access


##  Supervisor Blueprint

This documentation provides an overview of the endpoints available in the Flask Supervisor Blueprint for managing supervisor-related activities. These endpoints are designed to handle interactions with students and their activities.

### Table of Contents

1. [Get Supervisor Home](#get-supervisor-home)
2. [Get Students' Activities](#get-students-activities)
3. [Add Remark for Student](#add-remark-for-student)

### Get Supervisor Home <a name="get-supervisor-home"></a>

- **Endpoint**: `GET /home`
- **Description**: Retrieves the supervisor's home page.
- **Response**:
  - HTTP 200 OK: Successfully retrieved the home page.
  
### Get Students' Activities <a name="get-students-activities"></a>

- **Endpoint**: `GET /students`
- **Description**: Retrieves all activities of students under a particular supervisor.
- **Authentication**: Requires a valid JSON Web Token (JWT) for supervisor authentication.
- **Request Headers**:
  - `X-CSRF-TOKEN` (string): CSRF token for authentication.
- **Response**:
  - HTTP 200 OK: Successfully retrieved students' activities.
  - HTTP 401 UNAUTHORIZED: Unauthorized access.
- **Response Body**:
  - JSON Object:
    - `daily_activities` (dictionary): Dictionary containing daily activities for each student.
    - `weekly_activities` (dictionary): Dictionary containing weekly activities for each student.

### Add Remark for Student <a name="add-remark-for-student"></a>

- **Endpoint**: `POST /add_remark`
- **Description**: Allows supervisors to add remarks for students' activities.
- **Authentication**: Requires a valid JSON Web Token (JWT) for supervisor authentication.
- **Request Headers**:
  - `X-CSRF-TOKEN` (string): CSRF token for authentication.
- **Request Body**:
  - `student_id` (string, required): The ID of the student for whom the remark is added.
  - `weekno` (string, required): The week number for the remark.
  - `remark` (string, required): The remark to be added.
  - `date` (string, required): The date of the remark in 'YYYY-MM-DD' format.
- **Response**:
  - HTTP 200 OK: Successfully added the remark.
  - HTTP 401 UNAUTHORIZED: Unauthorized access.
- **Response Body**:
  - JSON Object:
    - `success_message` (string): A success message indicating that the remark was added successfully.

**Note**: CSRF (Cross-Site Request Forgery) token is used for authentication to ensure secure access to the endpoints.
