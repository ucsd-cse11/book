class ExamplesSearch {
  ImageData i1 = new ImageData("ucsd cse computer science", "png", 600, 400);
  ImageData i2 = new ImageData("data science ai artificial intelligence", "png", 500, 400);

  ImageQuery lg1 = new LargerThan(600, 400);
  ImageQuery me1 = new MatchesExtension("png");
  ImageQuery ck1 = new ContainsKeyword("ucsd");
  ImageQuery ck2 = new ContainsKeyword("data");
  ImageQuery ck3 = new ContainsKeyword("science");

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
  ImageQuery and(ImageQuery iq);
}

abstract class AQuery implements ImageQuery {
  public ImageQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}

class MatchesExtension extends AQuery {
  String extension;
  public MatchesExtension(String extension) { this.extension = extension; }
  public boolean matches(ImageData id) {
    return this.extension.equals(id.filetype);
  }
}
class LargerThan extends AQuery {
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
class ContainsKeyword extends AQuery {
  String keyword;
  public ContainsKeyword(String keyword) {
    this.keyword = keyword;
  }
  public boolean matches(ImageData id) {
    return id.keywords.indexOf(this.keyword) != -1;
  }
}

abstract class AComboQuery extends AQuery {
  ImageQuery q1, q2;
  AComboQuery(ImageQuery q1, ImageQuery q2) {
    this.q1 = q1;
    this.q2 = q2;
  }
}
class AndQuery extends AComboQuery {
  AndQuery(ImageQuery q1, ImageQuery q2) {
    super(q1, q2);
  }
  public boolean matches(ImageData id) {
    return this.q1.matches(id) && this.q2.matches(id);
  }
}
class OrQuery extends AComboQuery {
  OrQuery(ImageQuery q1, ImageQuery q2) {
    super(q1, q2);
  }
  public boolean matches(ImageData id) {
    return this.q1.matches(id) || this.q2.matches(id);
  }
}
// }
