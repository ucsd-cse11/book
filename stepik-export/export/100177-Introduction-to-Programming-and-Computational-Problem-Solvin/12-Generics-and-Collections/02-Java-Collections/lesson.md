# Java Collections


---

<!-- step 2527514 | type: number -->

**Quiz (number)**

<p>In Java, if we want to store a collection of objects, we can use arrays. One problem with arrays is that they can store only a fixed number of elements, so we have to specify beforehand how many elements we plan to store.</p>

<p>Most of the time, we won't know how many objects we will have to store. For example, if we were to read a list of students from a file and wanted to store each student's name in a collection, we may not know beforehand how many students there are in the list. Therefore, in  this scenario, we can instead use one of the data structures that Java provides, which is called an <code>ArrayList</code>. The documentation for <code>ArrayList</code> is <a href="https://docs.oracle.com/javase/9/docs/api/java/util/ArrayList.html" rel="noopener noreferrer nofollow">here</a>.</p>

<p><code>ArrayList</code> uses generics, allowing us to specify the type of object we want to store in the list. To review, when creating an instance of a class that uses generics, the type should be specified between the <code>&lt;&gt;</code> after the name of the class. The initialization of an <code>ArrayList</code> of <code>String</code>s would look like this: <code>new ArrayList&lt;String&gt;();</code></p>

<p>We can add elements by using an instance method defined for <code>ArrayList</code> named <code>add()</code>. <code>add()</code> is a void method that takes one argument and adds it as an element in the <code>ArrayList</code>. The argument should be of the type that the <code>ArrayList</code> stores.</p>

<p>The following program creates an <code>ArrayList</code> of <code>Integers</code> and prints its elements.</p>

<p><iframe height="700px" scrolling="yes" src="https://tech.io/playground-widget/6b3d954c9d15e024cb9589805f3d09b320785/welcome/1095025/ArrayListExamples.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> How many elements are in <code>nums</code> at the end of the program?</h3>


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

<!-- step 2348077 | type: fill-blanks -->

**Quiz (fill-blanks)**

<pre><code class="language-java">import java.util.ArrayList;
import java.util.List;

class ArrayListExamples {
  public static void main(String[] args) {
    List&lt;Integer&gt; nums = new ArrayList&lt;Integer&gt;();
    nums.add(10);
    nums.add(20);
    nums.add(30);
    System.out.println(nums);
  }
}</code></pre>

<p>Note that we are using the wrapper class <code>Integer</code> instead of the primitive type <code>int</code>. Remember that a primitive type cannot be used as a generic type. Therefore, we need to use the wrapper class <code>Integer</code> instead of the primitive <code>int</code>.</p>

<p>The following code will produce an error:</p>

<p><iframe height="600px" scrolling="no" src="https://tech.io/playground-widget/6317864e384c512f673cc1ce8af4e79820785/welcome/1094919/ArrayListExamples.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Run the code above and fill in the blanks based on the output.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<b>1st line of the output:</b> <br>\n<code> ArrayListExamples.java:6: error: </code>",
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
      "text": "<br><br>\n<b> 4th line of the output: </b> <br>\n<code> required: </code>",
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
      "text": "<br><br>\n<b> 5th line of the output: </b> <br>\n<code>found:    </code>",
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

<!-- step 2348112 | type: matching -->

**Quiz (matching)**

<p>What if we want to remove an element? There is a handy method for this: <code>remove()</code>. <code>remove()</code> takes one argument, of type <code>int</code>. It represents the index of the element to remove. For example, for an <code>ArrayList</code> named <code>nums</code>, <code>nums.remove(1);</code> would remove the element in <code>nums</code> at index 1.</p>

<p>There is also another version of the <code>add()</code> method defined for <code>ArrayList</code>, and it allows us to add an element at a specific index in the list, rather than at the end. It takes two arguments instead of one. The first argument, an <code>int</code>, represents the index to add the element at, and the second argument is the element to add. For example, for an <code>ArrayList</code> named <code>nums</code>, <code>nums.add(1, 40);</code> would add the value <code>40</code> at index 1 in the list.</p>

<p>The following program removes the element at index 1 in the <code>ArrayList</code> and adds two new elements at indices 1 and 0.</p>

