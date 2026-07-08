# While Loops


---

<!-- step 4835557 | type: text -->

<p>An additional type of loop that is commonly used in java is the <code>while</code> loop. A <code>while</code> loops has the following syntax:</p>

<pre><code class="language-java">while(condition) {
  // body of the loop
}</code></pre>

<p>The <code>condition</code> inside the parentheses is some expression that is evaluated to a <code>boolean</code> value. As long as the condition has the boolean value <code>true</code>, we want out program to execute the body of the loop. Once the condition evaluates to <code>false</code>, we exit the loop.</p>

<p>Note that the condition is evaluated exactly once in each iteration of the <code>while</code> loop, and one additional time before we exit the loop (in which case it is the first and only time it is evaluated to <code>false</code>). Hence, if our <code>while</code> loop has <strong>n</strong> iterations, the condition is evaluated <strong>n</strong> times to <code>true</code> and <strong>1</strong> time to <code>false</code>.</p>

<p>Sometimes rather than doing something for a known duration or for a certain number of things, we want to execute code as long as some statement is true. We can do this using a while loop.</p>

<p>Reminder -- this is the structure of a for loop:</p>

<pre><code class="language-java">for(initialization; condition; increment){ loop body}</code></pre>

<p>a while loop is structured instead as this:</p>

<pre><code class="language-java">initialization

while(condition){ loop body (possibly with increment}</code></pre>

<p>This means that any while loop can be made into a for loop and vice versa but depending on what the goal of the program is, one is likely preferred.</p>

<p>For example, if you are iterating through an array, a for loop is ideal because you want to iterate through the array.</p>

<p>If you want to do something until the user gives the correct answer, you can use a while loop checking for their answer being incorrect and then exiting once they give the correct answer.<code>while</code> loops are useful when we want to execute a few lines of code as long as some condition is true. This implies that for different inputs  the <code>while</code> loop may run a different number of iterations.</p>

<p>One specific case of a while loop is simply while (true) which will loop forever and just continue repeating the code block forever until it either returns something, breaks, or the program crashes. This should be used with care as if you have no way of exiting the while loop, it will continue forever, never reaching any proceeding code.</p>