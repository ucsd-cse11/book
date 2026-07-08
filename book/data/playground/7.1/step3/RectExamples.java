class Point {
  int x;
  int y;
  Point(int x, int y) {
    this.x = x;
    this.y = y;
  }
}

class RectRegion {
  Point lowerLeft;
  Point upperRight;
  //Write the default constructor here

}

class RectExamples {
  Point p1 = new Point(1, -2);
  Point p2 = new Point(4, 3);
  RectRegion region = new RectRegion(p1, p2);
}
