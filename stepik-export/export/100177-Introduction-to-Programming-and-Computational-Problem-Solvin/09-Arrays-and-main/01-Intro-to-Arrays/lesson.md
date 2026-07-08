# Intro to Arrays


---

<!-- step 2465188 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>We've seen how we can use classes to represent compound data – <code>Point</code>s for pairs of numbers, <code>Region</code>s that aggregated Point and size information, <code>Book</code>s with authors and titles and prices, and so on.</p>

<p>There is another important kind of compound data in computing – a <strong>collection</strong>. A class could be used to represent, say, a <em>single</em> student in a class roster. But the class roster itself is a <strong>collection</strong> of students, which isn't something we've seen how to represent so far.</p>

<p>There are several ways to represent <strong>collections</strong> of data in Java. We will start with one called an <strong>Array</strong>, but we will explore others.</p>

<p>The most direct way to create a collection using arrays is to use an <strong>array initialization</strong> statement. This is written as a variable or field definition with a type that has <code>[]</code> at the end, with comma-separated values in between curly braces as the value. Here’s one for a collection of names of fruit:</p>

<pre><code class="language-java">String[] fruits = {"apple", "orange", "banana"};</code></pre>

<p>Just like with other field definitions, we could put this into an examples class, for example:</p>

<p><iframe height="500px" scrolling="yes" src="https://tech.io/playground-widget/7bbf6639bba4749e3b684a5712ba076220785/welcome/1090856/Arrays" width="100%"></iframe></p>

<p>If we run this, we see some new output that shows the array shape.</p>

<h3><span style="color: #cc0000;"> <strong>Do Now!</strong> </span>Fill in the blanks based on what you see when running the program.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>\nnew ExamplesArrays:1(<br>\n&nbsp;this.fruits = new \n</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "java.lang.String",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>[</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "3",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>\n]:2{<br>\n&nbsp; [0] \"apple\",<br>\n&nbsp; [1] \"orange\",<br>\n&nbsp; [2] \"banana\"<br>\n&nbsp;}<br>\n&nbsp;this.valueAtIndex0 = \"apple\"<br>\n&nbsp;this.orange = \"orange\"<br>\n&nbsp;this.valueAtLastIndex = \"banana\")<br>\n</code>",
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

<!-- step 2459965 | type: text -->

<p>Here's the output we saw:</p>

<pre><code class="language-no-highlight">new ExamplesArrays:1(
 this.fruits = new java.lang.String[3]:2{
  [0] "apple",
  [1] "orange",
  [2] "banana"
 }
 this.valueAtIndex0 = "apple"
 this.orange = "orange"
 this.valueAtLastIndex = "banana")</code></pre>

<p>The <code>new java.lang.String[3](){</code> printout is how the tester library prints array values; <code>3</code> indicates the length. The values are printed in order with the corresponding index next to each.</p>

<p> </p>

<h4>Arrays and Memory</h4>

<p>Just like objects, arrays have their contents stored in memory. Just like objects, each array has a reference (the <code>:2</code> in the output above).</p>

<p>We can draw them in a memory diagram, just like we can draw objects:</p>

<p><img alt="" height="262" name="ExamplesArrays.png" src="https://ucarecdn.stepik.net/3bea40df-76e2-4d86-ad39-12664415ffd9/" width="559"></p>

<p> </p>

<h4>Array Indexing</h4>

<p>In addition, we also saw <strong>array index expressions</strong> or <strong>array lookup expressions</strong>, which looked like <code>this.fruits[0]</code>. Much like the characters in a <code>String</code>, we refer to the contents of arrays by their <strong>index</strong>. The first element is at index 0, the second at index 1, and so on.</p>

<p>The expression before the open bracket <code>[</code> can be any expression that evaluates to an array (like <code>this.fruits</code>), and the index can be any expression that evaluates to an <code>int</code>. For example, in the array lookup expression <code>this.fruits[this.fruits.length - 1]</code>, the index is the expression <code>this.fruits.length - 1</code>, which evaluates to <code>2</code>.</p>

<p>This also demonstrates the <code>length</code> field of arrays, which holds the number of elements in the array.</p>

---

<!-- step 2465258 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Arrays can also contain values other than <code>String</code>s. For example, they can contain <code>int</code> or <code>double</code> values:</p>

<p><iframe height="500px" scrolling="yes" src="https://tech.io/playground-widget/7bbf6639bba4749e3b684a5712ba076220785/welcome/1090857/Arrays%20of%20numbers" width="100%"></iframe></p>

<pre><code class="language-java">//code with blanks, for reference
int num40 = _____BLANK1_____;
double num9p5 = ____BLANK2_____;</code></pre>

<p> Assume that this program, with the blanks filled in, should produce this output:</p>

<pre><code class="language-no-highlight">new ExamplesNumberArrays:1(
 this.someNumbers = new int[3]:2{
  [0] 40,
  [1] 50,
  [2] 60
 }
 this.someMoreNumbers = new double[4]:3{
  [0] 100.5,
  [1] 0.3,
  [2] 9.5,
  [3] 4.4
 }
 this.num40 = 40
 this.num9p5 = 9.5)</code></pre>

<h3><span style="color: #cc0000;"> <strong>Do Now!</strong></span> What array index expressions can we put into the blanks to produce this output?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "_____BLANK1_____",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "someNumbers[0]",
          "is_correct": true
        },
        {
          "text": "someNumbers[ 0 ]",
          "is_correct": true
        },
        {
          "text": "someNumbers [ 0]",
          "is_correct": true
        },
        {
          "text": "someNumbers[0 ]",
          "is_correct": true
        },
        {
          "text": "someNumbers [0]",
          "is_correct": true
        },
        {
          "text": "this.someNumbers[0]",
          "is_correct": true
        },
        {
          "text": "this.someNumbers[ 0 ]",
          "is_correct": true
        },
        {
          "text": "this.someNumbers[ 0]",
          "is_correct": true
        },
        {
          "text": "this.someNumbers[ 0]",
          "is_correct": true
        },
        {
          "text": "this.someNumbers [0]",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>_____BLANK2_____",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "someMoreNumbers[2]",
          "is_correct": true
        },
        {
          "text": "someMoreNumbers[ 2 ]",
          "is_correct": true
        },
        {
          "text": "someMoreNumbers[ 2]",
          "is_correct": true
        },
        {
          "text": "someMoreNumbers[2 ]",
          "is_correct": true
        },
        {
          "text": "someMoreNumbers [2]",
          "is_correct": true
        },
        {
          "text": "this.someMoreNumbers[2]",
          "is_correct": true
        },
        {
          "text": "this.someMoreNumbers[ 2 ]",
          "is_correct": true
        },
        {
          "text": "this.someMoreNumbers[ 2]",
          "is_correct": true
        },
        {
          "text": "this.someMoreNumbers[2 ]",
          "is_correct": true
        },
        {
          "text": "this.someMoreNumbers [2]",
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

<!-- step 2465636 | type: text -->

<h2>Summary</h2>

<ul>
	<li>One way that we can represent a <strong>collection</strong> of data in Java is by using an <strong>Array</strong>.</li>
	<li>An <strong>array initialization statement</strong> includes a type with <code>[]</code> after it, and the name of the variable or field that will store a reference to the array. The right-hand side of the equals sign should have curly brackets with a list of values separated by commas inside it.</li>
	<li>Arrays, just like objects, are stored in memory, and the variables and fields will store their references.</li>
	<li>We can access an element in an array by using an <strong>array index expression</strong>. To do this, we will need the name of a variable or field that stores a reference to the array and the index we want to access.</li>
</ul>