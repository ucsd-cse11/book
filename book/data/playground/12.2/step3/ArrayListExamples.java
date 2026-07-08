import java.util.ArrayList;
import java.util.List;

public class ArrayListExamples {
  public static void main(String[] args) {
    ArrayList<Integer> nums = new ArrayList<Integer>();
    nums.add(10);
	nums.add(20);
    nums.add(30);

    nums.remove(1);
    nums.add(1, 40);
    nums.add(0, 50);

	System.out.println(nums);
  }
}
