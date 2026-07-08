# From Examples to Testing


---

<!-- step 2354981 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Let’s take stock of the whole program we’ve written so far in this section:</p>

<p><iframe height="1266px" scrolling="yes" src="https://tech.io/playground-widget/7887acbdd9eb31b86ac82e22cee8394c20785/welcome/1086166/Reviewing%20the%20Code" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Fill in the blanks in the program that we've written so far.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "BLANK1: ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "int",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>BLANK2: ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "other.author",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>BLANK3: ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "length",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>BLANK4: ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "this.title",
          "is_correct": true
        },
        {
          "text": "title",
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

<!-- step 2334607 | type: text -->

<p>Below is what we get when we run the program. </p>

<p>Let’s observe a few things about this:</p>

<ul>
	<li>
	<p>We should be very happy that we have examples that double-check the work we did while coding the methods we wrote. It gives us a lot of confidence that our code is working as intended.</p>
	</li>
	<li>
	<p>It’s not ideal that we have to switch back and forth between the file we wrote and the output to verify that everything is as we expected. That is, we have to <em>visually inspect</em> that each output is correct, based on the comment we wrote with the example.</p>
	</li>
	<li>
	<p>There’s a weird message at the bottom that says <code>No test methods found.</code> that we haven’t talked about yet.</p>
	</li>
</ul>

<pre><code class="language-no-highlight">⤇ ./run ExamplesBook
Tester Prima v.2.1
-----------------------------------
Tests defined in the class: ExamplesBook:
---------------------------
ExamplesBook:
---------------
 new ExamplesBook:1(
  this.schemer =
   new Book:2(
    this.title =  "The Little Schemer"
    this.author =  "Daniel P. Friedman"
    this.price = 40)
  this.stick =
   new Book:3(
    this.title =  "Make It Stick: The Science of Successful Learning"
    this.author =  "Peter C. Brown"
    this.price = 13)
  this.pLaw =
   new Book:4(
    this.title =  "Parkinson's Law"
    this.author =  "C. Northcote Parkinson"
    this.price = 30)
  this.reason =
   new Book:5(
    this.title =  "The Reasoned Schemer"
    this.author =  "Daniel P. Friedman"
    this.price = 38)
  this.sale1 = 30
  this.sale2 = 7
  this.sale3 = 27
  this.truncate1 =  "Make It Stick: ..."
  this.truncate2 =  "The Little Schemer"
  this.truncate3 =  "..."
  this.same1 = true
  this.same2 = false
  this.same3 = true)
---------------
No test methods found.</code></pre>

---

<!-- step 2446403 | type: string -->

**Quiz (string)**

<p>Before we handle that last point, there’s one step we could take to make it easier to double-check our work right away. Instead of putting the answer to the method call directly in the example, we could use <code>==</code> (in the case of <code>int</code> and <code>boolean</code>), or <code>equals()</code> (in the case of <code>String</code>s) to check if the answer is what we expect. Then we would only need to make sure that all the examples evaluate to <code>true</code>, which is easier than manually comparing them with our comments on what the return values should be.</p>

<p>Ideally, we’d like a system that can <em>check for equality</em>, <em>summarize successes</em>, and <em>show us the reason for failures</em>. Systems that do this are known as <strong>testing frameworks</strong> or <strong>testing libraries</strong>, and one comes built in to the libraries we’re using for the course.</p>

<p>The way that testing works in this course is that we can write any number of methods starting with the word <code>test</code> that have the return type <code>boolean</code> and take in a reference to an object of type <code>Tester</code> as a parameter. The <code>Tester</code> object has a particular method that we’ll use extensively called <code>checkExpect()</code>, which takes any two values of the same type, compares them for equality, and prints useful messages if they aren’t equal.</p>

<p>It’s useful to write this all out and describe the pieces. Here’s a method that we could add to replace the first example we wrote, <code>sale1</code>:</p>

<pre><code class="language-java">// Originally, we wrote this:
int sale1 = this.schemer.salePrice(25); // Should be 30

// We can write this instead:
boolean testSalePrice(Tester t) {
  return t.checkExpect(this.schemer.salePrice(25), 30);
}</code></pre>

<p>We also have to tell Java that we want to use the <code>Tester</code> class, since it isn’t built into Java (it’s part of a library we’re using). So this line is necessary at the <em>top</em> of the file whenever we mention <code>Tester</code>:</p>

<pre><code class="language-java">import tester.*;</code></pre>

<p>Here's the program all together:</p>

<p><iframe height="900px" scrolling="yes" src="https://tech.io/playground-widget/2e1d7e9302912f1301de20c7d64d4b1820785/welcome/1098111/Using%20Tester" width="100%"></iframe></p>

<h3><span style="color: #ff4363;"><strong>Do Now!</strong></span> Run the program. What's the line of output right <strong>before</strong> "All tests passed"? Put it into the box below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "Ran 1 test.",
  "use_re": false,
  "match_substring": true,
  "case_sensitive": false,
  "code": "# def check(reply):\n#     \"\"\"Evaluate the learner's reply.\n#\n#     It should return 1 or True for the correct reply and 0 or False\n#     for the incorrect one.\n#\n#     A partial solution may be scored using a float number from the\n#     interval (0, 1). In such a case the learner total score for the\n#     problem will be 'step cost' * 'score'.\n#\n#     :param reply: a string that is the learner's reply to the problem\n#     :return: a score number (int or float) in range [0, 1]\n#\n#     \"\"\"\n#     return reply == \"Hello\"\n\n# def solve():\n#     \"\"\"Return a correct reply. This function is *optional*.\n#\n#     It is used to test the correctness of the 'check' function.\n#\n#     :return: a string that is a correct reply to the problem\n#\n#     \"\"\"\n#     return \"Hello\"",
  "is_text_disabled": false,
  "is_file_disabled": true
}
```

</details>

---

<!-- step 2446404 | type: string -->

**Quiz (string)**

<p>We can add more tests in two ways. First, we can use multiple calls to <code>checkExpect()</code> together in the test method and combine them together with <code>&amp;&amp;</code>:</p>

<pre><code class="language-java">// We can write this instead of all the salePrice() examples:
boolean testSalePrice(Tester t) {
  return t.checkExpect(this.schemer.salePrice(25), 30) &amp;&amp;
         t.checkExpect(this.stick.salePrice(50), 7) &amp;&amp;
         t.checkExpect(this.pLaw.salePrice(10), 27);
}</code></pre>

<p>This produces the following:</p>

<pre><code class="language-no-highlight">---------------

Ran 3 tests.
All tests passed.

--- END OF TEST RESULTS ---</code></pre>

<h3><span style="color: #ff4363;"><strong>Do Now!</strong></span> Based on what you see here, what must the return type of <code>checkExpect</code> be? </h3>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "boolean",
  "use_re": false,
  "match_substring": true,
  "case_sensitive": true,
  "code": "# def check(reply):\n#     \"\"\"Evaluate the learner's reply.\n#\n#     It should return 1 or True for the correct reply and 0 or False\n#     for the incorrect one.\n#\n#     A partial solution may be scored using a float number from the\n#     interval (0, 1). In such a case the learner total score for the\n#     problem will be 'step cost' * 'score'.\n#\n#     :param reply: a string that is the learner's reply to the problem\n#     :return: a score number (int or float) in range [0, 1]\n#\n#     \"\"\"\n#     return reply == \"Hello\"\n\n# def solve():\n#     \"\"\"Return a correct reply. This function is *optional*.\n#\n#     It is used to test the correctness of the 'check' function.\n#\n#     :return: a string that is a correct reply to the problem\n#\n#     \"\"\"\n#     return \"Hello\"",
  "is_text_disabled": false,
  "is_file_disabled": true
}
```

