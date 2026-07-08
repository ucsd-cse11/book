class WeeklyPay {
  // Calculate weekly pay at the given rate and number of hours worked.
  // If hours is above 40, pay at double the rate for hours beyond 40.  Pay at
  // rate for the first 40 hours.  If the number of hours is not more than 40,
  // don't add any overtime.
  int weekly(int hours, int rate) {
    if(hours > 40) {
      return (40 * rate) + ((hours - 40) * (rate * 2));
    }
    else {
      return hours * rate;
    }
  }

  int exactly40 = this.weekly(40, 10); // Should be 400
  int someOvertime = this.weekly(45, 10); // Should be 400 + 100, total 500
  int lessThan40 = this.weekly(30, 25); // Should be 750

  int matchTest1 = this.weekly(20, 35);
  int matchTest2 = this.weekly(0, 50);
  int matchTest3 = this.weekly(43, 24);
}
