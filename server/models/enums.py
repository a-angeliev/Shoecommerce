import enum


class BaseEnum(str, enum.Enum):
    @classmethod
    def list(cls):
        return list(map(lambda c: c.value, cls))


class RoleType(BaseEnum):
    user = "user"
    admin = "admin"


class GenderType(BaseEnum):
    kid = "kid"
    man = "man"
    woman = "woman"


class PairColor(BaseEnum):
    black = "black"
    white = "white"
    green = "green"
    red = "red"
    brown = "brown"
    gray = "gray"
    blue = "blue"
    pink = "pink"


class IsShipped(BaseEnum):
    rejected = "rejected"
    pending = "pending"
    shipped = "shipped"
