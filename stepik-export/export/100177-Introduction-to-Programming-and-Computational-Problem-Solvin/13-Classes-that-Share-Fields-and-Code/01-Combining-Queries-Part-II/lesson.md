# Combining Queries, Part II


---

<!-- step 2540601 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p><em>(Review the examples from <a href="https://stepik.org/lesson/574307/step/1?unit=568892" rel="noopener noreferrer nofollow">module 8</a> before proceeding with this module. Make sure that you understand interfaces.)</em></p>

<p>In <a href="https://stepik.org/lesson/574433/step/1?unit=569019" rel="noopener noreferrer nofollow">a previous lesson</a>, we saw how we could combine search queries together using combiner-classes like <code>AndQuery</code> and <code>OrQuery</code>. This allowed us to write queries like <code>all3</code>:</p>

<pre><code class="language-java">class ExamplesSearch {
  ImageData i1 = new ImageData("ucsd cse computer science", "png", 600, 400);
  ImageData i2 = new ImageData("data science ai artificial intelligence", "png", 500, 400);
  ImageQuery lg1 = new LargerThan(600, 400);
  ImageQuery me1 = new MatchesExtension("png");
  ImageQuery ck1 = new ContainsKeyword("ucsd");
  ImageQuery all3 = new AndQuery(new AndQuery(this.lg1, this.me1), this.ck1);
}</code></pre>

<p>One thing that gets a bit verbose here is the <em>construction</em> of the combiners. If we make large queries, we end up repeating <code>new AndQuery</code> quite a few times, which is a lot of typing:</p>

<pre><code class="language-java">class ExamplesSearch {
  ImageQuery ck1 = new ContainsKeyword("ucsd");
  ImageQuery ck2 = new ContainsKeyword("data");
  ImageQuery ck3 = new ContainsKeyword("science");
  ImageQuery ck4 = new ContainsKeyword("artificial");
  ImageQuery ck5 = new ContainsKeyword("intelligence");
  ImageQuery all5 = new AndQuery(new AndQuery(new AndQuery(new AndQuery(this.ck1, this.ck2), this.ck3), this.ck4), this.ck5);
}
</code></pre>

<p>While this isn’t unusable, it’s often nice to find ways to shorten code like this. One idea is to have a method called <code>and()</code> for the various <code>ImageQuery</code> classes. It would take another <code>ImageQuery</code> and produce a new <code>AndQuery</code> of the two. In that case, for example, we could shorten <code>new AndQuery(this.ck1, this.ck2)</code> to <code>this.ck1.and(this.ck2)</code> , which would return an equivalent result.</p>

<p>To implement <code>and()</code>, we’d write, in <code>ContainsKeyword</code>:</p>

<pre><code class="language-java">class ContainsKeyword implements ImageQuery {
  ...
  public AndQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}</code></pre>

<p><iframe height="820px" scrolling="yes" src="https://tech.io/playground-widget/889c85520367e6dd1595bbac472f6da320785/welcome/1095247/ExamplesSearch.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Based on the code above, fill in the references that the field values for <code>usingNew</code> and <code>usingAndMethod</code> contain according to the output. <code>usingNew.iq1</code> has been filled in as an example.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code> AndQuery usingNew = new AndQuery(this.ck1, this.ck2); </code><br>\n<code>&nbsp;usingNew.iq1 = ContainsKeyword:4</code><br>\n<code>&nbsp;usingNew.iq2 = </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "ContainsKeyword",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>:</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "5",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><br>\n<code> AndQuery usingAndMethod = this.ck1.and(this.ck2); </code><br>\n<code>&nbsp;usingAndMethod.iq1 = </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "ContainsKeyword",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>:</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "4",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>\n<code>&nbsp;usingAndMethod.iq2 = </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "ContainsKeyword",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>:</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "5",
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

<!-- step 2540643 | type: text -->

<pre><code class="language-java">class ExamplesSearch {
  ImageQuery ck1 = new ContainsKeyword("ucsd");
  ImageQuery ck2 = new ContainsKeyword("data");
  ImageQuery ck3 = new ContainsKeyword("science");
  ImageQuery ck4 = new ContainsKeyword("artificial");
  ImageQuery ck5 = new ContainsKeyword("intelligence");
  ImageQuery all5 = new AndQuery(new AndQuery(new AndQuery(new AndQuery(this.ck1, this.ck2), this.ck3), this.ck4), this.ck5);
}

