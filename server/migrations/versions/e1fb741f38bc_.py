"""empty message

Revision ID: e1fb741f38bc
Revises: 1700b4f41b45
Create Date: 2022-09-22 23:08:57.342990

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "e1fb741f38bc"
down_revision = "1700b4f41b45"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "orders",
        sa.Column(
            "is_shipped",
            sa.Enum("rejected", "pending", "shipped", name="is_shipped"),
            nullable=False,
        ),
    )
    op.add_column("orders", sa.Column("shipped_on", sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("orders", "shipped_on")
    op.drop_column("orders", "is_shipped")
    # ### end Alembic commands ###