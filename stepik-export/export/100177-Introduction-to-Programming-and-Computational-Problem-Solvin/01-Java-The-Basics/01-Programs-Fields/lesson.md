# Programs, Fields


---

<!-- step 2356177 | type: number -->

**Quiz (number)**

<p>In this course, we’ll write, test, and run programs in a language called Java. What that means (in very blunt terms) is that we’ll put a bunch of text into a file with the extension <code>.java</code> (or, in the case of this online textbook, into a text box on the screen), and use tools to run it and check the output. For now, most of the details are hidden from you. We will tell you what to type at first, and then slowly give you less and less specific guidance as we explain more about what you've done.</p>

<p><strong><span style="color: #cc0000;">Do Now!</span> </strong>In the box below, copy this program:</p>

<pre><code class="language-java">class FirstExample {
  int theNumberFive = 5;
}</code></pre>

<p>Then click the blue Run button and look at the results.</p>

<p><iframe height="450px" scrolling="yes" src="https://tech.io/playground-widget/2cda915979d4656346bdf81e6c5fef0610585/welcome/1084001/First%20Example" width="100%"></iframe></p>

<p>You should see something like this:</p>

<p><img alt="" height="898" name="Screen Shot 2021-08-31 at 11.25.25 AM.png" src="https://ucarecdn.stepik.net/1fb6c48e-7158-4072-a822-9accc36adf77/" width="2038"></p>

<p>Next, change the <code>5</code> on line 2 into the number <code>40</code>. Click on the green "Success!" button (it's the same Run button as before with a different label) to re-run the program. You should see the same kind of output but with <code>5</code> replaced with <code>40</code>.</p>

<p>This is one of the primary activities we do when programming – we edit the text of our <strong>program</strong>, then <strong>run</strong> it somehow, and the programming environment shows us some <strong>output</strong> or <strong>results</strong>. In the next few steps and sections we'll be explaining, piece by piece, the output you see in this example – you're not expected to understand <strong>why</strong> this program produced this particular output yet.</p>

<p>We are using a particular style of embedding runnable programs into this book that will let you interactively try out and update the examples we provide, like you just did. Your work is usually saved across page refreshes but isn't saved forever; you <strong>should not</strong> rely on the text you just typed staying around forever. If you write a really cool program in one of these embedded programs that you don't want to lose, you should <strong>save it elsewhere</strong>.</p>

<p>Most of the time when this book gives you an embedded program, we'll ask you some questions about it so you can check your understanding and make sure you got the most out of the example. With that in mind, here's your first question:</p>

<h3><span style="color: #cc0000;">Do Now! </span>How many lines of the text in the output changed after you changed <code>5</code> to <code>40</code> and re-ran the program?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "options": [
    {
      "answer": "1",
      "max_error": "0"
    }
  ]
}
```

</details>

---

<!-- step 2280986 | type: matching -->

**Quiz (matching)**

<p>In the last step you ran this program:</p>

<pre><code class="language-java">class FirstExample {
  int theNumberFive = 5;
}</code></pre>

<p>and saw this as the result:</p>

<pre><code class="language-no-highlight">Tester Prima v.2.3
-----------------------------------
Tests defined in the class: FirstExample:
---------------------------
FirstExample:
---------------
new FirstExample:1(
 this.theNumberFive = 5)
---------------
No test methods found.</code></pre>

<p>Let's break down what this means and how that output was produced.</p>

<p>The first line is just telling us the name of the tool we are using (it was developed at Northeastern University [REF]).</p>

<p>The next few lines with dashes and the text “Tests defined in the class: FirstExample:”, and the last line “No test methods found” are unimportant for our understanding right now; we will talk about them in more detail in [REF section with tests].</p>

<p>The output that corresponded meaningfully to our first program was the part that reads</p>

<pre><code class="language-no-highlight">new FirstExample:1(
 this.theNumberFive = 5)</code></pre>

<p>This fragment of the output is printing back to us, in a slightly different format, the information we wrote in the original program. In particular, this output is saying that a single <strong>object</strong> was created and its <strong>class</strong> was <code>FirstExample</code>. The number after the <span style="color: #000000;">:</span> is a unique identifier for this object which we call its <strong>reference </strong>(like your student PID, the number itself has no special meaning, it just matters that it is unique to this object). It has a single <strong>field</strong>, which we can refer to with <code>this.theNumberFive</code>, whose value is <code>5</code>.</p>

<p>That's a lot of new vocabulary! We’ll define the terms <strong>object</strong>, <strong>class</strong>, <strong>reference</strong>, and <strong>field</strong> in detail later, and see many more examples of their use. For now, we're using them just to talk about the pieces of output we see when running these short programs.</p>

<p><em>(If you’ve programmed in Java before and are wondering how we ran a program without <code>main()</code>, we'll see it soon enough. Later on in the book, we’ll learn how to make more standalone applications, and this will include running programs from <code>main()</code>.)</em></p>

<h3><strong><span style="color: #cc0000;">Do Now!</span> </strong>Below, match up the vocabulary terms we just introduced with the code they correspond to in the first example.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "preserve_firsts_order": false,
  "is_html_enabled": true,
  "pairs": [
    {
      "first": "field name",
      "second": "<code>theNumberFive</code>"
    },
    {
      "first": "object",
      "second": "<code>new FirstExample:1(<br/>&nbsp;this.theNumberFive = 5)</code>"
    },
    {
      "first": "class name",
      "second": "<code>FirstExample</code>"
    },
    {
      "first": "field value",
      "second": "<code>5</code>"
    },
    {
      "first": "reference",
      "second": "<code>:1</code>"
    }
  ]
}
```

