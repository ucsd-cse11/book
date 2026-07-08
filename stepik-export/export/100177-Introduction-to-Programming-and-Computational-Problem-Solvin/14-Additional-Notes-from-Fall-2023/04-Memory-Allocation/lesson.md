# Memory Allocation


---

<!-- step 4649913 | type: text -->

<p>Whenever you define a variable or create an object in a Java program, that data gets stored in parts of a computer’s memory called the <strong>stack </strong>and the <strong>heap</strong>. When we designate some memory for data to be stored in, we say that the memory has been <strong>allocated</strong>. The stack and the heap are both contiguous, meaning that they each exist as one continuous stretch of memory in one place rather than smaller chunks of memory in various places.</p>

<p><em>There are more places where memory can be allocated but for now the stack and the heap are the main ones we’ll be interacting with.</em></p>

<p>When you create objects using the <code>new</code> keyword, these objects are allocated on the heap. Each object has a <strong>memory address</strong> that is used to access the object. Reference variables contain the memory addresses of objects. When you make method calls, a <strong>stack frame</strong> is allocated on the stack to make space for the parameters and local variables defined in the method.</p>

<p>For example, let's say we have these <code>Flight</code> and <code>Passenger</code> classes, along with a <code>FlightTest</code> class that creates some objects.</p>

<pre><code class="language-java">class Flight {
  int flightNo;
  String airline;
  Flight(int flightNo, String airline) {
    this.flightNo = flightNo;
    this.airline = airline;
  }
}
class Passenger {
  String name;
  Flight upcomingFlight;
  Passenger(String name, Flight upcomingFlight) {
    this.name = name;
    this.upcomingFlight = upcomingFlight;
  }
}
class FlightTest {
  Flight united1 = new Flight(2247, "UAL");
  Passenger pax1 = new Passenger("Gerald", united1);
}</code></pre>

<p>If we were to run this code using our tester library, we would find that following are allocated in memory:</p>

<ul>
	<li>a <code>FlightTest</code> object on the heap with <code>united1</code> and <code>pax1</code> fields.</li>
	<li>a <code>Flight</code> object on the heap with <code>flightNo</code> and <code>airline</code> fields.</li>
	<li>a <code>Passenger</code> object on the heap with <code>name</code> and <code>upcomingFlight</code> fields.</li>
</ul>

<p>Note how some fields contain literal values (e.g. <code>flightNo</code>, <code>airline</code>, <code>name</code> which contain integer and String values), while others contain addresses (e.g. <code>upcomingFlight</code>, <code>united1</code>, <code>pax1</code>).</p>

<p><img alt="" height="584" name="Heap diagram (1).svg" src="https://ucarecdn.stepik.net/bdcccafe-4a79-48d2-b7f4-1006eb0f9048/" width="300"></p>

<p><strong>Huh, where's the stack?</strong> This is a memory model of what exists in memory after we've executed all lines of code in <code>FlightTest</code>. But code execution happens step-by-step, so to get the full picture of what happens in memory and how we got to this memory model, we have to follow the execution step-by-step...</p>

---

<!-- step 4649974 | type: text -->

<p>Let's assume that this code exists in some file called <code>FlightTest.java</code>. This means that our tester library will try to make an object from the <code>FlightTest</code> class, which it does, so to begin with we have a single <code>FlightTest</code> object on the heap and nothing on the stack. The fields in this object are immediately initialized to their default value, which for reference variables is null (i.e. the memory address of nowhere).</p>

<p><em>Psst, there is actually something on the stack: it's the <code>main</code> method that the tester library uses to create the <code>FlightTest</code> object, so there's supposed to be a stack frame on the stack for the <code>main</code> method containing a reference to the <code>FlightTest</code> object. But we're not going to worry about what the tester library does and focus on the code we can actually see.</em></p>

<p><em>Psst (again), the code itself exists in a separate part of memory from the stack and heap, but we're not concerned about the details of that here.</em></p>

<p>We'll be using the arrow to the left of the code to indicate what line of code we're executing at this step of the program.</p>

<p><img alt="" height="612" name="frame1 (2).svg" src="https://ucarecdn.stepik.net/9240d797-b9d4-4b56-ace8-1b8d266c48a1/" width="750"></p>

---

<!-- step 4649969 | type: text -->

<p>We move into the next line, where we initialize the <code>Flight</code> object. Remember how the stack contains stack frames allocated by method calls? Remember how the constructor of a class is considered a method and is called when we create an object? So, the expression <code>new Flight(2247, "UAL");</code> does two things:</p>

<ol>
	<li>it creates a <code>Flight</code> object on the heap, with its fields initialized to their default values.</li>
	<li>it creates a stack frame for the <code>Flight</code> constructor on the stack, with the arguments passed into its parameters. The stack frame also contains a reference (<code>this</code>) to the calling object.</li>
