# More Regions


---

<!-- step 2375698 | type: text -->

<p>In the previous lesson, we defined rectangular regions. A natural next step is to define circular ones. A simple definition might consider the circle’s center point and its radius:</p>

<pre><code class="language-java">class CircRegion {
  Point center;
  int radius;
  CircRegion(Point center, int radius) {
    this.center = center;
    this.radius = radius;
  }
}</code></pre>

<p>Let’s try implementing <code>contains()</code> for <code>CircRegion</code> as well:</p>

<pre><code>class CircRegion {
  // ... fields and constructor ...
 
  /*
    @param p the point to check for containment within the circle
    @return true if the point is within radius units of the center of the circle
  */
  boolean contains(Point p) {
 
  }
}
 
class ExamplesRegion {
  // ... rectangle examples and test ...
 
  CircRegion c1 = new CircRegion(new Point(200, 50), 10);
  CircRegion c2 = new CircRegion(new Point(20, 300), 25);
 
  Point circleTest1 = new Point(210, 50);
  Point circleTest2 = new Point(20, 315);
 
  boolean testContainsCirc(Tester t) {
    return t.checkExpect(this.c1.contains(this.circleTest1), true) &amp;&amp;
           t.checkExpect(this.c1.contains(this.circleTest2), false) &amp;&amp;
           t.checkExpect(this.c2.contains(this.circleTest1), false) &amp;&amp;
           t.checkExpect(this.c2.contains(this.circleTest2), true);
  }
}</code></pre>

<p>Again, we can fill in the implementation while wishing for a function to exist. In this case, if we can calculate the distance from the center point to the given point, we could then compare that distance to the radius. If that distance is less than the radius, the point is inside, otherwise it isn’t.</p>

<pre><code class="language-java">/*
  @param p the point to check for containment within the circle
  @return true if the point is within radius units of the center of the circle
*/
boolean contains(Point p) {
  return this.center.distance(p) &lt; this.radius;
}</code></pre>

---

<!-- step 2375701 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Now all we need to do is implement <code>distance()</code>. To do that, we need to do a calculation like the following, where x1, x2, y1, and y2 are the corresponding fields on <code>this</code> point and the <code>other</code> point:</p>

<p>√(x1 - x2)<sup>2</sup> + (y1 - y2)<sup>2</sup></p>

<p>We know how to do the squaring operator through multiplication, but we don’t know how to ask Java to perform a square root yet. This is provided as a method on a built-in called <code>Math</code>. The method is called <code>sqrt()</code>, which takes a number and returns its square root. Let's try to make an example out of this and store its result in an <code>int</code> field.</p>

<p><iframe height="370px" scrolling="no" src="https://tech.io/playground-widget/1b53fd87485f3b11eb935849337e657520785/welcome/1086703/Why%20did%20the%20math%20teacher's%20plants%20keep%20dying%3F%20--%20%20Because%20they%20grew%20square%20roots." width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Run the program and fill in the blanks based on the output.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code><u>SquareRoot.java:2</u>: error: </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "incompatible types",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> : possible lossy conversion from </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "double",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> to int <br>\n&nbsp; int sqrt1 = Math.sqrt(5); <br>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ^ <br>\n1 error \n</code>",
      "options": []
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2375714 | type: number -->

**Quiz (number)**

<p><iframe height="370px" scrolling="no" src="https://tech.io/playground-widget/1b53fd87485f3b11eb935849337e657520785/welcome/1086703/Why%20did%20the%20math%20teacher's%20plants%20keep%20dying%3F%20--%20%20Because%20they%20grew%20square%20roots." width="100%"></iframe></p>

<p>The error message from the code in the previous step (included again above for reference) refers to a type called <code>double</code>, which we saw in <a href="https://stepik.org/lesson/573386/step/5?unit=567978" rel="noopener noreferrer nofollow">2.2</a>. Similar to many other languages, Java has two different kinds of numbers that it works with. <code>int</code>s (along with a few other types) represent exact integers. The other kind represents approximations of numbers, and <code>double</code> is the most common type we’ll see for approximate numbers. As a reminder, here are some examples:</p>

<pre><code class="language-java">double d1 = 5.5;
double d2 = -3.33333;</code></pre>

<p><code>sqrt()</code> returns the type <code>double</code>, so we should use that here instead of <code>int</code> in our earlier example:</p>

<p><iframe height="470px" scrolling="no" src="https://tech.io/playground-widget/1b53fd87485f3b11eb935849337e657520785/welcome/1086704/Square%20Roots" width="100%"></iframe></p>

<p>Now, we get an actual answer, which is an approximation of √5.</p>

<h3><span style="color: #cc0000;">Do Now!</span> Enter the value of <code>sqrt1</code> below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "options": [
    {
      "answer": "2.23606797749979",
      "max_error": "0"
    }
  ]
}
```

</details>

---

<!-- step 2375723 | type: text -->

<p>As you may recall from <a href="https://stepik.org/lesson/573386/step/6?unit=567978" rel="noopener noreferrer nofollow">earlier</a>, due to the way Java (and many languages) approximate values, inaccuracies with <code>double</code>s are unavoidable. This is a consequence of the fact that in order to represent numbers like the square root of 5, which are non-repeating and non-terminating decimals, some finite approximation is needed. As a result, when we work with doubles, we need to be careful about expecting exact results. Usually, we’ll need to use <code>&lt;</code> and <code>&gt;</code> to check for double values being within certain ranges, rather than checking for exact equality.</p>

<p><em>(This may seem like a small error. However, if you’re writing code for a bank that makes errors on a fraction of a penny billions of times a day, you’ll start to care an awful lot. In addition, in a long-running program, errors can stack up, with <a href="http://www-users.math.umn.edu/~arnold/disasters/patriot.html" rel="noopener noreferrer nofollow">literally deadly consequences</a>. The summary of that article is that the accumulated error from repeated addition of 1/10 became large enough to cause a targeting error. Our stakes are a little lower, but the importance of understanding that doubles are only approximate cannot be overstated. Physics and math applications of computing often study numerical methods for quantifying and accounting for such inaccuracies.)</em></p>

---

<!-- step 2406082 | type: number -->

**Quiz (number)**

<p>For our purposes in region calculation, we can happily rely on the result of the <code>sqrt()</code> operation to check for a point being contained in a <code>CircRegion</code>. It requires changing the return type of distance to be <code>double</code> rather than <code>int</code>, to match the return type of <code>Math.sqrt()</code>:</p>

<p><span style="color: #cc0000;"><strong>Do Now!</strong></span> Change the return type for <code>distance()</code> to a <code>double</code>.</p>

<p><iframe height="790px" scrolling="yes" src="https://tech.io/playground-widget/ce4f71610c01d0d01fa6ada52242b09020785/welcome/1086859/Square%20Roots" width="100%"></iframe></p>

<p>With this, our whole solution runs through without issues. Note that we used another method on <code>Math</code>, the <code>pow()</code> method, which takes two numeric arguments, and returns the value of the first raised to the power of the second. So in the example above, the <code>2</code> indicates squaring the argument.</p>

<h3><span style="color: #cc0000;">Do Now!</span> Paste the value of <code>dist</code> into the text box below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "options": [
    {
      "answer": "13.601470508735444",
      "max_error": "0"
    }
  ]
}
```

</details>