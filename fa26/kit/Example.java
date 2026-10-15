void main() {
    Pict dot = new Circle(25, "red");
    Pict box = new Rect(20, 30, "blue");
    ImageIO_.save(dot.beside(box), "example.png");
}
