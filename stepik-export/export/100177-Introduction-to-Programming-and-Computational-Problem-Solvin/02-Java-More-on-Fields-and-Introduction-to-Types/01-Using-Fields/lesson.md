# Using Fields


---

<!-- step 2367207 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>In the last section, we saw lots of examples of declaring fields. That is, every time we wrote a line like</p>

<pre><code>int theNumberFive = 5;</code></pre>

<p>or</p>

<pre><code>int theAnswer = 5 + 2 * 7;</code></pre>

<p>we were creating, or declaring, a new field. Java and the <code>tester</code> library would dutifully store these fields’ values, and then output them when the program was run.</p>

<p>Fields have many more uses than just labeling the values that are printed out by <code>tester</code>,  however. For example, say we wanted to use Java as a calculator again to do some simple physics calculations, like how far something falls after a given amount of time. A quick glance at <a href="https://en.wikipedia.org/wiki/Equations_for_a_falling_body#The_equations" rel="noopener noreferrer nofollow">Wikipedia</a> gives us a formula. We’ll round to whole numbers (since we’re using <code>int</code>s) and say that the value of gravitational acceleration on Earth is about 10 meters per second<sup>2</sup>. So we could write out a few calculations:</p>

<p><iframe height="485px" scrolling="yes" src="https://tech.io/playground-widget/0144e22e67b6a858a0eafc5932ae57b420785/welcome/1084195/Using%20Fields" width="100%"></iframe></p>

<p>If we wanted to change this to, say, calculate the distance traveled on the moon (where acceleration is more like 4 m/s<sup>2</sup>), we’d need to change each of the <code>10</code> values to <code>4</code>.</p>

<h3><span style="color: #cc0000;">Do Now! </span>In the program above, change all the <code>10</code> values to <code>4</code> (for the acceleration on Mars). Then, answer the questions below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "How many times did you have to change <code>10</code> to <code>4</code>? <br>",
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
      "text": "<br><br> How many lines of the output are different after making these changes?</br>",
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

<!-- step 2367215 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>It’s pretty annoying to have to make those changes everywhere, and in a large program, we may need to use a constant many more than three times. This motivates another use of fields – to store a common value used in many places. Instead of writing the above, we could define a field that is just for storing the gravity constant, and then <em>use</em> that field every time we want the value for that constant. That looks like:</p>

<p><iframe height="500px" scrolling="yes" src="https://tech.io/playground-widget/252cd1fc1e4afeb7f06c682e3f1d2a5f20785/welcome/1084176/Using%20Fields" width="100%"></iframe></p>

<p>Above, instead of repeating <code>10</code> over and over, we use a <strong>field access</strong>, in this case <code>this.gravity</code>, to look up the value in the <code>gravity</code> field. Since it was set to <code>10</code> when it was declared, that value is used for all the calculations. Now, we can just change the value for <code>gravity</code> if we want to get calculations for a different value, like for Mars.</p>

<p>(Notice that using <code>this.gravity</code> matches how the <code>tester</code> library prints out the values of fields, where each field is written as <code>this.fieldName</code>.)</p>

<h3><span style="color: #cc0000;">Do Now!</span> In the code above, change the value for <code>gravity</code> to <code>4</code>. Then, answer the questions below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "How many times did you have to change <code>10</code> to <code>4</code>? <br>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "1",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><br> How many lines of the output are different after making these changes?</br>",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2319040 | type: text -->

<p>Here are some more examples of both declaring and using fields.</p>

<p><span style="color: #cc0000;"><strong>Do Now! </strong></span>Try to predict the output for each of these programs, and then run them to see if you were right.</p>

<p><iframe height="485px" scrolling="yes" src="https://tech.io/playground-widget/da817b2443ddb1e1c652acc2e678121f20785/welcome/1087092/Getting%20Paid" width="100%"></iframe></p>

<p><iframe height="510px" scrolling="yes" src="https://tech.io/playground-widget/252cd1fc1e4afeb7f06c682e3f1d2a5f20785/welcome/1084178/Calculating%20Revenue" width="100%"></iframe></p>

---

<!-- step 2398399 | type: text -->

<h2>Summary</h2>

<ul>
	<li>Rather than typing out the same value multiple times, we can create a field to store that value. Each time we want to use this value, we can access the field using <code>this.fieldName</code>.</li>
	<li>If we want to change this value, we would only need to change the value of the field, rather than having to change the value every single time it is used in the program.</li>
</ul>