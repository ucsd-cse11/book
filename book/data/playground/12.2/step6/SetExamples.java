import java.util.Set;
import java.util.HashSet;

public class SetExamples {
  public static void main(String[] args) {
    HashSet<Integer> primes = new HashSet<Integer>();
    primes.add(3);
    primes.add(5);
    primes.add(7);
    primes.add(3);
    primes.add(2);
    primes.add(7);
    primes.add(3);
  }
}
