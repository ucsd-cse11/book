import tester.*;

public class ExamplesSearch {
  ImageData i1 = new ImageData("Carol Shaw River Raid", "png", 600, 400);
  ImageData i2 = new ImageData("crescendo heliotrope cerebellum", "jpg", 500, 400);
  ImageQuery lg1 = new LargerThan(600, 400);
  ImageQuery me1 = new MatchesExtension("png");
  AndQuery aq = new AndQuery(this.lg1, this.me1);

  ImageQuery me2 = new MatchesExtension("gif");
  AndQuery aq2 = new AndQuery(this.lg1, this.me2);

  boolean testAnd(Tester t) {
    return t.checkExpect(this.aq.matches(i1), true) &&
           t.checkExpect(this.aq2.matches(i2), false);
  }
}

// { autofold
class ImageData {
  String keywords; // All the keywords, separated by spaces
  String filetype; // gif, png, jpg, and so on
  int width;       // the width in pixels
  int height;      // the height in pixels
  ImageData(String keywords, String filetype, int width, int height) {
    this.keywords = keywords;
    this.filetype = filetype;
    this.width = width;
    this.height = height;
  }
}

interface ImageQuery {
  boolean matches(ImageData id);
}

class MatchesExtension implements ImageQuery {
  String extension;
  public MatchesExtension(String extension) { this.extension = extension; }
  public boolean matches(ImageData id) {
    return id.filetype.equals(this.extension);
  }
}
class LargerThan implements ImageQuery {
  int minWidth;
  int minHeight;
  public LargerThan(int minWidth, int minHeight) {
    this.minWidth = minWidth;
    this.minHeight = minHeight;
  }
  public boolean matches(ImageData id) {
    return id.width >= this.minWidth && id.height >= this.minHeight;
  }
}

class AndQuery {
  ImageQuery iq1, iq2;
  AndQuery(ImageQuery iq1, ImageQuery iq2) {
    this.iq1 = iq1;
    this.iq2 = iq2;
  }
  boolean matches(ImageData id) {
    return this.iq1.matches(id) && this.iq2.matches(id);
  }
}
// }
