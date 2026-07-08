# Capturing Repeated Work with Methods


---

<!-- step 2374011 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>For the past few sections, we’ve mainly used Java as a calculator. For example, we calculated the distance of a falling object at several different points in time:</p>

<p><iframe height="476px" scrolling="no" src="https://tech.io/playground-widget/8b55f467b8c7f8d68af16920846c9cd920785/welcome/1084493/Using%20Methods" width="100%"></iframe></p>

<p>We noted that it was useful to store the value of gravity in a field, and use <code>this.gravity</code> in its place. However, there’s still something frustrating about this program. In particular, we are repeating the <em>shape</em> of the computation over and over again. This shape is repeated for each of the <code>distAfter___</code> fields:</p>

<pre><code class="language-java">(this.gravity / 2) * (__ * __)</code></pre>

<p>In all three cases, the segment containing <code>this.gravity</code> and <code>2</code> is the same, as is the arrangement of the * and / operators. The <em>only</em> thing that changes is the number of elapsed seconds. It would be useful if we could somehow capture the idea of this distance-travelled calculation and re-use that instead of repeating the multiplication-and-division pattern over and over.</p>

<p>Java (like every other modern programming language) has a feature that does this! In Java, the programming feature is called a <strong>method</strong>. We can think of simple methods as calculations with holes in them, where the holes can be filled in with different values to complete the calculation, just like in a mathematical function. Here’s what it looks like to define a method for the distance-travelled calculation:</p>

<p><iframe height="570px" scrolling="no" src="https://tech.io/playground-widget/592f4d83a9bfdcaa354e206b7da46e9420785/welcome/1085539/Using%20Methods" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> What are the values of the <code>int</code>s in the above program? (Hint: Run the program.)</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>distAfter2sec</code>: ",
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
      "text": "<br><code>distAfter4sec</code>: ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "80",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code>distAfter6sec</code>: ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "180",
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

<!-- step 2316722 | type: matching -->

**Quiz (matching)**

<pre><code>//code from the previous step

int distanceAfter(int seconds) {
  return (this.gravity / 2) * (seconds * seconds);
}</code></pre>

<p>The <code>distanceAfter()</code> method has a few components:</p>

<ul>
	<li>
	<p>First, the method has a name, which we’ve chosen to be <code>distanceAfter()</code>.</p>
	</li>
	<li>
	<p>Second, it has a <strong>parameter</strong> (which is written as <code>int seconds</code>) in parentheses. The parameter will represent the value that we can change in order to get different answers.</p>
	</li>
	<li>
	<p>Third, it has a <strong>method body</strong>, which consists of the <code>return</code> keyword, followed by a calculation that uses the field access <code>this.fieldName</code> (like in the original, method-less calculation) and the name <code>seconds</code>.</p>
	</li>
	<li>
	<p>Finally, it has a <strong>return type</strong>, which is the word <code>int</code> that appears before <code>distanceAfter()</code>. Whatever type is listed before the method name must match the type of the value that is returned by the method.</p>
	</li>
</ul>

<p>Together, these four components — method name, parameter(s), method body, and return type — make up a <strong>method definition</strong>. We’ll see many more examples of methods over the rest of this textbook.</p>

<h3><strong><span style="color: #cc0000;">Do Now!</span> </strong>Based on this example of a method definition below, match the vocabulary terms that we just introduced with the parts that they correspond to in the definitions above.</h3>

<pre><code class="language-java">class MethodExample {
  int squarePlusOne(int n) {
    return n * n + 1;
  }
}</code></pre>


<details><summary>Author source (answers)</summary>


```json
{
  "preserve_firsts_order": false,
  "is_html_enabled": true,
  "pairs": [
    {
      "first": "method name",
      "second": "<code>squarePlusOne</code>"
    },
    {
      "first": "parameter",
      "second": "<code>int n</code>"
    },
    {
      "first": "method body",
      "second": "<code>return n * n + 1;</code>"
    },
    {
      "first": "return type",
      "second": "<code>int</code>"
    }
  ]
}
```

</details>

---

<!-- step 2313658 | type: text -->

<p>In addition to the method definition being added, our new example contains another difference. In each of the <code>distAfter___</code> field definitions, the right-hand side has been changed to a use of the <code>this.distanceAfter()</code> method name, followed by the number of elapsed seconds in parentheses. We call this type of expression a <strong style="font-size: inherit;">method call</strong>.</p>

