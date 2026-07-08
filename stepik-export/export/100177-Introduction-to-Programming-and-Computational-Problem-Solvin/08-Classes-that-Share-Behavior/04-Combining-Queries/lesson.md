# Combining Queries


---

<!-- step 2334156 | type: string -->

**Quiz (string)**

<p>So far, we’ve represented queries themselves as data and have identified their common behavior: the <code>matches()</code> method. We expressed this in Java by defining an interface named <code>ImageQuery</code> . We indicated that both <code>LargerThan</code> and <code>MatchesExtension</code> use this interface by using <code>implements</code>. Next, we’ll use this idea to build a new class that represents combining two queries to make a new query, which will return true only if both subqueries return true.</p>

<p>We’ll call it <code>AndQuery</code>:</p>

<pre><code class="language-java">class AndQuery {
  ImageQuery iq1, iq2;
  AndQuery(ImageQuery iq1, ImageQuery iq2) {
    this.iq1 = iq1;
    this.iq2 = iq2;
  }
  boolean matches(ImageData id) {
    return this.iq1.matches(id) &amp;&amp; this.iq2.matches(id);
  }
}
</code></pre>

<p>Let’s try it in an example:</p>

<p><iframe height="715px" scrolling="yes" src="https://tech.io/playground-widget/2a13e51e70ee291d4c662ee22e53c7c120785/welcome/1089189/AndQuery" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>What is the expected value of <code>this.aq2.matches(i1)</code>?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "false",
  "use_re": false,
  "match_substring": false,
  "case_sensitive": true,
  "code": "# def check(reply):\n#     \"\"\"Evaluate the learner's reply.\n#\n#     It should return 1 or True for the correct reply and 0 or False\n#     for the incorrect one.\n#\n#     A partial solution may be scored using a float number from the\n#     interval (0, 1). In such a case the learner total score for the\n#     problem will be 'step cost' * 'score'.\n#\n#     :param reply: a string that is the learner's reply to the problem\n#     :return: a score number (int or float) in range [0, 1]\n#\n#     \"\"\"\n#     return reply == \"Hello\"\n\n# def solve():\n#     \"\"\"Return a correct reply. This function is *optional*.\n#\n#     It is used to test the correctness of the 'check' function.\n#\n#     :return: a string that is a correct reply to the problem\n#\n#     \"\"\"\n#     return \"Hello\"",
  "is_text_disabled": false,
  "is_file_disabled": true
}
```

</details>

---

<!-- step 2379538 | type: parsons -->

**Quiz (parsons)**

<p>What we have so far means that any time we want to make multiple queries at once, we can construct a new <code>AndQuery</code> and use it to make the query. This moves the work from writing a custom method for every combination of queries to constructing and using an <code>AndQuery</code> object. We can add new kinds of queries, like searching based on a particular keyword, without changing any existing code – we just write a new <code>ImageQuery</code>-implementing class.</p>

<p><iframe height="750px" scrolling="yes" src="https://tech.io/playground-widget/2a13e51e70ee291d4c662ee22e53c7c120785/welcome/1089190/ContainsKeyword" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Write a class called <code>ContainsKeyword</code> that implements the <code>ImageQuery</code> interface. It should have one <code>String</code> field that represents the keyword to search for, and its <code>matches</code> method should return <code>true</code> when the string appears somewhere in the given <code>ImageData</code>'s <code>keywords</code> field.</h3>

<p>(Hint: the <code>&lt;</code> and <code>&gt;</code> buttons will change the amount of indentation for that line of code. Think of 1 indentation as 2 spaces. The correct answer will have indentations that are consistent with the code written above and throughout this book.)</p>


<details><summary>Author source (answers)</summary>


```json
{
  "lines": [
    {
      "text": "class ContainsKeyword implements ImageQuery {",
      "level": 0
    },
    {
      "text": "String keyword;",
      "level": 1
    },
    {
      "text": "public ContainsKeyword(String keyword) {",
      "level": 1
    },
    {
      "text": "this.keyword = keyword;",
      "level": 2
    },
    {
      "text": "}",
      "level": 1
    },
    {
      "text": "public boolean matches(ImageData id) {",
      "level": 1
    },
    {
      "text": "return id.keywords.indexOf(this.keyword) != -1;",
      "level": 2
    },
    {
      "text": "}",
      "level": 1
    },
    {
      "text": "}",
      "level": 0
    }
  ],
  "indent": 4,
  "language": "java"
}
```

</details>

---

<!-- step 2334254 | type: text -->

<p>There’s a slight annoyance remaining, though. Let’s say we wanted to combine three, rather than two, queries together in this way. It seems we would have to write another class, <code>AndQuery3</code>, with three <code>ImageQuery</code> fields, and a new <code>matches()</code> method. Since a user may want, in general, <em>many</em> conditions, we would need an <code>AndQuery4</code>, <code>AndQuery5</code>, and so on.</p>

<p>There’s a useful observation we can make about the <code>AndQuery</code> class that will help us here: it has the same method signature for the <code>matches()</code> method as the <code>ImageQuery</code> interface does! That immediately suggests that we could make <code>AndQuery</code> implement that interface. Let’s do it:</p>

<pre><code class="language-java">class AndQuery implements ImageQuery {
  ImageQuery iq1, iq2;
  AndQuery(ImageQuery iq1, ImageQuery iq2) {
    this.iq1 = iq1;
    this.iq2 = iq2;
  }
  public boolean matches(ImageData id) {
    return this.iq1.matches(id) &amp;&amp; this.iq2.matches(id);
  }
}</code></pre>

<p><em>(Note that we also made the method <code>public</code>.)</em></p>

---

<!-- step 2334261 | type: string -->

**Quiz (string)**

<p>Now, we have three different classes that implement <code>ImageQuery</code>: the original two queries, <code>LargerThan</code> and <code>MatchesExtension</code>, and the one we just noticed, <code>AndQuery</code>. All of these are candidates that we could use when combining queries together – including <code>AndQuery</code> itself! This suggests a way forward to combining three queries together, using the pieces we’ve seen.</p>

<p>The key idea is to think of it as two queries, one of which is an <code>AndQuery</code> itself. That is, we’ll first use an AndQuery to combine the first two conditions, and then we'll use another <code>AndQuery</code> to combine that result with the third. In code, that looks like:</p>

<p><iframe height="650px" scrolling="yes" src="https://tech.io/playground-widget/2a13e51e70ee291d4c662ee22e53c7c120785/welcome/1089191/Combining%20AndQueries" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>What is the expected value of <code>(new AndQuery(this.lg1, new AndQuery(this.me1, this.ck1))).matches(i1)</code>?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "true",
  "use_re": false,
  "match_substring": false,
  "case_sensitive": false,
  "code": "# def check(reply):\n#     \"\"\"Evaluate the learner's reply.\n#\n#     It should return 1 or True for the correct reply and 0 or False\n#     for the incorrect one.\n#\n#     A partial solution may be scored using a float number from the\n#     interval (0, 1). In such a case the learner total score for the\n#     problem will be 'step cost' * 'score'.\n#\n#     :param reply: a string that is the learner's reply to the problem\n#     :return: a score number (int or float) in range [0, 1]\n#\n#     \"\"\"\n#     return reply == \"Hello\"\n\n# def solve():\n#     \"\"\"Return a correct reply. This function is *optional*.\n#\n#     It is used to test the correctness of the 'check' function.\n#\n#     :return: a string that is a correct reply to the problem\n#\n#     \"\"\"\n#     return \"Hello\"",
  "is_text_disabled": false,
  "is_file_disabled": true
}
```

