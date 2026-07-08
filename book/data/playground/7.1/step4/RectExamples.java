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
  
  RectRegion(Point p1, Point p2) {
    this.lowerLeft = p1;
	this.upperRight = p2;
  }
}

class RectExamples {
  RectRegion r1 = new RectRegion(new Point(30, 40), new Point(100, 200));

}
