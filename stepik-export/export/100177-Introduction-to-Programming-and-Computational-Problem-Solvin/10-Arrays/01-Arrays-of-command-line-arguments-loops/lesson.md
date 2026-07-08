# Arrays of command line arguments, loops


---

<!-- step 2379575 | type: string -->

**Quiz (string)**

<p>One of the most common places we confront Arrays in Java is in the <code>main()</code> method. Recall from <a href="https://stepik.org/lesson/587829/?unit=582668" rel="noopener noreferrer nofollow">before</a> the structure of the <code>main()</code> method:</p>

<pre><code class="language-java">class SampleMain {
  public static void main(String[] args) {
    // The java command starts running here, with any values provided
  }
}</code></pre>

<p>When we run the <code>java</code> command, the Java system collects the values provided on the command line, puts them all into an Array of <code>Strings</code>, and passes a reference to that Array as the argument to the <code>main()</code> method (<code>args</code> in the above example). So, for example, if we compile the above class and run it:</p>

<pre><code class="language-no-highlight">$ java SampleMain 10 20 30</code></pre>

<p>The parameter args will contain a reference to an array containing the strings <code>"10"</code>, <code>"20"</code>, and <code>"30"</code>. Pictorially, we’d draw this as:</p>

<p><img alt="" height="237" name="simple-array.png" src="https://ucarecdn.stepik.net/b208669e-e417-4ee4-a937-f6eafba6880d/" width="457"></p>

<p>Arrays, just like objects, take up space on the heap (not on the stack), and parameters, variables, and fields store <strong>references</strong> to them. The components of an array are stored at <strong>indices</strong> counting up from <code>0</code>.</p>

<h3><span style="color: #cc0000;">Do Now!</span> According to the image above, what value is stored in the array at index <code>0</code>?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "\"10\"",
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

<!-- step 2379602 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p><img alt="" height="214" name="simple-array.png" src="https://ucarecdn.stepik.net/0bdadab8-c644-48f3-a586-d5a9aeedeb7f/" width="412"></p>

<p>We can access the elements of arrays by using the <strong>array index expression</strong> on a reference to an array. So, for example, we could print out the second element (the value at index <code>1</code>) of the array above by writing:</p>

<pre><code class="language-java">System.out.println(args[1]);</code></pre>

<p><span style="color: #cc0000;"><strong>Do Now!</strong></span> Paste this line into the main method and run the code with <code>java SampleMain 10 20 30</code>. Ensure that the output is <code>20</code>.</p>

<p><iframe height="550px" scrolling="yes" src="https://tech.io/playground-widget/af3af2b4bfab7177f67bb186fe71d4be20785/welcome/1091340/SampleMain" width="100%"></iframe></p>

<p>The expression <code>args[1]</code> first looks up the reference stored in <code>args</code> and then looks up the value in the index labeled <code>1</code>. As we learned earlier, we can put any expression that computes an <code>int</code> into the brackets. We could write <code>args[1 + 1]</code> and get the value at index <code>2</code> (<code>"30"</code> in this case), for example.</p>

<p>What happens if you provide an index that isn’t in the range of 0-2 for this example?</p>

<h3><span style="color: #cc0000;">Do Now! </span>In the code above, change the <code>1</code> in the brackets to an integer value that is not in that range. Run the program with <code>java SampleMain 10 20 30</code> and use the output to fill in the blanks.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>Exception in thread \"main\": </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "java.lang.ArrayIndexOutOfBoundsException",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>: Index [your index] out of bounds for length 3 <br>\n&nbsp;       at SampleMain.main(SampleMain.java:3) </code>",
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

<!-- step 2379674 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>So far, we’ve just seen how to access elements with a number we knew ahead of time when writing the program. We can also use an element-wise loop, also known as a <strong>for-each loop</strong>, along with a <strong>variable</strong>, to get access to each of the elements of the array in turn, and aggregate their values together:</p>

<p><iframe height="550px" scrolling="yes" src="https://tech.io/playground-widget/af3af2b4bfab7177f67bb186fe71d4be20785/welcome/1091341/SumMain" width="100%"></iframe></p>

<p>There are a few ideas happening here:</p>