<p>We can run this program and see that we get the same values as before:</p>

<pre><code class="language-no-highlight">Distance:
---------------
 new Distance:1(
  this.gravity = 10
  this.distAfter2sec = 20
  this.distAfter4sec = 80
  this.distAfter6sec = 180)</code></pre>

<p>So how does this end up giving us the same answer? The key is the interaction between the <strong>method definition</strong> and the <strong>method call</strong>. When Java looks at the method call, it proceeds to do the following:</p>

<ol>
	<li>Replaces the parameter name with the values provided in the method call.</li>
	<li>Performs the calculation in the method body (the part after <code>return</code>, in this case).</li>
	<li>Returns the calculated value.</li>
</ol>

<p>So in the case of the first method call:</p>

<pre><code class="language-no-highlight">this.distanceAfter(2);</code></pre>

<p>The calculation that is performed actually looks like the following:</p>

<pre><code class="language-no-highlight">(this.gravity / 2) * (2 * 2);</code></pre>

<p>As we can see, the calculation is actually just a version of the <code>distanceAfter()</code> method body, in which all uses of <code>seconds</code> have been replaced by <code>2</code>. We say that we used the value <code>2</code> as an <strong>argument</strong>, which became the value of the <strong>parameter</strong> <code>seconds</code> in the actual method.</p>

---

<!-- step 2354904 | type: choice -->

**Quiz (choice)**

<p>The same rule is used to evaluate the next two method calls, which are</p>

<pre><code class="language-java">this.distanceAfter(4);
this.distanceAfter(6);</code></pre>

<p>and perform the calculations:</p>

<pre><code class="language-java">(this.gravity / 2) * (4 * 4);
(this.gravity / 2) * (6 * 6);</code></pre>

<p>There are several reasons why it is useful to write this program with a method definition and method calls instead of doing three different calculations directly (as we did in the original example):</p>

<ul>
	<li>
	<p>Performing any more distance calculations will now be simpler, since we would only need to add a single method call for each one.</p>
	</li>
	<li>
	<p>Understanding the code that defines the <code>distAfter___</code> fields is easier, since the method name helps describe the reason for, and result of, the calculations.</p>
	</li>
	<li>
	<p>If, later on, we want to change the distance formula (e.g. to ask what would happen if we <em>cubed</em>, rather than squared, the elapsed time), we would only need to change the one method instead of multiple individual calculations.</p>
	</li>
</ul>

<h3><strong><span style="color: #cc0000;">Do Now!</span> </strong>Which of the following are true? Select all of the correct options below.</h3>


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
      "text": "Writing a method gives us the ability to perform the same calculation multiple times.",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "The argument is the value that gets passed to the method, while the parameter is the value that is used in the actual method.",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "Each time we want to use a method, we add another method definition.",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "A method's return value is listed within the parentheses following the method name.",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2379633 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p><iframe height="556px" scrolling="yes" src="https://tech.io/playground-widget/e233da1b89d915afbd001a3533ac865820785/welcome/1084840/Using%20Methods" width="100%"></iframe></p>

<p><span style="color: #cc0000;"><strong>Do Now!</strong></span> Change the <code>distanceAfter()</code> method to calculate the answer using the cube of seconds, rather than the square of seconds. Then, run the program to get the new field values and enter them into the boxes below.</p>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>distAfter2sec</code>: ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "40",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code>distAfter4sec</code>: ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "320",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code>distAfter6sec</code>: ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "1080",
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

<!-- step 2399311 | type: text -->

<h2>Summary</h2>

<ul>
	<li>Java, like all modern programming languages, has a feature called a <strong>method</strong> that lets programmers repeat the same operation with different values.</li>
	<li>Methods typically contain at least four components: the <strong>method name</strong>, the <strong>parameter(s)</strong>, the <strong>method body</strong>, and the <strong>return type</strong>. Together, these components make up a <strong>method definition</strong>.</li>
	<li>Whenever we want to use a method, we can add a <strong>method call</strong>. If the method has any parameters, the method call will pass values — referred to as <strong>arguments</strong> in this context — that will become the parameters that are used in the actual method.</li>
	<li>Overall, using methods is an effective way to repeat work without needing to reproduce the same code over and over again.</li>
</ul>