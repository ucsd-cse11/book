# Java Generics


---

<!-- step 2515310 | type: text -->

<p>A common application for programs is looking up information by a string key.</p>

<p>For example, we might look up information about a student given their PID, or information about a book or movie in a store's inventory based on a barcode, or information about a class based on its section ID, or information about Tweets discovered by their Tweet id.</p>

<p>There are lots of ways to represent directories of information like this. We'll pick one here that's particularly useful for introducing a new, important topic.</p>

<p>Let's first take the example of student information. There are lots of ways we could represent this, but one is to have a class that stores one array of student ids, and another array of student information, where the information at a particular index corresponds to the PID at the index in the first array.</p>

<p>One of the key methods we would want on such a structure is the ability to find some student information by PID.</p>

<p>Here's the start of such a program:</p>

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/ef2e918b7fbd9650df820f73d4a0e65c20785/welcome/1094210/DirectoryExamples.java" width="100%"></iframe></p>

<p> </p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Fill in the blanks to make the examples pass.</h3>

---

<!-- step 2520493 | type: string -->

**Quiz (string)**

<p>A common application for programs is looking up information by a string key.</p>

<p>For example, we might look up information about a student given their PID, or information about a book or movie in a store's inventory based on a barcode, or information about a class based on its section ID, or information about Tweets discovered by their Tweet id.</p>

<p>There are lots of ways to represent directories of information like this. We'll pick one here that's particularly useful for introducing a new, important topic.</p>

<p>Let's first take the example of student information. There are lots of ways we could represent this, but one is to have a class that stores one array of student ids, and another array of student information, where the information at a particular index corresponds to the PID at the index in the first array.</p>

<p>One of the key methods we would want on such a structure is the ability to find some student information by PID.</p>

<p>Here's the start of such a program:</p>

<p><iframe height="800px" src="https://tech.io/playground-widget/ef2e918b7fbd9650df820f73d4a0e65c20785/welcome/1094210/DirectoryExamples.java" width="100%"></iframe></p>

<p> </p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> What type fills in all the blanks to make the tests pass?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "StudentInfo",
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

<!-- step 2520499 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>What if instead we wanted to get class titles based on section ID? If all we needed to store were the titles, we might write a class like this:</p>

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/eabd23ad33f41d76134d71a67b0ecc9020785/welcome/1094310/ClassDatabaseExamples.java#generics" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong> </span>What type fills in all the blanks to make the tests pass?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "String",
          "is_correct": true
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

<!-- step 2520548 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>We could continue this exercise for the other examples. Before we do, let's notice something – the <code>find</code> method is, in many ways, the same method across the two classes. The loop header is the same except for using <code>sectionIds</code> instead of <code>pids</code>. The loop body is also the same except for which fields are used.</p>

<p>Indeed, the idea of a <strong>generic</strong> directory that lets us look up values by string keys is a natural thing for us to want. Why can't we make <em>one</em> class that represents the idea of an array of strings and an array of <em>some kind of information</em> that supports this kind of lookup? Why should we have to keep repeating ourselves?</p>

<p>Java has a feature for precisely this case, called, appropriately enough, <strong>generics</strong>. Here's how we could write a <strong>generic</strong> implementation of our string-and-array based directory of information:</p>

<p><iframe height="900px" scrolling="yes" src="https://tech.io/playground-widget/1c42e56ad66a25540378326cea430dca20785/welcome/1094512/LookupTableExamples.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now! </strong></span>Fill in the two blanks with the types that make the examples pass.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "FILL1",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "StudentInfo",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>\nFILL2",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2520557 | type: text -->

<p>With this version of the program, we can avoid writing individual classes for each different kind of lookup table we want to create. In exchange, when we create a new <code>LookupTable</code> with <code>new</code>, we provide (in angle brackets <code>&lt;&gt;</code>) the type that we want<br>
to use for <code>Contents</code> .</p>

<iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/1c42e56ad66a25540378326cea430dca20785/welcome/1094512/LookupTableExamples.java" style="" width="100%"></iframe>
	

<p><br>
We think of a type like <code>LookupTable&lt;String&gt;</code> as if it were <code>LookupTable</code>, but with <code>String</code> <em>substituted for</em> <code>Contents</code> everywhere it appears. With this in mind, the return type of <code>find</code> for <code>studentTable</code> is <code>StudentInfo</code>, while the return type of <code>find</code> for <code>classTable</code> is <code>String</code>.</p>

<p>This is the power of <strong>generics</strong> in Java – with one <strong>generic class definition</strong>, we can describe an entire family of lookup tables based on string keys and any value type we choose.</p>

