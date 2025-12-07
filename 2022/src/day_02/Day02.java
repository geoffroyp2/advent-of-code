package day_02;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import utils.InputReader;

enum Choice {
    ROCK,
    PAPER,
    SCISSORS
}

enum Result {
    WIN,
    LOSE,
    DRAW
}

class Round {
    private Choice p1;
    private Choice p2;

    public Round(String p1s, String p2s) throws Exception {
        switch(p1s) {
            case "A": p1 = Choice.ROCK; break;
            case "B": p1 = Choice.PAPER; break;
            case "C": p1 = Choice.SCISSORS; break;
            default: throw new Exception("unknown: " + p1s);
        }
        switch(p2s) {
            case "X": p2 = Choice.ROCK; break;
            case "Y": p2 = Choice.PAPER; break;
            case "Z": p2 = Choice.SCISSORS; break;
            default: throw new Exception("unknown: " + p2s);
        }
    }

    public Integer getP2Score() {
        return getResultScore() + getChoiceScore();
    }

    private Result getResult() {
        if (p1 == p2) {
            return Result.DRAW;
        }
        if (p2 == Choice.ROCK) {
            return p1 == Choice.SCISSORS ? Result.WIN : Result.LOSE;
        }
        if (p2 == Choice.PAPER) {
            return p1 == Choice.ROCK ? Result.WIN : Result.LOSE;
        }
        return p1 == Choice.PAPER ? Result.WIN : Result.LOSE;
    }

    private Integer getResultScore() {
        Result res = getResult();
        if (res == Result.LOSE) {
            return 0;
        }
        if (res == Result.DRAW) {
            return 3;
        }
        return 6;
    }

    private Integer getChoiceScore() {
        if (p2 == Choice.ROCK) {
            return 1;
        }
        if (p2 == Choice.PAPER) {
            return 2;
        }
        return 3;
    }
}

public class Day02 {
    private static List<Round> getInput() {
        String input = new InputReader().read("02");
        return Arrays
                .asList(input.split("\n"))
                .stream()
                .map((String block) -> {
                    String[] segments = block.split(" ");
                    try {
                        return new Round(segments[0], segments[1]);
                    } catch (Exception e) {
                        System.err.println(e);
                        System.exit(1);
                        return null;
                    }
                })
                .collect(Collectors.toList());
    }


    private static void part1() {
        Integer total = getInput()
                .stream()
                .map((Round round) -> round.getP2Score())
                .reduce(0, Integer::sum);
        System.out.println(total);
    }

    private static void part2() {
      
    }

    public static void solve() {
        part1();
        // part2();
    }
}
