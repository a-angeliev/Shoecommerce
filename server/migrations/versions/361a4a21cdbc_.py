"""empty message

Revision ID: 361a4a21cdbc
Revises: 60914c58ca6d
Create Date: 2022-09-03 02:45:24.511799

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "361a4a21cdbc"
down_revision = "60914c58ca6d"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, "category", ["title"])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "category", type_="unique")
    # ### end Alembic commands ###
