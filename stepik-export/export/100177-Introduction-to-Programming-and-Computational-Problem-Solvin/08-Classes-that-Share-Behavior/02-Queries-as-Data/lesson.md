# Queries as Data


---

<!-- step 2333965 | type: text -->

<p>To solve the problem from the previous lesson, let’s step back a bit. We created a class, <code>ImageData</code>, to represent the data for an image, and then we started representing queries with methods. <strong>What if, instead of thinking of each possible query type as a method, we thought of each query as a class?</strong> We could use the data that a user enters for the various search terms to construct an object, and then we can write methods to manipulate those query objects.</p>

<p>Let’s start with something simple. A query for a minimum size can be represented as a class that stores the minimum width and height that we want to check for:</p>

<pre><code class="language-java">class LargerThan {
  int minWidth, minHeight;
  LargerThan(int minWidth, int minHeight) {
    this.minWidth = minWidth;
    this.minHeight = minHeight;
  }
}</code></pre>

<p>Here, we took the parameters—the information from the query—of the <code>largerThan()</code> method from before (added below for reference) and made them into fields of the class that we created to represent the query.</p>

<pre><code>// We learned in the previous lesson that this is not the best way
// to represent image queries.

class ImageData {
  int width;       // the width in pixels
  int height;      // the height in pixels

  //(default constructor here)

  boolean largerThan(int minWidth, int minHeight) {
    return this.width &gt;= minWidth &amp;&amp; this.height &gt;= minHeight;
  }
}</code></pre>

---

<!-- step 2333988 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>To do the actual work of the query, we can define a method called <code>matches()</code> that takes an <code>ImageData</code> object and returns <code>true</code> if it matches the query:</p>

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/fe6cf9cdc68f18353b81b19aab33d9cb20785/welcome/1090757/matches" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Fill in the expected value of each call to <code>matches()</code>.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code> this.lg1.matches(i1) </code>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": true
        },
        {
          "text": "false",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code> this.lg2.matches(i1) </code>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": false
        },
        {
          "text": "false",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code> this.lg3.matches(i1) </code>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": false
        },
        {
          "text": "false",
          "is_correct": true
        }
      ]
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": false,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2371029 | type: choice -->

**Quiz (choice)**

<pre><code>//code from previous step

class LargerThan {
  int minWidth, minHeight;
  //(default constructor here)

  boolean matches(ImageData id) {
    return id.width &gt;= this.minWidth &amp;&amp; id.height &gt;= this.minHeight;
  }
}</code></pre>

<p>We haven’t changed the actual calculation that’s happening. We just moved data around so it is first stored in the fields, and then we compared that data in the <code>matches()</code> method, rather than doing it in the <code>largerThan()</code> method of <code>ImageData</code>.</p>

<p>We can repeat this process for the extension query:</p>

<p><iframe height="600px" scrolling="yes" src="https://tech.io/playground-widget/487b8c1cc8796b8ab9d0f87474a8ac9420785/welcome/1085955/matches" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Select all the options to replace <code>/* FILL IN */</code> that would make the <code>matches()</code> method pass all of the tests. (Hint: when running these options, make sure to scroll down to see the entire output)</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": true,
  "is_always_correct": false,
  "sample_size": 5,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": true,
  "options": [
    {
      "is_correct": true,
      "text": "<code>id.filetype.equals(this.ext)</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>this.ext.equals(id.filetype)</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>this.id.filetype.equals(this.ext)</code>",
      "feedback": "Is `id` a field?"
    },
    {
      "is_correct": false,
      "text": "<code>id.filetype.equals(\"png\")</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> this.ext == id </code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2334025 | type: text -->

<h2>Summary</h2>

<ul>
	<li>Instead of representing each query as a method, we can represent each query with a class.</li>
	<li>We took the parameter of the <code>matchesExtension()</code> method from before, made it a field of the new <code>MatchesExtension</code> class, and put the same calculation from <code>matchesExtension()</code> into its <code>matches()</code> .</li>
	<li>We’re actually much closer to a solution to our problem of combining queries than we were before, though it’s not quite clear why yet.</li>
</ul>