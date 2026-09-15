// Browser build of the Pict library. Differs from the desktop version only
// in ImageIO_: show() displays the image below the code widget (instead of
// opening a window), and relative filenames live in the page's sandbox.
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import javax.imageio.ImageIO;

// ==========================================================================
// Pict — composable image descriptions
// ==========================================================================

interface Pict {
    int width();
    int height();

    /** Render this Pict into a Raster of pixels. */
    default Raster render() {
        var img = new BufferedImage(width(), height(), BufferedImage.TYPE_INT_ARGB);
        var g = img.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        draw(g, 0, 0);
        g.dispose();
        return Raster.fromBufferedImage(img);
    }

    default Pict beside(Pict other) { return new Beside(this, other); }
    default Pict above(Pict other) { return new Above(this, other); }
    default Pict below(Pict other) { return new Below(this, other); }
    default Pict overlay(Pict other) { return new Overlay(this, other); }
    default Pict overlayAt(int x, int y, Pict other) { return new OverlayAt(this, x, y, other); }
    default Pict overlayAt(double x, double y, Pict other) { return new OverlayAt(this, x, y, other); }
    default Pict addLine(int x1, int y1, int x2, int y2, String color) {
        return new AddLine(this, x1, y1, x2, y2, color);
    }
    default Pict addLine(double x1, double y1, double x2, double y2, String color) {
        return new AddLine(this, x1, y1, x2, y2, color);
    }
    default Pict addLine(int x1, int y1, int x2, int y2, int thickness, String color) {
        return new AddLine(this, x1, y1, x2, y2, thickness, color);
    }
    default Pict addLine(double x1, double y1, double x2, double y2, double thickness, String color) {
        return new AddLine(this, x1, y1, x2, y2, thickness, color);
    }
    default Pict rotate(int degrees) { return new Rotate(this, degrees); }
    default Pict rotate(double degrees) { return new Rotate(this, degrees); }

    // Internal: paints onto a shared Graphics2D for performance.
    void draw(Graphics2D g, int x, int y);
}

// --- Measurements ---

final class Px {
    private Px() {}
    static int of(double v) {
        if (Double.isNaN(v) || Double.isInfinite(v)) {
            throw new IllegalArgumentException("measurement must be a number, got " + v);
        }
        return (int) Math.round(v);
    }
}

// --- Colors by name ---

final class Colors {
    private Colors() {}
    private static final java.util.Map<String, Color> NAMED = java.util.Map.ofEntries(
        java.util.Map.entry("red", Color.RED),
        java.util.Map.entry("green", Color.GREEN),
        java.util.Map.entry("blue", Color.BLUE),
        java.util.Map.entry("yellow", Color.YELLOW),
        java.util.Map.entry("orange", Color.ORANGE),
        java.util.Map.entry("pink", Color.PINK),
        java.util.Map.entry("magenta", Color.MAGENTA),
        java.util.Map.entry("cyan", Color.CYAN),
        java.util.Map.entry("purple", new Color(128, 0, 128)),
        java.util.Map.entry("brown", new Color(139, 69, 19)),
        java.util.Map.entry("black", Color.BLACK),
        java.util.Map.entry("white", Color.WHITE),
        java.util.Map.entry("gray", Color.GRAY),
        java.util.Map.entry("grey", Color.GRAY),
        java.util.Map.entry("lightgray", Color.LIGHT_GRAY),
        java.util.Map.entry("darkgray", Color.DARK_GRAY),
        java.util.Map.entry("transparent", new Color(0, 0, 0, 0)));

    /** The name a color was made from, or "#rrggbb" when it has none. */
    static String nameOf(Color c) {
        for (String n : new java.util.TreeSet<>(NAMED.keySet())) {
            if (NAMED.get(n).equals(c)) return n;
        }
        return String.format("#%06x", c.getRGB() & 0xffffff);
    }

    /** A color by name ("red", "sky blue" is not one) or as "#rrggbb". */
    static Color named(String name) {
        if (name == null) throw new IllegalArgumentException("color name is null");
        String key = name.trim().toLowerCase();
        if (key.matches("#[0-9a-f]{6}")) return new Color(Integer.parseInt(key.substring(1), 16));
        Color c = NAMED.get(key);
        if (c == null) {
            throw new IllegalArgumentException("unknown color \"" + name + "\"; try one of: "
                + String.join(", ", new java.util.TreeSet<>(NAMED.keySet())) + ", or \"#rrggbb\"");
        }
        return c;
    }
}

// --- Primitive shapes ---

