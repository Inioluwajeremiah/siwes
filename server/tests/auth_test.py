import datetime
import pytest
from flask import Flask, session
from app import create_app, db
from app.databaseModel import User
from app.status_codes import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

class TestConfig:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:qwertyui@localhost:5432/siwes_test' # or your database URI for testing
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = True
    SECRET_KEY = 'test-secret-key'

@pytest.fixture
def app():
    app = create_app(test_config=TestConfig)
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_register_user(client):
    data = {
        'email': 'test2@example.com',
        'password': 'Test@1234'
    }
    response = client.post('/auth/register', json=data)
    data = response.get_json()
    assert response.status_code == HTTP_201_CREATED
    assert data['success'] == 'Verification code has been sent to ur email'
    assert data['email'] == 'test2@example.com'

def test_register_user_invalid_email(client):
    data = {
        'email': 'invalid-email',
        'password': 'Test@1234'
    }
    response = client.post('/auth/register', json=data)
    data = response.get_json()
    assert response.status_code == HTTP_400_BAD_REQUEST
    assert data['error_message'] == 'Invalid email address'

def test_register_user_invalid_password(client):
    data = {
        'email': 'test@example.com',
        'password': 'weakpass'
    }
    response = client.post('/auth/register', json=data)
    data = response.get_json()
    assert response.status_code == HTTP_400_BAD_REQUEST
    assert data['error_message'] == 'Invalid password'

def test_register_existing_user(client):
    # Add a user to the database
    user = User(email='test@example.com', password='hashedpassword', otp=123456, expiration_time=datetime.datetime.utcnow() + datetime.timedelta(minutes=5))
    db.session.add(user)
    db.session.commit()

    data = {
        'email': 'test@example.com',
        'password': 'Test@1234'
    }
    response = client.post('/auth/register', json=data)
    data = response.get_json()
    assert response.status_code == HTTP_409_CONFLICT
    assert data['error_message'] == 'User already exists'

def test_verify_user_successful(client):
    # Create a user in the database
    user = User(email='test@example.com', password='hashed_password', otp='123456', is_verified=False)
    db.session.add(user)
    db.session.commit()

    # Simulate user session with email
    with client.session_transaction() as session:
        session['email'] = 'test@example.com'

    # Send POST request to the endpoint with the correct code
    response = client.post('/auth/verify-user', json={'code': '123456'})

    assert response.status_code == 200
    # assert response.success_message == "User verification successful"
    assert response.get_json().get('success_message') == "User verification successful"
    # assert b"User verification successful" in response.data

    # Verify that the user's 'is_verified' status is updated in the database
    with client.application.app_context():
        updated_user = User.query.filter_by(email='test@example.com').first()
        assert updated_user.is_verified is True

def test_verify_user_invalid_code(client):
    # Create a user in the database
    user = User(email='test@example.com', password='hashed_password', otp='123456', is_verified=False)
    db.session.add(user)
    db.session.commit()

    # Simulate user session with email
    with client.session_transaction() as session:
        session['email'] = 'test@example.com'

    # Send POST request to the endpoint with an incorrect code
    response = client.post('/auth/verify-user', json={'code': '654321'})

    assert response.status_code == 400
    assert b"Code does not match" in response.data

    # Verify that the user's 'is_verified' status remains False in the database
    with client.application.app_context():
        updated_user = User.query.filter_by(email='test@example.com').first()
        assert updated_user.is_verified is False

# test if user is not found
def test_verify_user_user_not_found(client):
    # Simulate user session with email (user not found in the database)
    with client.session_transaction() as session:
        session['email'] = 'nonexistent@example.com'

    # Send POST request to the endpoint with any code
    response = client.post('/auth/verify-user', json={'code': '123456'})

    assert response.status_code == 404
    assert b"User does not exist" in response.data


# test for sending email