</details>

---

<!-- step 2379543 | type: parsons -->

**Quiz (parsons)**

<p>This idea isn’t limited to just three queries – we can combine an arbitrary number of queries together with this strategy. This gives us the ability to create quite complex queries by creating new query classes and combining them together. There’s a wealth of query types we could create to build on this idea and build quite a sophisticated set of matching checks for single images.</p>

<p><em>(Later lessons will show us how to use this idea to process an entire list of images to find the ones that match a query.)</em></p>

<p><iframe height="650px" scrolling="yes" src="https://tech.io/playground-widget/2a13e51e70ee291d4c662ee22e53c7c120785/welcome/1089192/OrQuery" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Write a class <code>OrQuery</code> that implements the <code>ImageQuery</code> interface, has two <code>ImageQuery</code> fields, and matches an <code>ImageData</code> if either or both of the two match.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "lines": [
    {
      "text": "class OrQuery implements ImageQuery {",
      "level": 0
    },
    {
      "text": "ImageQuery q1, q2;",
      "level": 1
    },
    {
      "text": "OrQuery(ImageQuery q1, ImageQuery q2) {",
      "level": 1
    },
    {
      "text": "this.q1 = q1;",
      "level": 2
    },
    {
      "text": "this.q2 = q2;",
      "level": 2
    },
    {
      "text": "}",
      "level": 1
    },
    {
      "text": "public boolean matches(ImageData id) {",
      "level": 1
    },
    {
      "text": "return this.q1.matches(id) || this.q2.matches(id);",
      "level": 2
    },
    {
      "text": "}",
      "level": 1
    },
    {
      "text": "}",
      "level": 0
    }
  ],
  "indent": 4,
  "language": "java"
}
```

</details>

---

<!-- step 2456211 | type: text -->

<h2>Summary</h2>

<ul>
	<li>We can combine multiple queries by writing the <code>AndQuery</code> and <code>OrQuery</code> classes.</li>
	<li>The <code>AndQuery</code> and <code>OrQuery</code> classes both only contain 2 <code>ImageQuery</code> fields, so on its own, an <code>AndQuery</code> or <code>OrQuery</code> object can only handle 2 queries at a time.</li>
	<li>Because <code>AndQuery</code> contained a <code>matches()</code> method that had the same header as the one included in the <code>ImageQuery</code> interface, <code>AndQuery</code> could implement the <code>ImageQuery</code> interface, thus allowing us to use an <code>AndQuery</code> object as a field.</li>
</ul>