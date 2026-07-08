# Nested Data


---

<!-- step 2373518 | type: text -->

<p>A common idea in geometric or mapping applications is describing a region in 2D space. Let’s take rectangular regions as an example. Here’s a rectangular region whose lower-left corner is at (30, 40), and whose upper-right corner is at (100, 200):</p>

<p><img alt="" height="324" name="Screen Shot 2021-09-07 at 10.44.02 PM.png" src="https://ucarecdn.stepik.net/2949ef88-1275-443c-bb42-5e0f3ca1d16f/" width="356"><br>
<br>
How might we represent rectangles like this with a class? There are a few options: we could use the lower-left and upper-right corners, we could use all four corners, or we could use the lower-left corner with a width and a height. In the next few steps, we will look at the first option: using the lower-left and upper-right corners.</p>

---

<!-- step 2373519 | type: choice -->

**Quiz (choice)**

<p>To represent the region, we might write a class like this:</p>

<pre><code class="language-java">class RectRegion {
  int lowX;
  int lowY;
  int highX;
  int highY;
  // Constructor to be written
}</code></pre>

<p>Each of the 4 fields represents the boundary for 1 side of the rectangle.</p>

<p><img alt="" height="296" name="Screen Shot 2021-08-02 at 10.07.48 PM.png" src="https://ucarecdn.stepik.net/1ad8cc9f-5fe9-4b3a-9bcd-eb7f2f3bd36d/" width="351"></p>

