# Java Checks Types


---

<!-- step 2328761 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>A natural next question to ask is what happens if we try to use the word <code>int</code> in place of <code>String</code>, or more generally, how we can mix <code>String</code>s and <code>int</code>s. This is a kind of exploration that’s useful to do when we learn a programming language, especially on small examples. This can help us to understand what certain parts of the language do when combined together, so if we encounter the error in a larger program later on, we will have a better understanding.</p>

<p>Let’s start with this simple program:</p>

<p><iframe height="350px" scrolling="no" src="https://tech.io/playground-widget/67b5617f4e1d76c169925374c6e63a2d49685/welcome/1084112/Mixing%20Strings%20and%20ints" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Run the code and use the output to fill in the blanks.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code><u>JavaChecksTypes.java:2:</u> error: </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "incompatible types",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> : </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "String",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> cannot be converted to int </code> <br>\n  <code>&nbsp;&nbsp;int firstName = </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "\"Dorothy\"",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>;</code> <br>\n<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^</code><br>\n<code>1 error</code>",
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

<!-- step 2328778 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>A similar error occurs if we try the opposite, storing an <code>int</code> in a <code>String</code>-typed field:</p>

<p><iframe height="450px" scrolling="no" src="https://tech.io/playground-widget/b6bf759a164313c4cab47a2fff43aad549685/welcome/1084069/Mixing%20Strings%20and%20ints" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Look at the output of the program and use it to fill in the blanks. Make sure that you understand which parts of this output are different from the output we saw in the previous step.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code> <u>JavaChecksTypes.java:2:</u> error: incompatible types: </code>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "String",
          "is_correct": false
        },
        {
          "text": "int",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": " <code> cannot be converted to </code>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "String",
          "is_correct": true
        },
        {
          "text": "int",
          "is_correct": false
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

<!-- step 2328804 | type: choice -->

**Quiz (choice)**

<p>We might think that error messages about types are particular to storing values in fields, but Java will check the types of values wherever they appear in the program. For example, we could try to divide an <code>int</code> by a <code>String</code>:</p>

<p><iframe height="450px" scrolling="no" src="https://tech.io/playground-widget/b6bf759a164313c4cab47a2fff43aad549685/welcome/1084070/Mixing%20Strings%20and%20ints" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Which of the following options contain text that is part of the output? </h3>


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
      "text": "<code>error: bad operand types for binary operator '/'</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>this.answer</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code><pre>first type:  int</pre></code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>error: bad operand types for binary operator '+'</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> error: String cannot be converted to int </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> error: ';' expected </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>second type: int</code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2328807 | type: text -->

<p>In the example from the previous step (added here for reference), Java complains that the program is using <code>/</code> incorrectly because it’s nonsensical to divide by a <code>String</code>.</p>

<p><iframe height="450px" scrolling="no" src="https://tech.io/playground-widget/b6bf759a164313c4cab47a2fff43aad549685/welcome/1084070/Mixing%20Strings%20and%20ints" width="100%"></iframe></p>

<p>In these examples, it’s easy to spot the issue. In larger programs, we need to keep in mind these <strong>type errors</strong>, just as we need to keep in mind <strong>syntax errors</strong> (from the last section), when we see Java produce an error message.</p>

---

<!-- step 2398404 | type: text -->

<h2>Summary</h2>

<ul>
	<li>When a <code>String</code> value is used in a place where an int value is expected (and vice versa), Java will produce an error.</li>
	<li>These are called <strong>type errors</strong>, and just like for syntax errors, you should learn how to read these error messages and use them to your benefit.</li>
</ul>