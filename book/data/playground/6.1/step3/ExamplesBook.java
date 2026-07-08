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
    int salePrice(int percentage) {
      return this.price - (this.price * percentage) / 100;
    }
  }
  
  class ExamplesBook {
    Book schemer = new Book("The Little Schemer", "Daniel P. Friedman", 40);
    Book stick = new Book("Make It Stick: The Science of Successful Learning", "Peter C. Brown", 13);
    Book pLaw = new Book("Parkinson's Law", "C. Northcote Parkinson", 30);
  
    int sale1 = this.schemer.salePrice(25); // should be 30
    int sale2 = this.stick.salePrice(50); // should be 7
    int sale3 = this.pLaw.salePrice(10); // should be 27
  }
