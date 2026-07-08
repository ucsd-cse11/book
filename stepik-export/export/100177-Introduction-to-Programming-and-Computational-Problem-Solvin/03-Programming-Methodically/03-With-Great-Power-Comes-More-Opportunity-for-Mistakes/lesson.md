# With Great Power Comes More Opportunity for Mistakes


---

<!-- step 2331824 | type: string -->

**Quiz (string)**

<p>In the first section, we saw how we needed to be careful with syntax to avoid syntactic mistakes. In the second, we saw that <em>types</em> could be mismatched, causing errors. Now that we’ve introduced methods, we have several new errors that can come up. It’s useful to see them in a controlled environment and understand their cause.</p>

<p>In the <code>fillIn()</code> example, we always called the <code>fillIn()</code> method with two arguments. What if we don't, and instead call it with just one?</p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Run the following code and copy the first line of the resulting error message into the box below.</h3>

<p><iframe height="560px" scrolling="no" src="https://tech.io/playground-widget/635ceffb77413a0842dfed60dceff71020785/welcome/1085015/Understanding%20Errors" width="100%"></iframe></p>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "MadLibs.java:12: error: method fillIn in class MadLibs cannot be applied to given types;",
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

<!-- step 2379713 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>For reference, here is the error message from the code in the previous step:</p>

<pre><code class="language-no-highlight">MadLibs.java:12: error: method fillIn in class MadLibs cannot be applied to given types;
  String example1 = this.fillIn("useless");
                        ^
  required: String,int
  found: String
  reason: actual and formal argument lists differ in length</code></pre>

<p>The key part of this error is the line starting with “required” which is telling us that the <code>fillIn()</code> method was specified, in its <strong>method header</strong>, to take two <strong>parameters</strong> (which Java calls “formal arguments”). In the <strong>method call</strong>, only one <strong>argument</strong> (which Java calls “actual arguments”) was provided. Java will refuse to run this program because it is nonsense to use a method with the wrong number of arguments. Notice that in the code example below, the method call takes two arguments and runs without any errors.</p>

