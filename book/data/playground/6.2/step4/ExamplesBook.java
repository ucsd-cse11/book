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
      return this.price - (this.price * percentage) / 100;
    }
  }
  
  class ExamplesBook {
    Book schemer = new Book("The Little Schemer", "Daniel P. Friedman", 40);
    Book stick = new Book("Make It Stick: The Science of Successful Learning", "Peter C. Brown", 13);
    Book pLaw = new Book("Parkinson's Law", "C. Northcote Parkinson", 30);
    Book reason = new Book("The Reasoned Schemer", "Daniel P. Friedman", 38);
  
    // Originally, we wrote this:
    int sale1 = this.schemer.salePrice(25); // Should be 30

    // We can write this instead:
    boolean testSalePrice(Tester t) {
      return t.checkExpect(this.schemer.salePrice(25), 30);
    }

  }
