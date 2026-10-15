// ==========================================================================
// Pict — composable image descriptions
//
// Written by Joe Politz and Claude Code. Based on library design by Ben Lerner
// and the image teachpack from How to Design Programs by Felleisen, Flatt,
// Findler, and Krishnamurthi.
//
// The fa26 edition of the CSE 11 book's library, desktop build.
// Generated from pict/ in the book's source by build.py; changes go there.
// ==========================================================================

import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageTypeSpecifier;
import javax.imageio.ImageWriter;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.metadata.IIOMetadataNode;

// ==========================================================================
// Pict — composable image descriptions
// ==========================================================================

interface Pict {
    int width();
    int height();

    /** Render this Pict into a Raster of pixels. */
    default Raster render() {
        // an image with no area has no pixels to draw (and AWT refuses to
        // make one)
        if (width() == 0 || height() == 0) return new Raster(width(), height());
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
    default Pict overlayAtAlign(int x, int y, String align, Pict other) {
        return new OverlayAtAlign(this, x, y, align, other);
    }
    default Pict overlayAtAlign(double x, double y, String align, Pict other) {
        return new OverlayAtAlign(this, x, y, align, other);
    }
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
    /** A width, height, or radius: zero is fine (an empty picture), negative is not. */
    static int size(String what, int v) {
        if (v < 0) throw new IllegalArgumentException(what + " is negative: " + v);
        return v;
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
    Circle { Px.size("radius", radius); }
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
    CircleOutline { Px.size("radius", radius); }
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
    Rect { Px.size("width", width); Px.size("height", height); }
    Rect(int width, int height, String color) { this(width, height, Colors.named(color)); }
    Rect(double width, double height, String color) { this(Px.of(width), Px.of(height), Colors.named(color)); }
    public String toString() { return "Rect[width=" + width + ", height=" + height + ", color=" + Colors.nameOf(color) + "]"; }
    public void draw(Graphics2D g, int x, int y) {
        g.setColor(this.color);
        g.fillRect(x, y, this.width, this.height);
    }
}

record RectOutline(int width, int height, Color color) implements Pict {
    RectOutline { Px.size("width", width); Px.size("height", height); }
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
    Triangle { Px.size("width", width); Px.size("height", height); }
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
    TriangleOutline { Px.size("width", width); Px.size("height", height); }
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

// OverlayAt with a choice of which point of front lands on (x, y): "center",
// "bottom-left" (what OverlayAt does), "bottom-right", "top-left" or
// "top-right". Same coordinates as OverlayAt: from back's bottom-left, y up.
// (Isaac Zhang's suggestion.)
record OverlayAtAlign(Pict front, int x, int y, String align, Pict back) implements Pict {
    private static final java.util.List<String> ALIGNS =
        java.util.List.of("center", "bottom-left", "bottom-right", "top-left", "top-right");
    OverlayAtAlign {
        if (!ALIGNS.contains(align)) {
            throw new IllegalArgumentException("unknown align \"" + align + "\"; use one of: "
                + String.join(", ", ALIGNS));
        }
    }
    OverlayAtAlign(Pict front, double x, double y, String align, Pict back) {
        this(front, Px.of(x), Px.of(y), align, back);
    }
    public int width() { return this.back.width(); }
    public int height() { return this.back.height(); }
    public void draw(Graphics2D g, int gx, int gy) {
        int w = this.front.width(), h = this.front.height();
        int left = switch (this.align) {
            case "center" -> this.x - w / 2;
            case "bottom-right", "top-right" -> this.x - w;
            default -> this.x;
        };
        int bottom = switch (this.align) {
            case "center" -> this.y - h / 2;
            case "top-left", "top-right" -> this.y - h;
            default -> this.y;
        };
        new OverlayAt(this.front, left, bottom, this.back).draw(g, gx, gy);
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
    // kept apart from pixels: a 5x0 raster has no rows to measure a width from
    private final int width, height;

    Raster(int width, int height) {
        this.width = Px.size("width", width);
        this.height = Px.size("height", height);
        this.pixels = new Color[height][width];
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                this.pixels[y][x] = new Color(0, 0, 0, 0);
            }
        }
    }

    Raster(Color[][] pixels) {
        this(checkedWidth(pixels), pixels.length, copyOf(pixels));
    }

    private static int checkedWidth(Color[][] pixels) {
        if (pixels == null) throw new IllegalArgumentException("pixels is null");
        if (pixels.length == 0) throw new IllegalArgumentException("pixels has no rows");
        if (pixels[0] == null) throw new IllegalArgumentException("pixels[0] is null");
        int width = pixels[0].length;
        if (width == 0) throw new IllegalArgumentException("pixels[0] is empty");
        for (int y = 0; y < pixels.length; y++) {
            if (pixels[y] == null) throw new IllegalArgumentException("pixels[" + y + "] is null");
            if (pixels[y].length != width) {
                throw new IllegalArgumentException("pixels[" + y + "] has length " + pixels[y].length
                    + ", but pixels[0] has length " + width + "; every row needs the same length");
            }
            for (int x = 0; x < width; x++) {
                if (pixels[y][x] == null) {
                    throw new IllegalArgumentException("pixels[" + y + "][" + x + "] is null");
                }
            }
        }
        return width;
    }

    private static Color[][] copyOf(Color[][] pixels) {
        Color[][] copy = new Color[pixels.length][];
        for (int y = 0; y < pixels.length; y++) copy[y] = pixels[y].clone();
        return copy;
    }

    private Raster(int width, int height, Color[][] pixels) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    }

    static Raster fromBufferedImage(BufferedImage img) {
        Color[][] pixels = new Color[img.getHeight()][img.getWidth()];
        for (int y = 0; y < img.getHeight(); y++) {
            for (int x = 0; x < img.getWidth(); x++) {
                pixels[y][x] = new Color(img.getRGB(x, y), true);
            }
        }
        return new Raster(img.getWidth(), img.getHeight(), pixels);
    }

    int width() { return this.width; }
    int height() { return this.height; }

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
            return Raster.fromBufferedImage(ImageIO.read(findImage(filename)));
        } catch (IOException e) {
            throw new RuntimeException("Failed to load image: " + e.getMessage());
        }
    }

    static void save(Pict p, String filename) {
        save(p.render(), filename);
    }

    static void save(Raster r, String filename) {
        if (r.width() == 0 || r.height() == 0) {
            throw new IllegalArgumentException("can't save an empty (" + r.width() + "x" + r.height()
                + ") image: a PNG needs at least one pixel");
        }
        try {
            File out = resolve(filename);
            if (out.getParentFile() != null) out.getParentFile().mkdirs();
            ImageIO.write(toBufferedImage(r), "png", out);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image: " + e.getMessage());
        }
    }

    static void save(Pict[] frames, String filename) {
        save(frames, 100, true, filename);
    }

    static void save(Pict[] frames, int delayMs, String filename) {
        save(frames, delayMs, true, filename);
    }

    // An animated GIF, delayMs per frame (GIF keeps hundredths of a second).
    // Frames are centered on a white canvas as large as the largest frame; GIF
    // has no partial transparency, so "transparent" shows the white.
    // loop: repeat forever, or play once and stop on the last frame (the loop
    // flag was Aiden Wang's suggestion).
    static void save(Pict[] frames, int delayMs, boolean loop, String filename) {
        if (frames.length == 0) throw new IllegalArgumentException("no frames to save");
        if (delayMs < 0) throw new IllegalArgumentException("delayMs is negative: " + delayMs);
        int w = 0, h = 0;
        for (Pict p : frames) {
            w = Math.max(w, p.width());
            h = Math.max(h, p.height());
        }
        if (w == 0 || h == 0) {
            throw new IllegalArgumentException("can't save frames that are all empty (" + w + "x" + h
                + "): a GIF needs at least one pixel");
        }
        ImageWriter writer = ImageIO.getImageWritersByFormatName("gif").next();
        try (var out = ImageIO.createImageOutputStream(new FileOutputStream(resolve(filename)))) {
            writer.setOutput(out);
            writer.prepareWriteSequence(null);
            for (int i = 0; i < frames.length; i++) {
                var img = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
                var g = img.createGraphics();
                g.setColor(Color.WHITE);
                g.fillRect(0, 0, w, h);
                g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                frames[i].draw(g, (w - frames[i].width()) / 2, (h - frames[i].height()) / 2);
                g.dispose();
                writer.writeToSequence(new IIOImage(img, null, gifFrameMetadata(writer, img, delayMs, loop && i == 0)), null);
            }
            writer.endWriteSequence();
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image: " + e.getMessage());
        } finally {
            writer.dispose();
        }
    }

    private static IIOMetadata gifFrameMetadata(ImageWriter writer, BufferedImage img, int delayMs, boolean loopForever)
            throws IOException {
        IIOMetadata meta = writer.getDefaultImageMetadata(ImageTypeSpecifier.createFromRenderedImage(img), null);
        String format = meta.getNativeMetadataFormatName();
        var root = new IIOMetadataNode(format);
        var gce = new IIOMetadataNode("GraphicControlExtension");
        gce.setAttribute("disposalMethod", "none");
        gce.setAttribute("userInputFlag", "FALSE");
        gce.setAttribute("transparentColorFlag", "FALSE");
        gce.setAttribute("delayTime", Integer.toString(Math.round(delayMs / 10f)));
        gce.setAttribute("transparentColorIndex", "0");
        root.appendChild(gce);
        if (loopForever) {
            // the NETSCAPE2.0 block: loop count 0 = forever; without it the
            // GIF plays once
            var apps = new IIOMetadataNode("ApplicationExtensions");
            var app = new IIOMetadataNode("ApplicationExtension");
            app.setAttribute("applicationID", "NETSCAPE");
            app.setAttribute("authenticationCode", "2.0");
            app.setUserObject(new byte[] { 1, 0, 0 });
            apps.appendChild(app);
            root.appendChild(apps);
        }
        meta.mergeTree(format, root);
        return meta;
    }

    // What show() puts up for an image with no area, which has nothing of its
    // own to show: a small gray dotted circle.
    private static Raster shownForm(Raster r) {
        if (r.width() > 0 && r.height() > 0) return r;
        var img = new BufferedImage(20, 20, BufferedImage.TYPE_INT_ARGB);
        var g = img.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.setColor(Color.GRAY);
        g.setStroke(new BasicStroke(1.5f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND,
            1, new float[] { 0.1f, 3.5f }, 0));
        g.drawOval(2, 2, 15, 15);
        g.dispose();
        return Raster.fromBufferedImage(img);
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

    static void show(Pict p) {
        show(p.render());
    }

    static void show(Raster r) {
        Raster visible = shownForm(r);
        if (GraphicsEnvironment.isHeadless()) {
            String filename = SHOWN_PREFIX + (shown++) + ".png";
            save(visible, filename);
            System.out.println("[no display: wrote " + filename + "]");
            return;
        }
        var img = toBufferedImage(visible);
        var frame = new javax.swing.JFrame("Pict");
        frame.setDefaultCloseOperation(javax.swing.JFrame.DISPOSE_ON_CLOSE);
        frame.add(new javax.swing.JPanel() {
            @Override public void paintComponent(Graphics g) {
                super.paintComponent(g);
                g.drawImage(img, 0, 0, null);
            }
            @Override public Dimension getPreferredSize() {
                return new Dimension(visible.width(), visible.height());
            }
        });
        frame.pack();
        frame.setVisible(true);
    }

    private static final String SHOWN_PREFIX = "shown-";
    private static int shown = 0;

    // Relative filenames are relative to where java was started.
    private static File resolve(String filename) {
        return new File(filename);
    }

    // The book's images live with the book, so on the desktop a load is
    // just a file next to where java was started.
    private static File findImage(String filename) {
        return resolve(filename);
    }
}
