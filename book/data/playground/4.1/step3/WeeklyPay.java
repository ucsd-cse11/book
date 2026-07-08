class WeeklyPay {
  // Calculate weekly pay at the given rate and number of hours worked.
  // If hours is above 40, pay at double the rate for hours beyond 40.  Pay at
  // rate for the first 40 hours.  If the number of hours is less than 40, don't
  // add any overtime.
  int weekly(int hours, int rate) {
    return 0;
  }

  int exactly40 = this.weekly(40, 10); // Should be 400
  int someOvertime = this.weekly(45, 10); // Should be 400 + 100, total 500
  int lessThan40 = this.weekly(30, 20); // Should be 600
}
