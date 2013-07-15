from enums import enum

class Resources(enum):
    desert = 0
    wood = 1
    brick = 2
    wheat = 3
    wool = 4
    ore = 5

class Buildings(enum):
    none = 0
    settlement = 1
    city = 2

class Teams(enum):
    none = 0
    red = 1
    blue = 2
    white = 3
    orange = 4