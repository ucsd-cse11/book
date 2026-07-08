# Beyond Arithmetic and Concatenation


---

<!-- step 2434884 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>So far, we’ve used Java to do things that a calculator could do, with the notable exception of <code>String</code>s. We introduced methods mainly as a way to enhance our calculator-like behavior. In this section, we’ll go further and start doing work that’s unique to computation — making decisions based on data.</p>

<p>We’ve used <code>+</code>, <code>-</code>, <code>/</code>, and <code>*</code> to perform arithmetic on numbers (and in the case of <code>+</code>, append <code>String</code>s). Mathematically, there’s a natural next set of operations to try on numbers — to compare them! Operators like <code>&lt;</code> have meaning in math, and they also have meaning in Java. We can try them out:</p>

<pre><code class="language-java">class Comparisons {
  boolean fourIsLessThanFive = 4 &lt; 5;
  boolean fiveIsLessThanFour = 5 &lt; 4;
}</code></pre>

<p>Here, we’re using the <code>&lt;</code> operator to compare <code>5</code> and <code>4</code>. Run the program to see the output.</p>

<p><iframe height="470px" scrolling="yes" src="https://tech.io/playground-widget/42c0b09a650de9fe96daa5514f780afa20785/welcome/1088384/Using%20Conditions" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Fill in the blanks based on the output of the program.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>\nComparisons:<br>\n---------------<br>\nnew Comparisons:1(<br>\n&nbsp;this.fourIsLessThanFive =  </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code> \n&nbsp;this.fiveIsLessThanFour = </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "false",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>) <br>\n--------------- </code>",
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

<!-- step 2434799 | type: choice -->

**Quiz (choice)**

<p>The result from the previous step says that <code>fourIsLessThanFive</code> has the value <code>true</code>, and <code>fiveIsLessThanFour</code> has the value <code>false</code>. This seems quite reasonable; the first is, after all, a true statement, while the second isn’t. These two values, <code>true</code> and <code>false</code>, have the type <code>boolean</code>; in fact, they are the <em>only</em> two values of the type <code>boolean</code>. They represent computations that <em>ask a question</em>, where the answer can be yes (true) or no (false).</p>

<p>To see how these new values are particularly useful in action, let’s go back to an example we’ve worked on <a href="https://stepik.org/lesson/571273/step/6?unit=565814" rel="noopener noreferrer nofollow">before</a> — calculating weekly pay with overtime. The past times we’ve addressed the problem, we’ve always made the assumption that the number of hours worked is greater than 40 because the calculation would produce nonsense for smaller numbers of hours. Armed with the ability to ask questions, along with one more piece we’ll add along the way, we’ll be able to make progress on this problem now. Let’s clearly state the problem:</p>

<blockquote>
<p><strong>Use the design recipe to write a program that, given an employee’s weekly hours worked and hourly wage, calculates their weekly pay. Any hours worked over 40 should count at double their hourly rate. An employee may work less than 40 hours a week.</strong></p>
</blockquote>

<p> </p>

<p>To write this program, we first need to write the method header, which is the same as before:</p>

<pre><code class="language-java">int weekly(int hours, int rate)</code></pre>

<p>We can add documentation:</p>

<pre><code class="language-java">// Calculate weekly pay at the given rate and number of hours worked.
// If hours is above 40, pay at double the rate for hours beyond 40.  Pay at
// rate for the first 40 hours.  If the number of hours is not more than 40,
// don't add any overtime.
int weekly(int hours, int rate)</code></pre>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Select the test cases below whose comments show the correct expected value.</h3>


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
      "text": "<code>int aTestCase = this.weekly(48, 18); //should be 1008</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>int someTestCase = this.weekly(36, 14); //should be 504</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>int myTestCase = this.weekly(40, 25); //should be 1025</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>int theirTestCase = this.weekly(42, 17); //should be 748</code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2434497 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>And it’s good to think through some examples next:</p>

<p><iframe height="615px" scrolling="no" src="https://tech.io/playground-widget/5f2c3a2153f951090ca666c1b3b7ae7720785/welcome/1086338/Using%20Conditions" width="100%"></iframe></p>

<p>Note that we’ve added a default return statement as well. This way, even if we don’t have anything else in the method, we can still run the program without any errors.</p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Run the program and use its output to fill in the blanks below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code> WeeklyPay: <br>\n--------------- <br>\nnew WeeklyPay:1( <br>\n&nbsp;this.exactly40 = </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "0",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br> <code>\n&nbsp;this.someOvertime = </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "0",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br> <code>\n&nbsp;this.lessThan40 = </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "0",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> ) </code><br>\n<code> --------------- </code>",
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

