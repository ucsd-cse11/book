# More Iteration Patterns


---

<!-- step 2476656 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Just as we can use references to objects as arguments to methods, we can use references to arrays. So, for example, we could write a <code>sum()</code> method over arrays of <code>double</code>s, and use it on one of the examples we just created:</p>

<p><iframe height="700px" scrolling="yes" src="https://tech.io/playground-widget/6737198012875249501ac72f81b51b0f20785/welcome/1091908/ExamplesArrays" width="100%"></iframe></p>

<p>There are no new Java constructs involved here. The for-each loop is the same as in the last section, where the type of the element variable is <code>double</code>, the name of the element variable is <code>num</code>, and the array is an array of <code>double</code>s. Just as we wrote <code>String[]</code> for the parameter type of <code>main()</code>, we write <code>double[]</code> for the parameter type of <code>sum()</code>. In addition, we made sure that this method would work for <em>empty</em> arrays by adding an example for that case.</p>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "What is the result stored in <code>sum1</code>?",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "114.7",
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

<!-- step 2476666 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>There are many other patterns for iterating over arrays, especially using counted for loops rather than for-each loops. For example, we could sum every other element in an array:</p>

<pre><code class="language-java">double sumEveryOther(double[] numbers) {
  double total = 0;
  for(int i = 0; i &lt; numbers.length; i = i + 2) {
    total = total + numbers[i];
  }
  return total;
}</code></pre>

<h3><span style="color: #cc0000;"><strong>Do Now!</strong></span> In the program above, only every other index is visited. Consider calling it <code>sumEveryOther</code> with the array <code>{4, 1, 9, 7, 6}</code>. What values will be stored in <code>i</code> as this program runs, and what will the return value be?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "Values of i: ",
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
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "4",
          "is_correct": true
        }
      ]
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
      "text": "<br/>Return value:",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "19",
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

<!-- step 2476731 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>We can also write methods that skip just the last element of an array. A common case for such a method puts commas in between each element in a list of strings, but not after the last one. Let’s build that up:</p>

<pre><code class="language-java">/*
  @param strs The strings to join together
  @param separator The string to insert between the provided strs
  @return A single string containing the provided strings joined with the separator
*/
String intersperse(String[] strs, String separator)</code></pre>

<p>When we get into processing arrays in trickier ways, there are lots of opportunities to make mistakes with indices. For example, it’s easy to be off by one index. To avoid these issues, it is more important than ever with array methods to think through examples first, so that we have tests to check our work later, after things get complicated. So let’s pick a few tests for this method. In general, we should always make sure a method that processes arrays makes sense with the empty array, arrays with single elements, and several cases of longer arrays.</p>

<p>One way to implement this is to write a loop that appends each string with the separator after it for all the elements <em>except</em> the last one, and then add the last string in the array:</p>

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/90c00bc69c16a6fd595d970b9971ad8c20785/welcome/1091596/Intersperse" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Run the program. How many tests run and how many tests fail?</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "How many tests run?",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "7",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br/>How many tests fail?",
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
    }
  ],
  "is_case_sensitive": false,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2476739 | type: choice -->

**Quiz (choice)**

<p>When the array is empty, the line <code>result += strs[strs.length - 1];</code> runs with <code>strs.length</code> equal to <code>0</code>. That produces the index <code>-1</code> for the array lookup, which produces the error. The body of the method doesn’t work for empty arrays! We could try to re-work the logic around this case. We could also just add a single line at the beginning. Think about this! What line of code could we add at the beginning to return the empty string if the array is empty?</p>

<p><iframe height="1000px" scrolling="yes" src="https://tech.io/playground-widget/90c00bc69c16a6fd595d970b9971ad8c20785/welcome/1091596/Intersperse" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Which of the following lines, when added to the beginning of the method, will make all the tests pass? Choose all that apply.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "is_multiple_choice": true,
  "is_always_correct": false,
  "sample_size": 7,
  "preserve_order": false,
  "is_html_enabled": true,
  "is_options_feedback": false,
  "options": [
    {
      "is_correct": true,
      "text": "<code>if(strs.length == 0) { return \"\"; }</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>if(strs.length > 0) { return \"\"; }</code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code>if(strs.length <= 0) { return \"\"; }</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>if(separator == \"\") { return \"\"; }</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>if(separator.equals(\"\")) { return \"\"; }</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>if(strs == {}) { return \"\"; }</code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code>if(strs.length < separator.length()) { return \"\"; }</code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2476738 | type: text -->

<p>There are actually several ways we <em>could</em> have written this method. For example, we could have visited every element with the loop, and not appended the separator if the index was equal to the highest index in the array. Or we could have started <code>result</code> with the first element in the array, and then added the <code>separator + strs[i]</code> in a loop that started at index <code>1</code>. Often, we have some choice in our particular layout of a loop, and there’s not a specific “right” way to write it.</p>

<p>In general, in the next sections on loops we will show many <strong>examples</strong> of using loops and arrays so that you can get a sense of different strategies and styles for programming with them. This is a really broad space of programming design, so there are lots of things to try and learn, and doing so by example, then trying things out on your own, is the best way to learn it.</p>