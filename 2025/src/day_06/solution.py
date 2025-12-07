import re

from src.utils.utils import read_input


def get_input():
    return read_input('06').split('\n')

def get_input_1():
    segments = [re.split(r' +', l) for l in get_input()]
    val = [[s for s in l if s != ''] for l in segments]
    return ([[int(n) for n in v] for v in val[:-1]], val[-1])

def part1():
    [values, operators] = get_input_1()
    total = 0

    for op_idx in range(len(values[0])):
        op = operators[op_idx]
        result = values[0][op_idx]
        for num_idx in range(1, len(values)):
            if op == '*':
                result *= values[num_idx][op_idx]
            else:
                result += values[num_idx][op_idx]
        total += result
    print(total)

def part2():
    lines = get_input()
    
    width = max(*[len(l) for l in lines])

    blocks = []

    block = []
    op = None
    for x in range(width):
        val = ''
        for y in range(len(lines)):
            if x >= len(lines[y]):
                continue
            c = lines[y][x]
            if c == ' ':
                continue
            elif c == '+' or c == '*':
                op = c
            else:
                val += c
        if val == '':
            blocks.append((block, op))
            block = []
            op = None
        else:
            block.append(int(val))
    blocks.append((block, op))

    total = 0
    for [nums, op] in blocks:
        result = nums[0]
        for n in nums[1:]:
            if op == '+':
                result += n
            else:
                result *= n
        total += result

    print(total)

def solve():
    part1()
    part2()
