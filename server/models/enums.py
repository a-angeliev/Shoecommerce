import enum


class RoleType(str, enum.Enum):
    user = "user"
    admin = "admin"


class GenderType(str, enum.Enum):
    kid = "kid"
    man = "man"
    woman = "woman"
