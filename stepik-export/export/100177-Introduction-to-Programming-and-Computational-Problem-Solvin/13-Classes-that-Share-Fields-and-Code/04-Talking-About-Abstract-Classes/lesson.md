# Talking About Abstract Classes


---

<!-- step 2340049 | type: text -->

<p>Some definitions are useful at this point:</p>

<ul>
	<li>
	<p>The general space of features where one class <code>extends</code> another and re-uses some methods and/or fields is called <strong>inheritance.</strong> For example, we say that <code>AndQuery</code> <strong>inherits</strong> the <code>and</code> method from the <code>AQuery</code> class, and <code>AndQuery</code> <strong>inherits</strong> the <code>q1</code> field from the <code>AComboQuery</code> class.</p>
	</li>
	<li>
	<p>We call the relationship between classes in a particular program the<strong> class hierarchy</strong> of the program.</p>
	</li>
	<li>
	<p>The relationship between a class and one that it <code>extends</code> has a few names.</p>

	<ul>
		<li>
		<p>One of the most common is to call <code>AComboQuery</code> the <strong>parent class</strong> of <code>AndQuery</code>, and <code>AndQuery</code> the <strong>child class</strong> of <code>AComboQuery</code>. This is commonly used when one class directly extends another.</p>
		</li>
		<li>
		<p>Another group of terms that’s used is <strong>subclass</strong> and <strong>superclass</strong>, corresponding to <code>AndQuery</code> and <code>AComboQuery</code> in this instance. To talk about the relationship between <code>AndQuery</code> and <code>AQuery</code>, which have <code>AComboQuery</code> “between” them in the class hierarchy, we’d say that <code>AndQuery</code> is a <strong>subclass</strong> of <code>AComboQuery</code>, and also that <code>AComboQuery</code> is a <strong>subclass</strong> of AQuery. So the <strong>subclass/superclass</strong> terms are often used for these relationships including more than one step of extension.</p>
		</li>
	</ul>
	</li>
</ul>

<p>Here is the code from before for reference:</p>

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

<!-- step 2340071 | type: choice -->

**Quiz (choice)**

<p>It’s useful to use pictures to describe the <strong>class hierarchy</strong>. These pictures are distinct from the memory diagrams that include the stack and heap – they talk about the relationship between classes. For this example, we’d use the following class hierarchy diagram to describe it:</p>

<p><img alt="" height="516" name="class-hierarchy.png" src="https://ucarecdn.stepik.net/79ed8e1f-4404-434a-a444-f6b64f7468d7/" width="691"></p>

<p> </p>

<p>This captures the relationships between these classes by drawing an <code>extends</code> arrow between each pair of classes where one extends the other, and an <code>implements</code> arrow when a class implements another.</p>

<p>This picture helps us understand what methods and fields are available on a particular class. For example, if we see a field access such as <code>this.q1</code> and know that <code>this</code> is a reference to an <code>AndQuery</code> object, we can use the diagram to trace the <code>extends</code> relationships to find that the <code>q1</code> field is defined on its parent class. And in a method call like <code>this.and(someOtherQuery)</code>, where <code>this</code> is a reference to an object of type <code>LongerThan</code>, we can trace the <code>extends</code> relationship to find the and method on <code>AQuery</code>.</p>

<p><iframe height="600px" scrolling="yes" src="https://tech.io/playground-widget/889c85520367e6dd1595bbac472f6da320785/welcome/1095253/Class%20hierarchy" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Which of the following lines of code, if added to the end of the <code>ExamplesSearch</code> class above, would not produce an error? Try to figure it out first by referring to the picture, then run it to see if you were correct.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": true,
  "is_always_correct": false,
  "sample_size": 4,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": false,
  "options": [
    {
      "is_correct": true,
      "text": "<code> ImageQuery aq1 = new AndQuery(me1, ck3); </code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code> boolean result = lg1.matches(i1); </code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>ImageQuery threeQueries = this.ck1.and(this.ck2).and(this.lg1); </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>ImageQuery oq1 = this.lg1.or(this.me1); </code>",
      "feedback": ""
    }
  ]
}
```

</details>