<h3><span style="color: #cc0000;">Do Now! </span>Which of the following coordinate pairs would represent the upper right corner of the rectangle?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": false,
  "is_always_correct": false,
  "sample_size": 5,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": false,
  "options": [
    {
      "is_correct": true,
      "text": "(highX, highY)",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "(lowX, highX)",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "(lowX, lowY)",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "(highY, highX)",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "(lowY, highX)",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2373520 | type: choice -->

**Quiz (choice)**

<p>In the previous example, the bottom left corner is represented by <code>lowX</code> and <code>lowY</code> , and the top right corner is represented by <code>highX</code> and <code>highY</code>. These pairings of fields are useful and meaningful <em>together</em>. </p>

<p>In particular, we’ve seen before that it’s useful to represent such pairs of x/y values in a <code>Point</code> class. So, another option is to use two <code>Point</code> fields, instead of four numeric fields:</p>

<pre><code class="language-java">class RectRegion {
  Point lowerLeft;
  Point upperRight;
  //Constructor to be written
}</code></pre>

<p><img alt="" height="344" name="Screen Shot 2021-08-02 at 11.14.24 PM.png" src="https://ucarecdn.stepik.net/ea3d0687-502d-493e-8f8e-c844e32328b8/" width="396">​</p>

<p>This choice is useful because it lets us re-use any methods that are already written in <code>Point</code>, and it also captures the relationship between the numbers. Remember that we had this definition of <code>Point </code>before:</p>

<pre><code class="language-java">class Point {
  int x;
  int y;
  Point(int x, int y) {
    this.x = x;
    this.y = y;
  }
}</code></pre>

<p><iframe height="650px" scrolling="yes" src="https://tech.io/playground-widget/f715b2929df81ecf8d03ea03ba1ed81420785/welcome/1085761/RectRegion" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Write the constructor for this version of the <code>RectRegion</code> class. Then, select all of the options below that would successfully create the object and initialize its fields.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": true,
  "is_always_correct": false,
  "sample_size": 5,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": false,
  "options": [
    {
      "is_correct": true,
      "text": "<code> RectRegion(Point lowerLeft, Point upperRight) {<br>&nbsp; this.lowerLeft = lowerLeft;<br>&nbsp; this.upperRight = upperRight;<br>} </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> RectRegion(int x1, int y1, int x2, int y2) {<br>&nbsp; this.lowerLeft = (x1, y1);<br>&nbsp; this.upperRight = (x2, y2);<br>} </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> RectRegion(Point point) {<br>&nbsp; this.lowerLeft = point;<br>&nbsp; this.upperRight = point;<br>} </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> RectRegion(Point lowerLeft, Point upperRight) {<br>&nbsp; lowerLeft = this.lowerLeft;<br>&nbsp; upperRight = this.upperRight;<br>} </code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code> RectRegion(Point lowerLeft, Point upperRight) {<br>&nbsp; this.upperRight= upperRight;<br>&nbsp; this.lowerLeft = lowerLeft;<br>} </code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2373564 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Let’s think about a few examples of <code>RectRegions</code>.</p>

<p><img alt="" height="320" name="Screen Shot 2021-09-07 at 10.44.02 PM.png" src="https://ucarecdn.stepik.net/ff426b36-2774-45b1-9382-137f12beb838/" width="352"></p>

<p>Since the two fields of <code>RectRegion</code> are both <code>Point</code>s, we must pass references to <code>Point</code> objects when creating the <code>RectRegion</code>. If we want <code>r1</code> to match the example in the picture from the first step (included again above), for example, we could write it as:</p>

<pre><code class="language-java">RectRegion r1 = new RectRegion(new Point(30, 40), new Point(100, 200));</code></pre>

<p>Let's choose this example for <code>r2</code>. Its lower left corner is at (10, 10) and its upper right corner is at (50, 50).</p>

<p><img alt="" height="320" name="Screen Shot 2021-09-07 at 10.57.19 PM.png" src="https://ucarecdn.stepik.net/f78bf3dc-101f-4753-9593-c324583506d0/" width="355"></p>

<h3><span style="color: #cc0000;">Do Now! </span>Based on how <code>r1</code> is written and on the information given for <code>r2</code>, fill in the blanks for <code>r2</code> below.</h3>

<p><iframe height="500px" scrolling="yes" src="https://tech.io/playground-widget/f715b2929df81ecf8d03ea03ba1ed81420785/welcome/1085762/RectRegion%20examples" width="100%"></iframe></p>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code> RectRegion r2 = new RectRegion(new __BLANK1__(__BLANK2__, __BLANK3__), new Point(50, 50)); </code>\n<br><br>\n__BLANK1__",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "Point",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>\n__BLANK2__",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "10",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>\n__BLANK3__",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "10",
          "is_correct": true
        }
      ]
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2373831 | type: number -->

**Quiz (number)**

<p>Another way is that we could create the <code>Point</code>s, and then use them in the creation of <code>r2</code> by using field access:</p>

<pre><code>Point p1 = new Point(10, 10);
Point p2 = new Point(50, 50);
RectRegion r2 = new RectRegion(p1, p2);</code></pre>

<p>Now, let’s put all these examples together (and rename the last one to <code>r3</code>), so we can see them all in one place:</p>

<pre><code class="language-java">class ExamplesRegion {
  RectRegion r1 = new RectRegion(new Point(30, 40), new Point(100, 200));
  RectRegion r2 = new RectRegion(new Point(10, 10), new Point(50, 50));
  Point p1 = new Point(10, 10);
  Point p2 = new Point(50, 50);
  RectRegion r3 = new RectRegion(p1, p2);
}</code></pre>

<h3><span style="color: #cc0000;">Do Now!</span> How many total <code>Point</code> objects are created in the program above?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "options": [
    {
      "answer": "6",
      "max_error": "0"
    }
  ]
}
```

</details>

---

<!-- step 2375517 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>It’s useful to draw this out as a diagram as we have done before, because it will help us understand the relationships between the objects.</p>

<table border="1" cellpadding="2" cellspacing="1" style="width: 100%;">
	<tbody>
		<tr>
			<td style="width: 63%;"><img alt="" height="1547" name="ExamplesRegion_diagram.jpg" src="https://ucarecdn.stepik.net/826f12c8-5227-4355-bb97-c58d1a21485d/" width="1427"></td>
			<td style="width: 36%;">
			<p>There are a few interesting things about this diagram worth calling out:</p>

			<ul>
				<li>
				<p>The <code>Points</code> with labels 8 and 9 are referenced both by the <code>ExamplesRegion</code> object in the <code>p1</code> and <code>p2</code> fields, and by the bottom-most <code>RectRegion</code> object’s <code>lowerLeft</code> and <code>upperRight</code> fields. These two <code>Point</code> objects were created once and then referenced in multiple places.</p>
				</li>
				<li>
				<p>There are two different <code>Point</code> objects (the ones labeled 6 and 7) that have the <code>x</code> and <code>y</code> fields both equal to <code>10</code>. The same is true for the objects whose <code>x</code> and <code>y</code> fields are both <code>50</code>. Because we used <code>new</code> to create different objects, these are separate, even though they have the same fields.</p>
				</li>
				<li>
				<p>The numbered labels match the printed output numbering, so if you run the program below, you should see numbers corresponding to these outputs.</p>
				</li>
			</ul>
			</td>
		</tr>
	</tbody>
</table>

<p><iframe height="875px" scrolling="yes" src="https://tech.io/playground-widget/f715b2929df81ecf8d03ea03ba1ed81420785/welcome/1085763/ExamplesRegion" width="100%"></iframe></p>

<p>This gives us a nice review of how objects and references are laid out after creation. Now we can go on to defining some methods on the new class we’ve defined.</p>

<h3><span style="color: #cc0000;">Do Now! </span>Use the diagram to answer the questions below. </h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "How many total objects are created in this program?<br>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "10",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><br> How many times is the object labeled with '9' referenced?<br>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "2",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><br> How many times is the object labeled with '10' referenced?<br>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "1",
          "is_correct": true
        }
      ]
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2375671 | type: text -->

<p>A natural method to want for <code>RectRegion</code> is one that checks if a given <code>Point</code> is contained within that region. For example, the point (60, 60) is in the example rectangle region we gave in the first step, but it wouldn’t be contained in the second example rectangle. Also, the point (20, 20) is contained in the second but not the first. This gives us the header and examples; we’ll write the examples as tests, using the testing support:</p>

<pre><code class="language-java">class RectRegion {
  // fields and constructor ...
 
  /*
    @param p The coordinates of a point to check for containment within this region
    @return true if the coordinate is contained in the region, false otherwise
  */
  boolean contains(Point p) {
 
  }
}
class ExamplesRegion {
  // Definitions of r1 through r3....
 
  Point toTest1 = new Point(60, 60);
  Point toTest2 = new Point(20, 20);
 
  boolean testContains(Tester t) {
    return t.checkExpect(this.r1.contains(this.toTest1), true) &amp;&amp;
           t.checkExpect(this.r2.contains(this.toTest1), false) &amp;&amp;
           t.checkExpect(this.r3.contains(this.toTest1), false) &amp;&amp;
           t.checkExpect(this.r1.contains(this.toTest2), false) &amp;&amp;
           t.checkExpect(this.r2.contains(this.toTest2), true) &amp;&amp;
           t.checkExpect(this.r3.contains(this.toTest2), true);
  }
 
}</code></pre>

<p>Next, we need to implement the method body for <code>contains()</code>. While there are several ways we could try to write it, this is a good opportunity to introduce a new strategy for working through a method implementation. It would be quite helpful here if <code>Point</code> had a method that could compare itself to another <code>Point</code> and check if both the <code>x</code> and <code>y</code> fields on the other point are greater than those of its own, and another method to tell if the <code>x</code> and <code>y</code> fields are less. These would let us check if the <code>Point</code> given to <code>contains()</code> is between the two <code>Point</code>s referred to by <code>lowerLeft</code> and <code>upperRight</code>. To be concrete, if these methods were defined, we could implement <code>contains()</code> with something like:</p>

<p><iframe height="650px" scrolling="yes" src="https://tech.io/playground-widget/f715b2929df81ecf8d03ea03ba1ed81420785/welcome/1085764/contains" width="100%"></iframe></p>

<p><img alt="" height="345" name="Screen Shot 2021-09-08 at 5.19.46 PM.png" src="https://ucarecdn.stepik.net/df34ec5f-5adf-4b28-a10b-b7ecaf5703f1/" width="808"></p>

<p>Of course, the methods <code>belowLeftOf()</code> and <code>aboveRightOf()</code> don’t exist yet, so the method above will simply report an error. But that’s OK, as long as we go back and implement <code>belowLeftOf()</code> and <code>aboveRightOf()</code>. The implementation above gave us a wish list of methods that, if only we had them, would make our job in our current task much easier. This is a common pattern when writing a more complicated program, and is one strategy for decomposing a problem into smaller pieces.</p>

---

<!-- step 2375677 | type: matching -->

**Quiz (matching)**

<p>Now we just need to go back and implement <code>belowLeftOf()</code> and <code>aboveRightOf()</code>. Let's start with <code>belowLeftOf()</code>. The image from the previous step is included here for reference.</p>

<p><img alt="" height="333" name="Screen Shot 2021-09-08 at 5.19.46 PM.png" src="https://ucarecdn.stepik.net/99d9bfc8-e83d-4a05-8b99-a332fe8d0061/" width="780"></p>

<p><iframe height="785px" scrolling="yes" src="https://tech.io/playground-widget/f715b2929df81ecf8d03ea03ba1ed81420785/welcome/1085765/belowLeftOf" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Match the code snippet with its corresponding blank. The code with the blanks has been copied below.</h3>

<pre><code class="language-java">boolean belowLeftOf(Point p) {
  return __BLANK1__ &gt; __BLANK2__ &amp;&amp; __BLANK3__ &gt; __BLANK4__;
}</code></pre>


<details><summary>Author source (answers)</summary>


```json
{
  "preserve_firsts_order": true,
  "is_html_enabled": true,
  "pairs": [
    {
      "first": "__BLANK1__",
      "second": "<code>p.x</code>"
    },
    {
      "first": "__BLANK2__",
      "second": "<code> this.x </code>"
    },
    {
      "first": "__BLANK3__",
      "second": "<code> p.y </code>"
    },
    {
      "first": "__BLANK4__",
      "second": "<code> this.y </code>"
    }
  ]
}
```

</details>

---

<!-- step 2375694 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Next, we need to implement <code>aboveRightOf()</code>.</p>

<p><iframe height="700px" scrolling="yes" src="https://tech.io/playground-widget/f715b2929df81ecf8d03ea03ba1ed81420785/welcome/1085766/aboveRightOf" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"> Do Now!</span> Fill in the blanks to complete the method.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "boolean",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> aboveRightOf( </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "Point",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> \n  p) {  <br>\n  &nbsp; return p.x\n</code>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": ">",
          "is_correct": false
        },
        {
          "text": "==",
          "is_correct": false
        },
        {
          "text": "<",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> this.x && </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "p.y",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>\n  &lt; this.y; <br>\n  }\n</code>",
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

<!-- step 2375695 | type: text -->

<p>Now that we have implemented the <code>belowLeftOf()</code> and <code>aboveRightOf()</code> methods, we can run the code from before and make sure that the <code>contains()</code> method properly returns true when the <code>Point</code> is contained within the region.</p>

<p><span style="color: #cc0000;"><strong>Do Now! </strong></span>Paste the implementations of <code>belowLeftOf()</code> and <code>aboveRightOf()</code> in the <code>Point</code> class. Run to code and ensure that <code>contains()</code> works as expected.</p>

<p><iframe height="1140px" scrolling="yes" src="https://tech.io/playground-widget/f715b2929df81ecf8d03ea03ba1ed81420785/welcome/1085767/contains" width="100%"></iframe></p>