record Circle(int radius, Color color) implements Pict {
    Circle(int radius, String color) { this(radius, Colors.named(color)); }
    Circle(double radius, String color) { this(Px.of(radius), Colors.named(color)); }
    public String toString() { return "Circle[radius=" + radius + ", color=" + Colors.nameOf(color) + "]"; }
    public int width() { return 2 * this.radius; }
    public int height() { return 2 * this.radius; }
    public void draw(Graphics2D g, int x, int y) {
        g.setColor(this.color);
        g.fillOval(x, y, 2 * this.radius, 2 * this.radius);
    }
}

record CircleOutline(int radius, Color color) implements Pict {
    CircleOutline(int radius, String color) { this(radius, Colors.named(color)); }
    CircleOutline(double radius, String color) { this(Px.of(radius), Colors.named(color)); }
    public String toString() { return "CircleOutline[radius=" + radius + ", color=" + Colors.nameOf(color) + "]"; }
    public int width() { return 2 * this.radius; }
    public int height() { return 2 * this.radius; }
    public void draw(Graphics2D g, int x, int y) {
        g.setColor(this.color);
        g.drawOval(x, y, 2 * this.radius - 1, 2 * this.radius - 1);
    }
}

record Rect(int width, int height, Color color) implements Pict {
    Rect(int width, int height, String color) { this(width, height, Colors.named(color)); }
    Rect(double width, double height, String color) { this(Px.of(width), Px.of(height), Colors.named(color)); }
    public String toString() { return "Rect[width=" + width + ", height=" + height + ", color=" + Colors.nameOf(color) + "]"; }
    public void draw(Graphics2D g, int x, int y) {
        g.setColor(this.color);
        g.fillRect(x, y, this.width, this.height);
    }
}

record RectOutline(int width, int height, Color color) implements Pict {
    RectOutline(int width, int height, String color) { this(width, height, Colors.named(color)); }
    RectOutline(double width, double height, String color) { this(Px.of(width), Px.of(height), Colors.named(color)); }
    public String toString() { return "RectOutline[width=" + width + ", height=" + height + ", color=" + Colors.nameOf(color) + "]"; }
    public void draw(Graphics2D g, int x, int y) {
        g.setColor(this.color);
        g.drawRect(x, y, this.width - 1, this.height - 1);
    }
}

/** An isosceles triangle: base along the bottom, apex at the top center. */
record Triangle(int width, int height, Color color) implements Pict {
    Triangle(int width, int height, String color) { this(width, height, Colors.named(color)); }
    Triangle(double width, double height, String color) { this(Px.of(width), Px.of(height), Colors.named(color)); }
    public String toString() { return "Triangle[width=" + width + ", height=" + height + ", color=" + Colors.nameOf(color) + "]"; }
    public void draw(Graphics2D g, int x, int y) {
        g.setColor(this.color);
        g.fillPolygon(new int[] { x, x + this.width, x + this.width / 2 },
                      new int[] { y + this.height, y + this.height, y }, 3);
    }
}

record TriangleOutline(int width, int height, Color color) implements Pict {
    TriangleOutline(int width, int height, String color) { this(width, height, Colors.named(color)); }
    TriangleOutline(double width, double height, String color) { this(Px.of(width), Px.of(height), Colors.named(color)); }
    public String toString() { return "TriangleOutline[width=" + width + ", height=" + height + ", color=" + Colors.nameOf(color) + "]"; }
    public void draw(Graphics2D g, int x, int y) {
        g.setColor(this.color);
        g.drawPolygon(new int[] { x, x + this.width - 1, x + (this.width - 1) / 2 },
                      new int[] { y + this.height - 1, y + this.height - 1, y }, 3);
    }
}

record Text(String content, int size, Color color) implements Pict {
    Text(String content, int size, String color) { this(content, size, Colors.named(color)); }
    Text(String content, double size, String color) { this(content, Px.of(size), Colors.named(color)); }
    public String toString() { return "Text[content=" + content + ", size=" + size + ", color=" + Colors.nameOf(color) + "]"; }
    private static FontMetrics metricsFor(int size) {
        var img = new BufferedImage(1, 1, BufferedImage.TYPE_INT_ARGB);
        var g = img.createGraphics();
        var fm = g.getFontMetrics(new Font("SansSerif", Font.PLAIN, size));
        g.dispose();
        return fm;
    }
    public int width() { return metricsFor(this.size).stringWidth(this.content); }
    public int height() {
        var fm = metricsFor(this.size);
        return fm.getAscent() + fm.getDescent();
    }
    public void draw(Graphics2D g, int x, int y) {
        g.setColor(this.color);
        g.setFont(new Font("SansSerif", Font.PLAIN, this.size));
        g.drawString(this.content, x, y + g.getFontMetrics().getAscent());
    }
}

// --- Combinators ---