<p><iframe height="700px" scrolling="no" src="https://tech.io/playground-widget/744c81ddad89049c5243e2f61563d4e520785/welcome/1094814/ArrayListExamples.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Assuming that these 3 lines of code are run as shown in the example above, match each line of code with the contents of <code>nums</code> after that line is run.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "preserve_firsts_order": true,
  "is_html_enabled": true,
  "pairs": [
    {
      "first": "(initial values in <code>nums</code>)",
      "second": "<code> [10, 20, 30] </code>"
    },
    {
      "first": "<code> nums.remove(1); </code>",
      "second": "<code> [10, 30] </code>"
    },
    {
      "first": "<code> nums.add(1, 40); </code>",
      "second": "<code> [10, 40, 30] </code>"
    },
    {
      "first": "<code> nums.add(0, 50); </code>",
      "second": "<code> [50, 10, 40, 30] </code>"
    }
  ]
}
```

</details>

---

<!-- step 2348124 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>The program below creates an <code>ArrayList</code> of <code>String</code>s for storing the names of students. There are several methods used here:</p>

<ul>
	<li>The <code>contains()</code> method determines if a particular element is present in the list. It returns <code>true</code> if the element is present and <code>false</code> if not.</li>
	<li>The <code>get()</code> method is used to retrieve an element at a particular index in the <code>ArrayList</code>.</li>
	<li>The <code>remove()</code> method removes an element at the given index.</li>
</ul>

<p><iframe height="800px" scrolling="yes" src="https://tech.io/playground-widget/744c81ddad89049c5243e2f61563d4e520785/welcome/1094815/ArrayListExamples.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Fill in the values that are stored in the following variables at the end of the program.</h3>

<p>(Hint: remember that <code>String</code> values are not shown in quotes when printed with <code>System.out.println()</code>, but when we want to talk about a String value, we write it with the double-quotes.)</p>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>containsJaida_2</code>",
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
      "text": "<br><code>containsFarnia_2</code>",
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
      "text": "<br><code>atIndex1_2</code>",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "\"Mohamed\"",
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

<!-- step 2348128 | type: text -->

<p>A list can contain elements that have the same value. For example, the list below contains duplicate elements.</p>

<p><iframe height="700px" scrolling="yes" src="https://tech.io/playground-widget/744c81ddad89049c5243e2f61563d4e520785/welcome/1094816/ArrayListExamples.java" width="100%"></iframe></p>

---

<!-- step 2348129 | type: number -->

**Quiz (number)**

<p>In Java, if we want to store a set of elements, then we may use the <code>HashSet</code> data structure. The documentation can be found <a href="https://docs.oracle.com/javase/9/docs/api/java/util/HashSet.html" rel="noopener noreferrer nofollow">here</a>.</p>

<p>The following program creates a set of some prime numbers.</p>

<p><iframe height="700px" scrolling="yes" src="https://tech.io/playground-widget/744c81ddad89049c5243e2f61563d4e520785/welcome/1094817/SetExamples.java" width="100%"></iframe></p>

<p>Note that in a set, the elements are not arranged in the order of insertion. They are arranged in some random order. In this example, it just happens that the elements are arranged in ascending order, but that is not always the case.</p>

<p>Also, note that even though we insert the value <code>3</code> three times, it appears only once in the set. Similarly, the value <code>7</code> is inserted twice, but it only appears once in the set. This is because a set stores only unique elements. </p>

<p>Since there is no ordering of elements in the set, a set does not contain a <code>get(index)</code> method (like the one we saw in <code>ArrayList</code>). There are no indices in a set.</p>

<h3><span style="color: #cc0000;">Do Now! </span>How many values does <code>primes</code> contain?</h3>


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

<!-- step 2348131 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>The set below creates a set of students and performs some set operations.</p>

<pre><code>public class SetExamples {
  public static void main(String[] args) {
    HashSet&lt;String&gt; students = new HashSet&lt;String&gt;();
    students.add("Yunxian");
    students.add("Shungo");
    students.add("Tanh");
    students.add("Yunxian");

    int size_1 = students.size(); //should be 3
    boolean containsShungo_1 = students.contains("Shungo"); //should be true
    boolean containsDarren_1 = students.contains("Darren"); //should be false

    students.remove("Shungo");

    int size_2 = students.size();
    boolean containsShungo_2 = students.contains("Shungo");
  }
}
</code></pre>

<h3><span style="color: #cc0000;">Do Now!</span> Trace through to code to figure out the values that are stored in the following variables at the end of the program.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "<code>size_2</code>",
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
      "text": "<br>\n<code>containsSungo2</code>",
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
  "is_partially_correct": true
}
```

</details>

---

<!-- step 2348147 | type: choice -->

**Quiz (choice)**

