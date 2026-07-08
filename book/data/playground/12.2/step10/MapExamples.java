import java.util.Map;
import java.util.HashMap;

public class MapExamples {
  public static void main(String[] args) {
    HashMap<Integer, String> studDir = new HashMap<Integer, String>();
    studDir.put(12345, "Ricardo");
    studDir.put(67890, "Navya");
    studDir.put(13579, "Sofia");
    System.out.println(studDir);

    studDir.put(12345, "Maitrayee");
    System.out.println(studDir);
  }
}
