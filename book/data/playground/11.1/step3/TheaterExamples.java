import tester.*;
class TheaterExamples {
  boolean[] row1 = {true, true, false, false};
  boolean[] row2 = {true, false, false, false, true};
  boolean[] row3 = {true, false, true, true, true, true};
  boolean[][] seats = {row1, row2, row3};

  static int totalSeats(boolean[][] seats) {
    int total = 0;
    for(boolean[] row: seats) {
      total += _______________________;
    }
    return total;
  }

  void testSeats(Tester t) {
    t.checkExpect(totalSeats(seats), 15);
  }
}