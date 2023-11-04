from flask import Blueprint

register_blueprint = Blueprint('register', __name__ )

@register_blueprint.post('/')
def regiter():
    