<p>Since sets do not have associated indeces for each element, we can’t access the elements in a set using an index, like we would for an array or <code>ArrayList</code>. Instead, we can use a for-each loop to go through all the elements in a <code>HashSet</code>.</p>

<p><iframe height="600px" scrolling="yes" src="https://tech.io/playground-widget/744c81ddad89049c5243e2f61563d4e520785/welcome/1094818/SetExamples.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Run the code below, which attempts to use an index to access an element in <code>students</code>. Select the options that appear as part of the error message.</h3>

<p><iframe height="600px" scrolling="yes" src="https://tech.io/playground-widget/744c81ddad89049c5243e2f61563d4e520785/welcome/1094819/SetExamples.java" width="100%"></iframe></p>


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
      "text": "<code> <pre>array required, but HashSet&lt;String&gt; found</pre> </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> String cannot be converted to int </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> ';' expected </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> static not valid on constructor </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> incompatible types </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> non-static variable students cannot be referenced from a static context </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> cannot find symbol </code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2348200 | type: text -->

<p>One of the most useful data structures in Java (and in most other programming languages) is a map. A map is a data structure that can store mappings between keys and values. There are two generic types for the HashMap class, the first being the type of the keys and the second being the type of the values.</p>

<p>The method <code>put()</code> is used to add a new key-value pair to the map. The first argument is the key and the second is the value.</p>

<p>The following program creates a <code>HashMap</code> of a student directory where a key is the student's id (<code>Integer</code>) and the value associated with it is the student's name (<code>String</code>). </p>

<p><span style="color: #cc0000;"><strong>Do Now! </strong></span>Run the following code and observe its output.</p>

<p><iframe height="700px" scrolling="no" src="https://tech.io/playground-widget/744c81ddad89049c5243e2f61563d4e520785/welcome/1094820/MapExamples.java" width="100%"></iframe></p>

<p>In the above output, <code>67890=Navya</code> means that <code>67890</code> is the key and <code>"Navya"</code> is the value associated with it. The same interpretation applies for the other keys and values.</p>

---

<!-- step 2348203 | type: string -->

**Quiz (string)**

<p>The following program shows what happens when you try to associate a different value with a key that is already present in the map.</p>

<p><iframe height="700px" scrolling="yes" src="https://tech.io/playground-widget/6317864e384c512f673cc1ce8af4e79820785/welcome/1094927/MapExamples.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>At the end of the program, what value is associated with the key <code>12345</code>?</h3>

<p>(Hint: remember that <code>String</code> values are represented with double-quotes)</p>


<details><summary>Author source (answers)</summary>


```json
{
  "pattern": "\"Maitrayee\"",
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

<!-- step 2348235 | type: choice -->

**Quiz (choice)**

<p>The following code example shows how to remove an element from a map.</p>

<p><iframe height="700px" scrolling="yes" src="https://tech.io/playground-widget/744c81ddad89049c5243e2f61563d4e520785/welcome/1094822/MapExamples.java" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now! </span>Considering each option on its own, which of the following lines of code, when added to the end of the program, would change the size of <code>studDir</code>?</h3>

<p>(Hint: try running the code with each of these options!)</p>


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
      "text": "<code> studDir.remove(67890); </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> studDir.remove(13579); </code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code> studDir.put(24680, \"Oksana\"); </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> studDir.remove(54321); </code>",
      "feedback": ""
    },
    {
      "is_correct": true,
      "text": "<code> studDir.put(13579, \"Qiling\"); </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> studDir.put(12345, \"Amahle\"); </code>",
      "feedback": ""
    },
    {
      "is_correct": false,
      "text": "<code> studDir.get(67890); </code>",
      "feedback": ""
    }
  ]
}
```

</details>

---

<!-- step 2527361 | type: text -->

<h2>Summary</h2>

<ul>
	<li>Java has several pre-defined classes that we can use to represent collections of data. In this module, we introduced <code>ArrayList</code>, <code>HashSet</code>, and <code>HashMap</code>.</li>
	<li><code>ArrayList</code> has several similarities to arrays. Both contain elements that can be accessed using indices. Some differences are that the size of an <code>ArrayList</code> can change (while the size of an array cannot be changed) and that an <code>ArrayList</code> cannot store elements of primitive types (while an array can).</li>
	<li><code>HashSet</code> stores a set of elements. The elements are not kept in any order and cannot be accessed using indices.</li>
	<li><code>HashMap</code> creates key-value pairs. We can use the key to access the value that it is paired with. The key and value do not have to be of the same type.</li>
</ul>