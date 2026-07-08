# Switch Statements


---

<!-- step 4649915 | type: text -->

<p>Suppose we want to write a method to convert a month number into a month name. Suppose also that only the first three months of the year exist (so we don't have to write so much code). That method might look like this:</p>

<pre><code class="language-java">String getMonthName(int num){
  String month = "";
  if(num == 1) {
    month = "Jan";
  } else if(num == 2) {
    month = "Feb";
  } else if(num == 3) {
    month = "Mar";
  } else {
    month = "invalid";
  }
  return month;
}</code></pre>

<p>This will work just fine, but in terms of the written code itself, it's a little repetitive: we have to keep writing out if <code>num</code> is equal to some value in every condition. Programmers love making ways to do things in an easier and cleaner way, and there happens to be an alternative way to implement conditional statements like the one above in Java, called the <strong>switch statement</strong>. This is what <code>getMonthName</code> would look like if we used a switch statement instead:</p>

<pre><code class="language-java">String getMonthName(int num) {
  String month = "";
  switch(num) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    default:
      month = "invalid";
      break;
  }
  return month;
}</code></pre>

<p>Unlike the if statement, which is accepts a <code>boolean</code> value, the switch statement accepts variables of other types (<code>int</code>, <code>double</code>, <code>String</code>, etc). In this case the variable we give to the switch statement is <code>num</code>. Inside the switch statement, we define <code>case</code> labels with values that we want to compare <code>num</code> to. When <code>num</code> matches one of the label values, the program jumps to that label (skipping over all lines before the label), and continuing execution from there. If <code>num</code> matches none of the label values, we jump to the <code>default</code> label.</p>

<p>This is slightly different from an if-else-if statement chain, where as soon as we fulfill the first condition in the chain, we execute the code in the block corresponding to that condition, and then skip over the rest of the chain. In a switch statement, we continue to execute the code after the label we jumped to, even if there’s another <code>case</code> label. If that’s not what we want to happen, we can use <code>break</code> to immediately skip the rest of the switch statement.</p>

<p>There are different situations in which you might want to use switch statements over if statements, or vice versa. In general, switch statements are useful when you want to execute different pieces of code based on what the value of a single variable is. However, switch statements can be difficult to use when you want to execute a piece of code if a value falls within a large range.</p>