class ContainsKeyword implements ImageQuery {
  ...
  public AndQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}</code></pre>

<p>Eventually, we want to modify this <code>and()</code> method so that we can use it to shorten <code>new AndQuery(new AndQuery(new AndQuery(new AndQuery(this.ck1, this.ck2), this.ck3), this.ck4), this.ck5)</code> to <code>this.ck1.and(this.ck2).and(this.ck3).and(this.ck4).and(this.ck5)</code>. The memory diagram to demonstrate the equivalence of these two expressions is shown below.</p>

<p><img alt="" height="925" name="stepik13.png" src="https://ucarecdn.stepik.net/e3b0b368-be98-4083-8218-b88b966efeea/" width="1280"></p>

---

<!-- step 2338163 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Of course, we have more types of queries than just <code>ContainsKeyword</code>, so it isn't sufficient to just implement the <code>and()</code> method in one place. We need to add it to all the classes that we want to use <code>and()</code> on, and we'll also generalize the return type to <code>ImageQuery</code>.</p>

<pre><code class="language-java">class MatchesExtension implements ImageQuery {
  ...
  public ImageQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}
class LargerThan implements ImageQuery {
  ...
  public ImageQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}
class AndQuery implements ImageQuery {
  ...
  public ImageQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}</code></pre>

<p>We could try to run an example like this:</p>

<pre><code class="language-java">class ExamplesSearch {
  ImageQuery lg1 = new LargerThan(600, 400);
  ImageQuery me1 = new MatchesExtension("png");
  ImageQuery ck1 = new ContainsKeyword("ucsd");
  ImageQuery ck2 = new ContainsKeyword("data");
  ImageQuery all5 = this.lg1.and(this.me1).and(this.ck1).and(this.ck2);
}</code></pre>

<p>However, this still isn’t quite enough to make it run. Try it, and look at the error message:</p>

<p><iframe height="770px" scrolling="yes" src="https://tech.io/playground-widget/889c85520367e6dd1595bbac472f6da320785/welcome/1095248/ExamplesSearch.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Use the code above to answer the following questions.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "What is the type for <code>lg1</code>, <code>me1</code>, <code>ck1</code>, and <code>ck2</code>?<br>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "MatchesExtension",
          "is_correct": false
        },
        {
          "text": "LargerThan",
          "is_correct": false
        },
        {
          "text": "ContainsKeyword",
          "is_correct": false
        },
        {
          "text": "ImageQuery",
          "is_correct": true
        },
        {
          "text": "AndQuery",
          "is_correct": false
        },
        {
          "text": "ImageData",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><br> Does <code> ImageQuery </code> include a method called <code> and </code>?<br>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "Yes",
          "is_correct": false
        },
        {
          "text": "No",
          "is_correct": true
        }
      ]
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": true
}
```

</details>

---

<!-- step 2338173 | type: text -->

<p>Since all the names in the example in the previous step have type <code>ImageQuery</code>—the interface type—Java won’t let us use the <code>and()</code> method on them. We have to first declare that method as part of the interface:</p>

<pre><code class="language-java">interface ImageQuery {
  boolean matches(ImageData id);
  ImageQuery and(ImageQuery other);
}</code></pre>

<p>Now the example above will run, and we can use this idea of the <code>and()</code> method to shrink our code. Notice that the shortened version of the example from the first step also runs here.</p>

<p><iframe height="950px" scrolling="yes" src="https://tech.io/playground-widget/889c85520367e6dd1595bbac472f6da320785/welcome/1095249/ExamplesSearch.java" width="100%"></iframe></p>

<p>However, to shorten that line, we paid a particular cost – we had to put the same <code>and()</code> method in each of the <code>ImageQuery</code>-implementing classes. This is a bunch of repeated work. It might be worth it if we have hundreds of lines of code that make use of this, but it’s still annoying to repeat code when it is <em>exactly the same</em> across classes.</p>

---

<!-- step 2540649 | type: text -->

<h2>Summary</h2>

<ul>
	<li>Combinations of many queries can take up a lot of space. To try to shorten our code, we came up with a method called <code>and()</code> that would return a new <code>AndQuery</code> of itself and its argument.</li>
	<li>To make this <code>and()</code> method work with different types of queries, we had to add it to the <code>Query</code> interface and write the exact same code for the method in each class that implements <code>Query</code>. This is less than ideal.</li>
</ul>