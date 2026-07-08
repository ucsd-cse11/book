# More on Methods


---

<!-- step 2440062 | type: matching -->

**Quiz (matching)**

<p>We saw before that a method is a useful way to describe a computation. Method definitions appeared within the classes we were working with. Methods can be defined in any class, including classes like <code>Student</code>. For example, we could write a method that answers whether a student was born before a certain year. We write this method <em>in the class that has the data we care about</em>. In the case below, the method needs to know the <code>birthYear</code> of a student, so the method will be defined in that class.</p>

<p>The first thing we need to do is figure out the header of this new method. The input is the year we’re comparing against. The name <code>bornBefore()</code> makes sense, and since it’s a yes/no question, it should return a <code>boolean</code>. We typically write methods after the field definitions and the constructor. Here is the setup:</p>

<pre><code class="language-java">class Student {
  String studentID;
  boolean inState;
  int birthYear;

  Student(String studentID, boolean inState, int birthYear) {
    this.studentID = studentID;
    this.inState = inState;
    this.birthYear = birthYear;
  }

  /*
    @param year The year to check against, which should be less than the
    current year and greater than 0

    @return true if this student's birth year is less than the given year,
    false otherwise
  */
  boolean bornBefore(int year) {

  }
}</code></pre>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Match each piece of code from the method header with the vocabulary term that describes it.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "preserve_firsts_order": false,
  "is_html_enabled": true,
  "pairs": [
    {
      "first": "<code>boolean</code>",
      "second": "return type"
    },
    {
      "first": "<code>bornBefore</code>",
      "second": "method name"
    },
    {
      "first": "<code>int year</code>",
      "second": "parameter"
    }
  ]
}
```

</details>

---

<!-- step 2440063 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Next, we need to write some examples. This brings up an important point about how we’ll write programs in this course — the examples will always go in the <code>Examples</code> class at the end of the file. So we don’t add them inside the <code>Student</code> class, but in the <code>Examples</code> class, where our example data is also defined:</p>

<pre><code class="language-java">class ExamplesStudent {
  Student s1 = new Student("A12345678", true, 1996);
  Student s2 = new Student("A98765432", false, 1993);
  Student s3 = new Student("A18273645", true, 1999);

  boolean bb1 = this.s1.bornBefore(1999); // should be true
  boolean bb2 = this.s1.bornBefore(1995); // should be false
  boolean bb3 = this.s2.bornBefore(1995); // should be true
  boolean bb4 = this.s3.bornBefore(10); // should be false
}</code></pre>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> If the <code>bornBefore()</code> method works as intended, what would be the expected values for the following examples?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>this.s2.bornBefore(1990)</code> should be ",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "false",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": ".<br><code>this.s3.bornBefore(2021)</code> should be ",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2440061 | type: fill-blanks -->

**Quiz (fill-blanks)**

<pre><code class="language-java">//code from the previous step, for reference

class ExamplesStudent {
  Student s1 = new Student("A12345678", true, 1996);
  Student s2 = new Student("A98765432", false, 1993);
  Student s3 = new Student("A18273645", true, 1999);

  boolean bb1 = this.s1.bornBefore(1999); // should be true
  boolean bb2 = this.s1.bornBefore(1995); // should be false
  boolean bb3 = this.s2.bornBefore(1995); // should be true
  boolean bb4 = this.s3.bornBefore(10); // should be false
}</code></pre>

<p>Note a key difference here — we don’t write <code>this</code> in front of the dot operator (i.e. <code>.</code>) for these method calls. We use the <strong>field</strong> containing a <strong>reference</strong> to a <code>Student</code> object. We must do this because the <code>bornBefore()</code> method is defined only for <code>Student</code> objects, since it is in the <code>Student</code> class. If we used <code>this.bornBefore()</code> instead, we’d get an error. This is a key point: we must call methods using a <strong>reference</strong> to an <strong>object</strong> whose class has the method that is being called.</p>

<p>Note also that the four method calls use three different object references. The first two use the reference stored in <code>s1</code>, while the third and fourth use those stored in <code>s2</code> and <code>s3</code> respectively. The behavior of the method must somehow depend on the particular reference used, since we expect <code>bb2</code> and <code>bb3</code> to have different answers, even though the same argument is passed in.</p>

<p>Here’s the key idea that makes this work out: when calling a method, the value of <code>this</code> used when calculating that method is always the same as the reference that was used to call the method. So in the call for <code>bb2</code>, for example, the reference used to call it is the reference stored in <code>s1</code>, while for <code>bb3</code>, the reference is the one stored in <code>s2</code>. This means that the uses of <code>this</code> within the <code>bornBefore()</code> method will reflect that difference for the two calls. With that in mind, let’s fill in the body of the <code>bornBefore()</code> method:</p>

<pre><code class="language-java">/*
  @param year The year to check against, which should be less than the
  current year and greater than 0

  @return true if this student's birth year is less than the given year,
  false otherwise
*/
boolean bornBefore(int year) {
  return this.birthYear &lt; year;
}</code></pre>

<p>In each of the examples, we can use this rule about <code>this</code> to understand what value <code>this.birthYear</code> evaluates to. In the first two examples, it evaluates to <code>1996</code>. In the call for <code>bb3</code>, it evaluates to <code>1993</code>, and in the call for <code>bb4</code>, it evaluates to <code>1999</code>. All of this tells us that the answers should work out correctly, since the four method calls end up performing these four comparisons:</p>

<pre><code class="language-java">1996 &lt; 1999 // is true, using the value from the first student
1996 &lt; 1995 // is false, using the value from the first student
1993 &lt; 1995 // is true, using the value from the second student
____ &lt; ____   // is false, using the value from the third student</code></pre>

<h3><span style="color: #cc0000;">Do Now! </span>Fill in the two blanks for the last comparison in the above example.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "1999",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "10",
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

<!-- step 2440093 | type: text -->

<h2>Summary</h2>

<ul>
	<li>If we write a method inside a class, the method can use the data that is stored in the fields of that class.</li>
	<li>When a method is defined in a class, it is only defined for objects of that class. We must call a method using a <strong>reference</strong> to an <strong>object</strong> whose class has the method that is being called.</li>
	<li>In the body of a method, the value of <code>this</code> refers to the object that was used to call the method. Therefore, when accessing fields with <code>this</code> (for example, <code>this.birthYear</code>), the expression evaluates to the value of the field for the object that was used to call the method.</li>
</ul>