import enum


class RoleType(str, enum.Enum):
    user = "user"
    admin = "admin"


class GenderType(str, enum.Enum):
    kid = "kid"
    man = "man"
    woman = "woman"


class PairColor(str, enum.Enum):
    black = "black"
    white = 'white'
    green = "green"
    red = "red"
    brown = "brown"
    gray = "gray"
    blue = "blue"
    pink = "pink"

