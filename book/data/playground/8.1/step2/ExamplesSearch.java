import tester.*;

class ImageData {
  String keywords; // All the keywords, separated by spaces
  String filetype; // gif, png, jpg, and so on
  int width;       // the width in pixels
  int height;      // the height in pixels
//{ autofold
  ImageData(String keywords, String filetype, int width, int height) {
    this.keywords = keywords;
    this.filetype = filetype;
    this.width = width;
    this.height = height;
  }
// }
  /*
    @param minWidth The width in pixels the image is checked against
    @param minHeight The height in pixels the image is checked against
    @return true If this image has a width and height greater than or equal
                 to minWidth and minHeight
  */
  __BLANK1__ largerThan(int __BLANK2__, int minHeight) {
    __BLANK3__ this.__BLANK4__ >= minWidth __BLANK5__ this.height >= __BLANK6__;
  }
}
class ExamplesSearch {
  ImageData i1 = new ImageData("ucsd cse computer science", "png", 600, 400);
  boolean testLargerThan(Tester t) {
    return t.checkExpect(i1.largerThan(600, 400), true) &&
           t.checkExpect(i1.largerThan(601, 400), false) &&
           t.checkExpect(i1.largerThan(600, 401), false);
  }
}
