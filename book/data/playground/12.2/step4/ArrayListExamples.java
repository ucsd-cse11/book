import java.util.ArrayList;
import java.util.List;

public class ArrayListExamples {
  public static void main(String[] args) {
    ArrayList<String> names = new ArrayList<String>();
    names.add("Vivian");
    names.add("Jaida");
    names.add("Mohamed");

    boolean containsJaida_1 = names.contains("Jaida"); //should be true
    boolean containsFarnia_1 = names.contains("Farnia"); //should be false
    String atIndex1_1 = names.get(1); //should be "Jaida"

    names.remove(1);

    boolean containsJaida_2 = names.contains("Jaida");
    boolean containsFarnia_2 = names.contains("Farnia");
    String atIndex1_2 = names.get(1);
  }
}
