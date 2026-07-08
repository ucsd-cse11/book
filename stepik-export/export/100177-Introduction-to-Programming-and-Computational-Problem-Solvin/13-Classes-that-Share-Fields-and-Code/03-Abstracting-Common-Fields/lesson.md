# Abstracting Common Fields


---

<!-- step 2339998 | type: text -->

<p>Consider the class <code>AndQuery</code> and the related class <code>OrQuery</code>:</p>

<pre><code class="language-java">class AndQuery extends AQuery {
  ImageQuery q1, q2;
  AndQuery(ImageQuery q1, ImageQuery q2) {
    this.q1 = q1;
    this.q2 = q2;
  }
  public boolean matches(ImageData id) {
    return this.q1.matches(id) &amp;&amp; this.q2.matches(id);
  }
}
class OrQuery extends AQuery {
  ImageQuery q1, q2;
  OrQuery(ImageQuery q1, ImageQuery q2) {
    this.q1 = q1;
    this.q2 = q2;
  }
  public boolean matches(ImageData id) {
    return this.q1.matches(id) || this.q2.matches(id);
  }
}</code></pre>

<p>These two classes share a lot of code. For example, they have the exact same two field definitions (<code>q1</code> and <code>q2</code>), and their constructors are identical aside from their names. Similar to the case from before, where we identified completely-shared method definitions, here we’ve identified completely-shared field and constructor definitions. In this case again, we can “abstract out” the shared behavior into an abstract class:</p>

<pre><code class="language-java">abstract class AComboQuery extends AQuery {
  ImageQuery q1, q2;
  AComboQuery(ImageQuery q1, ImageQuery q2) {
    this.q1 = q1;
    this.q2 = q2;
  }
}
class AndQuery extends AComboQuery {
  AndQuery(ImageQuery q1, ImageQuery q2) {
    super(q1, q2);
  }
  public boolean matches(ImageData id) {
    return this.q1.matches(id) &amp;&amp; this.q2.matches(id);
  }
}
class OrQuery extends AComboQuery {
  OrQuery(ImageQuery q1, ImageQuery q2) {
    super(q1, q2);
  }
  public boolean matches(ImageData id) {
    return this.q1.matches(id) || this.q2.matches(id);
  }
}</code></pre>

---

<!-- step 2540866 | type: fill-blanks -->

**Quiz (fill-blanks)**

<pre><code class="language-java">//code from the previous step, for reference

abstract class AComboQuery extends AQuery {
  ImageQuery q1, q2;
  AComboQuery(ImageQuery q1, ImageQuery q2) {
    this.q1 = q1;
    this.q2 = q2;
  }
}
class AndQuery extends AComboQuery {
  AndQuery(ImageQuery q1, ImageQuery q2) {
    super(q1, q2);
  }
  public boolean matches(ImageData id) {
    return this.q1.matches(id) &amp;&amp; this.q2.matches(id);
  }
}
class OrQuery extends AComboQuery {
  OrQuery(ImageQuery q1, ImageQuery q2) {
    super(q1, q2);
  }
  public boolean matches(ImageData id) {
    return this.q1.matches(id) || this.q2.matches(id);
  }
}</code></pre>

<p>This introduces a new keyword, <code>super</code>. Within constructors, <code>super</code> means “call the constructor of the class that this one extends.” So when the constructor for <code>AndQuery</code> runs, it will immediately call the constructor in the <code>AComboQuery</code> abstract class, since <code>AndQuery</code> extends it. The other new behavior we see here is that all the fields declared in <code>AComboQuery</code> are present in <code>AndQuery</code> and <code>OrQuery</code> objects – this was the point of moving them into a shared abstract class, so we could write them once and use them in both places.</p>

<p><em>(We may see other uses of <code>super</code> outside of constructors in the future.)</em></p>

<p><iframe height="920px" scrolling="yes" src="https://tech.io/playground-widget/889c85520367e6dd1595bbac472f6da320785/welcome/1095252/super" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> In the code above, the line <code>super(q1, q2);</code> in the <code>OrQuery</code> constructor has been commented out. Run the code as-is and fill in the blanks based on the output.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>\n<u>ExamplesSearch.java:25</u>: error: constructor\n</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "AComboQuery",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>\nin class AComboQuery \n</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "cannot be applied",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>\nto given types;<br>...<br>\nrequired: \n</code>",
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
    },
    {
      "type": "text",
      "text": "<code>, </code>",
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
    },
    {
      "type": "text",
      "text": "<br><code>\nfound:\n</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "no arguments",
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

<!-- step 2540892 | type: text -->

<h2>Summary</h2>

<ul>
	<li>A class can also use the fields of the class that it extends.</li>
	<li>In a constructor, the keyword <strong><code>super</code></strong> means “call the constructor of the class that this one extends.”</li>
	<li>For example, in the <code>OrQuery</code> constructor, <code>super(q1, q2)</code> meant "call the constructor for <code>AComboQuery</code> with <code>q1</code> and <code>q2</code> as arguments".</li>
</ul>