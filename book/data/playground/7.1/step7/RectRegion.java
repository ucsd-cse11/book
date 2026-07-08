// { autofold
class Point {
  int x;
  int y;
  Point(int x, int y) {
    this.x = x;
    this.y = y;
  }
}
// }

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