<ul>
	<li>
	<p>The variable <code>total</code> is created with the starting value <code>0</code>, and then it gets updated by the <strong>variable assignment</strong> in the body of the loop.</p>
	</li>
	<li>
	<p>The loop, started with <code>for</code>, runs the <strong>loop body</strong>—the expressions in between the curly braces—once for each element in the Array that is referenced by <code>args</code>.</p>
	</li>
	<li>
	<p>Each time the loop body is run, the variable <code>s</code> gets its current value set to the next element, starting with the element at index <code>0</code>.</p>
	</li>
</ul>

<p>As the program runs, we could visualize the changes like this:</p>

<p><img alt="" height="264" name="loop1.gif" src="https://ucarecdn.stepik.net/c276f2c6-8798-481f-ad87-72d1881b36ec/" width="450"></p>

<h3><span style="color: #cc0000;">Do Now!</span> Use the information given in this step to answer the questions below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "In this program, the <b>loop body</b> is 1 line long. What is the line number of the loop body?<br>",
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
      "text": "<br><br>\nWhen the program is run with <code>java SumMain 40 20 10 </code>, what is the length of <code>args?</code>\n<br>",
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
      "text": "<br><br>\nWhen the program is run with <code>java SumMain 40 20 10 </code>, how many times will the loop run?\n<br>",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2379913 | type: text -->

<p>We can also think about these values in tabular form. We often use the word <strong>iteration</strong> to mean “one run of the loop body”:</p>

<table cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td>
			<p> </p>
			</td>
			<td>
			<p><strong>Iteration</strong></p>
			</td>
			<td>
			<p> </p>
			</td>
			<td>
			<p><strong>Value of s</strong></p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p><strong>total before</strong></p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p><strong>total after</strong></p>
			</td>
		</tr>
		<tr>
			<td>
			<p> </p>
			</td>
			<td>
			<p>1st</p>
			</td>
			<td>
			<p>  </p>
			</td>
			<td>
			<p>"40"</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>0</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>40</p>
			</td>
		</tr>
		<tr>
			<td>
			<p> </p>
			</td>
			<td>
			<p>2nd</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>"20"</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>40</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>60</p>
			</td>
		</tr>
		<tr>
			<td>
			<p> </p>
			</td>
			<td>
			<p>3rd</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>"10"</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>60</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>70</p>
			</td>
		</tr>
	</tbody>
</table>

<p>These element-wise or for-each loops are extremely useful when the program needs to process <em>all</em> the elements of an array. The general form is:</p>

<pre><code class="language-java">for(Type t: arr) {
  ... loop body ...
}</code></pre>

<p>where <code>Type</code> is the type of elements (like <code>int</code>, <code>String</code>, or <code>Tweet</code>) and <code>arr</code> is an array containing elements of that type. The name of variable <code>t</code> is up to us, the programmer, as with parameters and field names. The loop body is any sequence of statements, and these statements can use the declared variable.</p>

<p><em>(for-each loops also work for types other than arrays. We’ll see that in detail later on.)</em></p>

---

<!-- step 2380020 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>If we want to write a program that uses a <em>subset</em> of the values in an array, we need a loop that provides more control than only allowing us to visit every element. A common way to manage these situations is with a more general version of the <code>for</code> loop.</p>

<p>Consider a calculator-like program that takes as the first command-line argument an operation to perform, followed by a list of numbers:</p>

<pre><code class="language-no-highlight">$ java CalcMain sum 3 4 5

12

$ java CalcMain product 3 4 5

60

$ java CalcMain mean 1 2 3 5 5 8

4</code></pre>

<p>To implement this, we need two pieces:</p>

<ul>
	<li>
	<p>First, to choose the operation to perform by looking at the first element of the array</p>
	</li>
	<li>
	<p>Second, to perform the aggregation on the remaining elements</p>
	</li>
</ul>

<h3><span style="color: #cc0000;">Do Now! </span>Answer the questions below based on the program described above.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "Answer this question <b>without</b> knowing what code you will use to implement <code>CalcMain</code>. When we run the program with <code>java CalcMain sum 3 4 5</code>, what will be the length of the <code>args</code> array in <code>main()</code>? <br>",
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
      "text": "<br><br>\nAnswer this question <b>without</b> knowing what code you will use to implement <code>CalcMain</code>. When we run the program with <code>java CalcMain sum 3 4 5</code>, how many numbers should we add together?<br>",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2380055 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>The first part (choosing the operation to perform) is simple to accomplish by looking at the element at index 0. The second part (performing the aggregation) requires looking at all the remaining elements, starting at index 1. Here’s how we would write a program to tackle this:</p>

