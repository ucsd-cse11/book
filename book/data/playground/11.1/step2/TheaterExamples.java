class TheaterExamples {
  boolean[] row1 = {true, true, false, false};
  boolean[] row2 = {true, false, false, false, true};
  boolean[] row3 = {true, false, true, true, true, true};

  boolean[][] seats = {row1, row2, row3};

  boolean row1FirstSeat = this.seats[0][0];
  int row3Seats = this.seats[2].length;
  boolean[] row3Accessed = this.seats[2];
  int row3SeatsAgain = this.row3.length;
}
