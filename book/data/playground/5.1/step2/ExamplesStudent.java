class Student {
  String studentID;
  boolean inState;
  int birthYear;

  Student(String studentID, boolean inState, int birthYear) {
    this.studentID = studentID;
    this.inState = inState;
    this.birthYear = birthYear;
  }
}

class ExamplesStudent {
  Student s1 = new Student("A12345678", true, 1996);
  Student s2 = new Student("A98765432", false, 1993);
  Student s3 = new Student("A18273645", true, 1999);
}