<p><iframe height="600px" scrolling="yes" src="https://tech.io/playground-widget/65cf185cbf0efc2d9635d5a5d1e5ccd220785/welcome/1091425/CalcMain" width="100%"></iframe></p>

<p>The key part of this is the new loop structure, which has the same beginning in both the sum and product cases:</p>

<pre><code class="language-java">for(int i = 1; i &lt; args.length; i = i + 1) { ... loop body ... }</code></pre>

<p>Compile and run the program with <code>java CalcMain product 3 2 4</code></p>

<h3><span style="color: #cc0000;">Do Now!</span> What output do you get, and which line in the program printed that output?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "Output:",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "24",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br/>Number of the line that produced it:",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "15",
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

<!-- step 2380059 | type: matching -->

**Quiz (matching)**

<pre><code class="language-java">for(int i = 1; i &lt; args.length; i = i + 1) { ... loop body ... }</code></pre>

<p>The way such a loop runs is as follows:</p>

<ul>
	<li>
	<p>Run the <strong>initialization statement</strong> – the one before the first semicolon.</p>
	</li>
	<li>
	<p>Evaluate the <strong>condition</strong> – the expression before the second semicolon. If it evaluates to <code>false</code>, stop running the loop. Note that this means the loop could run zero times if the condition is <code>false</code> at the start.</p>
	</li>
	<li>
	<p>Evaluate the <strong>loop body</strong>.</p>
	</li>
	<li>
	<p>Evaluate the <strong>update expression</strong> – the last of the three parts of the loop header.</p>
	</li>
	<li>
	<p>Go back to the step in this list checking the condition expression, and proceed from there.</p>
	</li>
</ul>

<h3><span style="color: #cc0000;">Do Now!</span> Match each portion of the code with the part of the loop that it corresponds to.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "preserve_firsts_order": true,
  "is_html_enabled": true,
  "pairs": [
    {
      "first": "initialization statement",
      "second": "<code> int i = 1 </code>"
    },
    {
      "first": "condition",
      "second": "<code> i < args.length </code>"
    },
    {
      "first": "update expression",
      "second": "<code> i = i + 1 </code>"
    }
  ]
}
```

</details>

---

<!-- step 2476655 | type: text -->

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/65cf185cbf0efc2d9635d5a5d1e5ccd220785/welcome/1091425/CalcMain" width="100%"></iframe></p>

<p>If we run the above program with <code>java CalcMain sum 3 4 5</code>, the changes would look like:</p>

<p><img alt="" height="271" name="loop2.gif" src="https://ucarecdn.stepik.net/0349b4df-0f8b-46f8-88a1-18c88e05a409/" width="462"></p>

<p>Again, in tabular form, we could write it as:</p>

<table cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td>
			<p>   </p>
			</td>
			<td>
			<p><strong>Iteration</strong></p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p><strong>Value of <code>i</code></strong></p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p><strong>Value of <code>args[i]</code></strong></p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p><strong><code>total</code> before</strong></p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p><strong><code>total</code> after</strong></p>
			</td>
		</tr>
		<tr>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>1st</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>1</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>"3"</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>0</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>3</p>
			</td>
		</tr>
		<tr>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>2nd</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>2</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>"4"</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>3</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>7</p>
			</td>
		</tr>
		<tr>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>3rd</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>3</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>"5"</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>7</p>
			</td>
			<td>
			<p>   </p>
			</td>
			<td>
			<p>12</p>
			</td>
		</tr>
	</tbody>
</table>

---

<!-- step 2474169 | type: text -->

<h2>Summary</h2>

<ul>
	<li>We can run a block of code repeatedly using <strong>loops</strong></li>
	<li><strong>Loops</strong> are particularly useful for processing all of the elements of an array</li>
	<li>We've seen two kinds of loop:
	<ul>
		<li><strong>Element-wise for loops</strong> that let us visit each element in an array</li>
		<li><strong>Counted for loops</strong> that let us use a variable that gets updated on each iteration</li>
	</ul>
	</li>
	<li>Element-wise for loops are simpler, and counted for loops give us more flexibility.</li>
</ul>