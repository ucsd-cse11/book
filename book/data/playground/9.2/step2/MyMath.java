class MyMath {
  static int min(int a, int b) {
    if(a < b) {
      return a;
    }
    else {
      return b;
    }
  }

  int num = MyMath.min(10, 20);
}
