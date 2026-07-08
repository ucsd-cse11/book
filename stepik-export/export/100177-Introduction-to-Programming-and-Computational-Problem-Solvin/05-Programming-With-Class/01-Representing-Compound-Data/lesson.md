# Representing Compound Data


---

<!-- step 2331711 | type: text -->

<p>So far, we’ve seen several kinds of data:</p>

<ul>
	<li>Numbers, represented in Java as <code>int</code>s and <code>double</code>s</li>
	<li>Sequences of characters, represented in Java as <code>String</code>s</li>
	<li>Yes/no answers, represented in Java as <code>boolean</code>s</li>
</ul>

<p>But there are many more kinds of information in the world than just these simple datatypes. Here are a few real-world examples:</p>

<ul>
	<li>A record of student information can’t be represented as just a single string, or a number, or a boolean. Rather, it’s several pieces of related data, each of which might individually be one of these types: a <code>boolean</code> for whether the student is from within the state or not, a <code>String</code> for the student ID and username, an <code>int</code> for birth year, and so on. Each of these pieces of information means little on its own, but when put together, they fully describe a student record that might be saved in a database.</li>
	<li>In the context of math and graphing, we often talk about points, which (in two dimensions), aren’t represented as single numbers, but as <em>pairs</em> of numbers. A point is defined as having an x- and y-coordinate, and from the perspective of defining a point, both are necessary.</li>
	<li>A song in a music playlist (like in iTunes or Spotify), has a number of fields for data: the title (a <code>String</code>), the length of the song in seconds (an <code>int</code>), the file the song data is stored in (a <code>String</code>), and album and artist information. The album information might be a compound of other data as well, like the year it was released and the title.</li>
</ul>

---

<!-- step 2359188 | type: number -->

**Quiz (number)**

<p>In Java, we use <strong>classes</strong> to represent these shapes of compound data. A class for a simple student record might look like this:</p>

<pre><code class="language-java">class Student {
  String studentID;
  boolean inState;
  int birthYear;

  Student(String studentID, boolean inState, int birthYear) {
    this.studentID = studentID;
    this.inState = inState;
    this.birthYear = birthYear;
  }
}</code></pre>

<p>We can use the class to create sets of data that describe several different students. To test it out, we can put the <code>Student</code> class definition above into the same file as an <code>Examples</code> class. Then, in the <code>Examples</code> class, we define several examples using the <code>new</code> operator (which we haven’t seen before):</p>

