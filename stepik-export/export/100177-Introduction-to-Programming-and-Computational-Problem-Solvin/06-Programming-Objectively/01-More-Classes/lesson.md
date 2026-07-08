# More Classes


---

<!-- step 2441866 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p><em>This example is from Ben Lerner (<a href="http://www.ccs.neu.edu/course/cs2510/lecture3.html" rel="noopener noreferrer nofollow">http://www.ccs.neu.edu/course/cs2510/lecture3.html</a>).</em></p>

<p>As we mentioned in the last module, there is a wide variety of data in the world that is composed of multiple simple values. We’ve talked about <code>Point</code>s and about <code>Student</code> records in the past. Now, let’s talk about another example: modeling an inventory of books. A simple representation of a book would need to cover at least its title, author, and price. That’s pretty straightforward to describe as a class.</p>

<pre><code class="language-java">class Book {
  String title;
  String author;
  int price;

  Book(String title, String author, int price) {
    this.title = title;
    this.author = author;
    this.price = price;
  }
}</code></pre>

<p>The type <code>String</code> is a natural starting point for title and author, and the price is certainly some kind of number. Again, we see that we write the field definitions for <code>title</code>, <code>author</code>, and <code>price</code> without any values (i.e. as uninitialized field definitions), and we include the same shape of <strong>constructor</strong> that we’ve previously discussed: one that has a <code>this.someName = someName</code> line for each field/parameter.</p>

<p>Let’s write some methods for <code>Book</code>. Imagine that a bookstore has periodic sales, in which everything is discounted at particular rates. We can write a method, <code>salePrice()</code>, that takes in a number representing a percentage (i.e. between 0 and 100) and returns a number representing the price with that percentage subtracted.</p>

<p>Following the recipe, we’ll first specify the method header, which will go inside the <code>Book</code> class.</p>

<h3><span style="color: #cc0000;">Do Now! </span>Fill in the method header below for the <code>salePrice()</code> method. </h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>\n/* <br>\nTakes an int named percentage (between 0 and 100) of the discount to subtract <br>\nReturns the price with the discount subtracted as an int (rounded down to the nearest dollar)<br>\n*/ <br>\nint \n</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "salePrice",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>(int </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "percentage",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code> \n) { <br>\n<br>\n}\n</code>",
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

<!-- step 2441914 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>We should also write some examples, both of <code>Book</code>s and of the <code>salePrice()</code> method’s use. Remember that  <code>salePrice()</code> takes in a number representing a percentage (i.e. between 0 and 100) and returns a number representing the price with that percentage subtracted.</p>

<pre><code class="language-java">class ExamplesBook {
  Book schemer = new Book("The Little Schemer", "Daniel P. Friedman", 40);
  Book stick = new Book("Make It Stick: The Science of Successful Learning", "Peter C. Brown", 13);
  Book pLaw = new Book("Parkinson's Law", "C. Northcote Parkinson", 30);

  int sale1 = this.schemer.salePrice(25); // should be 30
  int sale2 = this.stick.salePrice(50); // should be 7
  int sale3 = this.pLaw.salePrice(10); // should be 27
}</code></pre>

<h3><span style="color: #cc0000;">Do Now! </span>Fill in the expected values for the test cases below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code> int sale4 = this.schemer.salePrice(0); //should be  </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "40",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code> int sale5 = this.stick.salePrice(100); //should be  </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "0",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code> int sale6 = this.pLaw.salePrice(20); //should be  </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "24",
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

<!-- step 2441865 | type: text -->

<p>This gives us a pretty good sense of how we’ll get to the result: we’ll have a subtraction and a multiplication. Since we’re using <code>int</code>s, we need to be a bit careful about the order of operations:</p>

<pre><code class="language-java">/*
@param percentage A percent (between 0 and 100) of the discount to subtract
@return The price with the discount subtracted
*/
int salePrice(int percentage) {
  return this.price - (this.price * percentage) / 100;
}</code></pre>

<p>We can save all of this in a file called <code>ExamplesBook.java</code>, run it, and confirm for ourselves that it runs as we expect.</p>

<p><iframe height="910px" scrolling="yes" src="https://tech.io/playground-widget/2a13e51e70ee291d4c662ee22e53c7c120785/welcome/1089171/ExamplesBook" width="100%"></iframe></p>

---

<!-- step 2396679 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>There is also a number of ways we can extend this class. We might try to add more authors (the first two examples above actually have multiple authors). We might add a field called <code>subtitle</code>, since the full title of <code>"Make It Stick"</code> is a bit long.</p>

<p>We could also add some new methods. We could ask, for instance, if two books have the same author. This would be a method in the <code>Book</code> class that takes in another <code>Book</code> reference and somehow compare the <code>author</code> fields. Let’s work through this next:</p>

<pre><code class="language-java">/*
  @param other The Book to compare against
  @return true if this book and other have the same author, false otherwise
*/
boolean sameAuthor(Book other) {

}

class ExamplesBook {
  Book schemer = new Book("The Little Schemer", "Daniel P. Friedman", 40);
  Book stick = new Book("Make It Stick: The Science of Successful Learning", "Peter C. Brown", 13);
  Book pLaw = new Book("Parkinson's Law", "C. Northcote Parkinson", 30);
  Book reason = new Book("The Reasoned Schemer", "Daniel P. Friedman", 38);

  boolean same1 = this.reason.sameAuthor(this.schemer); // should be ???
  boolean same2 = this.reason.sameAuthor(this.stick); // should be ???
  boolean same3 = this.schemer.sameAuthor(this.reason); // should be ???
}</code></pre>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> What are the expected values for each of the <code>boolean</code>s above? Select the correct options below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>this.reason.sameAuthor(this.schemer)</code> should be ",
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
      "text": ".<br><code>this.reason.sameAuthor(this.stick)</code> should be ",
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
      "text": ".<br><code>this.schemer.sameAuthor(this.reason)</code> should be ",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2441927 | type: choice -->

**Quiz (choice)**

<p>Now, we just need to write the body for the method. We need to compare the <code>author</code> fields (which are <code>String</code>s) of this book and the other book. Since <code>+</code> works on both numbers and <code>String</code>s, it’s natural to wonder whether another operator, like <code>==</code>, will work on both. It turns out that it won’t, for a very specific reason.</p>

<p><code>String</code> is actually a class, and the values we’ve been using as <code>String</code>s are actually objects! The <code>==</code> won’t work the way we expect here on objects (we’ll talk more about why later). This explains why we write <code>String</code> with a capital S — the convention for class names is that they start with a capital letter (as opposed to simple, or primitive, types like <code>int</code> and <code>boolean</code>).</p>

<p>It also helps explain how we can go about performing operations other than <code>+</code> on <code>String</code>s. Since they are objects, we ought to be able to call methods on them! The <code>String</code> class defines a method, <code>equals()</code>, which can be used to compare one string to another and check whether they have the same contents. That gives us what we need to finish the method body of <code>sameAuthor()</code>:</p>

<p><iframe height="767px" scrolling="yes" src="https://tech.io/playground-widget/2e1d7e9302912f1301de20c7d64d4b1820785/welcome/1098109/Same%20Author%3F" width="100%"></iframe></p>

<p>If we run it, we get the answers that we expect.</p>

<h3><span style="color: #cc0000;">Do Now!</span> Select all of the statements below that are true.</h3>


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
      "text": "A <code>String</code> is an object.",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "A <code>boolean</code> is an object.",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "We can call a method on an <code>int</code>.",
      "feedback": "Hint: can we call a method on something that is not an object?"
    },
    {
      "is_correct": true,
      "text": "The name of a class should start with a capital letter.",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "We shouldn't use <code>==</code> to compare <code>String</code>s.",
      "feedback": "Hint: should we use `==` for objects?"
    }
  ]
}
```

</details>

---

<!-- step 2334590 | type: text -->

<p>There are a few things worth noting about our new realization that <code>String</code> is a class, and that <code>String</code> values are objects:</p>

<ul>
	<li>
	<p>When printed, <code>String</code>s don’t show up as <code>new String:5("some string")</code> the way other objects do. This is mainly for convenience, since they are relatively common and the output would be difficult to read otherwise.</p>
	</li>
	<li>
	<p>The operator <code>+</code> is pretty special, since it is able to work with both primitives like <code>int</code>s and references to objects like <code>String</code>s. Not many other features in Java work over so many different kinds of values.</p>
	</li>
	<li>
	<p>We’ll slowly learn about more methods for <code>String</code>s that will allow us to perform even more string operations. If you want to look them up for yourself, they are all listed in Java’s official documentation for the <code><a href="https://docs.oracle.com/javase/7/docs/api/java/lang/String.html" rel="noopener noreferrer nofollow">String</a></code> class.</p>
	</li>
</ul>

---

<!-- step 2359269 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>To introduce another few <code>String</code> methods and practice with them, let’s write one more method. Sometimes, when printing an inventory, we might have long titles (like the full title of <code>"Make It Stick"</code>) that don’t fit in a column width-wise. A common trick is to truncate the string down to a certain length, and replace the end with <code>"..."</code>. If the string is below the given length, we leave it alone. So let’s write <code>truncateTitle()</code>, which will take in a length to cut the title down to, and return the truncated title.</p>

<pre><code class="language-java">class Book {
  /*
    @param length The number of characters to appear before "..."
    @return A new string containing length characters followed by "..." if the
    string was too long, or the original string otherwise
  */
  String truncateTitle(int length) {
    
  }
}

class ExamplesBook {

  Book schemer = new Book("The Little Schemer", "Daniel P. Friedman", 40);
  Book stick = new Book("Make It Stick: The Science of Successful Learning", "Peter C. Brown", 13);

  String truncate1 = this.stick.truncateTitle(15);
  String truncate2 = this.schemer.truncateTitle(20);
  String truncate3 = this.schemer.truncateTitle(0);
}</code></pre>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Determine the expected output for the following calls to <code>truncateTitle()</code>.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>String truncate1 = this.stick.truncateTitle(15); // should be</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "\"Make It Stick: ...\"",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code>String truncate2 = this.schemer.truncateTitle(20); //should be </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "\"The Little Schemer\"",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code>String truncate3 = this.schemer.truncateTitle(0); //should be</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "\"...\"",
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

<!-- step 2334597 | type: text -->

<p>We’ll need two <code>String</code> methods to do this:</p>

<ul>
	<li>
	<p><code><a href="https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#length()" rel="noopener noreferrer nofollow">length()</a></code>, which takes in no arguments and returns the number of characters in the <code>String</code>.</p>
	</li>
	<li>
	<p><code><a href="https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#substring(int,%20int)" rel="noopener noreferrer nofollow">substring()</a></code>, which takes in two positions as <code>int</code>s and returns the part of the string that starts at the first position and ends just before the second. The first position in the string is 0.</p>
	</li>
</ul>

<p>Here are some examples of these methods in action:</p>

<pre><code class="language-java">class ExamplesBook {
  // examples from above omitted here

  String ss1 = "abcd".substring(0, 1); // Produces "a"
  String ss2 = "abcd".substring(0, 4); // Produces "abcd"
  String ss3 = "Hello there".substring(0, 7); // Produces "Hello t"

  String l1 = "abcd".length(); // Produces 4
  String l2 = "".length(); // Produces 0
  String l3 = "The Little Schemer".length(); // Produces 18
}</code></pre>

---

<!-- step 2443337 | type: choice -->

**Quiz (choice)**

<p>By using these two methods together, we can write the body of <code>truncateTitle()</code>:</p>

<pre><code class="language-java">String truncateTitle(int length) {
  if(this.title.length() &gt; length) {
    return this.title.substring(0, length) + "...";
  }
  else {
    return this.title;
  }
}</code></pre>

<p>We put a few pieces together to make this happen. First, the description of the problem was <em>conditional</em> — we were to give one answer if the string was too long, and another if it was short enough. Second, we used <code>length()</code> on the <code>title</code> field to compare it to the parameter to check which case needed to be processed. Third, we used the <code>substring()</code> method to pick out the part of the string from the beginning (position <code>0</code>) up to the specified length.</p>

<p>We often call the positions in a <code>String</code> the <strong>indices</strong> in the string. So the first character is at <strong>index</strong> <code>0</code>. What index is the last character at?</p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> Choose the Java expression that would evaluate to the index of the last character in a <code>String</code>. Assume the <code>String</code> is stored in a variable called <code>str</code>.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": false,
  "is_always_correct": false,
  "sample_size": 4,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": false,
  "options": [
    {
      "is_correct": false,
      "text": "<code>str.length - 1</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>str.length() - 1</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>str.length()</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>str.length</code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2446972 | type: text -->

<h2>Summary</h2>

<ul>
	<li>We can use a class to represent something that is made up of multiple different pieces of data, and we can write methods in that class to ask different questions and perform calculations related to what the class represents.
	<ul>
		<li>For example, in this lesson, we wrote a class called <code>Book</code>, which contained information about a book's title, author, and price. One of the methods in this class allowed us to get the cost of the book when it was on sale.</li>
	</ul>
	</li>
	<li><code>String</code>s are objects, so we should use <code>.equals()</code> instead of <code>==</code> to check for equality for <code>String</code>s.</li>
	<li>There are methods defined in the <code>String</code> class, such as <code>length()</code> and <code>indexOf()</code>, that we can call on <code>String</code>s. You can find more of these methods <a href="https://docs.oracle.com/javase/7/docs/api/java/lang/String.html" rel="noopener noreferrer nofollow">here</a>.</li>
</ul>