<h3><iframe height="565px" scrolling="yes" src="https://tech.io/playground-widget/635ceffb77413a0842dfed60dceff71020785/welcome/1085016/Understanding%20Errors" width="100%"></iframe></h3>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Change the code above so that the <strong>method call</strong> (not the method header) uses three <strong>arguments</strong> instead of two. For the purposes of the question below, make the 3rd argument an <code>int</code> value. Then run the program. What is the resulting error message?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>MadLibs.java:11: error: method fillIn in class MadLibs cannot be applied to given types;<br>&nbsp;&nbsp;...<br><br>&nbsp;&nbsp;required: </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "String,int",
          "is_correct": true
        },
        {
          "text": "String, int",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code><br>&nbsp;&nbsp;found: </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "String,int,int",
          "is_correct": true
        },
        {
          "text": "String, int, int",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code><br>&nbsp;&nbsp;reason: </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "actual and formal argument lists differ in length",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code><br>1 error</code>",
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

<!-- step 2319193 | type: text -->

<p>We saw before that Java will complain if we try to mix values of different types in certain ways. This comes up again in the context of method definitions and method calls. For instance, if we have a mismatch between the <strong>method body</strong> and the <strong>return type</strong>, we can see an error occur:</p>

<p><iframe height="455px" scrolling="no" src="https://tech.io/playground-widget/cb8d972c6dd983f5d5f9cd5b835c98c720785/welcome/1086626/Understanding%20Errors" width="100%"></iframe></p>

<p><span style="color: #cc0000;"><strong>Do Now! </strong></span>Run the program and observe the error message it produces.</p>

<p>This is a somewhat confusing place for the error to show up! We might be misled into trying to change something about the use of + or the body of the method here. However, the error is different. This is an important lesson: <strong>The location that Java reports in the error message is not always the location that needs to be fixed.</strong></p>

---

<!-- step 2319199 | type: text -->

<p>Let’s repeat that, because it’s very important:</p>

<h3><strong>The location that Java reports in the error message is not always the location that needs to be fixed.</strong></h3>

<p>No, seriously, let’s really make sure that we don’t gloss over this important point.</p>

<h2>The location that Java reports in the error message is not always the location that needs to be fixed.</h2>

---

<!-- step 2331839 | type: string -->

**Quiz (string)**

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> What’s the important lesson?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "The location that Java reports in the error message is not always the location that needs to be fixed.",
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

<!-- step 2331838 | type: text -->

<pre><code class="language-java">class MadLibs {
  /*
    Places the given adjective and number into the sentence template to
    create a full sentence.
  */
  // NOTE: String has been changed to int in the return type below.
  int fillIn(String adjective, int number) {
    return "The professor's explanation was " + adjective +
        ", probably because he's been teaching for " + number + " years.";
  }
}</code></pre>

<p>The actual error here is that the body of the method is returning a <code>String</code>, and the <strong>return type</strong> says that the method must return an <code>int</code>. Java reports an error because of this mismatch, but it doesn’t have any information about whether we made a mistake in the method body, or if we wrote down the wrong return type. It’s simply reporting that there’s an inconsistency.</p>

<p>This means it is crucial that when we see an error message, we carefully read the area that’s pointed to by the error, but also that we keep in mind that Java, when reporting errors, is not particularly sophisticated. Recall that the error we introduced here is a mismatch between the <strong>return type</strong> and the <strong>method body</strong>, and the fix is to change the <strong>return type</strong> back to <code>String</code>. You might think, “That’s obvious, we just made that small change.” However, it’s quite easy to make a small mistake or typo, and then be led astray by the error messages. This is why it’s very important to have tools like the design recipe, so we can go back and check our work with our own process, rather than relying on error messages that aren’t always reliable indicators of our mistake.</p>

---

<!-- step 2379714 | type: choice -->

**Quiz (choice)**

<p>In addition to checking that the <strong>return type</strong> is consistent with the <strong>method body</strong>, Java will also check that any <strong>arguments</strong> passed to the method are consistent with the types of the <strong>parameters</strong>. So if we, for example, try to pass a <code>int</code> value in place of a <code>String</code> when calling <code>fillIn()</code>, we will also see an error:</p>

<p><iframe height="500px" scrolling="no" src="https://tech.io/playground-widget/cb8d972c6dd983f5d5f9cd5b835c98c720785/welcome/1086627/Understanding%20Errors" width="100%"></iframe></p>

<p><span style="color: #cc0000;"><strong>Do Now! </strong></span>Run the code and observe the error message.</p>

<p>This error happens because the first <strong>parameter</strong> of <code>fillIn()</code>, <code>adjective</code>, is specified to have type <code>String</code>. The value <code>1</code> doesn’t match that (it’s an <code>int</code>), so an error is reported. In this case, Java is providing a helpful error message (rejoice!). Just remember that this won’t always be the case (and it’s not just Java’s fault; no language gives perfect error messages in all cases).</p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Which of the following pairs of method headers and method calls will <em>not</em> result in an error?</h3>


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
      "text": "<code>String makeWeatherReport(int temperature, int humidity, String conditions) {}<br>String weatherReport = makeWeatherReport(73, 80, \"Clear with periodic clouds\");</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>String findRestaurant(String cuisine, String zipCode, int partySize) {}<br>String restaurant = findRestaurant(\"Mediterranean\", \"92093\", 8);</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>String getPhoneNumber(String name, String id) {}<br>String phoneNumber = getPhoneNumber(\"Mason\", 413527);</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>String sendEmail(String sender, String recipient, String title, String body) {}<br>String email = sendEmail(\"Joe\", \"Alvin\", \"Re: Homework\");</code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2399363 | type: text -->

<h2>Summary</h2>

<ul>
	<li>When we use methods, we also introduce the possibility for many new errors to occur:
	<ul>
		<li>If a method is called with an incorrect number of arguments, then it will result in an error.</li>
		<li>If the data types of the arguments do not match up with the parameters, then it will result in an error.</li>
		<li>If the data type of the return value does not match the return type in the method header, then it will result in an error.</li>
	</ul>
	</li>
	<li><strong>The location that Java reports in the error message is not always the location that needs to be fixed.</strong></li>
</ul>