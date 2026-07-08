import tester.*;
class StudentInfo {
    String preferredName, email, majorCode;
    StudentInfo(String preferredName, String email, String majorCode) {
        this.preferredName = preferredName;
        this.email = email;
        this.majorCode = majorCode;
    }
}
class LookupTable<Contents> {
    String[] ids;
    Contents[] contents;
    LookupTable(String[] ids, Contents[] contents) {
        this.ids = ids;
        this.contents = contents;
    }
    Contents find(String id) {
      for(int i = 0; i < this.ids.length; i += 1) {
        if(this.ids[i].equals(id)) {
          return this.contents[i];
        }
      }
      return null;
    }
  }
  class LookupTableExamples {
    void testLookupStudents(Tester t) {
      StudentInfo si1 = new StudentInfo("Mike Judge", "judgefanmail@alumni.ucsd.edu", "PHYS");
      StudentInfo si2 = new StudentInfo("Benicio del Toro", "beniciofanmail@honoraryalumni.ucsd.edu", "Undeclared");
      StudentInfo si3 = new StudentInfo("Jimmy O. Yang", "jimmyyangfanmail@alumni.ucsd.edu", "ECON");
      StudentInfo[] infos = { si1, si2, si3 };
      String[] pids = {"A123", "A345", "A678"};
      LookupTable<StudentInfo> studentTable = new LookupTable<_______FILL1______>(pids, infos);
      t.checkExpect(studentTable.find("A345"), si2);
      t.checkExpect(studentTable.find("A678"), si3);
      t.checkExpect(studentTable.find("Anonexistent"), null);
    }
    void testLookupClasses(Tester t) {
      String[] classes = { "CSE11", "CSE11", "CSE12", "CSE12" };
      String[] sectionIds = {"110123", "110124", "110223", "110224"};
      LookupTable<_____FILL2_____> classTable = new LookupTable<String>(sectionIds, classes);
      t.checkExpect(classTable.find("110123"), "CSE11");
      t.checkExpect(classTable.find("110223"), "CSE12");
      t.checkExpect(classTable.find("11nothing"), null);
    }
  }