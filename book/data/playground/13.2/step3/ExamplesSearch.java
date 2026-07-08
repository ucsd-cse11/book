abstract class AQuery implements ImageQuery {
  public ImageQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}
class MatchesExtension implements ImageQuery {
// { autofold
  String extension;
  public MatchesExtension(String extension) { this.extension = extension; }
  public boolean matches(ImageData id) {
    return id.filetype.equals(this.extension);
  }
// }
}
class LargerThan implements ImageQuery {
// { autofold
  int minWidth;
  int minHeight;
  public LargerThan(int minWidth, int minHeight) {
    this.minWidth = minWidth;
    this.minHeight = minHeight;
  }
  public boolean matches(ImageData id) {
    return id.width >= this.minWidth && id.height >= this.minHeight;
  }
// }
}
class ContainsKeyword implements ImageQuery {
// { autofold
  String keyword;
  public ContainsKeyword(String keyword) {
    this.keyword = keyword;
  }
  public boolean matches(ImageData id) {
    return id.keywords.indexOf(this.keyword) != -1;
  }
// }
}

class AndQuery implements ImageQuery {
// { autofold
  ImageQuery iq1, iq2;
  AndQuery(ImageQuery iq1, ImageQuery iq2) {
    this.iq1 = iq1;
    this.iq2 = iq2;
  }
  public boolean matches(ImageData id) {
    return this.iq1.matches(id) && this.iq2.matches(id);
  }
// }
}

class ExamplesSearch {
  ImageQuery lg1 = new LargerThan(600, 400);
  ImageQuery me1 = new MatchesExtension("png");
  ImageQuery ck1 = new ContainsKeyword("ucsd");
  ImageQuery ck2 = new ContainsKeyword("data");
  ImageQuery ck3 = new ContainsKeyword("science");
  ImageQuery all5 = this.lg1.and(this.me1).and(this.ck1).and(this.ck2).and(this.ck3);
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
// }
