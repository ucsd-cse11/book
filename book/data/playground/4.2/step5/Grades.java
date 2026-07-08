class Grades {
  String gradeForNumber(int score) {
    if(score >= 90) {
      return "A";
    }
    else if(score >= 80) {
      return "B";
    }
    else if(score >= 70) {
      return "C";
    }
    else if(score >= 60) {
      return "D";
    }
    else {
      return "F";
    }
  }
  
  String example1 = gradeForNumber(84);
  String example2 = gradeForNumber(70);
  String example3 = gradeForNumber(48);
}
