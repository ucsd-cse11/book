# Arrays of Arrays, Nested Loops


---

<!-- step 2491802 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Consider a theater keeping track of a reservation system. (This example courtesy of Jill Su)</p>

<p>Their seating is made up of rows, each of which has some number of seats within the rows. A seat is either taken (someone has bought a ticket for it) or available:</p>

<p><img alt="" height="343" name="IMG_0056.jpg" src="https://ucarecdn.stepik.net/3dc46dd2-cb87-4225-a849-f1d466f5c6aa/" width="575"></p>

<p> </p>

<p>To track this information, we could represent each row as an array of booleans, where if the value is true, that seat is available, and if false, it's not available.</p>

<p>Then, the seating as a whole can be represented as an _array of rows_.</p>

<p>So, for example, we might have:</p>


<iframe height="600px" scrolling="yes" src="https://tech.io/playground-widget/4c7d4430d85b8bc4339dbdf3b680d11820785/welcome/1094702/TheaterExamples.java" width="100%"></iframe>

<p><strong>Do Now!</strong> What type can we use to represent this? Try each of the following types in the program to see which works, and then put it in the box below.</p>

<ul>
	<li><code>boolean[]</code></li>
	<li><code>boolean</code></li>
	<li><code>boolean[[]]</code></li>
	<li><code>boolean[][]</code></li>
</ul>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "boolean[][]",
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

<!-- step 2491749 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>The type <code>boolean[][]</code> we pronounce as “array of array of booleans”. Indeed, in the output of `./run` we can see that structure:</p>