</details>

---

<!-- step 2362515 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Second, we can define as many test methods as we like. So we could define another that captures all the truncate tests, and another that captures all the same author tests:</p>

<pre><code class="language-java">boolean testSalePrice(Tester t) {
  return t.checkExpect(this.schemer.salePrice(25), 30) &amp;&amp;
         t.checkExpect(this.stick.salePrice(50), 6) &amp;&amp;
         t.checkExpect(this.pLaw.salePrice(10), 27);
}

boolean testTruncateTitle(Tester t) {
  return t.checkExpect(this.stick.truncateTitle(15), "Make It Stick: ...") &amp;&amp;
         t.checkExpect(this.schemer.truncateTitle(20), "The Little Schemer") &amp;&amp;
         t.checkExpect(this.schemer.truncateTitle(0), "...");
}

boolean testSameAuthor(Tester t) {
  return t.checkExpect(this.reason.sameAuthor(this.schemer), true) &amp;&amp;
         t.checkExpect(this.reason.sameAuthor(this.stick), false) &amp;&amp;
         t.checkExpect(this.schemer.sameAuthor(this.reason), true);
}</code></pre>

<p>This produces the following:</p>

<pre><code class="language-no-highlight">---------------

Ran 9 tests.
All tests passed.

--- END OF TEST RESULTS ---</code></pre>

