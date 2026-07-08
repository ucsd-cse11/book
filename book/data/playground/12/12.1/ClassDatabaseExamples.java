import tester.*;
class ClassDatabase {
  String[] sectionIds;
  ________[] classTitles;
  ClassDatabase(String[] sectionIds, _________[] classTitles) {
    this.sectionIds = sectionIds;
    this.classTitles = classTitles;
  }
  _________ find(String sectionId) {
    for(int i = 0; i < this.sectionIds.length; i += 1) {
      if(this.sectionIds[i].equals(sectionId)) {
        return this.classTitles[i];
      }
    }
    return null;
  }
}
class ClassDatabaseExamples {
  void testLookupClasses(Tester t) {
    String[] sectionIds = {"110123", "110124", "110223", "110224"};
    String[] classes = { "CSE11", "CSE11", "CSE12", "CSE12" };
    ClassDatabase classTable = new ClassDatabase(sectionIds, classes);
    t.checkExpect(classTable.find("110123"), "CSE11");
    t.checkExpect(classTable.find("110223"), "CSE12");
    t.checkExpect(classTable.find("11nothing"), null);
  }
}