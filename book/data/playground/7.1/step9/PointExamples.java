class Point {
  int x;
  int y;
  Point(int x, int y) {
    this.x = x;
    this.y = y;
  }

  /*
    @param p The point to compare with
    @return true if this is above and to the right of p, false otherwise
  */
  _____ aboveRightOf(_____ p) {
    return p.x __ this.x && _____ < this.y;
  }
}

class PointExamples {
  Point p1 = new Point(3, 5);
  Point p2 = new Point(4, 8);
  boolean result = this.p1.aboveRightOf(p2);
}
