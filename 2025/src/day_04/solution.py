from src.utils.utils import read_input

def get_input() -> list[list[str]]:
    return [list(l) for l in read_input('04').split('\n')]

def is_accessible(grid: list[list[str]], y: int, x: int) -> bool:
    t = 0
    for dy in range(-1, 2):
        for dx in range(-1, 2):
            if dy == 0 and dx == 0:
                continue
            ydy = y+dy
            xdx = x+dx
            inbounds = ydy >= 0 and xdx >= 0 and ydy < len(grid) and xdx < len(grid[0])
            if inbounds and grid[ydy][xdx] == '@':
                t += 1
    return t < 4

def count_accessible(grid: list[list[str]]) -> int:
    h = len(grid)
    w = len(grid[0])
    total = 0
    for y in range(h):
        for x in range(w):
            if grid[y][x] != '@':
                continue
            if is_accessible(grid, y, x):
                total += 1
    return total

def part1():
    grid = get_input()
    print(count_accessible(grid))

def remove_accessible(grid: list[list[str]]) -> int:
    h = len(grid)
    w = len(grid[0])

    to_remove: list[tuple[int, int]] = []
    for y in range(h):
        for x in range(w):
            if grid[y][x] != '@':
                continue
            if is_accessible(grid, y, x):
                to_remove.append([y, x])
    for c in to_remove:
        grid[c[0]][c[1]] = '.'
    return len(to_remove)

def part2():
    grid = get_input()
    total_removed = 0

    while True:
        removed_amount = remove_accessible(grid)
        total_removed += removed_amount
        if removed_amount == 0:
            break
    print(total_removed)


def solve():
    part1()
    part2()
