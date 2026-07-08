# More Examples of Decision-Making Programs


---

<!-- step 2375623 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>There are lots of useful programs that make decisions based on the values of numbers. For example, one handy function is <code>max()</code>, which takes in two numbers and returns the larger one. Its method header and documentation are as follows:</p>

<pre><code class="language-java">// Returns the larger of num1 and num2
int max(int num1, int num2) {
  // need to fill this in
}

int maxLeft = this.max(5, 4); // should be 5
int maxRight = this.max(6, 7); // should be 7
int maxSame = this.max(3, 3); // should be 3</code></pre>

<p>Here, the method body has a similar shape to the weekly pay method above. But instead of comparing the numbers to a constant like <code>40</code>, we need to compare the two parameters to see which one is larger. So <code>max()</code> ends up looking like this:</p>

<pre><code class="language-java">// Returns the larger of num1 and num2
int max(int num1, int num2) {
  if(num1 &gt; num2) {
    return num1;
  }
  else {
    return num2;
  }
}</code></pre>

<h3><strong><span style="color: #cc0000;">Do Now!</span></strong> Fill in the implementation for <code>absolute()</code>, which takes an integer and returns its absolute value.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>// Returns the absolute value of num<br>int absolute(int num) {<br>&nbsp;&nbsp;if(num > 0) {<br>&nbsp;&nbsp;&nbsp;&nbsp;return </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "num",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;else {<br>&nbsp;&nbsp;&nbsp;&nbsp;return </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "-num",
          "is_correct": true
        },
        {
          "text": "num * -1",
          "is_correct": true
        },
        {
          "text": "-1 * num",
          "is_correct": true
        },
        {
          "text": "num*-1",
          "is_correct": true
        },
        {
          "text": "-1*num",
          "is_correct": true
        },
        {
          "text": "0 - num",
          "is_correct": true
        },
        {
          "text": "0-num",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>;<br>&nbsp;&nbsp;}<br>}</code>",
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

<!-- step 2327648 | type: text -->

<p>Sometimes, we can’t capture everything we need to know with a single comparison like in <code>max()</code> and, in the previous section, <code>weekly()</code>. For example, consider the method <code>gradeForNumber()</code>, which takes a number representing a score out of 100, and returns a letter from <code>"A"</code> to <code>"F"</code> representing a grade. Let’s set it up using the design recipe:</p>

<pre><code class="language-java">// Returns A if the score is over 90, B if 80-89, C if 70-79, D if 60-69, F if below 60
String gradeForNumber(int score) {
  // Fill in here
}
String aGrade1 = this.gradeForNumber(95); // Should be "A"
String aGrade2 = this.gradeForNumber(90); // Should be "A"
String aGrade3 = this.gradeForNumber(100); // Should be "A"
String bGrade1 = this.gradeForNumber(80); // Should be "B"
String cGrade1 = this.gradeForNumber(72); // Should be "C"
String fGrade1 = this.gradeForNumber(55); // Should be "F"</code></pre>

<p>If we try to use the structure above, we can easily figure out how to return <code>"A"</code>, but it’s less clear what to do in the <strong>else branch</strong>:</p>

<pre><code class="language-java">String gradeForNumber(int score) {
  if(score &gt;= 90) {
    return "A";
  }
  else {
    // What to do here?
  }
}</code></pre>

---

<!-- step 2327649 | type: text -->

<p>It turns out that we can write more than just two branches for an <code>if</code> statement! Instead of just having a single else branch, we can add even more branches, each with its own condition:</p>

<pre><code class="language-java">String gradeForNumber(int score) {
  if(score &gt;= 90) {
    return "A";
  }
  else if(score &gt;= 80) {
    return "B";
  }
  else if(score &gt;= 70) {
    return "C";
  }
  else if(score &gt;= 60) {
    return "D";
  }
  else {
    return "F";
  }
}</code></pre>

<p>There are a few things to note here:</p>

<ul>
	<li>
	<p>The way this extended kind of <code>if</code> statement evaluates is by checking each condition <em>in order</em>, and it runs the branch corresponding to the first condition that is <code>true</code>. So if the input is <code>72</code>, the value <code>72</code> will first be compared to <code>90</code>, then to <code>80</code>, and finally to <code>70</code>, where the comparison returns <code>true</code>. Thus, return <code>"C"</code> is evaluated. Note that even though the condition <code>score &gt;= 60</code> is also true in this case, Java doesn’t return <code>"D"</code> because that comparison comes after the one for <code>"C"</code>.</p>
	</li>
	<li>
	<p>Java requires that we always make it obvious that <em>something</em> of the right type is being returned. If we change the program slightly, like so:</p>
	</li>
</ul>

<p><iframe height="640px" scrolling="no" src="https://tech.io/playground-widget/17bc122ec849de119fd09031cebc57ff20785/welcome/1086454/Using%20Conditions" width="100%"></iframe></p>

<p>As seen when running the code above, we end up getting the following error:</p>

<pre><code class="language-no-highlight">Grades.java:18: error: missing return statement
  }
  ^</code></pre>

<p>This is because Java can’t figure out that the method will always return some <code>String</code> here just by looking at the method body. As a result, it complains to us that it can’t find a <code>return</code>. If we just use <code>else</code> (like we did in the previous definition) instead of <code>else if(score &lt; 60)</code>, Java can rely on the fact that the <strong>else branch</strong> will run if none of the conditions evaluate to <code>true</code>, guaranteeing that something will be returned by the method.</p>

---

<!-- step 2380016 | type: string -->

**Quiz (string)**

