# Searching for Images


---

<!-- step 2333731 | type: fill-blanks -->

**Quiz (fill-blanks)**

<p>Many search engines support an advanced search mode, where the user can type in a specific query based on combining many parameters. Here’s Google’s <a href="https://www.google.com/advanced_image_search" rel="noopener noreferrer nofollow">interface for searching for images</a>:</p>

<p><img alt="" height="543" name="image-search.png" src="https://ucarecdn.stepik.net/bec1bd2f-d51a-4052-bb88-710757eaa07c/" width="813"></p>

<p>Let’s try to model a simple version of this to see what a query like this might look like. Let's start with a class to represent the images themselves; we’ll pick just a few fields that will serve as good examples:</p>

<pre><code class="language-java">class ImageData {
  String keywords; // All the keywords, separated by spaces
  String filetype; // gif, png, jpg, and so on
  int width;       // the width in pixels
  int height;      // the height in pixels
  ImageData(String keywords, String filetype, int width, int height) {
    this.keywords = keywords;
    this.filetype = filetype;
    this.width = width;
    this.height = height;
  }
}</code></pre>

<p>As a first try, we could add some methods to this class for the various search types. One way to think about a “search” method is that the parameters could be the values we would need for the search, and then the method would use boolean operations to check whether <code>this</code> image should be part of the search results or not.</p>

<p>For example, we could add a method that takes a <code>String</code> that represents a file type and checks if the image has that file extension:</p>

<p><iframe height="930px" scrolling="yes" src="https://tech.io/playground-widget/e444242433f91b326320045480d737cc20785/welcome/1084618/Image%20Data" width="100%"></iframe></p>

<h3><span style="color: #cc0000;">Do Now!</span> Replace ____BLANK1____ with code that uses <code>matchesExtension</code> to check if <code>"jpg"</code> is an extension for the image represented by <code>i1</code>. Replace ___BLANK2____ with the expected result of this call. (Hint: follow the format of the example test case given in <code>testMatchesExtension()</code>)</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "components": [
    {
      "type": "text",
      "text": "____BLANK1____",
      "options": []
    },
    {
      "type": "input",
      "text": "",
      "options": [
        {
          "text": "i1.matchesExtension(\"jpg\")",
          "is_correct": true
        },
        {
          "text": "i1.matchesExtension( \"jpg\" )",
          "is_correct": true
        },
        {
          "text": "i1.matchesExtension( \"jpg\")",
          "is_correct": true
        },
        {
          "text": "i1.matchesExtension(\"jpg\" )",
          "is_correct": true
        }
      ]
    },
    {
      "type": "text",
      "text": "<br>____BLANK2____",
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
  "is_case_sensitive": true,
  "is_detailed_feedback": true,
  "is_partially_correct": false
}
```

</details>

---

<!-- step 2333955 | type: matching -->

**Quiz (matching)**

<p>We could also check that the size is greater than a certain width and height:</p>

<p><iframe height="860px" scrolling="yes" src="https://tech.io/playground-widget/4976173eb7cba7495536db272fa233fc20785/welcome/1086231/largerThan" width="100%"></iframe></p>

<pre><code class="language-java">// For the question below, you might find it helpful
// to modify the code above and may refer to this template to answer.

__BLANK1__ largerThan(int __BLANK2__, int minHeight) {
  __BLANK3__ this.__BLANK4__ &gt;= minWidth __BLANK5__ this.height &gt;= __BLANK6__;
}</code></pre>

<h3><span style="color: #cc0000;">Do Now! </span>Complete the <code>largerThan</code> method by reordering the code snippets below to match the blanks that they belong in.</h3>


<details><summary>Author source (answers)</summary>


```json
{
  "preserve_firsts_order": true,
  "is_html_enabled": true,
  "pairs": [
    {
      "first": "BLANK1",
      "second": "<code>boolean</code>"
    },
    {
      "first": "BLANK2",
      "second": "<code>minWidth</code>"
    },
    {
      "first": "BLANK3",
      "second": "<code>return</code>"
    },
    {
      "first": "BLANK4",
      "second": "<code>width</code>"
    },
    {
      "first": "BLANK5",
      "second": "<code>&&</code>"
    },
    {
      "first": "BLANK6",
      "second": "<code>minHeight</code>"
    },
    {
      "first": "(not used)",
      "second": "<code>||</code>"
    }
  ]
}
```

</details>

---

<!-- step 2333957 | type: text -->

<p>What we have is pretty good so far. Oftentimes, in search menus like the one we saw in the first step, we have the option to <em>combine</em> multiple queries into a search. For example, we might want all the png images greater than a certain size. To write a method to check if an image would satisfy both of those conditions, we’d need something like:</p>

<pre><code class="language-java">class ImageData {
  /*
    largerThanAndMatchesExtension
 
    @param minWidth The width in pixels the image is checked against
    @param minHeight The height in pixels the image is checked against
    @param ext The file extension to check against
    @return true If this image has a width and height greater than or equal
                 to those supplied and has the given file extension
  */
  boolean largerThanAndMatchesExtension(int minWidth, int minHeight, String ext) {
    return this.largerThan(minWidth, minHeight) &amp;&amp; this.matchesExtension(ext);
  }
}</code></pre>

<p>This works, but it is starting to hint at an issue we might have. Will we really write a method for every combination of possible questions? And what if we care about size and several file extensions, like 400x600 images with filetype equal to either png or gif? Writing <code>largerThanAndMatchesOneOfTwoExtensions</code> and <code>largerThanAndMatchesOneOfThreeExtensions</code> and so on doesn’t seem like much fun.</p>

---

<!-- step 2455831 | type: text -->

<h2>Summary</h2>

<ul>
	<li>We can represent the data of an image by writing a class called <code>ImageData</code>. Inside this class, we can write methods that check if the image has certain specific qualities.</li>
	<li>We can write an individual method like this for every type of query that we can think of, but if we want to combine them (e.g. check if an image is a certain size and has a certain extension), it becomes tedious to write a new method for every possible combination.</li>
</ul>