<!-- step 2434876 | type: matching -->

**Quiz (matching)**

<p>Notice that in the previous step, the output of the method was always 0, which is expected, given that we set the return value to 0. It's nice that we can run the program, see all <code>0</code>s, and know our program doesn't have any bad typos so far.</p>

<p>With that, we just need to work on the method body. We know now that we can compare numbers, but that on its own isn’t enough to solve the problem. We need to have the program make a <em>decision</em> based on the result of the comparison. To do this, we’re going to introduce a new kind of syntax that we can use in method bodies: the <code>if</code> statement. An <code>if</code> statement takes the following form:</p>

<pre><code class="language-java">if(someBooleanCalculation) {
  ... someResultIfTrue ...
}
else {
  ... someResultIfFalse ...
}</code></pre>

<p>In our case, the boolean calculation we need to check is if the number of hours is greater or less than 40, which we get from the problem description. So we can start the method body like this:</p>

<pre><code class="language-java">// Calculate weekly pay at the given rate and number of hours worked.
// If hours is above 40, pay at double the rate for hours beyond 40.  Pay at
// rate for the first 40 hours.  If the number of hours is not more than 40,
// don't add any overtime.
int weekly(int hours, int rate) {
  if(hours &gt; 40) {
    // ... answer if greater than 40 ...
  }
  else {
    // ... answer if not more than 40 ...
  }
}

int exactly40 = this.weekly(40, 10); // Should be 400
int someOvertime = this.weekly(45, 10); // Should be 400 + 100, total 500
int lessThan40 = this.weekly(30, 20); // Should be 600</code></pre>

<p>Now, we can use what we know about getting results from methods by using <code>return</code> to fill in the two comments above:</p>

