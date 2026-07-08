class Receipt {
    String purchaseMessage(String customerName, int cost, double tipPercent) {
        double tip = cost * tipPercent;
        return "Bill for " + customerName + ": Cost $" + cost + ", Total $" + (cost + tip) + ", Tip $" + tip;
    }
    
    String example1 = this.purchaseMessage("Joe", 10, 0.1);
    double example1Tip = tip;
}
