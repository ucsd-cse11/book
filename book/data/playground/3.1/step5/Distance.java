class Distance {
  int gravity = 10;

  int distanceAfter(int seconds) {
    return (this.gravity / 2) * (seconds * seconds);
  }

  int distAfter2sec = this.distanceAfter(2);
  int distAfter4sec = this.distanceAfter(4);
  int distAfter6sec = this.distanceAfter(6);
}
