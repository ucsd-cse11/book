import java.util.Map;
import java.util.HashMap;

public class MapExamples {
  public static void main(String[] args) {
    HashMap<Integer, String> studDir = new HashMap<Integer, String>();
    studDir.put(12345, "Maitrayee");
    studDir.put(67890, "Navya");
    studDir.put(13579, "Sofia");
    System.out.println(studDir);

    studDir.remove(13579);
    System.out.println(studDir);
  }
}
