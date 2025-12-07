from src.utils.utils import read_input

def get_input() -> tuple[str, str]:
    return read_input('03').split('\n')

def get_highest_1(bank: str):
    l = len(bank)
    m = 0
    for i1 in range(l):
        for i2 in range (i1 + 1, l):
            m = max(m, int(bank[i1] + bank[i2]))
    return m

def get_highest_2(bank: str):
    nums = [int(n) for n in bank]
    m = nums[:12]
    nidx = 0
    for midx in range(12):
        nmax = nums[nidx]
        imax = nidx
        for i in range(nidx, len(nums) - (11 - midx)):
            if nums[i] > nmax:
                nmax = nums[i]
                imax = i

        nidx = imax + 1
        m[midx] = nmax
    return int(''.join([str(s) for s in m]))

def part1():
    i = get_input()
    total = 0
    for bank in i:
        total += get_highest_1(bank)

    print(total)


def part2():
    i = get_input()
    total = 0
    for bank in i:
        total += get_highest_2(bank)

    print(total)

def solve():
    part1()
    part2()
