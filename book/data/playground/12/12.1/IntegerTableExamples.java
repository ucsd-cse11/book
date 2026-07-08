import tester.*;
class LookupTable<Contents> {
  String[] ids;
  Contents[] contents;
  LookupTable(String[] ids, Contents[] contents) {
      this.ids = ids;
      this.contents = contents;
  }
  Contents find(String id) {
    for(int i = 0; i < this.ids.length; i += 1) {
      if(this.ids[i].equals(id)) {
        return this.contents[i];
      }
    }
    return null;
  }
}
class IntegerTableExamples {
  void testIntegerTable(Tester t) {
    int[] likes = {100, 2000, 30};
    String[] tweetIds = {"1234", "5678", "9876"};
    LookupTable<int> likesByTweet = new LookupTable<int>(tweetIds, likes);
    t.checkExpect(likesByTweet.find("1234"), 100);
    t.checkExpect(likesByTweet.find("9876"), 30);
    t.checkExpect(likesByTweet.find("not-an-id"), null);
  }
}