record Beside(Pict left, Pict right) implements Pict {
    public int width() { return this.left.width() + this.right.width(); }
    public int height() { return Math.max(this.left.height(), this.right.height()); }
    public void draw(Graphics2D g, int x, int y) {
        int centerY = this.height() / 2;
        this.left.draw(g, x, y + centerY - this.left.height() / 2);
        this.right.draw(g, x + this.left.width(), y + centerY - this.right.height() / 2);
    }
}

record Above(Pict top, Pict bottom) implements Pict {
    public int width() { return Math.max(this.top.width(), this.bottom.width()); }
    public int height() { return this.top.height() + this.bottom.height(); }
    public void draw(Graphics2D g, int x, int y) {
        int centerX = this.width() / 2;
        this.top.draw(g, x + centerX - this.top.width() / 2, y);
        this.bottom.draw(g, x + centerX - this.bottom.width() / 2, y + this.top.height());
    }
}

record Below(Pict bottom, Pict top) implements Pict {
    public int width() { return Math.max(this.top.width(), this.bottom.width()); }
    public int height() { return this.top.height() + this.bottom.height(); }
    public void draw(Graphics2D g, int x, int y) {
        int centerX = this.width() / 2;
        this.top.draw(g, x + centerX - this.top.width() / 2, y);
        this.bottom.draw(g, x + centerX - this.bottom.width() / 2, y + this.top.height());
    }
}

record Overlay(Pict front, Pict back) implements Pict {
    public int width() { return Math.max(this.front.width(), this.back.width()); }
    public int height() { return Math.max(this.front.height(), this.back.height()); }
    public void draw(Graphics2D g, int x, int y) {
        int cx = this.width() / 2;
        int cy = this.height() / 2;
        this.back.draw(g, x + cx - this.back.width() / 2, y + cy - this.back.height() / 2);
        this.front.draw(g, x + cx - this.front.width() / 2, y + cy - this.front.height() / 2);
    }
}

// --- Bridge from pixels ---

// front is placed with its bottom-left corner at (x, y), measured from the
// bottom-left corner of back with y going up; the result is back's size and
// anything of front outside it is clipped.
record OverlayAt(Pict front, int x, int y, Pict back) implements Pict {
    OverlayAt(Pict front, double x, double y, Pict back) { this(front, Px.of(x), Px.of(y), back); }
    public int width() { return this.back.width(); }
    public int height() { return this.back.height(); }
    public void draw(Graphics2D g, int gx, int gy) {
        this.back.draw(g, gx, gy);
        Shape clip = g.getClip();
        g.clipRect(gx, gy, this.width(), this.height());
        this.front.draw(g, gx + this.x, gy + this.height() - this.y - this.front.height());
        g.setClip(clip);
    }
}

// A line from (x1, y1) to (x2, y2) drawn over base, in base's coordinates:
// origin at base's bottom-left pixel, y up (as OverlayAt). The result is
// base's size; the line is clipped to it.
record AddLine(Pict base, int x1, int y1, int x2, int y2, int thickness, Color color) implements Pict {
    AddLine(Pict base, int x1, int y1, int x2, int y2, int thickness, String color) {
        this(base, x1, y1, x2, y2, thickness, Colors.named(color));
    }
    AddLine(Pict base, double x1, double y1, double x2, double y2, double thickness, String color) {
        this(base, Px.of(x1), Px.of(y1), Px.of(x2), Px.of(y2), Px.of(thickness), Colors.named(color));
    }
    AddLine(Pict base, int x1, int y1, int x2, int y2, String color) {
        this(base, x1, y1, x2, y2, 1, Colors.named(color));
    }
    AddLine(Pict base, double x1, double y1, double x2, double y2, String color) {
        this(base, Px.of(x1), Px.of(y1), Px.of(x2), Px.of(y2), 1, Colors.named(color));
    }
    public String toString() {
        return "AddLine[base=" + base + ", x1=" + x1 + ", y1=" + y1 + ", x2=" + x2 + ", y2=" + y2
            + ", thickness=" + thickness + ", color=" + Colors.nameOf(color) + "]";
    }
    public int width() { return this.base.width(); }
    public int height() { return this.base.height(); }
    public void draw(Graphics2D g, int gx, int gy) {
        this.base.draw(g, gx, gy);
        Shape clip = g.getClip();
        Stroke stroke = g.getStroke();
        g.clipRect(gx, gy, this.width(), this.height());
        g.setColor(this.color);
        g.setStroke(new BasicStroke(this.thickness, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        int top = gy + this.height() - 1;
        g.drawLine(gx + this.x1, top - this.y1, gx + this.x2, top - this.y2);
        g.setStroke(stroke);
        g.setClip(clip);
    }
}

// pict turned counterclockwise by degrees about its center; the result is
// the rotated picture's bounding box.
record Rotate(Pict pict, int degrees) implements Pict {
    Rotate(Pict pict, double degrees) { this(pict, Px.of(degrees)); }
    private double cos() { return Math.abs(Math.cos(Math.toRadians(this.degrees))); }
    private double sin() { return Math.abs(Math.sin(Math.toRadians(this.degrees))); }
    public int width() {
        return (int) Math.round(this.pict.width() * cos() + this.pict.height() * sin());
    }
    public int height() {
        return (int) Math.round(this.pict.width() * sin() + this.pict.height() * cos());
    }
    public void draw(Graphics2D g, int x, int y) {
        AffineTransform t = g.getTransform();
        g.translate(x + this.width() / 2.0, y + this.height() / 2.0);
        g.rotate(-Math.toRadians(this.degrees));
        this.pict.draw(g, -this.pict.width() / 2, -this.pict.height() / 2);
        g.setTransform(t);
    }
}

record FromRaster(Raster raster) implements Pict {
    public int width() { return this.raster.width(); }
    public int height() { return this.raster.height(); }
    public void draw(Graphics2D g, int x, int y) {
        for (int py = 0; py < this.raster.height(); py++) {
            for (int px = 0; px < this.raster.width(); px++) {
                g.setColor(this.raster.colorAt(px, py));
                g.fillRect(x + px, y + py, 1, 1);
            }
        }
    }
}

// ==========================================================================
// Raster — pixel grids
// ==========================================================================

class Raster {
    private final Color[][] pixels;

    Raster(int width, int height) {
        this.pixels = new Color[height][width];
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                this.pixels[y][x] = new Color(0, 0, 0, 0);
            }
        }
    }