<p><iframe height="700px" scrolling="no" src="https://tech.io/playground-widget/26ce7b6283b8ae26d39a4bdfa32cd85e20785/welcome/1085330/Combining%20Data%20into%20Classes" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> How many times does the word <code>new</code> appear in the output of the above program? Enter the correct answer in the box below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "options": [
    {
      "answer": "4",
      "max_error": "0"
    }
  ]
}
```

</details>

---

<!-- step 2331752 | type: text -->

<pre><code class="language-java">//code from before, for reference

class Student {
  String studentID;
  boolean inState;
  int birthYear;

  Student(String studentID, boolean inState, int birthYear) {
    this.studentID = studentID;
    this.inState = inState;
    this.birthYear = birthYear;
  }
}

class ExamplesStudent {
  Student s1 = new Student("A12345678", true, 1996);
  Student s2 = new Student("A98765432", false, 1993);
  Student s3 = new Student("A18273645", true, 1999);
}</code></pre>

<p>There are several parts of this program that are new to us.</p>

<p>First, in the <strong>class definition</strong> for <code>Student</code>, the first three lines are as follows:</p>

<pre><code class="language-java">String studentID;
boolean inState;
int birthYear;</code></pre>

<p>These look like field definitions, but they are missing the part with the equals sign and the value. We call these <strong>uninitialized field definitions</strong>, and this is actually the most common variety of field definition we’ll see in the course. We’ll see shortly why they don’t have specific values associated with their definitions.</p>

---

<!-- step 2440159 | type: choice -->

**Quiz (choice)**

<pre><code class="language-java">//code from before, for reference

class Student {
  String studentID;
  boolean inState;
  int birthYear;

  Student(String studentID, boolean inState, int birthYear) {
    this.studentID = studentID;
    this.inState = inState;
    this.birthYear = birthYear;
  }
}

class ExamplesStudent {
  Student s1 = new Student("A12345678", true, 1996);
  Student s2 = new Student("A98765432", false, 1993);
  Student s3 = new Student("A18273645", true, 1999);
}</code></pre>

<p>Second, the <strong>class definition</strong> for <code>Student</code> also has this block of code:</p>

<pre><code class="language-java">Student(String studentID, boolean inState, int birthYear) {
  this.studentID = studentID;
  this.inState = inState;
  this.birthYear = birthYear;
}</code></pre>

<p>At first glance, this looks like a method — it has the name <code>Student</code>, a list of parameters, and what looks like a method body. Remember, though, that a method header has two components before the parameter list: a return type and a method name.</p>

<p>Instead of having both of those components, however, here we only have the name <code>Student</code> before the parameters. This block of code is not a method definition (though it <em>is</em> related). We call this block of code a <strong>constructor</strong>. A constructor starts with the name of the class that it is in (in this case, <code>Student</code>). Then, it has a list of parameters and a constructor body. For now, we won’t go into detail about what this method body does. We’re just going to observe that the parameters match the names of the fields that were defined earlier in the class, and that there is a line in the method body for each field that looks like <code>this.fieldName = fieldName</code>. In each <strong>class</strong> that we write for the next few lectures, we’ll write a constructor that follows this pattern.</p>

<h3><span style="color: #cc0000;">Do Now! </span>Select all the options below that are names of parameters in the constructor.</h3>


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
      "text": "<code> studentID </code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code> inState </code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code> birthYear </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> Student </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> this </code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2334124 | type: text -->

<pre><code class="language-java">//code from before, for reference

class Student {
  String studentID;
  boolean inState;
  int birthYear;

  Student(String studentID, boolean inState, int birthYear) {
    this.studentID = studentID;
    this.inState = inState;
    this.birthYear = birthYear;
  }
}

class ExamplesStudent {
  Student s1 = new Student("A12345678", true, 1996);
  Student s2 = new Student("A98765432", false, 1993);
  Student s3 = new Student("A18273645", true, 1999);
}</code></pre>

<p>Third, to the left of the <code>=</code> operators in the <code>ExamplesStudent</code> class, we use <code>Student</code> in the position where we have previously written types like <code>int</code> or <code>boolean</code>. Just like how the keyword <code>int</code> refers to the set of integers, the name of a class also refers to a distinct set of values. A field with a class type, like <code>Student</code>, can only hold <strong>references</strong> to <strong>objects</strong> of that type. We’ll define objects and references in the next step.</p>

---

<!-- step 2440184 | type: number -->

**Quiz (number)**

<p><iframe height="700px" scrolling="no" src="https://tech.io/playground-widget/26ce7b6283b8ae26d39a4bdfa32cd85e20785/welcome/1085330/Combining%20Data%20into%20Classes" width="100%"></iframe></p>

<p>Fourth, to the right of the <code>=</code> operators in the <code>ExamplesStudent</code> class, we use the <code>new</code> operator like so:</p>

<pre><code class="language-java">Student s1 = new Student("A12345678", true, 1996);</code></pre>

<p>A <code>new</code> expression consists of the keyword <code>new</code>, followed by the name of a class (in this case <code>Student</code>), followed by arguments in parentheses. These arguments must match the order and types of the parameters in the class constructor. Here, we have the <code>String</code> value <code>"A12345678"</code> for <code>studentID</code>, the <code>boolean</code> value <code>true</code> for <code>inState</code>, and the <code>int</code> value <code>1996</code> for <code>birthYear</code>.</p>

<p>This <code>new</code> expression packages up these three pieces of data into what we call an <strong>object</strong>, or <strong>instance</strong>, of the class that appears after <code>new</code>. In this case, that class is <code>Student</code>. To understand what an object is, we can first refer to a fragment of what the tester library printed out:</p>

<pre><code class="language-no-highlight">new Student:2(
 this.studentID = "A12345678"
 this.inState = true
 this.birthYear = 1996)</code></pre>

<p>From this output, we can conclude that <strong>objects</strong> are collections of <strong>fields</strong>, which each have a particular value and are collectively labeled with the <strong>class</strong> that was used to construct them. The particular object above has class <code>Student</code> and the given values in its fields.</p>

<h3><span style="color: #cc0000;">Do Now! </span>According to this part of the output, how many fields does the <code>Student</code> class contain?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "options": [
    {
      "answer": "3",
      "max_error": "0"
    }
  ]
}
```

