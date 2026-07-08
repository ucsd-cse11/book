class CalcMain {
  public static void main(String[] args) {
    if(args[0].equals("sum")) {
      int total = 0;
      for(int i = 1; i < args.length; i = i + 1) {
        total = total + Integer.parseInt(args[i]);
      }
      System.out.println(total);
    }
    else if(args[0].equals("product")) {
      int prod = 1;
      for(int i = 1; i < args.length; i = i + 1) {
        prod = prod * Integer.parseInt(args[i]);
      }
      System.out.println(prod);
    }
  }
}