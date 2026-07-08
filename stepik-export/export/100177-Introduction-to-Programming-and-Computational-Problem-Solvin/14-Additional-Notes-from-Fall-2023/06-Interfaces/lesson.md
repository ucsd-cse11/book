# Interfaces


---

<!-- step 4683970 | type: text -->

<p>Let's consider another example where creating an interface will make our coding work a lot easier.</p>

<p>Suppose we want to create classes that represent things in a Cartesian coordinate plane (a really fancy way to say "the plots with x and y axes that you might have had to draw for math class"). Perhaps the most basic thing we can define in this plane is a point, which has an x-coordinate and a y-coordinate. We can calculate distance between two points using the distance formula: <span class="math-tex">\(\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\)</span></p>

<pre><code class="language-java">class Point {
    int x;
    int y;
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    double distance(Point other) {
        return Math.sqrt(Math.pow((other.x - this.x), 2) + Math.pow((other.y - this.y), 2));
    }
}</code></pre>

<p>The next thing that might be useful to define are regions of space, like circles and rectangles. We describe these regions using points (e.g. center of a circle, corners of a rectangle), so these classes will contain <code>Point</code>s as fields. Suppose also that we're interested in checking whether or not a given point is inside of a region. This kind of problem is relevant to computer graphics, geographic information systems, robotics, and game development, just to name a few.</p>

<pre><code class="language-java">class CircleRegion {
    Point center;
    double radius;
    CircleRegion(Point center, double radius) {
        this.center = center;
        this.radius = radius;
    }
    boolean contains(Point p) {
        return this.center.distance(p) &lt; this.radius;
    }
}
class RectRegion {
    Point lowerLeft;
    Point upperRight;
    RectRegion(Point lowerLeft, Point upperRight) {
        this.lowerLeft = lowerLeft;
        this.upperRight = upperRight;
    }
    boolean contains(Point p) {
        return (this.lowerLeft.x &lt; p.x &amp;&amp; this.lowerLeft.y &lt; p.y) &amp;&amp;
               (this.upperRight.x &gt; p.x &amp;&amp; this.upperRight.y &gt; p.y);
    }
}</code></pre>

---

<!-- step 4683976 | type: text -->

<p>These classes work perfectly fine on their own, so why do we need interfaces? (something something "if it ain't broke...")</p>

<p>The problem arises when we want to compose new regions from these existing regions. For example, the union of two regions is the region that contains all points covered by either of the two regions. Since we have circle regions and rectangle regions, we can take the union of two circles, two rectangles, or one circle and one rectangle. In our current implementation, <code>CircleRegion</code> and <code>RectangleRegion</code> are unrelated types, so we have to define each of these possible unions:</p>

<pre><code class="language-java">class UnionRegionCircleCircle {
    CircleRegion r1, r2;

    UnionRegionCircleCircle(CircleRegion r1, CircleRegion r2) {
        this.r1 = r1;
        this.r2 = r2;
    }

    boolean contains(Point p) {
        return this.r1.contains(p) || this.r2.contains(p);
    }
}
class UnionRegionRectRect {
    RectRegion r1, r2;

    UnionRegionRectRect(RectRegion r1, RectRegion r2) {
        this.r1 = r1;
        this.r2 = r2;
    }

    boolean contains(Point p) {
        return this.r1.contains(p) || this.r2.contains(p);
    }
}
class UnionRegionCircleRect {
    CircleRegion r1;
    RectRegion r2;

    UnionRegionCircleRect(CircleRegion r1, RectRegion r2) {
        this.r1 = r1;
        this.r2 = r2;
    }

    boolean contains(Point p) {
        return this.r1.contains(p) || this.r2.contains(p);
    }
}</code></pre>

<p>Phew, my fingers are a little sore... It was kinda tedious to type basically the same code over and over again, but we finally have our union region classes defined!</p>

<p>Hmm? What's that? You also want me to implement the intersection of two regions? And you want more region shapes? The amount of classes we have is going to explode (as well as my hands)! There has to be a better way to do this...</p>

---

<!-- step 4683975 | type: text -->

<p>One thing we notice when we wrote out all these union classes is that they all use the same <code>contains</code> method definition, which checks if the given point is contained by either <code>r1</code> or <code>r2</code>. We don't actually care whether or not <code>r1</code> and <code>r2</code> are specifically <code>CircleRegion</code> or <code>RectRegion</code>, just that they are <strong>some kind of region that can check if they contain a point</strong>. This similarity is key, because we use this to define our interface:</p>

<pre><code class="language-java">interface Region {
    boolean contains(Point p);
}</code></pre>

<p>This looks similar to defining a class, with a few differences:</p>

<ul>
	<li>We use the <code>interface</code> keyword, rather than the <code>class</code> keyword in the header</li>
	<li>We do not define any fields (interfaces cannot have fields!)</li>
	<li>We create a method header but do not create a method definition</li>
</ul>

<p>This interface tells us that a <code>Region</code> is something that is able to call a method called <code>contains</code>, which takes in a <code>Point</code> as a parameter and returns a boolean. Notice that we don't create a constructor for <code>Region</code>, because we're not supposed to use interfaces directly to create objects! Instead, we use <code>Region</code> to revise <code>CircleRegion</code> and <code>RectRegion</code>:</p>