    private Raster(Color[][] pixels) {
        this.pixels = pixels;
    }

    static Raster fromBufferedImage(BufferedImage img) {
        Color[][] pixels = new Color[img.getHeight()][img.getWidth()];
        for (int y = 0; y < img.getHeight(); y++) {
            for (int x = 0; x < img.getWidth(); x++) {
                pixels[y][x] = new Color(img.getRGB(x, y), true);
            }
        }
        return new Raster(pixels);
    }

    int width() { return this.pixels[0].length; }
    int height() { return this.pixels.length; }

    Color colorAt(int x, int y) { return this.pixels[y][x]; }
    void setColorAt(int x, int y, Color color) { this.pixels[y][x] = color; }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (!(other instanceof Raster r)) return false;
        if (this.width() != r.width() || this.height() != r.height()) return false;
        for (int y = 0; y < this.height(); y++) {
            if (!Arrays.equals(this.pixels[y], r.pixels[y])) return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        return Arrays.deepHashCode(this.pixels);
    }

    @Override
    public String toString() {
        return "Raster[" + this.width() + "x" + this.height() + "]";
    }
}

// ==========================================================================
// ImageIO_ — side-effectful operations
// ==========================================================================

class ImageIO_ {
    static Raster render(Pict p) {
        return p.render();
    }

    static Raster load(String filename) {
        try {
            return Raster.fromBufferedImage(ImageIO.read(resolve(filename)));
        } catch (IOException e) {
            throw new RuntimeException("Failed to load image: " + e.getMessage());
        }
    }

    static void save(Pict p, String filename) {
        save(p.render(), filename);
    }

    static void save(Raster r, String filename) {
        try {
            ImageIO.write(toBufferedImage(r), "png", resolve(filename));
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image: " + e.getMessage());
        }
    }

    static void show(Pict p) {
        show(p.render());
    }

    static void show(Raster r) {
        int n = shown++;
        save(r, SHOWN_PREFIX + n + ".png");
        // the page replaces this line with the image (runner.js)
        System.out.println(SHOWN_MARK + n + "\u0001");
    }

    // -- browser plumbing (the page's runner reads the files written here) --

    private static final String SHOWN_PREFIX = "/files/.shown-";
    private static final String SHOWN_MARK = "\u0001__SHOWN__";
    private static int shown = 0;

    private static File resolve(String filename) {
        // The browser's writable filesystem is mounted at /files/.
        return filename.startsWith("/")
            ? new File(filename) : new File("/files/", filename);
    }

    private static BufferedImage toBufferedImage(Raster r) {
        var img = new BufferedImage(r.width(), r.height(), BufferedImage.TYPE_INT_ARGB);
        for (int y = 0; y < r.height(); y++) {
            for (int x = 0; x < r.width(); x++) {
                img.setRGB(x, y, r.colorAt(x, y).getRGB());
            }
        }
        return img;
    }

    static void __reset() {
        shown = 0;
        File[] leftovers = new File("/files/").listFiles(
            (dir, name) -> name.startsWith(".shown-"));
        if (leftovers != null) {
            for (File f : leftovers) f.delete();
        }
    }
}
