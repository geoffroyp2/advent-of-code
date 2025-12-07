from src.utils.utils import read_input

def get_input() -> tuple[str, str]:
    return [x.split('-') for x in read_input('02').split(',')]

def is_valid_1(num: int):
    s = str(num)
    l = len(s)
    if l % 2 != 0:
        return True
    mid = len(s) // 2
    for idx in range(mid):
        if s[idx] != s[idx + mid]:
            return True
    return False

def is_valid_2(num: int):
    s = str(num)
    l = len(s)
    has_repetitions = False
    for seq_len in range(1, l // 2 + 1):
        is_repeting_seq = True
        seq_amount = l // seq_len
        if l % seq_len != 0:
            continue
        for seq_char_idx in range(seq_len):
            first_char = s[seq_char_idx]
            for cidx in range(0, seq_amount):
                c2 = s[seq_char_idx + cidx * seq_len]
                if c2 != first_char:
                    is_repeting_seq = False
        if is_repeting_seq:
            has_repetitions = True
            break
    return not has_repetitions

def part1():
    i = get_input()
    total = 0
    for couple in i:
        start = int(couple[0])
        end = int(couple[1]) + 1
        for n in range(start, end):
            if not is_valid_1(n):
                total += n

    print(total)


def part2():
    i = get_input()
    total = 0
    for couple in i:
        start = int(couple[0])
        end = int(couple[1]) + 1
        for n in range(start, end):
            if not is_valid_2(n):
                total += n

    print(total)


def solve():
    part1()
    part2()
