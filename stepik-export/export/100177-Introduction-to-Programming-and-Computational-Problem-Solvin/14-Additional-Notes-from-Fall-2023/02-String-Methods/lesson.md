# String Methods


---

<!-- step 4649910 | type: text -->

<p>Why do we define <code>String</code> types with a capital “S” but all the primitive types are lowercase? That’s because <code>String</code>s are actually objects, and these <code>String</code> objects come with a handful of built-in methods to do useful things.</p>

<p>The <code>.length()</code> method returns the number of characters in the <code>String</code>. In the following example, <code>nameLength</code> would be equal to the number of characters in <code>name</code>, which is <code>12</code>.</p>

<pre><code class="language-java">String name = “Elena Tomson”;
int nameLength = name.length();
</code></pre>

<p>The <code>.substring()</code> method returns a part of the <code>String</code> object starting from a given index. In the following example, <code>lastName</code> would be the part of <code>name</code> starting at index <code>6</code> up until the end of the <code>String</code>, which would be <code>“Tomson”</code>. We can also provide the <code>.substring()</code> method with a second argument that defines the end index, the index we want to stop before. In the example, <code>firstName</code> would be the part of <code>name</code> starting at index <code>0</code> up until but not including index <code>5</code>, which is <code>“Elena”</code>. Note that the returned substring will not include the character at the end index itself. If either index is less than <code>0</code> or greater than the length of the <code>String</code>, then we consider the index to be “out of bounds” and the <code>.substring()</code> method throws an error.</p>

<pre><code class="language-java">String lastName = name.substring(6);
String firstName = name.substring(0, 5);</code></pre>

<p>The <code>.indexOf()</code> method returns the index of the first occurrence of a given substring in the <code>String</code>. In the following example, <code>atSymbolIndex</code> would be the index of the first occurrence of the <code>“@”</code> in <code>email</code>, which is at index <code>7</code>. We can also provide the <code>.indexOf()</code> method with a second argument that defines the start index, the index we want to start looking for the substring from. In the example, <code>secondEIndex</code> would be the index of the first occurrence of “e” in <code>email</code> starting at index <code>1</code>, which is at index <code>13</code>. If there is no occurrence of the given substring, then the <code>.indexOf()</code> method returns <code>-1</code>.</p>

<pre><code class="language-java">String email = “etomson@ucsd.edu”;
String atSymbolIndex = email.indexOf(“@”);
String secondEIndex = email.indexOf(“e”, 1);</code></pre>

<p>Building off of this example, we could even use the <code>.substring()</code> and <code>.indexOf()</code> methods together to get the username of any <code>email</code>, without knowing how long the username is. For any <code>email</code>, we first find the index of <code>“@”</code>. Then we use this index to get the substring of the <code>email</code> up until <code>“@”</code>.</p>

<pre><code class="language-java">String username = email.substring(0, email.indexOf(“@”));</code></pre>

<p>You can find information about these built-in String methods and more in the official Java documentation: <a href="https://docs.oracle.com/javase/8/docs/api/java/lang/String.html" rel="noopener noreferrer nofollow">https://docs.oracle.com/javase/8/docs/api/java/lang/String.html</a>.</p>