<p>The test output nicely summarizes all the successes; in addition, the testing library is smart enough to correctly compare <code>String</code>s with <code>equals()</code> and <code>int</code>s with <code>==</code>, so we don’t have to worry about that detail.</p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Say that we write another method, <code>titleContains()</code>, that receives a <code>String</code> argument and returns <code>true</code> if the title of the book it was called on contains the <code>String</code> in question (and returns <code>false</code> if it doesn't). Fill in the blanks for the test method that we would write for this method below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>\nBook schemer = new Book(\"The Little Schemer\", \"Daniel P. Friedman\", 40); <br>\nBook stick = new Book(\"Make it Stick: The Science of Successful Learning\", \"Peter C. Brown\", 13); <br><br>\n</code>\n<code>boolean testTitleContains(Tester t) {<br>&nbsp; return t.checkExpect(this.stick.titleContains(\"Science\"), </code>",
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
      "text": "<code>) &&<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t.checkExpect(</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "this.schemer",
          "is_correct": true
        },
        {
          "text": "schemer",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>.titleContains(\"Schemer\"), true) &&<br>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  t.checkExpect(this.stick.titleContains(</code>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "\"Successful Learning\"",
          "is_correct": false
        },
        {
          "text": "\"Stick the Science\"",
          "is_correct": true
        },
        {
          "text": "\":\"",
          "is_correct": false
        },
        {
          "text": "\" \"",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>), false);<br>}</code>",
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

<!-- step 2446418 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Additionally, if we get something wrong, the <code>tester</code> library is quite helpful in pointing out how. For example, we've introduced a mistake in this version of the program:</p>

<p><iframe height="1100px" scrolling="yes" src="https://tech.io/playground-widget/2e1d7e9302912f1301de20c7d64d4b1820785/welcome/1098112/When%20Tester%20fails" width="100%"></iframe></p>

<p>Try running it to see what output you get.</p>

<h3><span style="color: #ff4363;"><strong>Do Now! </strong></span>Answer the questions below about the output you see from the tester.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "How many tests ran?",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "7",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br/>Which part of the output indicates the <b>line number</b> of the failing test?",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "new Book:2",
          "is_correct": false
        },
        {
          "text": "Error in test number 7",
          "is_correct": false
        },
        {
          "text": "actual:...expected:",
          "is_correct": false
        },
        {
          "text": "ExamplesBook.java:36",
          "is_correct": true
        },
        {
          "text": "Error in test number 1",
          "is_correct": false
        },
        {
          "text": "Error in test number 4",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": "<br/>What value did our test <em>expect</em> the method to produce?",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "30",
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

<!-- step 2446417 | type: text -->

<p>Let's look at that output again:</p>

<pre><code>Ran 7 tests.
1 test failed.

Failed test results: 
--------------

Error in test number 7

tester.ErrorReport: Error trace:
        at ExamplesBook.testSalePrice(ExamplesBook.java:36)
        at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
        at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
actual:...........................................expected:

40................................................30


--- END OF TEST RESULTS ---</code></pre>

<p>The failed test prints the result of calling the method on the left, and on the right, the result we originally wrote down as the expected answer in the test appears. This helps us quickly see which test has failed.</p>

<p>It’s important to note the number of tests that ran — the message says that 7 tests ran and 1 failed (so 6 of them passed), but we wrote 9 uses of <code>checkExpect</code>! This happened because while all test methods always run, an individual test method stops when the first <code>checkExpect</code> within it fails. In this case, the first check inside one of the test methods failed, so the other two didn’t <code>checkExpect</code>s did not run. That accounts for the difference.</p>

<p>This is often useful because it prevents the test output from being overwhelming and reporting all of the different ways things are failing, since multiple tests often fail for the same reason. But if we really want tests to run even when others fail, we can always put them into separate <code>test</code> methods.</p>

<p>(Oh, and what was the bug? It was a change in the order of operations in the <code>salePrice</code> method that did integer division on <code>(percentage / 100)</code>, which always produced 0.)</p>

---

<!-- step 2446903 | type: text -->

<h2>Summary</h2>

<ul>
	<li>Up until this lesson, we wrote tests by calling the method, commenting its expected return value, and manually checking the output of the program to see that it the expected value matched the value shown in the output.</li>
	<li>We can test our code in a more efficient way by using the <code>Tester</code> class, which helps us to <em>check for equality</em>, <em>summarize successes</em>, and <em>show the reason for failures</em>.</li>
</ul>