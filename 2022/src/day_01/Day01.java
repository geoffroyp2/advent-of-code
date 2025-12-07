package day_01;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import utils.InputReader;

public class Day01 {
    private static List<List<String>> getInput() {
        String input = new InputReader().read("01");
        return Arrays
                .asList(input.split("\n\n"))
                .stream()
                .map((String block) -> Arrays.asList(block.split("\n")))
                .collect(Collectors.toList());
    }

    private static Integer getBlockValue(List<String> block) {
        return block.stream()
                .map((String val) -> Integer.parseInt(val))
                .reduce(0, Integer::sum);
    }

    private static Stream<Integer> getBlockValues() {
        return getInput()
                .stream()
                .map(Day01::getBlockValue);
    }

    private static void part1() {
        Integer max = getBlockValues()
                .reduce(0, (Integer acc, Integer val) -> Integer.max(acc, val));
        System.out.println(max);
    }

    private static void part2() {
        Integer total = getBlockValues()
                .sorted((Integer a, Integer b) -> b - a)
                .limit(3)
                .reduce(0, Integer::sum);
        System.out.println(total);
    }

    public static void solve() {
        part1();
        part2();
    }
}