<p>In terms of definitions and vocabulary:</p>

<ul>
	<li>We call <code>Contents</code> a <strong>type variable</strong>. Inside the body of the LookupTable class, we have to program as if it could be any type, because it could be! So we can't use most methods on values of type <code>Contents</code> or try to access their fields, because the actual values could be many different types when the program runs.</li>
	<li>We call <code>LookupTable&lt;String&gt;</code> or <code>LookupTable&lt;StudentInfo&gt;</code> <strong>type instantiations</strong>.</li>
	<li>Overall, this feature is called <strong>generics</strong> in Java, and most generally this idea is called <strong>parametric polymorphism</strong>. Parametric polymorphism has a specific meaning – "polymorphism" means "many shapes," alluding to <code>LookupTable</code> having many different possible type instantiations. "Parameteric" means that the type is provided like a parameter – indeed we can think of <code>LookupTable&lt;String&gt;</code> as analogous to a method call, but instead of providing a value as an argument for a method parameter, we are providing a type as an argument for a generic type parameter.</li>
</ul>

<p>Nearly all serious modern type systems support some form of parametric polymorphism (C and Go are notable exceptions).</p>

---

<!-- step 2520563 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Let's try one more example, where we use <code>int</code>s as the values for <code>contents</code>.</p>

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/4c7d4430d85b8bc4339dbdf3b680d11820785/welcome/1094716/IntegerTableExamples.java#generics" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Run this program, and fill in the blanks for the error message you see.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>IntegerTableExamples.java:22: error: </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "unexpected type",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br/><code>required:</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "reference",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br/><code>found: </code>",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": true
}
```

</details>

---

<!-- step 2520574 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>How weird! We just said that we were supposed to be able to fill in types in to the <code>&lt;&gt;</code> for generic classes, but now we get an error message that says <code>unexpected type</code>.</p>

<p>The rest of the message, about <code>reference</code> vs <code>int</code>, is a little more illuminating. It gets at a distinction that we've seen but not had to deal with much, between the <strong>primitive types</strong>, like <code>int</code> , <code>double</code>, and <code>boolean</code>, and <strong>reference types</strong>, which include <code>String</code> and all array, class, and interface types.</p>

<p>Generics (in Java, this is a frustrating limitation for historical technical reasons not present in other languages) can <strong>only</strong> be instantiated with <strong>reference types</strong>. So this is why <code>String</code> and <code>StudentInfo</code> work in this position, but <code>int</code> does not.</p>

<p>To accommodate programs like this, Java defines an entire set of <strong>wrapper classes</strong> for the primitives. We've even seen a few of them and used their static methods – <code>Integer</code> and <code>Double</code>. It turns out that these are genuine classes with constructors and more, for example:</p>

<p><a href="https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/Integer.html" rel="noopener noreferrer nofollow">java.lang.Integer</a></p>

<p>Most of the time, we can seamlessly switch between the wrapper classes and their corresponding primitive. For example, this program runs without error and stores values we'd expect – <code>c</code> ends up storing the primitive value <code>20</code>. What's happening here is that behind the scenes, Java is converting from one to the other on our behalf so we don't usually see the difference.</p>

<pre><code class="language-java">  int a = new Integer(10);
  Integer b = 10;
  int c = b + a; </code></pre>

<p>This is confusing, and enumerating all the rules for how wrapper classes and primitives convert from one to another is daunting and probably not worth it.</p>

<p>The main thing we need to remember about the wrapper classes is to use them when we use generics. For example, we can update our program to use an Integer array and <code>Integer</code> as the type for <code>Contents</code>, and then the tests will run successfully.</p>

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/4c7d4430d85b8bc4339dbdf3b680d11820785/welcome/1094716/IntegerTableExamples.java#generics" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now! </strong></span>Change the test to use <code>Integer</code> instead of <code>int</code>. How many places did you have to change it?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
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
  "is_detailed_feedback": false,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2520576 | type: text -->

<p>We've seen how we can use <strong>generics</strong> to define a single class that can have fields that stores values of many different types, defined by a <strong>type variable</strong>. The type filled into the type variable is chosen by the code that uses the constructor of the generic class though <strong>type instantiation</strong>. We saw three different kinds of instantiation of a lookup table class, one with strings, one with another class (student info), and one with numbers. We learned that java has <strong>wrapper classes</strong>, largely because generics instantiation is only allowed with <strong>reference types</strong>, not with <strong>primitive types</strong>.</p>