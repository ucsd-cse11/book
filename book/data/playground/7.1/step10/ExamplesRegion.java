import tester.*;

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
// { autofold 
  RectRegion(Point lowerL, Point upperR) {
    this.lowerLeft = lowerL;
	this.upperRight = upperR;
  }
// }

  boolean contains(Point p) {
    return this.lowerLeft.belowLeftOf(p) && this.upperRight.aboveRightOf(p);
  }
}

class ExamplesRegion {
  RectRegion r1 = new RectRegion(new Point(30, 40), new Point(100, 200));
  RectRegion r2 = new RectRegion(new Point(10, 10), new Point(50, 50));
  Point p1 = new Point(10, 10);
  Point p2 = new Point(50, 50);
  RectRegion r3 = new RectRegion(p1, p2);

  Point toTest1 = new Point(60, 60);
  Point toTest2 = new Point(20, 20);

  boolean testContains(Tester t) {
    return t.checkExpect(this.r1.contains(this.toTest1), true) &&
           t.checkExpect(this.r2.contains(this.toTest1), false) &&
           t.checkExpect(this.r3.contains(this.toTest1), false) &&
           t.checkExpect(this.r1.contains(this.toTest2), false) &&
           t.checkExpect(this.r2.contains(this.toTest2), true) &&
           t.checkExpect(this.r3.contains(this.toTest2), true);
  }

}