<pre><code class="language-java">class CircleRegion implements Region {
    Point center;
    double radius;
    CircleRegion(Point center, double radius) {
        this.center = center;
        this.radius = radius;
    }
    public boolean contains(Point p) {
        return this.center.distance(p) &lt; this.radius;
    }
}
class RectRegion implements Region {
    Point lowerLeft;
    Point upperRight;
    RectRegion(Point lowerLeft, Point upperRight) {
        this.lowerLeft = lowerLeft;
        this.upperRight = upperRight;
    }
    public boolean contains(Point p) {
        return (this.lowerLeft.x &lt; p.x &amp;&amp; this.lowerLeft.y &lt; p.y) &amp;&amp;
               (this.upperRight.x &gt; p.x &amp;&amp; this.upperRight.y &gt; p.y);
    }
}</code></pre>

<p> Not much changed, but we added <code>implements Region</code> to the class headers for <code>CircleRegion</code> and <code>RectRegion</code>. This guarantees that <code>CircleRegion</code> and <code>RectRegion</code> will provide implementations (i.e. method definitions) for the <code>contains</code> method. If we did not provide implementations of <code>contains</code> in any class that <code>implements Region</code>, our code would not compile. Even though it may be obvious to us that <code>CircleRegion</code> and <code>RectRegion</code> both implemented <code>contains</code> to begin with, this needs to be made explicit for the Java compiler.</p>

<p><em>We also add <code>public</code> to the method header of <code>contains</code> in both classes. We need to do this because methods in interfaces are <code>public</code> by default (at least in Java 8), and we cannot limit the scope of a <code>public</code> method.</em></p>

---

<!-- step 4683977 | type: text -->

<p>The advantage of defining our classes to implement <code>Region</code> is that we can now use <code>Region</code> as a reference variable type. The Java compiler will allow us to call <code>contains</code> from a <code>Region</code> reference variable, even if we don't know exactly what object type the reference variable points to, because it is guaranteed to implement <code>contains</code>. So we can scrap the three union region classes we had before and define one <code>UnionRegion</code> class:</p>

<pre><code class="language-java">class UnionRegion implements Region {
    Region r1, r2;

    UnionRegion(Region r1, Region r2) {
        this.r1 = r1;
        this.r2 = r2;
    }

    public boolean contains(Point p) {
        return this.r1.contains(p) || this.r2.contains(p);
    }
}</code></pre>

<p>Much easier on the hands. Note that we also have <code>UnionRegion implements Region</code>. This allows us to take the union of two <code>UnionRegions</code>, or one <code>UnionRegion</code> and some other <code>Region</code>, granting us a lot of flexibility with how we use our code.</p>

<p>We can just as easily define an <code>IntersectRegion</code> class, which contains all points covered by both of the two regions.</p>

<pre><code class="language-java">class IntersectRegion implements Region {
    Region r1, r2;

    IntersectRegion(Region r1, Region r2) {
        this.r1 = r1;
        this.r2 = r2;
    }

    public boolean contains(Point p) {
        return this.r1.contains(p) &amp;&amp; this.r2.contains(p);
    }
}</code></pre>

---

<!-- step 4683979 | type: text -->

<p>When we create objects of <code>UnionRegion</code> or <code>IntersectRegion</code>, we can either provide arguments of any type that <code>implements Region</code>, or provide arguments of type <code>Region</code>. When we create an object of a type that <code>implements Region</code>, but assign it to a variable of type <code>Region</code>, it is implicitly type casted to <code>Region</code>.</p>

<pre><code class="language-java">CircleRegion cr = new CircleRegion(new Point(3, 4), 5);
RectRegion rr = new RectRegion(new Point(5, 5), new Point(20, 20));
UnionRegion ur = new UnionRegion(cr, rr);

Region cr1 = new CircleRegion(new Point(0, 0), 5);
Region rr1 = new RectRegion(new Point(0, 0), new Point(10, 5));
Region ir1 = new IntersectRegion(cr1, rr1);</code></pre>

---

<!-- step 4683978 | type: text -->

<p>Here's an example to show how flexible our code can be for creating custom regions. Let's say that we want to create an object that represents this weird shape:</p>

<p><img alt="" height="614" name="image.png" src="https://ucarecdn.stepik.net/f047fb92-c2e8-44d7-9453-fd486391f1bd/" width="615"></p>

<p>We can't really do that with just <code>CircleRegion</code> and <code>RectRegion</code> alone. But we can find a way to compose circle and rectangle regions with <code>UnionRegion</code> and <code>IntersectRegion</code> to create this shape.</p>

<pre><code class="language-java">CircleRegion circle = new CircleRegion(new Point(0, 0), 5);
RectRegion upperRightRect = new RectRegion(new Point(0, 0), new Point(5, 5));
RectRegion lowerLeftRect = new RectRegion(new Point(-5, -5), new Point(0, 0));

IntersectRegion upperRightQuarter = new IntersectRegion(circle, upperRightRect);
IntersectRegion lowerLeftQuarter = new IntersectRegion(circle, lowerLeftRect);
UnionRegion weirdShape = new UnionRegion(upperRightQuarter, lowerLeftQuarter);</code></pre>

<p>We create a circle centered at the origin, then separately intersect it with squares that cover the upper-right and lower-left quadrants, creating two separate quarters of the circle. These two quarters are two different objects, but we can take their union to create a region that represents the area covered by both quarters.</p>

<p><img alt="" height="614" name="image.png" src="https://ucarecdn.stepik.net/02567f14-425c-41c4-9076-7509d8673ac4/" width="613"></p>