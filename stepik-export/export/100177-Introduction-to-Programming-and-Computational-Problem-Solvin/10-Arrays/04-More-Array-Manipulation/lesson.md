# More Array Manipulation


---

<!-- step 2411286 | type: choice -->

**Quiz (choice)**

<p>Armed with the ability to create arrays of any length and to change their contents after creation, we can now write many new programs.</p>

<p>For example, we can write a method that takes in an array and an element, and it returns a new array that has all the same contents but with the new element appended at the end. This lets us “get around” the restriction that an array is fixed at creation-time because we can use this method to create new, larger arrays from existing ones. </p>

<p>Let’s try to write <code>addAtEnd()</code>:</p>

<pre><code>class ArrayExamples {
  /*
  @param String[] base The base array to add to
  @param String toAdd The string to add at the end
  @return A new array containing the elements of base followed by toAdd
  */
  String[] addAtEnd(String[] base, String toAdd) {
    // This method body is an example of a stub we filled in to avoid putting
    // the whole implementation in place for now.
    String[] result = {};
    return result;
  }
 
  boolean testAddAtEnd(Tester t) {
    String[] base1 = {"kiwi", "apple", "banana"};
    String[] check1 = {"kiwi", "apple", "banana", "orange"};
    t.checkExpect(this.addAtEnd(base1, "orange"), check1);
 
    String[] base2 = {};
    String[] check2 = {"bear"};
    String[] check3 = {"bear", "lion"};
    t.checkExpect(this.addAtEnd(base2, "bear"), check2);
    t.checkExpect(this.addAtEnd(check2, "lion"), check3);
 
    return true;
  }
}</code></pre>

<p>We can note a few things here. First, the length of the array that is returned is one greater than the length of the input array. That helps us determine the size of the new array that should be created. Second, since the contents are the same for the indices that overlap, we know that we’ll be copying some number of elements from the original array to the returned one. </p>

<h3><span style="color: #cc0000;">Do Now! </span>Select all of the statements that should be true about the implementation <code>addAtEnd()</code> method based on its description.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": true,
  "is_always_correct": false,
  "sample_size": 5,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": true,
  "options": [
    {
      "is_correct": false,
      "text": "The length of the input array will be changed.",
      "feedback": "Can the length of an array be changed?"
    },
    {
      "is_correct": false,
      "text": "The array that is returned has the same reference as the input array.",
      "feedback": "What should be the length of the array that is returned in comparison to the length of the input array?"
    },
    {
      "is_correct": true,
      "text": "A new array will be created in the body of the method.",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "The elements from the input array will be copied and placed in another array.",
      "feedback": "Can the length of an array be changed?"
    },
    {
      "is_correct": false,
      "text": "There will be an error if the input array has no elements.",
      "feedback": "Take a look at the tests that are provided above."
    }
  ]
}
```

</details>

---

<!-- step 2411939 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>In the previous step, we noted that</p>

<ul>
	<li>We can determine the size of the array that we want to return because it should be one greater than the size of the input array.</li>
	<li>We’ll be copying some number of elements from the input array to the array that will be returned.</li>
</ul>

<p>This helps us figure out the structure of the method:</p>

<pre><code class="language-java">String[] addAtEnd(String[] base, String toAdd) {
  String[] result = new String[base.length + 1]; // There will be one more element in what we return
  for(int i = 0; i &lt; base.length; i += 1) {
    result[i] = base[i];
  }
  result[base.length] = toAdd;
  return result;
}</code></pre>

<p>It’s important to note that in running <code>addAtEnd()</code>, the original array is completely unchanged. There is simply a new array created that happens to have much of the same contents, with an additional element.</p>

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/718e8c16b10fecaf8145089a3c7b576e20785/welcome/1091823/AddAtEnd" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Answer the questions below.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "Fill in the blanks in the program with the values the tests should produce.<br/>\nFILL 1: ",
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
      "text": "<br/>\nFILL 2: ",
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
      "text": "<br/>\nFILL 3: ",
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
      "text": "<br/>\nHow many <b>total</b> arrays are created on the heap when <code>testAddAtEnd</code> runs?",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "8",
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

<!-- step 2474176 | type: text -->

<h2> </h2>

<p>The answers from the last section are consistent with our explanation of how <code>addAtEnd</code> works.</p>

<p><em>Each time</em> <code>addAtEnd</code> is called, it produces a new array, so the total number of arrays is the number directly created in the test method plus one per call to addAtEnd.</p>

<p>Also, <code>addAtEnd</code> makes no changes to the input array's content or length (and altering an array's length in Java is not possible), so the lengths stay the size they had at creation time.</p>

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/718e8c16b10fecaf8145089a3c7b576e20785/welcome/1091823/AddAtEnd" width="100%"></iframe></p>

---

<!-- step 2477826 | type: text -->

<h2>Summary</h2>

<p>We've now seen how we can create <em>new</em> arrays inside of a method, based on the length of an existing array. This is a typical pattern we use when we want to do computation that involves creating an array of a different size than one we are using as input.</p>