</details>

---

<!-- step 2334122 | type: text -->

<p>We can also represent objects through pictures. As we will demonstrate in this course, the ability to draw pictorial representations of objects is a useful skill that will allow us to work through the relationships between different values and objects. For example, the object created and stored in the field <code>s1</code> can be represented like this:</p>

<p style="text-align: center;"><img alt="" height="180" name="step8.png" src="https://ucarecdn.stepik.net/8b912c5d-60a1-4488-818e-f3f995c4bc33/" width="290"></p>

<p style="text-align: center;"><sup>A representation of the <code>s1</code> instance of the <code>Student</code> class</sup></p>

<p>The <code>Student</code> in the top right is the name of the object’s class, and the three fields’ values are listed in boxes within the class.</p>

---

<!-- step 2334149 | type: text -->

<p>With that, we have covered the four new pieces of syntax:</p>

<ol>
	<li>uninitialized field definitions</li>
	<li>constructors</li>
	<li>class names as types</li>
	<li>the <code>new</code> operator</li>
</ol>

<p>All of this also helps us understand the behind-the-scenes work that happens when printing out the values of the <code>ExamplesStudent</code> class.</p>

<p>In the printed output, we can see that the field <code>s1</code> is shown to be holding the entirety of the <code>Student</code> object, containing all three fields:</p>

