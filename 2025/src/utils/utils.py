def read_input(day: int) -> str:
    f = open(f'./src/day_{day}/input', encoding='utf-8')
    s = f.read()
    f.close()
    return s
