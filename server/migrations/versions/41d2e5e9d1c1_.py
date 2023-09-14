"""empty message

Revision ID: 41d2e5e9d1c1
Revises: 5d7d05b3a678
Create Date: 2023-09-07 11:08:14.899799

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '41d2e5e9d1c1'
down_revision = '5d7d05b3a678'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('student', schema=None) as batch_op:
        batch_op.add_column(sa.Column('supervisorName', sa.String(length=500), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('student', schema=None) as batch_op:
        batch_op.drop_column('supervisorName')

    # ### end Alembic commands ###