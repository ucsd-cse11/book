# Abstracting Common Method Implementations


---

<!-- step 2339778 | type: text -->

<p>Java (as well as many other languages that support objects and classes) has a feature for precisely this situation, where multiple classes could share an implementation of a method. Note that this situation is more specific than the situation that we identified with interfaces, where multiple classes shared a common method header but had different implementations. Here, the method header and the implementation—the <em>entire </em>method definition—is the same across these classes.</p>

<p>When this situation comes up, we can declare an <code>abstract class</code> that contains the shared implementations. An <code>abstract class</code> is written like a class with <code>abstract</code> at the beginning, and it lists fields and methods (we’ll just use methods for now). Methods can also be started with <code>abstract</code>, which means they don’t have a shared implementation, or they can be written out normally. Here’s an <code>abstract class</code> that defines the <code>and()</code> method:</p>

<pre><code class="language-java">abstract class AQuery implements ImageQuery {
  public ImageQuery and(ImageQuery other) {
    return new AndQuery(this, other);
  }
}</code></pre>

<p><em>(Note that we declared that the <code>AQuery</code> <code>abstract class</code> <code>implements</code> the <code>ImageQuery</code> interface.)</em></p>

---

<!-- step 2540659 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>We can now use a new keyword, <code>extends</code>, to let each of the individual query classes have access to the single implementation of <code>and()</code>,which is in <code>AQuery</code>. This would enable us to remove the individual definitions of the <code>and()</code> method from each of these classes. So <code>ContainsKeyword</code> becomes:</p>

<pre><code class="language-java">class ContainsKeyword extends AQuery {
  // ... just the fields, constructors, and match(). No and() method ...
}</code></pre>

<p><em>(We no longer need to include <code>implements ImageQuery</code> for the <code>ContainsKeyword</code> class because <code>AQuery</code> implements the <code>ImageQuery</code> interface.)</em></p>

<p><span style="color: #cc0000;"><strong>Do Now! </strong></span>In the code example below,  the <code>ContainsKeyword</code> class does not use <code>extends AQuery</code> and does not contain an implementation of the <code>and()</code> method. Run the code as-is, and notice that there is an error message.</p>

<p><iframe height="760px" scrolling="yes" src="https://tech.io/playground-widget/7d9480ec86daacc3524c40d5605c5dfa20785/welcome/1086014/extends%20AQuery" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Replace <code>implements ImageQuery</code> with <code>extends AQuery</code> in the <code>ContainsKeyword</code> class and fill in the blanks based on the output.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>\nExamplesSearch: <br>\n--------------- <br>\nnew ExamplesSearch:1( <br>\n&nbsp;this.ck1 = new ContainsKeyword:\n</code>",
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
      "text": "<code>\n(<br>&nbsp; this.keyword = \n</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "\"data\"",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>)<br>&nbsp;</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "this.ck2",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>\n= new ContainsKeyword:3(<br>\n&nbsp; this.keyword = \"science\")<br>\n&nbsp;this.query1 = new AndQuery:\n</code>",
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
      "text": "<code>\n(<br>\n&nbsp; this.iq1 = ContainsKeyword:2<br>\n&nbsp; this.iq2 = \n</code>",
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
      "text": "<code>:3))</code>",
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

<!-- step 2540667 | type: number -->

**Quiz (number)**

<p>We’d add the same <code>extends AQuery</code> clause to each query class, which allows us to remove the identical copies of the <code>and()</code> method and just use the one in <code>AQuery</code>. This way, we only need to write the <code>and()</code> method once, and we can get its benefits for all the classes that <strong>extend</strong> the <code>AQuery</code> class.</p>

<p><iframe height="700px" scrolling="yes" src="https://tech.io/playground-widget/7d9480ec86daacc3524c40d5605c5dfa20785/welcome/1086015/extends%20AQuery" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Make each class extend <code>AQuery</code>. Then run the code to confirm that there are no error messages. In the box below, enter the number of objects created in the program. (That is, what is the largest reference number in the output?)</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "options": [
    {
      "answer": "10",
      "max_error": "0"
    }
  ]
}
```

</details>

---

<!-- step 2540668 | type: text -->

<h2>Summary</h2>

<ul>
	<li>To avoid repeating code when the implementation is exactly the same across classes, we can use an <strong>abstract class</strong>.</li>
	<li>We use the keyword <code><strong>extends</strong></code> in the header of a class to indicate that the class should be able to use any of the methods or fields defined in the abstract class.</li>
	<li>For example, the header <code>class ContainsKeyword extends AQuery</code> indicates that any <code>ContainsKeyword</code> object can use the <code>and()</code> method, which is defined in the <code>AQuery</code> abstract class.</li>
</ul>