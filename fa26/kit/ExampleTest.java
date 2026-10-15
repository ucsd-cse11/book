import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class ExampleTest {
    @Test
    void besideAddsTheWidths() {
        Pict p = new Circle(25, "red").beside(new Rect(20, 30, "blue"));
        assertEquals(70, p.width());
    }

    @Test
    void besideIsAsTallAsTheTallerPicture() {
        Pict p = new Circle(25, "red").beside(new Rect(20, 30, "blue"));
        assertEquals(50, p.height());
    }
}
