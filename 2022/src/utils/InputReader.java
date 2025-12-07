package utils;

import java.io.BufferedReader;
import java.io.FileReader;

public class InputReader {
    public String read(String day) {
        try {
            String fileName = "./2022/src/day_" + day + "/input";
            String result = "";
            try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
                StringBuilder sb = new StringBuilder();
                String line = br.readLine();
                while (line != null) {
                    sb.append(line);
                    sb.append('\n');
                    line = br.readLine();
                }
                result = sb.toString();
            } 
            return result;
        } catch(Exception e) {
            System.out.println(e);
            return "";
        }
    }
}