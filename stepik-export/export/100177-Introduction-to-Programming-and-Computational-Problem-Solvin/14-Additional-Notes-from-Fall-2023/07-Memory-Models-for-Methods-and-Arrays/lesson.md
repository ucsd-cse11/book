# Memory Models for Methods and Arrays


---

<!-- step 4838696 | type: text -->

<p>Let's take a look at what a memory model would look like for methods and arrays.</p>

<pre><code class="language-java">class TestMatrix {
    int[][] transpose(int[][] array) {
        int rows = array.length;
        int cols = array[0].length;
        int[][] result = new int[cols][rows];
        for (int i = 0; i &lt; rows; i++) {
            for (int j = 0; j &lt; cols; j++) {
                result[j][i] = array[i][j];
            }
        }
        return result;
    }
    int[][] matrix = {{1, 2, 3},
                      {4, 5, 6}};
    int[][] transposed = this.transpose(matrix);
}</code></pre>

<p>If we were to run this code with the tester library, we would get the memory model below.</p>

<ul>
	<li>When we initialize <code>matrix</code>, we first create an array of length 2, then we create two arrays of length 3 which contain <code>int</code> values. The addresses of these two length 3 arrays are stored as elements of the length 2 array.</li>
	<li>When we call <code>transpose()</code>, we implicitly (meaning secretly) pass in a reference to the calling object as a hidden parameter called <code>this</code>. In this case, the the calling object is the <code>TestMatrix</code> object.</li>
	<li>Similar to <code>matrix</code>, when we initialize <code>result</code>, we first create an array of length 3, then we create three arrays of length 2 which contain <code>int</code> values. The addresses of these three length 2 arrays are stored as elements of the length 3 array.</li>
	<li>As we iterate through the for loop, the values of <code>i</code> and <code>j</code> change. At the end of the for loop, <code>i = 2</code> and <code>j = 3</code>, since these are the conditions to end the for loops. The memory model of the stack here shows the state of the method stack frame right before it returns.
	<ul>
		<li>When we return from the method call, the method stack frame is actually completely deleted. For the memory model though, we want to draw what it looks like right before it is deleted, just so we have something to show.</li>
	</ul>
	</li>
</ul>

<p><img alt="" height="683" name="Method and array model.png" src="https://ucarecdn.stepik.net/b8a83ebd-f367-4ca7-a278-1a1dcbf8bc98/" width="648"></p>