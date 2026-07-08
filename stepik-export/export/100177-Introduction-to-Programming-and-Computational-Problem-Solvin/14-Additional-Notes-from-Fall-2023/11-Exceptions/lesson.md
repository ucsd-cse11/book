# Exceptions


---

<!-- step 4835560 | type: text -->

<p> There are multiple ways that errors and exceptions can be handled in Java, here are a few.</p>

<p>This first one is a simple <code>IndexOutOfBoundsException</code> which is incredibly common as it is an easy way to make sure we do not attempt accessing an index that we are not supposed to. Throwing this error with a message that we can control also allows us to easier debug later. If we see this error message print, we can go to <code>MyList</code> and we will know this is where the problem occurred. We can also include useful information in our message like what function we were in, possibly what the value of index was when this occurred. There are many options but for now just know that:</p>

<p>1. Throwing a new exception with a message is one way of erroring and it can have a very custom error message.</p>

<pre><code class="language-java">class MyList {

...
    public int set(int index, int element) {
        if (index &lt; 0 || index &gt;= this.elems.length) {
            throw new IndexOutOfBoundsException("Error: Index is out of bounds in MyList!");
        }
        int prevElem = this.elems[index];
        this.elems[index] = element;
        return prevElem;
    }
...
}</code></pre>

<p>The next 2 examples are both with file accessing.</p>

<p>The second example overall shows that we have added <code>throws IOException</code> in the end of the method header in which the error may occur. This means that the function <em>may</em> throw this error but will not necessarily. In this case it will only error if it cannot find the file given in <code>args[0]</code>. This is an easy way to generalize an error within the method and let our program compile without very much work.</p>

<p>2. Shortest way to handle errors by simply stating that a method may throw an error without writing any specific error message.</p>

<pre><code class="language-java">import java.nio.file.*;
import java.io.IOException;
import java.util.List;

class FileExample {
    public static void main(String[] args) throws IOException {

        List&lt;String&gt; lines = Files.readAllLines(Paths.get(args[0]));
        System.out.println(lines);

        for (int lineIndex = lines.size() - 1; lineIndex &gt;= 0; lineIndex--) {
            System.out.println(lines.get(lineIndex));
        }
    }
}</code></pre>

<p>The third way is by using try and catch. The code that we know may cause an error we insert into a try block and after the try block we write a catch. The catch specifies what kind of exception might be caught and then can have it's own executable code, in this case a print statement giving more information about what error has occurred in our program. Be careful though, even if we catch an exception, the program will execute the catch block and continue running after the catch block unless told to exit.</p>

<pre><code class="language-java">import java.nio.file.*;
import java.io.IOException;
import java.util.List;

class FileExampleWithTryCatch {
    public static void main(String[] args) {

        try {
            List&lt;String&gt; lines = Files.readAllLines(Paths.get(args[0]));
        
            System.out.println(lines);

            for (int lineIndex = lines.size() - 1; lineIndex &gt;= 0; lineIndex--) {
                System.out.println(lines.get(lineIndex));
            }
        } catch (IOException e) {
            System.out.println("The File " + args[0] + " is not Found");
        }

        System.out.println("I happen after the try and catch.");
    }
}</code></pre>

<p> For example if we run this code we see the following output</p>

<pre><code class="language-brainfuck">[user@sahara ~]$ java FileExampleWithTryCatch notAFile.txt
The File notAFile.txt is not Found
I happen after the try and catch.</code></pre>

<p>3. try and catch is good at printing specific messages when an exception occurs but will not stop the program on it's own. Has an entire code block to execute when an exception is caught.</p>