from functools import cmp_to_key

from src.utils.utils import read_input

def parse_ranges(ranges: list[str]):
    r = []
    for s in ranges:
        [l, h] = s.split('-')
        r.append((int(l), int(h)))
    return r


def get_input() -> tuple[list[tuple[int, int]], list[int]]:
    [ranges, values] = [l.split('\n') for l in read_input('05').split('\n\n')]
    return [parse_ranges(ranges), [int(n) for n in values]]

def is_valid(value: int, ranges: list[tuple[int, int]]):
    for r in ranges:
        if value >= r[0] and value <= r[1]:
            return True
    return False

def part1():
    [ranges, values] = get_input()
    total = 0
    for v in values:
        if is_valid(v, ranges):
            total += 1
    print(total)


def get_merged_ranges(ranges: list[tuple[int, int]]):
    new_ranges = []
    curr = ranges[0]
    for idx in range(1, len(ranges)):
        s1 = curr[0]
        e1 = curr[1]
        s2 = ranges[idx][0]
        e2 = ranges[idx][1]
        if s2 <= e1 + 1:
            curr = (s1, max(e1, e2))
        else:
            new_ranges.append(curr)
            curr = ranges[idx]
    new_ranges.append(curr)
    return new_ranges

def compare(r1: tuple[int, int], r2: tuple[int, int]):
    if r1[0] == r2[0]:
        return r2[1] - r1[1]
    return r1[0] - r2[0]

def part2():
    [ranges, _] = get_input()
    s = sorted(ranges, key=cmp_to_key(compare))
    merged = get_merged_ranges(s)

    total = 0
    for r in merged:
        total += r[1] - r[0] + 1
    print(total)


def solve():
    part1()
    part2()
