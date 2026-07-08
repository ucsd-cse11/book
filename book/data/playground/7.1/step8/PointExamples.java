class Point {
  int x;
  int y;
  Point(int x, int y) {
    this.x = x;
    this.y = y;
  }

  /*
    @param p The point to compare with
    @return true if this is below and to the left of p, false otherwise
  */
  boolean belowLeftOf(Point p) {
    return __BLANK1__ > __BLANK2__ && __BLANK3__ > __BLANK4__;
  }
}

class PointExamples {
  Point p1 = new Point(3, 5);
  Point p2 = new Point(4, 8);
  boolean result = this.p1.belowLeftOf(p2);
}
