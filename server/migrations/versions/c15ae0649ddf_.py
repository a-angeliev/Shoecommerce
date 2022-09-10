"""empty message

Revision ID: c15ae0649ddf
Revises: ea8450521821
Create Date: 2022-09-04 16:09:01.563258

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "c15ae0649ddf"
down_revision = "ea8450521821"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "products", "is_deleted", existing_type=sa.BOOLEAN(), nullable=False
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("products", "is_deleted", existing_type=sa.BOOLEAN(), nullable=True)
    # ### end Alembic commands ###