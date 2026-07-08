abstract class AQuery implements ImageQuery {
  public ImageQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}

class ContainsKeyword implements ImageQuery {
  String keyword;
  public ContainsKeyword(String keyword) {
    this.keyword = keyword;
  }

  public boolean matches(ImageData id) {
    return id.keywords.indexOf(this.keyword) != -1;
  }

  // no implementation of `and` method
}

class ExamplesSearch {
  ImageQuery ck1 = new ContainsKeyword("data");
  ImageQuery ck2 = new ContainsKeyword("science");

  ImageQuery query1 = this.ck1.and(this.ck2);
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
  ImageQuery and(ImageQuery other);
}

class AndQuery implements ImageQuery {
  ImageQuery iq1, iq2;
  AndQuery(ImageQuery iq1, ImageQuery iq2) {
    this.iq1 = iq1;
    this.iq2 = iq2;
  }
  public boolean matches(ImageData id) {
    return this.iq1.matches(id) && this.iq2.matches(id);
  }
  public ImageQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}
// }