<p><iframe height="785px" scrolling="yes" src="https://tech.io/playground-widget/991fc40260fa23a8040a867c0c8d28ff20785/welcome/1088457/Using%20Conditions" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Run the program above and match the test cases with their values.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "preserve_firsts_order": true,
  "is_html_enabled": true,
  "pairs": [
    {
      "first": "<code> matchTest1 </code>",
      "second": "<code>700 </code>"
    },
    {
      "first": "<code> matchTest2 </code>",
      "second": "<code>0</code>"
    },
    {
      "first": "<code> matchTest3 </code>",
      "second": "<code>1104</code>"
    }
  ]
}
```

</details>

---

<!-- step 2354935 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p><iframe height="670px" scrolling="yes" src="https://tech.io/playground-widget/e12ed0c6b9f92c80397397c9cb240e5820785/welcome/1085206/Using%20Conditions" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> There's another way to implement this method. Fill in the blank such that the method returns the same value as it did in the previous step. (Hint: The <code>&gt;=</code> and <code>&lt;=</code> operators are pronounced "greater than or equal to" and "less than or equal to," respectively.)</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>if(</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "hours <= 40",
          "is_correct": true
        },
        {
          "text": "40 >= hours",
          "is_correct": true
        },
        {
          "text": "hours < 41",
          "is_correct": true
        },
        {
          "text": "41 > hours",
          "is_correct": true
        },
        {
          "text": "hours<=40",
          "is_correct": true
        },
        {
          "text": "40>=hours",
          "is_correct": true
        },
        {
          "text": "hours<41",
          "is_correct": true
        },
        {
          "text": "41>hours",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>) {<br>&emsp;return hours * rate;<br>}<br>else {<br>&emsp;return 40 * rate + ((hours - 40) * (rate * 2));<br>}</code>",
      "options": []
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": false,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2332068 | type: choice -->

**Quiz (choice)**

<pre><code class="language-java">//code from before, for reference

int weekly(int hours, int rate) {
  if(hours &gt; 40) {
    return (40 * rate) + ((hours - 40) * (rate * 2));
  }
  else {
    return hours * rate;
  }
}</code></pre>

<p>We’re going to introduce names for the different parts of the <code>if</code> statement. We call the expression in between the parentheses (in the example above, it’s <code>hours &gt; 40</code>) the <strong>conditional</strong> part. The two parts between the curly braces we call the <strong>branches</strong> or <strong>cases</strong> of the <code>if</code> statement. The first is called the <strong>then branch</strong>, and the second is called the <strong>else branch</strong>.</p>

<p>This helps us say what happens in English: “The <code>if</code> statement evaluates the <strong>then branch</strong> if the condition is <code>true</code>, and the <strong>else branch</strong> if the condition is <code>false</code>.”</p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Select the English sentence that describes the behavior of the following <span style="color: #000000;">method</span>.</h3>

<pre><code class="language-java">String someMethod(int visibleAge) {
  if(visibleAge &gt;= 21) {
    return "What can I get for you?";
  }
  else {
    return "I need to see your ID.";
  }
}</code></pre>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": false,
  "is_always_correct": false,
  "sample_size": 4,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": false,
  "options": [
    {
      "is_correct": true,
      "text": "The method returns <code>\"What can I get for you?\"</code> if <code>visibleAge</code> is at least <code>21</code>, and returns <code>\"I need to see your ID.\"</code> if <code>visibleAge</code> is less than <code>21</code>.",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "The method returns <code>\"What can I get for you?\"</code> if <code>visibleAge</code> is greater than <code>21</code>, and returns <code>\"I need to see your ID.\"</code> if <code>visibleAge</code> is at most <code>21</code>.",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "The method returns <code>\"I need to see your ID.\"</code> if <code>visibleAge</code> is at least <code>21</code>, and returns <code>\"What can I get for you?\"</code> if <code>visibleAge</code> is less than <code>21</code>.",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "The method returns <code>\"I need to see your ID.\"</code> if <code>visibleAge</code> is greater than <code>21</code>, and returns <code>\"What can I get for you?\"</code> if <code>visibleAge</code> is at most <code>21</code>.",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2407292 | type: fill-blanks -->

**Quiz (fill-blanks)**

<pre><code>//code from before, for reference

int weekly(int hours, int rate) {
  if(hours &gt; 40) {
    return (40 * rate) + ((hours - 40) * (rate * 2));
  }
  else {
    return hours * rate;
  }
}</code></pre>

<p>Let’s see that definition in action. When we introduced methods, we said that to evaluate a <strong>method call</strong> we need to do the calculation in the body of the method with the <strong>parameters</strong> replaced with the <strong>argument</strong> values. So, for example, in the method call <code>this.weekly(30, 25)</code>, <code>hours</code> would be replaced with <code>30</code>, and <code>rate</code> would be replaced with <code>25</code>. That would look like this:</p>

<pre><code>if(30 &gt; 40) {
  return 40 * 25 + ((30 - 40) * (25 * 2));
}
else {
  return 30 * 25;
}</code></pre>

<p>The <strong>condition</strong> (which is <code>30 &gt; 40</code> in this case) evaluates to <code>false</code>, because <code>30</code> isn’t greater than <code>40</code>. That means Java will evaluate the <strong>else branch</strong> and <em>ignore</em> the <strong>then branch</strong>. This causes the result (or <strong>return value</strong>) of this method to be <code>750</code>, the value of <code>30 * 25</code>.</p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Refer to the <code>weekly()</code> method at the top of the page to fill in the blanks below for the body of the method call <code>this.weekly(50, 20)</code>. You should replace the parameters with the argument values.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>if(</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "50",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> > 40) {<br>&nbsp;&nbsp;return 40 * </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "20",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> + ((</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "50",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> - 40) * (</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "20",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> * 2));<br>}<br>else {<br>&nbsp;&nbsp;return </code>",
      "options": []
    },
    {
      "type": "text",
      "text": "<code> 50 * 20</code>",
      "options": []
    },
    {
      "type": "text",
      "text": "<code>;<br>}</code><br>The expected return value is ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "1200",
          "is_correct": true
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

<!-- step 2399387 | type: text -->

<h2>Summary</h2>

<ul>
	<li>When making decisions based on data, we can use the <code>boolean</code> data type, as well as operators like <code>&lt;</code> and <code>&gt;</code>.</li>
	<li>The <code>boolean</code> data type has only two possible values — <code>true</code> and <code>false</code> — that represent computations that ask a yes/no question.</li>
	<li>An <code>if</code> statement allows us to write a program that chooses between two calculations based on a <code>boolean</code> value called a <strong>condition</strong>. The part of the <code>if</code> statement that runs if the condition is <code>true</code> is called the <strong>then branch</strong>, while the part that runs if the condition is <code>false</code> is called the <strong>else branch</strong>.</li>
</ul>