<pre><code class="language-no-highlight">new ExamplesStudent:1(
 this.s1 =
  new Student:2(
   this.studentID = "A12345678"
   this.inState = true
   this.birthYear = 1996)
 ...</code></pre>

<p>One interesting thing to note here is that the <code>Student</code> object that was created is printed in the same style as the <code>ExamplesStudent</code> printing, which itself contains <code>new</code>, the name of the class, and all the fields’ values formatted as <code>this.fieldName = fieldValue</code>. This immediately suggests what’s going on when we run this program: an <code>ExamplesStudent</code> object is created, and it and all of its fields are printed! In fact, this is exactly what happens behind the scenes when we use <code>./run</code>: the infrastructure for the course simply uses <code>new</code> on the <code>ExamplesStudent</code> class and prints out the resulting value, nicely formatted.</p>

---

<!-- step 2440204 | type: text -->

<p>Let’s try to apply our pictorial representation idea to the fully-constructed <code>ExamplesStudent</code> object on the previous step, focusing first on just the field <code>s1</code>. Based on the earlier picture, we can assume that the picture for the <code>ExamplesStudent</code> object will look something like this:</p>

<p style="text-align: center;"><img alt="" height="124" name="step10-1.png" src="https://ucarecdn.stepik.net/1c539d75-6559-4cfe-8679-5c05dedb45d4/" width="195"></p>

<p>We just need to understand what goes in the box for <code>s1</code>. We <em>could</em> try to complete this visual by putting the entirety of our representation of <code>s1</code> in the box. But we’re not going to do that, because it’s not an accurate model of how these objects are laid out in the running Java program. Instead, here’s the actually-accurate picture of this situation:</p>

<p style="text-align: center;"><img alt="" height="304" name="step10-2.png" src="https://ucarecdn.stepik.net/f70df480-1d6e-4a8e-a485-fe821241c70d/" width="215"></p>

<p>We say that <code>s1</code> contains a<strong> reference</strong> to the object. The program always ends up acting on <strong>references</strong> to objects, never the objects themselves. We’ll use small, distinctly colored shapes to represent these <strong>references</strong>. The shape in the top-left corner of an object serves to identify it, so when we see a reference in another field (or used as a parameter), we’ll know which object it is referring to.</p>

---

<!-- step 2440211 | type: number -->

**Quiz (number)**

<p>As you might have noticed, the numbers <code>1</code> and <code>2</code> in the references are the same numbers that appear after the colons in the printout:</p>

<pre><code class="language-no-highlight">                    --------here!
                    |
                    v
new ExamplesStudent:1(
 this.s1 =
  new Student:2( &lt;------------------and here!
   this.studentID = "A12345678"
   this.inState = true
   this.birthYear = 1996)
 ...</code></pre>

<p>The <code>tester</code> library keeps a count of created objects, and labels each object in sequence with the order it was created in. This helps us distinguish objects in the printout. The full printout was as follows:</p>

<pre><code class="language-no-highlight">ExamplesStudent:
---------------
 new ExamplesStudent:1(
  this.s1 =
   new Student:2(
    this.studentID = "A12345678"
    this.inState = true
    this.birthYear = 1996)
  this.s2 =
   new Student:3(
    this.studentID = "A98765432"
    this.inState = false
    this.birthYear = 1993)
  this.s3 =
   new Student:4(
    this.studentID = "A18273645"
    this.inState = true
    this.birthYear = 1999))</code></pre>

<p>Which corresponds to this picture:</p>

<p><img alt="" height="420" name="step11.png" src="https://ucarecdn.stepik.net/1ed7795a-8bbc-4277-a8e2-ec0c627531a9/" style="float: left;" width="430"></p>

<p> </p>

<p> </p>

<p> </p>

<p> </p>

<p> </p>

<p> </p>

<p> </p>

<p> </p>

<p> </p>

<p> </p>

<p> </p>

<h3><span style="color: #cc0000;">Do Now! </span>According to the output and to the image that corresponds to the output, how many distinct objects are created in the program?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "options": [
    {
      "answer": "4",
      "max_error": "0"
    }
  ]
}
```

</details>

---

<!-- step 2334150 | type: text -->

<p>We can see this notion of a numbered reference play out if we create a field that <em>uses</em> a value from an existing object:</p>

<pre><code class="language-java">class ExamplesStudent {
  Student s1 = new Student("A12345678", false, 1996);
  Student s2 = new Student("A98765432", true, 1993);
  Student s3 = new Student("A18273645", true, 1999);
  Student sReferToS1 = s1;
}</code></pre>

<p>When this is printed, we get the printout below (excluding the line added for emphasis). Java doesn’t copy the object; it just keeps track of another reference to it.</p>

<pre><code class="language-no-highlight">ExamplesStudent:
---------------
 new ExamplesStudent:1(
  this.s1 =
   new Student:2(  &lt;------------------------
    this.studentID =  "A12345678"          |
    this.inState = false                   |
    this.birthYear = 1996)                 |
  this.s2 =                                |
   new Student:3(                          |
    this.studentID =  "A98765432"          |
    this.inState = true                    |
    this.birthYear = 1993)            refers back to
  this.s3 =                                |
   new Student:4(                          |
    this.studentID =  "A18273645"          |
    this.inState = true                    |
    this.birthYear = 1999)                 |
  this.sReferToS1 = Student:2)  ------------</code></pre>

<p>What happens is that we copy the <strong>reference</strong> to the first object that was created and store the copied reference in the <code>sReferToS1</code> field. Here it is in picture form:</p>

<p style="text-align: center;"><img alt="" height="409" name="step12.png" src="https://ucarecdn.stepik.net/e900a8f4-06ed-43ed-b5de-04e8ec735b17/" width="419"></p>