<p><iframe height="750px" scrolling="yes" src="https://tech.io/playground-widget/a303a147097ae31949910dfbabea3c1f20785/welcome/1085128/Using%20Conditions" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Change the program so that the condition and branch for the <code>"D"</code> case come before the condition and branch for the <code>"C"</code> case. With this change, what is an argument that could be supplied for <code>score</code> that would make the method return <code>"C"</code>? Enter a possible answer (or N/A if none exists) in the box below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "N/A",
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

<!-- step 2379977 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p><iframe height="750px" scrolling="yes" src="https://tech.io/playground-widget/a303a147097ae31949910dfbabea3c1f20785/welcome/1085129/Using%20Conditions" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Write this method in the “opposite” order, where the check for the <code>"F"</code> case comes first and the check for the <code>"A"</code> case comes last. The new version of the method should return the same values as the original, and you should only use a single operator in each condition. After rewriting the method above, fill in the boxes below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>String gradeForNumber(int score) {<br>&nbsp;&nbsp;if(</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "score < 60",
          "is_correct": true
        },
        {
          "text": "score<60",
          "is_correct": true
        },
        {
          "text": "60 > score",
          "is_correct": true
        },
        {
          "text": "60>score",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>) {<br>&nbsp;&nbsp;&nbsp;&nbsp;return \"F\";<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;else if(</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "score < 70",
          "is_correct": true
        },
        {
          "text": "score<70",
          "is_correct": true
        },
        {
          "text": "70 > score",
          "is_correct": true
        },
        {
          "text": "70>score",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>) {<br>&nbsp;&nbsp;&nbsp;&nbsp;return \"D\";<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;else if(</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "score < 80",
          "is_correct": true
        },
        {
          "text": "score<80",
          "is_correct": true
        },
        {
          "text": "80 > score",
          "is_correct": true
        },
        {
          "text": "80>score",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>) {<br>&nbsp;&nbsp;&nbsp;&nbsp;return \"C\";<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;else if(</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "score < 90",
          "is_correct": true
        },
        {
          "text": "score<90",
          "is_correct": true
        },
        {
          "text": "90 > score",
          "is_correct": true
        },
        {
          "text": "90>score",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>) {<br>&nbsp;&nbsp;&nbsp;&nbsp;return \"B\";<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;else {<br>&nbsp;&nbsp;&nbsp;&nbsp;return \"A\";<br>&nbsp;&nbsp;}<br>}</code>",
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

<!-- step 2359764 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Sometimes, we need to combine more than one comparison result. For example, in this course (and in many other courses) you will need both a passing average grade <em>and</em> over half the credit on the final to pass overall. In order to write a function that calculates whether a student passed the course or not, we will need to consider both of these criteria.</p>

<p>There are two operators we can use for combining booleans: <code>&amp;&amp;</code> and <code>||</code>.</p>

<ul>
	<li>The <code>&amp;&amp;</code> operator (pronounced “and”) evaluates to <code>true</code> if both operands are <code>true</code>, and <code>false</code> otherwise.</li>
	<li>The <code>||</code> operator (pronounced “or”) evaluates to <code>true</code> if either or both operand(s) is <code>true</code>, and <code>false</code> otherwise.</li>
</ul>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Fill in the blanks below based on whether the corresponding expression evaluates to <code>true</code> or <code>false</code>. (As an example, <code>true || false</code> evaluates to <code>true</code> because the operand on the left is <code>true</code>.)</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>true && true</code> evaluates to ",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": true
        },
        {
          "text": "false",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": ".<br><code>true && false</code> evaluates to ",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": false
        },
        {
          "text": "false",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": ".<br><code>false && true</code> evaluates to ",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": false
        },
        {
          "text": "false",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": ".<br><code>false && false</code> evaluates to ",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": false
        },
        {
          "text": "false",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": ".<br><code>true || true</code> evaluates to ",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": true
        },
        {
          "text": "false",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": ".<br><code>false || true</code> evaluates to ",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": true
        },
        {
          "text": "false",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": ".<br><code>false || false</code> evaluates to ",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "true",
          "is_correct": false
        },
        {
          "text": "false",
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

<!-- step 2327675 | type: text -->

<p>With this in mind, we can implement a method <code>passing()</code> that takes two numbers — one representing an overall average and another representing the score on the final — and returns whether or not they make up a passing performance.</p>

<pre><code class="language-java">// Returns true if the grades are sufficient to pass, false otherwise
boolean passing(int overallAverage, int finalScore) {
  return (overallAverage &gt;= 60) &amp;&amp; (finalScore &gt;= 50);
}
boolean goodGradeBadFinal = this.passing(80, 40); // should be false
boolean goodGradeGoodFinal = this.passing(80, 60); // should be true
boolean badGradeGoodFinal = this.passing(40, 80); // should be false
boolean badGradeBadFinal = this.passing(40, 40); // should be false</code></pre>

<p>Note that here, the method is returning a <code>boolean</code> value. Using comparisons and operators like this gives us another way to write programs that answer a yes/no question. This method doesn’t use an <code>if</code> statement; instead, the yes/no answer is represented by the return value.</p>

---

<!-- step 2399415 | type: text -->

<h2>Summary</h2>

<ul>
	<li>We can write more than two branches of an <code>if</code> statement. However, the statement needs to be written such that the program will always return a value that matches the return type.</li>
	<li>It is possible to combine multiple comparisons by using the <code>&amp;&amp;</code> (pronounced “and”) and <code>||</code> (pronounced “or”) operators.</li>
</ul>