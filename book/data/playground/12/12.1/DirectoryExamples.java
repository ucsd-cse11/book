import tester.*;
class StudentInfo {
  String preferredName, email, majorCode;
  StudentInfo(String preferredName, String email, String majorCode) {
    this.preferredName = preferredName;
    this.email = email;
    this.majorCode = majorCode;
  }
}
class StudentDirectory {
  String[] pids;
  ____________[] studentInformation;
  StudentDirectory(String[] pids, ____________[] studentInformation) {
    this.pids = pids;
    this.studentInformation = studentInformation;
  }
  ____________ find(String pid) {
    for(int i = 0; i < this.pids.length; i += 1) {
      if(this.pids[i].equals(pid)) {
        return this.studentInformation[i];
      }
    }
    return null;
  }
}
class DirectoryExamples {
  void testLookupStudents(Tester t) {
    StudentInfo si1 = new StudentInfo("Mike Judge", "judgefanmail@alumni.ucsd.edu", "PHYS");
    StudentInfo si2 = new StudentInfo("Benicio del Toro", "beniciofanmail@honoraryalumni.ucsd.edu", "Undeclared");
    StudentInfo si3 = new StudentInfo("Jimmy O. Yang", "jimmyyangfanmail@alumni.ucsd.edu", "ECON");
    StudentInfo[] infos = { si1, si2, si3 };
    String[] pids = {"A123", "A345", "A678"};
    StudentDirectory studentTable = new StudentDirectory(pids, infos);
    t.checkExpect(studentTable.find("A345"), si2);
    t.checkExpect(studentTable.find("A678"), si3);
    t.checkExpect(studentTable.find("Anonexistent"), null);
  }
}