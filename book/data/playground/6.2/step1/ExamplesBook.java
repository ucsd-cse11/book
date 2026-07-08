class Book {
  String title;
  String author;
  int price;

  Book(String title, String author, int price) {
    this.title = title;
    this.author = author;
    this.price = price;
  }

  /*
    @param percentage A percent (between 0 and 100) of the discount to subtract
    @return The price with the discount subtracted
  */
  __BLANK1__ salePrice(int percentage) {
    return this.price - (this.price * percentage) / 100;
  }

  /*
    @param other The Book to compare against
    @return true if this book and other have the same author, false otherwise
  */
  boolean sameAuthor(Book other) {
    return this.author.equals(__BLANK2__);
  }

  /*
    @param length The number of characters to appear before "..."
    @return A new string containing length characters followed by "..." if the
    string was too long, or the original string otherwise
  */
  String truncateTitle(int length) {
    if(this.title.length() > length) {
      return this.title.substring(0, __BLANK3__) + "...";
    }
    else {
      return __BLANK4__;
    }
  }
}


class ExamplesBook {
  Book schemer = new Book("The Little Schemer", "Daniel P. Friedman", 40);
  Book stick = new Book("Make It Stick: The Science of Successful Learning", "Peter C. Brown", 13);
  Book pLaw = new Book("Parkinson's Law", "C. Northcote Parkinson", 30);
  Book reason = new Book("The Reasoned Schemer", "Daniel P. Friedman", 38);

  int sale1 = this.schemer.salePrice(25); // should be 30
  int sale2 = this.stick.salePrice(50); // should be 7
  int sale3 = this.pLaw.salePrice(10); // should be 27

  String truncate1 = this.stick.truncateTitle(15); // Should be "Make It Stick: ..."
  String truncate2 = this.schemer.truncateTitle(20); // Should be "The Little Schemer"
  String truncate3 = this.schemer.truncateTitle(0); // Should be "..."

  boolean same1 = this.reason.sameAuthor(this.schemer); // should be true
  boolean same2 = this.reason.sameAuthor(this.stick); // should be false
  boolean same3 = this.schemer.sameAuthor(this.reason); // should be true
}
