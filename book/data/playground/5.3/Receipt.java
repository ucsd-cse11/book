class Receipt {
    String purchaseMessage(int quantity, int itemCost, String itemName, String itemNamePlural) {
        if(quantity > 1) {
            return "You bought " + quantity + " " + itemNamePlural + " for $" + (quantity * itemCost);
        }
        else {
            return "You bought " + quantity + " " + itemName + " for $" + (quantity * itemCost);
        }
    }

    // "You bought 4 tomatoes for $4"
    String example1 = this.purchaseMessage(4, 1, "tomato", "tomatoes");
    // "You bought 1 sandwich for $5"
    String example2 = this.purchaseMessage(1, 5, "sandwich", "sandwiches");
    // "You bought 2 sandwiches for $10"
    String example3 = this.purchaseMessage(2, 5, "sandwich", "sandwiches");


    String purchaseMessage(int itemCost, String itemName, double tipPercent) {
        return itemName + ": Total $" + (itemCost + itemCost * tipPercent) + ", tip $" + (itemCost * tipPercent);
    }

    // NOTE: expectations don't include the decimal places for double! We would
    // need to round to have nicer-looking output, not shown here.
    // "Pancakes: Total $6, tip $1" 
    String tipExample1 = this.purchaseMessage(5, "Pancakes", 0.2);
    // "Hamburger: Total $4.40, tip $0.4" 
    String tipExample2 = this.purchaseMessage(5, "Pancakes", 0.2);



}