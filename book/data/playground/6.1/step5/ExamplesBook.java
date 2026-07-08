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
// }
  
    boolean sameAuthor(Book other) {
      return this.author.equals(other.author);
    }
  }
  
  class ExamplesBook {
    Book schemer = new Book("The Little Schemer", "Daniel P. Friedman", 40);
    Book stick = new Book("Make It Stick: The Science of Successful Learning", "Peter C. Brown", 13);
    Book pLaw = new Book("Parkinson's Law", "C. Northcote Parkinson", 30);
    Book reason = new Book("The Reasoned Schemer", "Daniel P. Friedman", 38);
  
    boolean same1 = this.reason.sameAuthor(this.schemer);
    boolean same2 = this.reason.sameAuthor(this.stick);
    boolean same3 = this.schemer.sameAuthor(this.reason);
  }
