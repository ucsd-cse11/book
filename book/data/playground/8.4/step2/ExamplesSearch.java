import tester.*;

// write the ContainsKeyword class here


public class ExamplesSearch {
  ImageData i1 = new ImageData("Carol Shaw River Raid", "png", 600, 400);
  ImageData i2 = new ImageData("crescendo heliotrope cerebellum", "jpg", 500, 400);
  ImageQuery ck1 = new ContainsKeyword("River");
  ImageQuery ck2 = new ContainsKeyword("crescendo");
  ImageQuery ck3 = new ContainsKeyword("raspberry");

  boolean testAnd(Tester t) {
    return t.checkExpect(this.ck1.matches(i1), true) &&
           t.checkExpect(this.ck1.matches(i2), false) &&
           t.checkExpect(this.ck2.matches(i2), true) &&
           t.checkExpect(this.ck3.matches(i1), false);
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
// }
