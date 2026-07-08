class WelcomeMessage {
  String welcomeMessage(int hour) {
    System.out.println("Value of `hour`: " + hour);
    String message = "Good Morning";
    System.out.println("Before if/else if");
    if(hour >= 0) {
      message = "Good Morning";
      System.out.println("Inside if");
    }
    else if(hour >= 12) {
      message = "Good Afternoon";
    }
    else {
      message = "Good Evening";
    }
    System.out.println("After if/else if");
    System.out.println();
    return message;
  }

  String message1 = welcomeMessage(4);
  String message2 = welcomeMessage(15);
  String message3 = welcomeMessage(20);
  String message4 = welcomeMessage(-10);
}
