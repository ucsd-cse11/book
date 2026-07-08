import tester.*;
class AddAtEnd {
  /*
  @param String[] base The base array to add to
  @param String toAdd The string to add at the end
  @return A new array containing the elements of base followed by toAdd
  */
  String[] addAtEnd(String[] base, String toAdd) {
    String[] result = new String[base.length + 1];
    for(int i = 0; i < base.length; i += 1) {
      result[i] = base[i];
    }
    result[base.length] = toAdd;
    return result;
  }
  
  boolean testAddAtEnd(Tester t) {
    String[] base1 = {"kiwi", "apple", "banana"};
    String[] check1 = {"kiwi", "apple", "banana", "orange"};
    t.checkExpect(this.addAtEnd(base1, "orange"), check1);
    t.checkExpect(base1.length, ____FILL 1_____);
  
    String[] base2 = {};
    String[] check2 = {"bear"};
    String[] check3 = {"bear", "lion"};
    t.checkExpect(this.addAtEnd(base2, "bear"), check2);
    t.checkExpect(this.addAtEnd(check2, "lion"), check3);

    t.checkExpect(base2.length, ___FILL 2______);
    t.checkExpect(check2.length, ___FILL 3______);
  
    return true;
  }
}