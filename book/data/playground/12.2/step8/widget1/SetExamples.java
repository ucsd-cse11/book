import java.util.*;

public class SetExamples {
  public static void main(String[] args) {
    HashSet<String> students = new HashSet<String>();
    students.add("Yunxian");
    students.add("Shungo");
    students.add("Tanh");
    students.add("Yunxian");
    for(String s: students) {
      System.out.println(s);
    }
  }
}
