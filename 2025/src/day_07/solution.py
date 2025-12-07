from typing import List, Tuple, Dict

from src.utils.utils import read_input

def get_input():
    return read_input('07').split('\n')

def part1():
    lines = get_input()
    idx = [lines[0].index('S')]
    split_amount = 0

    for line in lines[1:]:
        for x in range(len(line)):
            if line[x] == '^' and idx.count(x) == 1:
                split_amount += 1
                idx.remove(x)
                if x > 0 and idx.count(x-1) == 0:
                    idx.append(x-1)
                if x < len(line) - 1 and idx.count(x+1) == 0:
                    idx.append(x+1)
    print(split_amount)

def hash(coord: Tuple[int, int]) -> str:
    return str(coord[0] * 10000 + coord[1])

def get_path_amount(lines: List[str], coord: Tuple[int, int], memo: Dict[int, int]) -> int:
    [x, y] = coord
    total = 0

    m = memo.get(hash(coord))
    if m != None:
        return m
    while y < len(lines) - 1:
        y += 1
        if lines[y][x] != '^':
            continue
        if x > 0:
            total += get_path_amount(lines, (x-1, y), memo)
        if x < len(lines) - 1:
            total += get_path_amount(lines, (x+1, y), memo)
        break
    if total == 0:
        total = 1
    memo[hash(coord)] = total
    return total

def part2():
    lines = get_input()
    start = (lines[0].index('S'), 0)
    total = get_path_amount(lines, start, {})
    print(total)


def solve():
    part1()
    part2()
