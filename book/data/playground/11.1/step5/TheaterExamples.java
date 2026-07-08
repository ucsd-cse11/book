import tester.*;
class TheaterExamples {
  boolean[] row1 = {true, true, false, false};
  boolean[] row2 = {true, false, false, false, true};
  boolean[] row3 = {true, false, true, true, true, true};
  boolean[][] seats = {row1, row2, row3};

  static int availableSeats(boolean[][] seats) {
    int total = 0;
    for(boolean[] row: seats) {
      for(boolean seat: row) {
        if(seat) {
          total += 1;
        }
      }
    }
    return total;
  }

  static boolean rowHasEnoughAdjacentSeats(boolean[] row, int howMany) {
    int consecutiveTrueCount = 0;
    for(boolean seat: row) {
      if(seat) {
	consecutiveTrueCount += 1;
	if(consecutiveTrueCount >= howMany) { return __________FILL1_________; }
      }
      else {
	consecutiveTrueCount = ___________FILL2_________;
      }
    }
    return _________FILL3_____________;
  }

  static int firstRowWithEnoughAdjacentSeats(boolean[][] seats, int howMany) {
    for(int i = 0; i < seats.length; i += 1) {
      if(rowHasEnoughAdjacentSeats(seats[i], howMany)) { 
	return i;
      }
    }
    return -1;
  }


  void testTotalSeats(Tester t) {
    t.checkExpect(availableSeats(seats), 9);
  }
  void testEnoughAdjacent(Tester t) {
    t.checkExpect(firstRowWithEnoughAdjacentSeats(seats, 4), 2);
    t.checkExpect(firstRowWithEnoughAdjacentSeats(seats, 5), -1);
    t.checkExpect(firstRowWithEnoughAdjacentSeats(seats, 1), 0);
  }
	
}
