# static methods


---

<!-- step 2465329 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Consider the following program that uses a few methods on the <code>Math</code> class:</p>

<p><iframe height="480px" scrolling="yes" src="https://tech.io/playground-widget/effd230e537082a4e3ae8b78716844b920785/welcome/1087997/MathExamples" width="100%"></iframe></p>

<p>It turns out that these methods in <code>Math</code> are defined using a special keyword, <code>static</code>, whose entire purpose is to allow calling the method <em>without</em> creating an instance of the class.</p>

<h3><strong><span style="color: #cc0000;">Do Now!</span> Answer the following questions based on the information given above.</strong></h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "Is a <code>Math</code> object created anywhere in this program? ",
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
    },
    {
      "type": "text",
      "text": "<br>\nThe name \"<code>Math</code>'' is the name of a ",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "field",
          "is_correct": false
        },
        {
          "text": "class",
          "is_correct": true
        },
        {
          "text": "method",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": ".",
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

<!-- step 2465343 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p><strong>Wait a minute.</strong></p>

<p>These <code>Math</code> methods are <em>weird</em>. When we write methods, we always write <code>this.methodName(...)</code> or <code>someObject.methodName(...)</code>, where what comes before the <code>.</code> is a (reference to a) <strong>object</strong>. But here, we just said that <code>Math</code> is a <em>class</em>, not an object.</p>

<p>How does it work to call methods on it then?</p>

<p><code>Math</code> is a built-in Java class (see the <a href="https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html" rel="noopener noreferrer nofollow"><code>Math</code> documentation</a>), and instead of calling a method on an <em>instance</em> of a class, we called methods directly on the <code>Math</code> class itself. Methods that are called directly on a class (rather than on an <em>instance</em> of a class) are called <strong>static</strong> functions, and they can be written using the <code><strong>static</strong></code> keyword. Specifically, the <code>static</code> keyword means that the method does not have an implicit <code>this</code> parameter, the method body cannot access fields of the class, and the method is expected to be called without any specific instance of the class.</p>

<p>Let's try to write some <code>static</code> methods of our own to implement some more mathematical functions. Consider the following program, in which we implement a <code>static</code> method that returns the smaller of two given numbers (essentially the opposite of <code>Math.max()</code>):</p>

<p><iframe height="600px" scrolling="yes" src="https://tech.io/playground-widget/61e7ef9ba42ae4bd6e7ef4ddcfaf706920785/welcome/1088066/MyMath" width="100%"></iframe></p>

<p>Since we wrote the method call like <code>MyMath.min(10, 20)</code>, Java expects and <em>requires</em> that the <code>min()</code> method be static. If we do so, we'll see an error.</p>

<h3><strong><span style="color: #cc0000;">Do Now!</span> Fill in the blank in the error you see if you remove the <code>static</code> keyword from the <code>min()</code> method.</strong></h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code><u>MyMath.java:11</u>: error:</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "non-static method",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>\nmin(int,int) cannot be referenced from a static context <br>\n&nbsp; int num = MyMath.min(10, 20); <br>\n&nbsp;                 ^<br>\n1 error<br>\n</code>",
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

<!-- step 2465646 | type: text -->

<h2>Summary</h2>

<ul>
	<li>A method that is defined as <code>static</code> can and should be called without an object of the class.</li>
	<li>When calling a <code>static</code> method, we should include the name of the class it's from before the <code>.</code></li>
	<li>We cannot call a <code>static</code> method on any instance of the class, and we cannot call a non-<code>static</code> method without an instance of the class.</li>
</ul>