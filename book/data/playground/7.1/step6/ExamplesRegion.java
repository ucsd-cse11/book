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
  
  RectRegion(Point lowerL, Point upperR) {
    this.lowerLeft = lowerL;
	this.upperRight = upperR;
  }
}

class ExamplesRegion {
  RectRegion r1 = new RectRegion(new Point(30, 40), new Point(100, 200));
  RectRegion r2 = new RectRegion(new Point(10, 10), new Point(50, 50));
  Point p1 = new Point(10, 10);
  Point p2 = new Point(50, 50);
  RectRegion r3 = new RectRegion(p1, p2);
}

