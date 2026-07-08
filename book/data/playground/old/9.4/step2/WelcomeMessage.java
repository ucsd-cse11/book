class WelcomeMessage {
  void welcomeMessage(int hour) {
    if(hour < 0 || hour >= 24) {
      System.out.println("Invalid Hour");
    }
    else if(hour < 12) {
      System.out.println("Good Morning");
    }
    else if(hour < 18) {
      System.out.println("Good Afternoon");
    }
    else {
      System.out.println("Good Evening");
    }
  }

  {
    welcomeMessage(4);
    welcomeMessage(15);
    welcomeMessage(20);
    welcomeMessage(-10);
    System.out.println();
  }
}
