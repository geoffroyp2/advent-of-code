from typing import List, Dict
import math

from src.utils.utils import read_input

class Coord:
    def __init__(self, val: str):
        [x, y] = [int(n) for n in val.split(',')]
        self.x = x
        self.y = y
        self.hash = hc(self)

    def __repr__(self):
        return f"Box(x:{self.x} y:{self.y})"


class Rect:
    def __init__(self, c1: Coord, c2: Coord):
        self.c1 = c1
        self.c2 = c2
        self.hash = hr(self.c1, self.c2)
        self.area = area(self.c1, self.c2)

    def __repr__(self):
        return f"Rect\n    c1: {self.c1}\n    c2: {self.c2}\n    area: {self.area}"

def pad(n: int) -> str:
    return str(n).rjust(6, '0')
def hc(coord: Coord):
    return f"{pad(coord.x)}-{pad(coord.y)}"
def hr(c1: Coord, c2: Coord):
    return f"{hc(c1)}-{hc(c2)}"
def area(c1: Coord, c2: Coord) -> float:
    return (abs(c1.x-c2.x)+1) * (abs(c1.y-c2.y)+1)

def get_input() -> List[str]:
    return read_input('09').split('\n')

def get_coords() -> List[Coord]:
    return [Coord(s) for s in get_input()]

def get_rects(coords: List[Coord]) -> List[Rect]:
    rects: Dict[str, Rect] = {}
    for c1 in coords:
        for c2 in coords:
            if c1 == c2:
                continue
            if rects.get(hr(c1, c2)) is None:
                rect = Rect(c1, c2)
                rects[rect.hash] = rect
    return list(rects.values())

def part1():
    coords = get_coords()
    rects = get_rects(coords)

    rects.sort(key= lambda r: -1 * r.area)
    # for r in rects:
    #     print(r)

    print(rects[0].area)

def part2():
    pass

def solve():
    part1()
    # part2()
