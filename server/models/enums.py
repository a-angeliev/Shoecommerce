import enum


class RoleType(str, enum.Enum):
    user = "user"
    admin = "admin"
