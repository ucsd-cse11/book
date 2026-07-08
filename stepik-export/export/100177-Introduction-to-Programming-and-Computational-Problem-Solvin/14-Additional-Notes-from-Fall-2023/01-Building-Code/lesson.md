# Building Code


---

<!-- step 4649909 | type: text -->

<p>So we’ll be using tools to run your Java code within this online textbook, but how would you actually run Java on your computer?</p>

<p>Let’s say you’ve written some code in a file called <code>A.java</code>. This code is human-readable, meaning you can understand all the instructions in the code, and we call this <strong>source code</strong>. But a computer can only understand instructions in binary code. <strong>Binary code</strong> is a neatly compressed version of your code in binary (0s and 1s) that machines are able to execute, but it’s not very human-readable. The process of converting human-readable code to machine-readable code is called <strong>building </strong>or <strong>compiling</strong>, and the program that does this for you is called the Java <strong>compiler</strong>.</p>

<p>To use the Java compiler to build your source code, we have to use the terminal. The <strong>terminal </strong>is a text-based interface that you can use to run different types of commands on your computer. The <code>$</code> symbol in the terminal is the prompt indicating that the terminal is ready for you to type a command into it. One example of a terminal command is the ls command, which we use to see what files there are in the current directory (folder). So typing this command into the terminal and pressing Enter:</p>

<p><code>$ ls</code></p>

<p>would show you that you have the <code>A.java</code> file in the current directory (along with some other files probably). </p>

<p>The command for the Java compiler is the <code>javac</code> command. In order to use this command, we write out the name of the file we want to compile after the command. This is an example of an <strong>argument </strong>to the command. Think of arguments as inputs to the program that the command runs.</p>

<p><code>$ javac A.java</code></p>

<p>After this command runs, you will see that the compiler has created a file called <code>A.class</code>. You can use the ls command to verify that the <code>A.class</code> file is created. This file contains binary code corresponding to the source code in your <code>A.java</code> file. If you try to look into the file you might see a lot of nonsense or your file viewer might refuse to display the contents, because it can’t render the contents in any meaningful way.</p>

<p>In order to run the compiled code, we need to feed the file into the <strong>Java Virtual Machine</strong> (JVM). To do this, you run the following <code>java</code> command in the terminal. Note that we do not give <code>A.class</code> as an argument to the command. We do this because the <code>java</code> command is looking to run the program corresponding to a class name, not the name of the <code>.class</code> file.</p>

<p><code>$ java A</code></p>

<p>Whenever we make changes to the code in <code>A.java</code>, these changes are not automatically updated in <code>A.class</code>, so we must recompile the code with <code>javac</code> again in order to run the program with these changes.</p>

<p>In short, we use the <code>javac</code> command to compile a source code file into a binary code file, then we use the <code>java</code> command to run the binary code.</p>

<p><img alt="" height="290" name="image.png" src="https://ucarecdn.stepik.net/b406bd5c-9340-4440-bff6-85366314e51f/" width="1132"></p>

---

<!-- step 4649920 | type: text -->

<p>But to make things easier for you, we’ve created a script called <code>run</code> that you can use to compile and execute code in one command. The inside of this script looks like this:</p>

<pre><code class="language-bash">#!/bin/bash
if [ $# -eq 0 ]; then
  echo "Please provide the class name. For instance: ./run DesignRecipeExamples";
  exit;
fi;
CLASSNAME=$(echo $1 | cut -f 1 -d '.')
rm *.class &amp;&gt; /dev/null;
javac -cp lib/tester.jar *.java &amp;&amp;
java -Djava.security.manager=disallow -classpath lib/tester.jar:. tester.Main $CLASSNAME
</code></pre>

<p>This is mostly complete nonsense at this point, and we won’t be covering what most of these things actually mean in this textbook. But you can see in the last two lines where we use the <code>javac</code> command to compile code, and then use the <code>java</code> command to run code.</p>

<p>If you have a source code file called <code>A.java</code> that you want to compile and execute with the <code>run</code> script, you can use this command:</p>

<p><code>$ ./run A.java</code></p>

---

<!-- step 4649921 | type: text -->

<h2>Summary</h2>

<ul>
	<li>We can use the <code>javac</code> command to compile source code into binary code.</li>
	<li>We can use the <code>java</code> command to execute binary code.</li>
	<li>Our <code>run</code> script can compile and execute a source code file in one command.</li>
</ul>