<pre><code class="language-no-highlight">new TheaterExamples:1(
 this.row1 = new boolean[4]:2{
  [0] true,
  [1] true,
  [2] false,
  [3] false
 }
 this.row2 = new boolean[5]:3{
  [0] true,
  [1] false,
  [2] false,
  [3] false,
  [4] true
 }
 this.row3 = new boolean[6]:4{
  [0] true,
  [1] false,
  [2] true,
  [3] true,
  [4] true,
  [5] true
 }
 this.seats = new boolean[][3]:5{
  [0] [Z:2,
  [1] [Z:3,
  [2] [Z:4
 })</code></pre>

<p>Each individual array gets its own reference, and the array stored in <code>seats</code> stores a reference to each of the rows. (Java prints references to boolean arrays as <code>[Z</code> followed by their reference number. <a href="https://twitter.com/johnwvilk/status/1453961614718169097?s=12" rel="noopener noreferrer nofollow">I cannot find a good reason for this</a>.)</p>

<p>When we access elements in <code>seats</code>, we will get these array references as results. So, if we wanted to get the value corresponding to a single one of the booleans, we would use <code>seats[indexOfRow][indexOfSeat]</code>. Relatedly, we could get the length of a row with <code>seats[indexOfRow].length</code>.</p>

<p>Try running the following program to understand how array lookup works with this array of arrays.</p>

<p><iframe height="600px" scrolling="yes" src="https://tech.io/playground-widget/3a48d9b141e3fcf12506c37a2c6c9a8120785/welcome/1093526/TheaterExamples.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong> </span>Fill in the blanks below with the results of running the program above.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>this.row3Seats =</code>\n",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "6",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br><code>this.row3Accessed =</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "[Z:4",
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

<!-- step 2491763 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Two question we might want to know about our theater seating is how many total seats there are, and how many are available. Let's try to write those methods.</p>

<p>First, let's remind ourselves of our running example:</p>

<pre><code class="language-java">  boolean[] row1 = {true, true, false false};
  boolean[] row2 = {true, false, false, false, true};
  boolean[] row3 = {true, false, true, true, true, true};

  boolean[][] seats = {row1, row2, row3};</code></pre>

<h3><span style="color: #cc0000;">Do Now! </span>Based on our interpretation of this representation, answer the following questions.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "How many total seats are there?",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "15",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br/>How many open/available seats are there?",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "9",
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

<!-- step 2491771 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>That gives us a few test cases – there are 9 open seats and 15 seats total.</p>

<p>Let's focus first on calculating the total number of seats.</p>

<p>Fill in the blank in this method to make the test pass:</p>

<p><iframe height="750px" scrolling="yes" src="https://tech.io/playground-widget/d324c59fd39a22e1e6088ca19d5385eb20785/welcome/1092848/TheaterExamples.java" width="100%"></iframe></p>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>total +=</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "row.length",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>;</code>",
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

<!-- step 2491780 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>We saw that the total number of seats is the sum of the <em>lengths</em> of the individual rows. This was a loop a lot like we've seen before. It's worth pointing out that we were able to use a for-each loop to look at each row individually and store it in the <code>row</code> variable; the for-each loop also worked on this array of arrays.</p>

<pre><code class="language-java">  static int totalSeats(boolean[][] seats) {
    int total = 0;
    for(boolean[] row: seats) {
      total += row.length;
    }
    return total;
  }</code></pre>

<p>One interesting thing here is that the <code>row</code> variable itself stores (a reference to) an array of booleans. This makes sense given how this works in memory; the value of <code>row</code> is set to one of the three references from seats each time the loop body runs.</p>

<p>Our next goal was to calculate the number of <em>available</em> seats, which is the number of seats where the value <code>true</code> is stored in our representation.</p>

<p>This requires a new idea, but no new programming language features. In this case, we want to add up the number of total times we see <code>true</code>. That means for each row, we want to look at each seat, which means another loop!</p>

<p><code>totalSeats</code> gave us a start – we can use a for-each loop to look at each row. Then, for each row, we can use <em>another for-each loop</em> to look at all the elements. Here's most of the code; fill in the missing pieces to make this pass the tests:</p>

<h3><iframe height="840px" scrolling="yes" src="https://tech.io/playground-widget/3a48d9b141e3fcf12506c37a2c6c9a8120785/welcome/1093528/TheaterExamples.java" width="100%"></iframe></h3>

<h3><span style="color: #cc0000;">Do Now! </span>Fill in the blanks in the code.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>for(boolean seat: </code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "row",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>) {</code>",
      "options": []
    },
    {
      "type": "text",
      "text": "<br/><code>&nbsp; if(</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "seat",
          "is_correct": true
        },
        {
          "text": "seat == true",
          "is_correct": true
        },
        {
          "text": "seat==true",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<code>) {</code>",
      "options": []
    },
    {
      "type": "text",
      "text": "<br/><code>&nbsp;&nbsp;&nbsp;total +=</code>",
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
      "text": "<code>;</code><br>\n<code>&nbsp;&nbsp;}</code><br>\n<code>}</code>",
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

<!-- step 2491791 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>This is often called a <em>nested loop</em>, because the loop that works with <code>row</code> is “nested” inside the outer loop that works with <code>seats</code>. This is another case where the program structure matches our data structure -- a nested loop is natural for our array of arrays. This is a good time to mention that sometimes arrays of arrays are called nested arrays! They are also called 2D (for 2-dimensional) arrays.</p>

<p>Let's consider a slightly more sophisticated method, that might be part of a reservation system. We'd like to answer the following question: Given a number of people, where are there that many seats in a row available next to each other somewhere in the theater?<img alt="" height="296" name="IMG_0057.jpg" src="https://ucarecdn.stepik.net/0a01be76-b8cc-4b41-adc0-3a8505bf8846/" width="585"></p>

<p>To turn that into a method, let's think specifically about what we could represent. Let's say we'll return the index of the first row that works, if there is such a row, and return -1 otherwise (this is kind of like finding an element in an array!)</p>

<p>We can break this problem down a bit. First, let's <em>imagine</em> we have a method <code>boolean rowHasEnoughAdjacentSeats(boolean[] row, int howMany)</code>. This is our “wish list” for a method to help us out. <strong>If</strong> we have that method, we can use it in a similar loop to what we've seen so far:</p>

<pre><code class="language-java">static int firstRowWithEnoughAdjacentSeats(boolean[][] seats, int howMany) {
  for(int i = 0; i &lt; seats.length; i += 1) {
    if(rowHasEnoughAdjacentSeats(seats[i], howMany)) { 
      return i;
    }
  }
  return -1;
}</code></pre>

<p>Now we just need to implement that method! There are a lot of ways to do it. Before we get there, let's make sure we understand what the function above ought to do once we implement it.</p>

<h3><span style="color: #cc0000;">Do Now!</span> Fill in the expected values for these tests.</h3>

<pre><code class="language-java">boolean[] row1 = {true, true, false, false};
boolean[] row2 = {true, false, false, false, true};
boolean[] row3 = {true, false, true, true, true, true};
boolean[][] seats = {row1, row2, row3};

void testEnoughAdjacent(Tester t) {
  t.checkExpect(firstRowWithEnoughAdjacentSeats(seats, 4), ______FILL1______);
  t.checkExpect(firstRowWithEnoughAdjacentSeats(seats, 5), ______FILL2______);
  t.checkExpect(firstRowWithEnoughAdjacentSeats(seats, 1), ______FILL3______);
}</code></pre>


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
          "text": "2",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>FILL2",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "-1",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>FILL3",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2491799 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>The last step is to figure out how to implement this method. Fill in the blanks to make all the tests pass!</p>

<p><iframe height="1000px" scrolling="yes" src="https://tech.io/playground-widget/ea48a311079e71b55fc74b37005ffb5220785/welcome/1093431/TheaterExamples.java" width="100%"></iframe></p>


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
          "text": "true",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "FILL2",
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
      "text": "FILL3",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>