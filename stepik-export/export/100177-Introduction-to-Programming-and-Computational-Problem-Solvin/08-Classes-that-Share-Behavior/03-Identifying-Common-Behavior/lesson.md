# Identifying Common Behavior


---

<!-- step 2370765 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>The key insight from the last 2 lessons is that we’ve defined two different methods with exactly the same signature:</p>

<pre><code class="language-java">class MatchesExtension {
  ...
  boolean matches(ImageData id) { ... }
}
class LargerThan {
  ...
  boolean matches(ImageData id) { ... }
}</code></pre>

<p>Whenever we see this situation come up, we have the opportunity to create an <strong>interface</strong> that captures this shared functionality. In this case, the interface should describe the <code>matches</code> method. To write an interface, we use the <code>interface</code> keyword, followed by the name of the interface, and then write a series of method headers between curly braces:</p>

<pre><code class="language-java">interface ImageQuery {
  boolean matches(ImageData id);
}</code></pre>

<p>This definition gives us the ability to use <code>ImageQuery</code> as a new type that describes objects that implement the <code>matches</code> method with this signature. Or rather, it almost does – we have to explicitly mark on all the classes we want to use in this way that they implement the interface. To mark the classes as such, we use the <code>implements</code> keyword:</p>

<pre><code class="language-java">class MatchesExtension implements ImageQuery {
  ...
  public boolean matches(ImageData id) { ... }
}
class LargerThan implements ImageQuery {
  ...
  public boolean matches(ImageData id) { ... }
}
</code></pre>

<p><em>(Notice that we also marked the method itself as <code>public</code>, which, in contrast to <code>private</code>, makes the method available in any context. We’ll have a dedicated lesson later on about <code>public</code> and <code>private</code>. For now, <code>public</code> doesn’t change anything from our point of view, since it would only change visibility of fields in projects that used lots of files organized across different directories.)</em></p>

<p>This tells Java that we want to be able to use <code>ImageQuery</code> as the type for the fields that store these objects, for example:</p>

<pre><code class="language-java">class ExamplesSearch {
  ImageData i1 = new ImageData("ucsd cse computer science", "png", 600, 400);
  ImageQuery lg1 = new LargerThan(600, 400);
  ImageQuery me1 = new MatchesExtension("jpg");
  boolean testQuery(Tester t) {
    return t.checkExpect(this.lg1.matches(i1), true) &amp;&amp;
           t.checkExpect(this.me1.matches(i1), false);
  }
}</code></pre>

<h3><span style="color: #cc0000;">Do Now! </span>Answer the questions according to the code given above.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "What is the type for the field <code>lg1</code>?",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "ImageData",
          "is_correct": false
        },
        {
          "text": "ImageQuery",
          "is_correct": true
        },
        {
          "text": "LargerThan",
          "is_correct": false
        },
        {
          "text": "MatchesExtension",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>\nWhat is the type for the field <code>me1</code>?",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "ImageData",
          "is_correct": false
        },
        {
          "text": "ImageQuery",
          "is_correct": true
        },
        {
          "text": "LargerThan",
          "is_correct": false
        },
        {
          "text": "MatchesExtension",
          "is_correct": false
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

<!-- step 2334110 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Note that we cannot look up fields, like <code>minWidth</code>, using the field <code>lg1</code>. When the type of the variable is an interface, Java will only let us access the <em>methods</em> <em>listed in the interface definition</em>. The interface definition does not contain any fields.</p>

<p><iframe height="720px" scrolling="yes" src="https://tech.io/playground-widget/487b8c1cc8796b8ab9d0f87474a8ac9420785/welcome/1085956/Field%20access%20(or%20lack%20thereof)" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Paste <code>int queryMinWidth = this.lg1.minWidth;</code> onto line 48. Run the code and fill in the blanks for the error message it produces. </h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "At the end of the 1st line of the error message: <br>\n<code> error: </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "cannot find symbol",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><br>From the 4th line of the error message: <br>\n<code>symbol:   variable </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "minWidth",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><br>From the last line of the error message: <br>\n<code> location: variable </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "lg1",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> of type </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "ImageQuery",
          "is_correct": true
        }
      ]
    }
  ],
  "is_case_sensitive": true,
  "is_detailed_feedback": true,
  "is_partially_correct": true
}
```

</details>

---

<!-- step 2456026 | type: text -->

<h2>Summary</h2>

<ul>
	<li>We can write an <strong>interface</strong> to capture shared functionality between classes. Inside this interface, we can include method headers.</li>
	<li>A class that <strong>implements</strong> an interface must contain its own implementation of each method whose header is included in the interface.</li>
	<li>To write an interface, we put the keyword <code>interface</code> in front of the name of the interface, and we put our method headers between the curly brackets that come after the name.</li>
	<li>A class that implements an interface should have the keyword <code>implements</code> after the name of the class, and the name of the interface goes after the <code>implements</code> keyword.
	<ul>
		<li>e.g. A class named MatchesExtension that implements the ImageQuery interface would look like <code>class MatchesExtension implements ImageQuery { ... }</code></li>
	</ul>
	</li>
	<li>An interface can be used as a type, and a field or variable whose type is an interface can store a reference to any object of a class that implements that interface.</li>
</ul>