// { autofold
import tester.*;

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
// }

interface ImageQuery {
  boolean matches(ImageData id);
}

// { autofold
class MatchesExtension implements ImageQuery {
  String extension;
  public MatchesExtension(String extension) { this.extension = extension; }
  public boolean matches(ImageData id) {
    return id.filetype.equals(this.extension);
  }
}
// }

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

public class ExamplesSearch {
  ImageData i1 = new ImageData("ucsd cse computer science", "png", 600, 400);
  ImageQuery lg1 = new LargerThan(600, 400);
  ImageQuery me1 = new MatchesExtension("jpg");

}
