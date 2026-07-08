# In Summary — Classes that Share Behavior


---

<!-- step 2334368 | type: text -->

<ul>
	<li>
	<p>When we see multiple classes that implement the same method with the same signature, it’s an opportunity to use an <strong>interface</strong> to define a type that specifies their shared behavior. Then, other contexts can accept objects of any class, as long as the class implements that interface.</p>
	</li>
	<li>
	<p>When we use an interface type for a field or parameter, Java will only let us use the methods specified in the interface on that name.</p>
	</li>
	<li>
	<p>We write <code>implements InterfaceName</code> on each class that we want to use via the interface type.</p>
	</li>
	<li>
	<p>Java uses the class of the underlying object (the class used with new to construct it) in order to decide which method to call.</p>
	</li>
</ul>