import tester.*;

class ExamplesSearch {
  ImageData i1 = new ImageData("Carol Shaw River Raid", "png", 600, 400);
  ImageData i2 = new ImageData("crescendo heliotrope cerebellum", "png", 500, 400);

  ContainsKeyword ck1 = new ContainsKeyword("River");
  ContainsKeyword ck2 = new ContainsKeyword("Raid");
  AndQuery usingNew = new AndQuery(this.ck1, this.ck2);
  AndQuery usingAndMethod = this.ck1.and(this.ck2);
}

class ContainsKeyword implements ImageQuery {
// {
  String keyword;
  public ContainsKeyword(String keyword) {
    this.keyword = keyword;
  }
  public boolean matches(ImageData id) {
    return id.keywords.indexOf(this.keyword) != -1;
  }
// }
  public AndQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}

class AndQuery implements ImageQuery {
  ImageQuery iq1, iq2;
// {
  AndQuery(ImageQuery iq1, ImageQuery iq2) {
    this.iq1 = iq1;
    this.iq2 = iq2;
  }
  public boolean matches(ImageData id) {
    return this.iq1.matches(id) && this.iq2.matches(id);
  }
// }
}

// {
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
// }
