# Methods as Descriptions of Tasks


---

<!-- step 2319183 | type: text -->

<p>Methods (and functions, a similar construct in other languages) are fundamental to programming. As a result, a lot of the programs we write for the rest of the quarter will be specified by writing one or more methods. We'll develop ways of describing methods, and workflows for defining and testing them to make sure they work the way we expect. One of the important things methods do is describe the <em>input(s)</em> and <em>output</em> of some computation. This includes the types of inputs and outputs; in the previous lesson, the <code>distanceAfter()</code> method had an <code>int</code> input (i.e. <code>seconds</code>) and an <code>int</code> output (i.e. the value returned). This helps us use methods as a way to take a concrete problem statement, and turn it into a program.</p>

---

<!-- step 2319186 | type: text -->

<p>Let’s take another example, that of building up a “Mad Lib”. We might have the following English description of what we want to do:</p>

<blockquote>
<p>Write a program that takes in an adjective and a number, and fills them into the template: “The professor’s explanation was &lt;adjective&gt;, probably because he’s been teaching for &lt;number&gt; years.”</p>
</blockquote>

<p>We can take this description and use it to derive a method that accomplishes the goal it sets out. First, we need to figure out the inputs and outputs from the problem description. The problem is expecting two inputs: an adjective, which can be represented as <code>String</code> data, and a number which can be represented as an <code>int</code>. The result of the method ought to be a <code>String</code> — the result of combining the template string with the two input values. This tells us that the method should have a <strong>return type</strong> of <code>String</code>, and two <strong>parameters</strong>, one with type <code>String</code> and one with type <code>int</code>. Along with a name for the method, which we’ll call <code>fillIn()</code> (since we’re filling in a sentence), that gives us the first part of the method definition:</p>

<pre><code class="language-java">/*
  Places the given adjective and number into the sentence template to
  create a full sentence.
*/
String fillIn(String adjective, int number) {
  // Still need to fill in this method body
}</code></pre>

<p>Here, we also picked <em>names</em> for the parameters — <code>adjective</code> and <code>number</code> — which were straightforward to pick given the problem statement. We call this part of a method definition — the part with the <strong>return type</strong>, the name, and the <strong>parameters</strong> — the <strong>method header</strong>. It describes the behavior of the method in terms of types.</p>

<p>This is also an example of a method definition that has more than one <strong>parameter</strong> (in this case, it has two of them). The two parameters — <code>adjective</code> and <code>number</code> — are separated with a comma, and both are written with the corresponding type in front of them.</p>

<p>Finally, as we have shown above, it’s also useful to put a comment before the method that describes the result that will be produced.</p>

---

<!-- step 2331822 | type: choice -->

**Quiz (choice)**

<p>Next, it’s useful to come up with some <em>examples</em> of using the method before filling in the <strong>method body</strong>. This helps us double-check our work once we implement the body, because we’ll have some tests ready to run. We should pick meaningful inputs that match the types of the parameters:</p>

