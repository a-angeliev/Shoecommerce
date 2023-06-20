"""empty message

Revision ID: 5254aa74f24e
Revises: 37ee319744e3
Create Date: 2023-06-17 16:56:29.661265

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5254aa74f24e'
down_revision = '37ee319744e3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('final_price', sa.Float(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'final_price')
    # ### end Alembic commands ###