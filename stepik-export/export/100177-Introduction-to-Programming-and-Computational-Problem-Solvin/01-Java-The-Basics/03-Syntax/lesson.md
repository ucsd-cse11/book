# Syntax


---

<!-- step 2318801 | type: string -->

**Quiz (string)**

<p>In all of the examples in the previous lesson, the program was defined simply as a sequence of characters in a plain text file. Some of them, like <code>{</code>, <code>;</code>,  <code>=</code>, and the arithmetic operators, are special symbols that have specific meaning to Java. Other sequences of characters, like <code>class</code> and <code>int</code>, are normal English words that mean something specific to Java – we call these <strong>keywords</strong>. Other sequences, like <code>theNumberFive</code> and <code>x</code>, we picked, and we could have chosen many other words in those places.</p>

<p>Java expects an extremely specific order for all of these words and symbols in a valid program. We call these rules the <strong>syntax</strong> of Java. For example, there must be a name after the keyword <code>class</code> . For now, that name will always be followed by an open curly brace (<code>{</code>). Then comes a sequence of fields, each separated by a semicolon. Then comes a closing curly brace (<code>}</code>). We can have any amount of <strong>whitespace</strong> between the fields or around the curly braces. By "whitespace," we mean spaces, newlines, and tabs.</p>

<p>It’s useful to see what Java does if we break these rules and write invalid syntax. For example, if we don't put an opening curly brace after <code>Syntax</code>, the program would look like:</p>

<p><iframe height="370px" scrolling="no" src="https://tech.io/playground-widget/252cd1fc1e4afeb7f06c682e3f1d2a5f20785/welcome/1084172/Syntax" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Run the program as-is and paste the entire output into the box below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "",
  "use_re": false,
  "match_substring": false,
  "case_sensitive": false,
  "code": "def check(reply):\n#     \"\"\"Evaluate the learner's reply.\n#\n#     It should return 1 or True for the correct reply and 0 or False\n#     for the incorrect one.\n#\n#     A partial solution may be scored using a float number from the\n#     interval (0, 1). In such a case the learner total score for the\n#     problem will be 'step cost' * 'score'.\n#\n#     :param reply: a string that is the learner's reply to the problem\n#     :return: a score number (int or float) in range [0, 1]\n    reply_no_new_lines = reply.replace(\"\\n\", \"\")\n    answer = \"Syntax.java:1: error: '{' expectedclass Syntax            ^1 error\"\n    return reply_no_new_lines == answer\n\n\n# def solve():\n#     \"\"\"Return a correct reply. This function is *optional*.\n#\n#     It is used to test the correctness of the 'check' function.\n#\n#     :return: a string that is a correct reply to the problem\n#\n#     \"\"\"\n#     return \"Hello\"",
  "is_text_disabled": false,
  "is_file_disabled": true
}
```

</details>

---

<!-- step 2318803 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>In the previous step, Java refused to run the program because it didn’t have the right syntax. Java is extremely picky and forces us to get things exactly right. <strong>You must get used to reading and responding to error messages like the one from the previous step.</strong> <strong>It’s nearly impossible to write correct syntax on the first try all the time</strong>, so you’ll often be interpreting error messages many times to make a program run. Even experienced programmers deal with this on a regular basis. Be patient with yourself, read the code carefully, and use try to use the error message to your advantage to make the fix.</p>

<p><span style="color: #cc0000;"><strong>Do Now! </strong></span>Take the previous example (provided here), put the curly brace back, and make sure the program works. Then delete the semicolon, run the program, and check the error message you get.</p>

<p><iframe height="370px" scrolling="no" src="https://tech.io/playground-widget/252cd1fc1e4afeb7f06c682e3f1d2a5f20785/welcome/1084173/Syntax" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>The program should produce an error message when it is run without a semicolon. Fill in the blanks for this error message below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code><u>Syntax.java:2:</u> error:</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "';' expected",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>\n<code> &nbsp;&nbsp;int theNumberFive = 5</code>",
      "options": []
    },
    {
      "type": "text",
      "text": "<br>\n<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^</code> <br>\n<code> 1 error </code>",
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

<!-- step 2367232 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p><span style="color: #cc0000;"><strong>Do Now! </strong></span>Take the previous example again (provided below) and add the semicolon back. Run it to make sure that it works. Then delete the equals sign, run the program, and check the error message you get.</p>

<p><iframe height="370px" scrolling="no" src="https://tech.io/playground-widget/252cd1fc1e4afeb7f06c682e3f1d2a5f20785/welcome/1084174/Syntax" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>The program should produce an error message when it is run without an equals sign. Use this program and this output to answer the questions below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "Which line in the program did you remove the equals sign from?",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "Line 1",
          "is_correct": false
        },
        {
          "text": "Line 2",
          "is_correct": true
        },
        {
          "text": "Line 3",
          "is_correct": false
        },
        {
          "text": "Line 4",
          "is_correct": false
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><br>\n<b> Fill in the blank below based on the error message produced when the program is run. </b> <br>\n<code><u>Syntax.java:</u></code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "2",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": ": &nbsp;<code>error: ';' expected</code><br>\n<code>&nbsp;&nbsp;int theNumberFive &nbsp;5;</code> <br>\n<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^</code> <br>\n<code> 1 error </code>",
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

<!-- step 2398398 | type: text -->

<h2>Summary</h2>

<ul>
	<li>It is important to write all of the words and the symbols in the correct order. Java has certain rules regarding things such as the placement of curly braces and the inclusion of semicolons. We refer to these rules as the <strong>syntax </strong>of Java.</li>
	<li>When a program with incorrect syntax is run, the output will include an error message. The error message may contain useful information that will help you figure out what the error is.</li>
	<li>It’s important to get some practice in responding to error messages like these. Programmers get used to seeing these dozens or hundreds of times per week as they work through programming projects. Don’t be intimidated by them, but use them to figure out your mistakes, misconceptions, and typos.</li>
</ul>