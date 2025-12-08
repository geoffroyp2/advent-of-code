from typing import List, Dict
import math

from src.utils.utils import read_input

class Box:
    def __init__(self, val: str):
        [x, y, z] = [int(n) for n in val.split(',')]
        self.x = x
        self.y = y
        self.z = z
        self.hash = hb(self)

    def __repr__(self):
        return f"Box(x:{self.x} y:{self.y} z:{self.z})"


class Link:
    def __init__(self, b1: Box, b2: Box):
        self.b1 = b1
        self.b2 = b2
        self.hash = hb2(self.b1, self.b2)
        self.dist = dist(self.b1, self.b2)

    def __repr__(self):
        return f"Link\n    b1: {self.b1}\n    b2: {self.b2}\n    dist: {self.dist}"



class Circuit:
    def __init__(self):
        self.links = {}
        self.boxes = {}

    def add(self, link: Link):
        self.links[link.hash] = link
        self.boxes[link.b1.hash] = link.b1
        self.boxes[link.b2.hash] = link.b2

    def has(self, link: Link):
        has_b1 = self.boxes.get(link.b1.hash) is not None
        has_b2 = self.boxes.get(link.b2.hash) is not None
        return has_b1 or has_b2

    def __repr__(self):
        return f"Circuit(boxes:{''.join([(str(p) + ' ') for p in self.boxes.values()])})"


class CircuitPool:
    def __init__(self):
        self.pool: List[Circuit] = []

    def add(self, link: Link):
        existing_circuits = [c for c in self.pool if c.has(link)]
        if len(existing_circuits) == 0:
            new_circuit = Circuit()
            new_circuit.add(link)
            self.pool.append(new_circuit)
        elif len(existing_circuits) == 1:
            existing_circuits[0].add(link)
        else:
            new_circuit = merge_circuits(*existing_circuits)
            new_circuit.add(link)
            self.pool = [c for c in self.pool if c not in existing_circuits]
            self.pool.append(new_circuit)
        self.sort()

    def total_size(self):
        total = 0
        for c in self.pool:
            total += len(c.boxes.values())
        return total

    def sort(self):
        self.pool.sort(key = lambda p: -1 * len(p.boxes))

    def __repr__(self):
        return f"CircuitPool({self.pool})"

def merge_circuits(*circuits: Circuit) -> Circuit:
    new_circuit = Circuit()
    for c in circuits:
        for l in list(c.links.values()):
            new_circuit.add(l)
    return new_circuit

def pad(n: int) -> str:
    return str(n).rjust(6, '0')
def hb(box: Box):
    return f"{pad(box.x)}-{pad(box.y)}-{pad(box.z)}"
def hb2(box1: Box, box2: Box):
    h = sorted([box1.hash, box2.hash])
    return f"{h[0]}-{h[1]}"

def sq(n):
    return n * n

def dist(b1: Box, b2: Box) -> float:
    return math.sqrt(sq(b1.x - b2.x) + sq(b1.y - b2.y) + sq(b1.z - b2.z))

def get_input() -> List[str]:
    return read_input('08').split('\n')

def get_boxes() -> List[Box]:
    return [Box(s) for s in get_input()]

def get_links(boxes: List[Box]) -> List[Link]:
    links: Dict[str, Box] = {}
    for b1 in boxes:
        for b2 in boxes:
            if b1 == b2:
                continue
            h = hb2(b1, b2)
            if links.get(h):
                continue
            l = Link(b1, b2)
            links[l.hash] = l
    return sorted(list(links.values()), key=lambda l: l.dist)

def part1():
    boxes = get_boxes()
    links = get_links(boxes)

    circuit_pool = CircuitPool()
    for idx in range(1000):
        circuit_pool.add(links[idx])

    total = 1
    for idx in range(3):
        total *= len(circuit_pool.pool[idx].boxes)

    print(total)

def part2():
    boxes = get_boxes()
    links = get_links(boxes)

    circuit_pool = CircuitPool()
    last_link = None
    for l in links:
        last_link = l
        circuit_pool.add(l)
        if len(circuit_pool.pool) == 1 and circuit_pool.total_size() == len(boxes):
            break

    print(last_link.b1.x * last_link.b2.x)

def solve():
    part1()
    part2()
