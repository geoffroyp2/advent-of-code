import sys
from importlib import import_module

def main():
    lib = sys.argv[1]
    mod = import_module(f'src.day_{lib}.solution')
    mod.solve()

if __name__ == "__main__":
    main()