</details>

---

<!-- step 2356230 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Here's another class with more <strong>fields</strong>. This time, we've put the text directly into the program editor for you:</p>

<p><iframe height="500px" scrolling="no" src="https://tech.io/playground-widget/1b53fd87485f3b11eb935849337e657520785/welcome/1086655/Second%20Example" width="100%"></iframe></p>

<p> </p>

<p>Indeed, we can declare an arbitrary number of fields and freely choose their names and values.</p>

<p><span style="color: #cc0000;"><strong>Do Now!</strong></span><span style="color: #ff0000;"> </span>Change the value of the field <code>theNumberTwo</code> to be 500, then re-run the program. Make a note of what you see in the output.</p>

<p>Sometimes, with the embedded programs in this book, we will make changes and then want to get back to the original version. The revert button (which looks like a circular arrow <img alt="" height="32" name="Screen Shot 2021-08-31 at 12.28.03 PM.png" src="https://ucarecdn.stepik.net/1f63d99a-e105-4f66-a13e-e7bc89de9960/" width="31">) will restore the program to the way it originally appeared in the book. This removes your changes, so do it with caution if you're in the middle of working on something. However, since the programs in this book are quite short by design, it's a useful tool for if you get stuck.</p>

<p><span style="color: #cc0000;"><strong>Do Now!</strong></span><span style="color: #ff0000;"> </span>Click the revert button, which looks like this:<img alt="" height="32" name="Screen Shot 2021-08-31 at 12.28.03 PM.png" src="https://ucarecdn.stepik.net/1f63d99a-e105-4f66-a13e-e7bc89de9960/" width="31"> </p>

<p>Note something <strong>really important</strong> – after clicking the revert button, the program reverts back to the original version, but the output doesn't immediately change. Just like when we edited the program ourselves, we would have to click Run (or Success, if we have run already) to see the output that reflects that change.</p>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "Did Java say anything about an ”error“ or mistake when you ran the program with <code>theNumberTwo</code> set to <code>500</code>?<br/>",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "Yes",
          "is_correct": false
        },
        {
          "text": "No",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br/>\n<br/>\nHow many total <b>fields</b> are in this program?",
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
      "text": "<br/>\n<br/>\nWhen you clicked the revert button, what happened?",
      "options": []
    },
    {
      "type": "select",
      "text": "",
      "options": [
        {
          "text": "The program went back to being empty",
          "is_correct": false
        },
        {
          "text": "The program and the output went back to how it was when I first loaded this page",
          "is_correct": false
        },
        {
          "text": "Just the program went back to the original version",
          "is_correct": true
        },
        {
          "text": "Just the output went back to the original version",
          "is_correct": false
        },
        {
          "text": "Nothing happened",
          "is_correct": false
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

<!-- step 2398396 | type: text -->

<h2>Summary</h2>

<ul>
	<li>In this book, we will write programs in Java, run them, and observe the output. You do not have to understand all the details immediately, as you will learn more about these things throughout the course.</li>
	<li>Currently, the output of the programs we are running will include an object, a class name, a reference, and fields. We will look at each of these terms in more detail later on.</li>
	<li>Any changes made in a program may affect the output of the program. You must re-run the program if you want to see the result of this change.</li>
	<li>Clicking the revert button will reset the code and remove all of your changes.</li>
</ul>