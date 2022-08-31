"""empty message

Revision ID: 7a136ae9d846
Revises: 76ad01d1bce6
Create Date: 2022-08-29 14:35:05.072558

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7a136ae9d846"
down_revision = "76ad01d1bce6"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password", sa.String(length=255), nullable=False),
        sa.Column("role", sa.Enum("user", "admin", name="roletype"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
    )
    op.create_table(
        "user_data",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("f_name", sa.String(length=255), nullable=False),
        sa.Column("l_name", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.Integer(), nullable=False),
        sa.Column(
            "created_on", sa.DateTime(), server_default=sa.text("now()"), nullable=True
        ),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("user_data")
    op.drop_table("users")
    # ### end Alembic commands ###