<pre><code class="language-java">class MadLibs {
  /*
    Places the given adjective and number into the sentence template to
    create a full sentence.
  */
  String fillIn(String adjective, int number) {
    // Still need to fill in this method body
  }

  String example1 = this.fillIn("useless", 2);
  String example2 = this.fillIn("relevant", 3);
  String example3 = this.fillIn("wise", 22);
}</code></pre>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Which of the following are good examples for how to use the <code>fillIn()</code> method?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": true,
  "is_always_correct": false,
  "sample_size": 7,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": false,
  "options": [
    {
      "is_correct": true,
      "text": "<code>String example = this.fillIn(\"relatable\", 5);</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>String example = this.fillIn(\"interesting\", 18);</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>String example = this.fillIn(\"odd\", 50);</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>String example = this.fillIn(\"confusing\", \"four\");</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>int example = this.fillIn(\"logical\", 10);</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>String example = this.fillIn(14, \"amusing\");</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>String example = this.fillIn(\"easy to follow\");</code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2379623 | type: number -->

**Quiz (number)**

<p>After adding the examples, we can fill in the method body, using the names <code>adjective</code> and <code>number</code> for the different values that will be filled in:</p>

<p><iframe height="640px" scrolling="no" src="https://tech.io/playground-widget/5ae0a3cf42095b6a5a42701518af99c320785/welcome/1084776/Implementing%20Tasks" width="100%"></iframe></p>

<p>If we run this, we can see that the examples print out as expected.</p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> How many times does MadLibs appear in the output of the above program? Fill in the correct answer in the box below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "options": [
    {
      "answer": "3",
      "max_error": "0"
    }
  ]
}
```

</details>

---

<!-- step 2354880 | type: sorting -->

**Quiz (sorting)**

<p>We just went through a several-step process for thinking through a method definition:</p>

<ol>
	<li>
	<p>Write the method header and default return value by determining the input and output types, and naming the parameters and method.</p>
	</li>
	<li>
	<p>Write a comment describing what the method will produce.</p>
	</li>
	<li>
	<p>Write several examples of calling the method with different arguments that match the parameter types.</p>
	</li>
	<li>
	<p>Fill in the body of the method so that it uses <code>return</code> with an expression that computes the correct results.</p>
	</li>
	<li>
	<p>Run the method to test it out, and check that the output of the examples is correct.</p>
	</li>
</ol>

<p>In this case, we got it right on the first try. Often, the last step won’t give us the result we expect. We might get a type or syntax error, or the method might produce an answer we didn’t intend on. When this happens, we need to not panic, and go back through the steps and check if we had a wrong expectation, or if the method body has a mistake, or if we misunderstood the problem.</p>

<p>This is a useful <strong>design recipe</strong> for methods that work with simple data. You should use this design recipe when you’re writing methods that just manipulate <code>String</code>s, <code>int</code>s, and other simple values.</p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> According to the design recipe, what is the correct order in which we would write the code segments below? The first code segment should correspond to what you would write for Step 1, etc.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_html_enabled": true,
  "options": [
    {
      "text": "<code>int addAndSubtract(int a, int b, int c) {<br>&nbsp;&nbsp;return 0;<br>}</code>"
    },
    {
      "text": "<code>/*<br>&nbsp;&nbsp;Adds the second number to the first number, then subtracts the third number.<br>*/</code>"
    },
    {
      "text": "<code>int num1 = addAndSubtract(3, 0, 2);<br>int num2 = addAndSubtract(4, -1, 2);<br>int num3 = addAndSubtract(5, 10, 3);</code>"
    },
    {
      "text": "<code>&nbsp;&nbsp;return a + b - c;</code>"
    }
  ]
}
```

</details>

---

<!-- step 2375617 | type: text -->

<p><strong><span style="color: #ffa500;">Exercise</span></strong></p>

<p>Try using the design recipe to write methods for the following problems:</p>

<p><strong>Problem 1:</strong></p>

<blockquote>
<p>Calculate the weekly pay for an employee given their hours worked and their hourly rate, given that any hours over 40 are counted at double the hourly rate. Assume that the employee worked over 40 hours.</p>
</blockquote>

<p><iframe height="570px" scrolling="yes" src="https://tech.io/playground-widget/be3f51ef4b30161482bc63d57b40754720785/welcome/1084908/Following%20the%20Design%20Recipe" width="100%"></iframe></p>

<p><strong>Problem 2:</strong></p>

<blockquote>Imagine you’re writing a program to help write a textbook for math. Write a method that takes in two numbers, and produces a string that shows the multiplication expression and the result separated by an equals sign. For example, for the inputs 4 and 5, the output should be "4 * 5 = 20".</blockquote>

<p><iframe height="570px" scrolling="yes" src="https://tech.io/playground-widget/be3f51ef4b30161482bc63d57b40754720785/welcome/1084909/Following%20the%20Design%20Recipe" width="100%"></iframe></p>

---

<!-- step 2399355 | type: text -->

<h2>Summary</h2>

<ul>
	<li>We can turn concrete problem statements into actual programs by following the <strong>design recipe</strong>, which is a several-step process that produces a method that will give us the solution:

	<ul>
		<li>First, we write the <strong>method header</strong> and default return value.</li>
		<li>Second, we write a comment describing how the method works.</li>
		<li>Third, we write several examples of calling the method correctly.</li>
		<li>Fourth, we write the <strong>method body</strong> such that it returns the solution.</li>
		<li>Finally, we run the method to check whether it was written correctly.</li>
	</ul>
	</li>
</ul>