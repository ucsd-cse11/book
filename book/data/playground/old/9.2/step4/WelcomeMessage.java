class WelcomeMessage {
  String welcomeMessage(int hour) {
    String message;
    if(hour < 0 || hour >= 24) {
      message = "Invalid Hour";
    }
    else if(hour < 12) {
      message = "Good Morning";
    }
    else if(hour < 18) {
      message = "Good Afternoon";
    }
    else {
      message = "Good Evening";
    }
    return message;
  }

  String message1 = welcomeMessage(4);
  String message2 = welcomeMessage(15);
  String message3 = welcomeMessage(20);
  String message4 = welcomeMessage(-10);
}
