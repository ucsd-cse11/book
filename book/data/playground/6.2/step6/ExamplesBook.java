import tester.*;

class Book {
    String title;
    String author;
    int price;
// { autofold
    Book(String title, String author, int price) {
      this.title = title;
      this.author = author;
      this.price = price;
    }
  
    boolean sameAuthor(Book other) {
      return this.author.equals(other.author);
    }
// }

    int salePrice(int percentage) {
      return this.price - this.price * (percentage / 100);
    }

    String truncateTitle(int length) {
        if(this.title.length() <= length) { return this.title; }
        else { return this.title.substring(0, length) + "..."; }
    }
  }
  
  class ExamplesBook {
    Book schemer = new Book("The Little Schemer", "Daniel P. Friedman", 40);
    Book stick = new Book("Make It Stick: The Science of Successful Learning", "Peter C. Brown", 13);
    Book pLaw = new Book("Parkinson's Law", "C. Northcote Parkinson", 30);
    Book reason = new Book("The Reasoned Schemer", "Daniel P. Friedman", 38);
  
    boolean testSalePrice(Tester t) {
        return t.checkExpect(this.schemer.salePrice(25), 30) &&
               t.checkExpect(this.stick.salePrice(50), 7) &&
               t.checkExpect(this.pLaw.salePrice(10), 27);
      }
      
      boolean testTruncateTitle(Tester t) {
        return t.checkExpect(this.stick.truncateTitle(15), "Make It Stick: ...") &&
               t.checkExpect(this.schemer.truncateTitle(20), "The Little Schemer") &&
               t.checkExpect(this.schemer.truncateTitle(0), "...");
      }
      
      boolean testSameAuthor(Tester t) {
        return t.checkExpect(this.reason.sameAuthor(this.schemer), true) &&
               t.checkExpect(this.reason.sameAuthor(this.stick), false) &&
               t.checkExpect(this.schemer.sameAuthor(this.reason), true);
      }

  }
