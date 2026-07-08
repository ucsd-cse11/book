import tester.*;
public class Intersperse {
    String intersperse(String[] strs, String separator) {
        String result = "";
        for(int i = 0; i < strs.length - 1; i += 1) {
          result += strs[i] + separator;
        }
        result += strs[strs.length - 1];
        return result;
    }
    
    void testIntersperse(Tester t) {
      String[] strs1 = {"a", "b", "c"};
      t.checkExpect(this.intersperse(strs1, " and "), "a and b and c");
      t.checkExpect(this.intersperse(strs1, ";"), "a;b;c");
    
      String[] one = {"onestring"};
      t.checkExpect(this.intersperse(one, ","), "onestring");
      t.checkExpect(this.intersperse(one, "; "), "onestring");
    
      String[] two = {"two", "strings"};
      t.checkExpect(this.intersperse(two, "|"), "two|strings");
      t.checkExpect(this.intersperse(two, "; "), "two; strings");

      String[] empty = {};
      t.checkExpect(this.intersperse(empty, ","), "");
      t.checkExpect(this.intersperse(empty, "; "), "");
    
    }
}
