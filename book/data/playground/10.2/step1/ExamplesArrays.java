class ExamplesArrays {
    /*
        @param numbers Elements to add together
        @return The sum of the numbers
    */
    double sum(double[] numbers) {
        double total = 0;
        for(double num: numbers) {
        total = total + num;
        }
        return total;
    }

    double[] someMoreNumbers = {100.5, 0.3, 9.5, 4.4};
    double[] noNumbersHere = {};
    double sum1 = this.sum(this.someMoreNumbers);
    double sum2 = this.sum(this.noNumbersHere);
}