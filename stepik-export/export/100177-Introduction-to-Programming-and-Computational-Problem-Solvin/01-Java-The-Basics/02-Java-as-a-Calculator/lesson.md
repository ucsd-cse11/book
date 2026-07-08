# Java as a Calculator


---

<!-- step 2318755 | type: choice -->

**Quiz (choice)**

<p>Of course, just naming a bunch of numbers with fields is useful as an introduction, but it isn’t very exciting; we aren’t using the program for much other than printing information we already had. The next program is a little more interesting because it uses some <strong>operators</strong> to do some calculation:</p>

<p><iframe height="450px" scrolling="no" src="https://tech.io/playground-widget/d63c8ea4d9711ea2b312ad570ff6069a49685/welcome/1084053/Operators" width="100%"></iframe></p>

<h3><span style="color: #ff0000;">Do Now!</span> Run the program and observe the output. Select all the options that contain text that appeared as part of the output.</h3>


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
      "is_correct": false,
      "text": "5 + 2 * 45",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "theAnswer",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "95",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "315",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2318756 | type: text -->

<p>(Here's the code from the previous step. You may run it to see the output again for reference.)</p>

<p><iframe height="450px" scrolling="no" src="https://tech.io/playground-widget/d63c8ea4d9711ea2b312ad570ff6069a49685/welcome/1084053/Operators" width="100%"></iframe></p>

<p>This used multiplication (with the <code>*</code> operator) and addition (with the <code>+</code> operator) to calculate the value 95 for the field <code>theAnswer</code>. It’s worth noting a few things with this simple example:</p>

<ul>
	<li>
	<p>Java correctly processes the order of operations according to the multiplication-before-addition rule – we didn’t get <code>315</code> (the result of <code>7 * 45</code>) as an answer, for example</p>
	</li>
	<li>
	<p>There’s a difference between the program, which specified the operations to perform <code>(5 + 2 * 45)</code>, and the resulting <strong>value</strong>, which is <code>95</code>. Only the resulting value is stored in the field and shown in the output, not the whole program or calculation.</p>
	</li>
</ul>

---

<!-- step 2398328 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>If we wanted the version of the program that evaluates to 315, we can insert parentheses around the part we want to evaluate first, as we would in math. Notice that the value stored in <code>theAnswer</code> is now 315 after this change.</p>

<p><iframe height="450px" scrolling="no" src="https://tech.io/playground-widget/d63c8ea4d9711ea2b312ad570ff6069a49685/welcome/1084054/Operators" width="100%"></iframe></p>

<p><span style="color: #cc0000;"><strong>Do Now!</strong> </span>Add a field called <code>anotherAnswer1</code> whose value is computed by <code>(5 + 2) - 3 * 9</code>. Run the program to ensure it works as expected. Then, add another field called <code>anotherAnswer2</code> whose value is computed by <code>((5 + 2) - 3) * 9</code> instead, and again check that it works as you expect.</p>

<p>Note that there’s nothing special about the names <code>theAnswer</code> or <code>anotherAnswer1</code>; if we picked other names like <code>x</code> or <code>someReallyLongFieldName</code>, the programs would still perform the calculation and output the results just fine.</p>

<h3><span style="color: #cc0000;">Do Now! </span>Enter the values of <code>anotherAnswer1</code> and <code>anotherAnswer2</code> in the box below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>anotherAnswer1</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "-20",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>\n<code> anotherAnswer2 </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "36",
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

<!-- step 2318772 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>The examples in the previous steps mention addition with <code>+</code>, multiplication with <code>*</code>, and subtraction with <code>-</code>. Division is conspicuously missing; at first it seems straightforward if we know the operator for division in Java is forward-slash (<code>/</code>), as in this example:</p>

<p><iframe height="460px" scrolling="yes" src="https://tech.io/playground-widget/d63c8ea4d9711ea2b312ad570ff6069a49685/welcome/1084055/Not%20Quite%20Math" width="100%"></iframe></p>

<p>Since we’re calculating 8 / 2, the results ought to be what we expect. But, if we alter the example slightly:</p>

<p><iframe height="470px" scrolling="yes" src="https://tech.io/playground-widget/d63c8ea4d9711ea2b312ad570ff6069a49685/welcome/1084056/Not%20Quite%20Math" width="100%"></iframe></p>

<p>We get a surprising result!</p>

<p>So far, we’ve avoided describing anything about the word <code>int</code> (short for integer) that appears before each field name. It turns out that this is an important detail, and has to do with a key way that Java works, and differs from actual math. In particular, when dividing <code>int</code> values, Java simply <em>removes</em> the decimal part so that the answer is always an integer. Note that it does not round the number, it simply removes (truncates) any decimal portion of the number entirely (even if it would be 0.9999).</p>

<h3><span style="color: #cc0000;">Do Now! </span>Fill in the results stored in the variables after running these 2 programs.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code> this.theAnswer1 = </code>",
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
      "text": "<br><code> this.theAnswer2 = </code>",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2318773 | type: text -->

<p>What about negative results for division of <code>int</code>s? Do they also have the fractional part removed, or does something else happen? Write an example and run it to test this yourself.</p>

<p><iframe height="450px" scrolling="no" src="https://tech.io/playground-widget/d63c8ea4d9711ea2b312ad570ff6069a49685/welcome/1084057/Negative%20Results" width="100%"></iframe></p>

<p>For negative <code>int</code>s as well, Java will simply remove the fractional part. These are the rules of integer arithmetic in Java – multiplication, addition, and subtraction work as we expect, but division doesn’t preserve the fractional part of an answer. Later, we’ll see some ways to represent fractional answers; for now we’ll work with integers only, taking care to use division safely.</p>

<p><em>(There are actually some other caveats about very large numbers that apply to <code>int</code>s that we won’t tackle right away.)</em></p>

---

<!-- step 2398397 | type: text -->

<h2>Summary</h2>

<ul>
	<li>We can use arithmetic operators, such as <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code> to calculate numerical values.</li>
	<li>Just like in math, Java uses the same order of operations. Multiplication and division are performed before addition and subtraction.</li>
	<li>Parentheses can be placed around certain parts of the expression that we want to evaluate first.</li>
	<li>The result of division with <code>int</code> values will not include anything after the decimal point. The result is truncated.</li>
</ul>