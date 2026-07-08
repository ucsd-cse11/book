class Receipt {
    String purchaseMessage(String customerName, int cost, double tipPercent) {
        return "Bill for " + customerName + ": Cost $" + cost + ", Total $" + (_______________) + ", tip $" + (cost * tipPercent);
    }

    // "Bill for Greg: Cost $5, Total $6, Tip $1"
    String tipExample1 = this.purchaseMessage("Greg", 5, 0.2);
    // "Bill for Joe: Cost $4, Total $4.40, Tip $0.40"
    String tipExample2 = this.purchaseMessage("Joe", 4, 0.1);

    // NOTE: expectations don't include the number of decimal places Java
    // decides to report for double!  We would need to round/specify 2 decimal
    // places to have nicer-looking output. That's possible, but not shown here.
}