</ol>

<p>Note how the arrows have changed on the left. We're drawing it this way to show that we are now executing code in the <code>Flight</code> constructor, while execution in <code>FlightTest</code> is paused until the constructor finishes.</p>

<p><img alt="" height="612" name="frame2 (2).svg" src="https://ucarecdn.stepik.net/0bc3d953-392c-4606-9fb8-e402d627f1bc/" width="750"></p>

<ol>
</ol>

---

<!-- step 4649968 | type: text -->

<p>After we execute the two lines of code in the <code>Flight</code> constructor, the values of the parameters have been assigned to their respective fields.</p>

<p><img alt="" height="612" name="frame3 (1).svg" src="https://ucarecdn.stepik.net/a83d88fa-928c-4c8f-bb86-d977ec508fc0/" width="750"></p>

---

<!-- step 4649971 | type: text -->

<p>Now that we're done executing the code in the constructor, we return to <code>FlightTest</code> to continue executing the line of code we were looking at before. The stack frame for the <code>Flight</code> constructor gets deleted because we're done executing that code, so we don't need to keep its memory around and take up space. After calling the <code>Flight</code> constructor and creating the <code>Flight</code> object on the heap, we assign the memory address of this object to <code>united1</code>, which updates the reference variable in the <code>FlightTest</code> object on the heap.</p>

<p><img alt="" height="612" name="frame4 (1).svg" src="https://ucarecdn.stepik.net/8197eab1-bf64-4f33-8873-b1d3dd94e717/" width="750"></p>

---

<!-- step 4649970 | type: text -->

<p>On the next line, we do mostly the same thing as the previous one, but this time we're calling the <code>Passenger</code> constructor and creating a <code>Passenger</code> object on the heap.</p>

<p><img alt="" height="612" name="frame5 (2).svg" src="https://ucarecdn.stepik.net/679f6436-e912-4ac0-8a16-256c803f3edb/" width="750"></p>

---

<!-- step 4649972 | type: text -->

<p>This is now what memory looks like after we've executed all the code in <code>FlightTest</code>, right before the program ends and everything gets deleted from memory.</p>

<p>To summarize what goes on in memory:</p>

<ul>
	<li>The stack contains stack frames that are created by method calls to store the values of parameters and local variables inside methods. These stack frames are deleted as methods finish execution, so you can imagine that the stack acts as temporary storage.</li>
	<li>The heap contains objects, which in turn contain fields. These objects continue to exist across method calls, so you can imagine that the heap acts as long-term storage.</li>
</ul>

<p><img alt="" height="612" name="frame6 (1).svg" src="https://ucarecdn.stepik.net/048c45df-42dc-4fe6-9417-fd8046e0be2c/" width="750"></p>

---

<!-- step 4649973 | type: text -->

<p>Wait, aren't <code>String</code>s also objects? Why isn't there a <code>String</code> object on the heap? Good questions, me!</p>

<p>In the <code>FlightTest</code> code example, we use a <code>String</code> literal to define the name of the <code>Passenger</code>. A <strong>literal</strong> is some constant value that we use to define variables. Literals include integer values (1, 2, 3), real number values (3.14, 73.011), boolean values (true, false), and <code>String</code> values ("hello", "world"). Literals are immutable, meaning that their value cannot be changed.</p>

<p><code>String</code> literals are stored in another part of memory (separate from the stack and the heap) called the <strong>data</strong> segment. When we initialize a <code>String</code> variable with a <code>String</code> literal, it references a literal that exists in the data segment. If another <code>String</code> variable were to be initialized with the same <code>String</code> literal, this second variable would refer to the same literal in the data segment.</p>

<p>For example, if we were to define these <code>String</code> variables:</p>

<pre><code class="language-java">String a = "hello";
String b = "hello";
String c = new String("hello");</code></pre>

<p><code>a</code> and <code>b</code> would have the same memory address; i.e. <code>a == b</code> (remember that <code>==</code> compares the memory addresses of reference variables) would evaluate to <code>true</code>. However, <code>a</code> and <code>c</code> do not have the same memory address; i.e. <code>a == c</code> would evaluate to <code>false</code>. In memory, <code>c</code> points to a <code>String</code> object on the heap, which in turn points to the <code>"hello"</code> <code>String</code> literal in data.</p>

<p>If we want to compare the actual value of <code>String</code>s, we need to use the <code>.equals()</code> method. For <code>String</code>s, <code>.equals()</code> ignores memory addresses and directly compares the sequences of characters that the two <code>String</code>s have. In this example, <code>a.equals(c)</code> would evaluate to <code>true</code>.</p>