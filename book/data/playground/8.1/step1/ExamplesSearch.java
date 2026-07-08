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

  /*
    @param ext A string representing the extension (the part after the . in the filename)
    @return true If this image's filetype matches ext
  */
  boolean matchesExtension(String ext) {
    return this.filetype.equals(ext);
  }
}

class ExamplesSearch {
  ImageData i1 = new ImageData("ucsd cse computer science", "png", 600, 400);
  boolean testMatchesExtension(Tester t) {
    return t.checkExpect(i1.matchesExtension("png"), true) &&
           t.checkExpect(____BLANK1____, ____BLANK2____);
  }
}
