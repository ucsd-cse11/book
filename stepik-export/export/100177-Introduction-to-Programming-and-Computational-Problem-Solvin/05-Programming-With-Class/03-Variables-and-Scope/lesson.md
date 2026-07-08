# Variables and Scope


---

<!-- step 2438791 | type: choice -->

**Quiz (choice)**

<p>Consider the method <code>purchaseMethod()</code> which might be used to print a total cost along with the tip cost.</p>

<p><iframe height="650px" scrolling="no" src="https://tech.io/playground-widget/ea249b335036fc3858670602cfd5076020785/welcome/1088753/Total%20Cost%20Calculation" width="100%"></iframe></p>

<p>First, to make sure we understand how this should work:</p>

<h3><span style="color: #cc0000;">Do Now! </span>Choose from the following options which would work to fill in the blank above to get the behavior shown. Select a<strong>ll</strong> that apply.</h3>


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
      "text": "<code>cost + cost * tipPercent</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>cost + tipPercent</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>cost * (1 + tipPercent)</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>cost * tipPercent</code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2438799 | type: choice -->

**Quiz (choice)**

<p>Let's look at that method body again, with an answer filled in. That is one long line of code! </p>

<pre><code class="language-java">    String purchaseMessage(String customerName, int cost, double tipPercent) {
        return "Bill for " + customerName + ": Cost $" + cost + ", Total $" + (cost + cost * tipPercent) + ", Tip $" + (cost * tipPercent);
    }</code></pre>

<p> </p>

<p>Not only is it long, but it has a <strong>repeated expression</strong>. The expression <code>cost * tipPercent</code> appears <em>twice</em>, once in the calculation of the total cost, and once to show the tip amount.</p>

<p>Java (and all major programming languages) has a feature that helps make programs more readable in cases like these, called <strong>local variables</strong>, or just <strong>variables</strong> for short. A <strong>variable definition</strong> looks like a <strong>field definition</strong>, but it appears in the <strong>method body</strong> rather than in the <strong>class body</strong>. Here's what it would look like to create a local variable definition for the tip calculation in this program (we've left part blank to work through in a minute):</p>

<iframe height="500px" src="https://tech.io/playground-widget/ea249b335036fc3858670602cfd5076020785/welcome/1088754/Variable%20fill-in" style="" width="100%"></iframe>
	

<p>This will lead us to a version that's much more pleasant to read (at least to the authors of this book!).</p>

<p>The <strong>variable definition</strong> gives a name (in this case <code>tip</code>) to the value on the right-hand side for the duration of this method call. So each time we call <code>purchaseMessage</code>, Java will evaluate <code>cost * tipPercent</code> and remember that during that method call, when the name <code>tip</code> is used, it means that value.</p>

<p>Based on this description, what could we put in the two blanks, in order, to make this program have the same behavior as before, but use the <code>tip</code> variable?</p>


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
      "text": "<code>(cost +tip)</code>, then <code>tip</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>tip</code>, then <code>cost + tip</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>cost + tip</code>, then <code>cost</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>cost + tipPercent</code>, then <code>tip</code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2439373 | type: choice -->

**Quiz (choice)**

<p>There are specific rules about how <strong>local variables</strong> can be used. We'll look at one such rule now, and revisit others in future sections.</p>

<p>Consider this example:</p>

<p><iframe height="480px" scrolling="no" src="https://tech.io/playground-widget/ea249b335036fc3858670602cfd5076020785/welcome/1088755/Bad%20Scope" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Which of the following are parts of the error you get when you run this program?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": true,
  "is_always_correct": false,
  "sample_size": 5,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": false,
  "options": [
    {
      "is_correct": true,
      "text": "<code>cannot find symbol</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>double example1Tip = tip;</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>double tip = cost * tipPercent</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>(cost + tip)</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>purchaseMessage</code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2439378 | type: choice -->

**Quiz (choice)**

<p>In the last step, we saw this program with its corresponding error:</p>

<p><iframe height="480px" scrolling="no" src="https://tech.io/playground-widget/ea249b335036fc3858670602cfd5076020785/welcome/1088756/Bad%20Scope%20Experimentation" width="100%"></iframe></p>

<pre><code class="language-no-highlight">Receipt.java:8: error: cannot find symbol
    double example1Tip = tip;
                         ^
  symbol:   variable tip
  location: class Receipt
1 error</code></pre>

<p>This error is telling us that Java cannot “see” the variable <code>tip</code> outside of the method <code>purchaseMessage()</code>, where it's defined.</p>

<p>Variables in Java have what's called a <strong>scope</strong>, which is the part of the program where they can be written without error and refer back to a particular definition. For local variables, the <strong>scope</strong> is the rest of the method in which they are defined. <em>(This is a bit of a simplification, as we'll see later, but it's a good definition for now).</em></p>

<p>This reinforces part of the definition of local variables, which is that they give a name to a value <strong>within a particular method</strong>, which is their <strong>scope</strong>.</p>

<p>Experiment with the parameters <code>customerName</code>, <code>cost</code>, and <code>tipPercent</code>, and with the field name <code>example1</code>. Which of these names have the <strong>same</strong> scope as <code>tip</code>, and which have a different scope?</p>

<h3><span style="color: #cc0000;">Do Now!</span> Check the names that have the <strong>same</strong> scope as <code>tip</code> below.</h3>


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
      "text": "<code>customerName</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>cost</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>tipPercent</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>example1</code>",
      "feedback": ""
    }
  ]
}
```

</details>