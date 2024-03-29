"""empty message

Revision ID: dd4199a720c9
Revises: 5254aa74f24e
Create Date: 2023-06-19 01:44:15.679998

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "dd4199a720c9"
down_revision = "5254aa74f24e"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("order_item", sa.Column("img", sa.Text(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("order_item", "img")
    # ### end Alembic commands ###
