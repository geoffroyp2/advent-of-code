import math

from src.utils.utils import read_input

def get_input():
    return read_input('01').split('\n')

def part1():
    val = get_input()
    idx = 50
    total = 0

    for line in val:
        amount = int(line[1:])
        if line[0] == 'R':
            idx += amount
        else:
            idx += 100 - amount
        idx %= 100
        if idx == 0:
            total += 1

    print(total)

def part2():
    val = get_input()
    idx = 50
    total = 0

    for line in val:
        amount = int(line[1:])
        total += math.floor(amount / 100)
        amount %= 100
        if line[0] == 'R':
            nxt = idx + amount
            if nxt >= 100 and idx != 0:
                total += 1
            nxt %= 100
            idx = nxt
        else:
            nxt = idx - amount
            if nxt <= 0 and idx != 0:
                total +=1
            nxt = (nxt + 100) % 100
            idx = nxt

    print(total)


def solve():
    part1()
    part2()
