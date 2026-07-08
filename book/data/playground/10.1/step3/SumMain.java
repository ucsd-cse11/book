class SumMain {
  public static void main(String[] args) {
    int total = 0;
    for(String s: args) {
      total = total + Integer.parseInt(s);
    }
    System.out.println(total);
    // prints 70 if run with
	// $ javac SumMain.java
    // $ java SumMain 40 20 10
  }
}
