# Nested Objects


---

<!-- step 4649911 | type: text -->

<p>When we create objects to represent things and relationships between things in real-life, it may become helpful for these objects to have references to other objects.</p>

<p>For example, let’s say we have a <code>Flight</code> class and a <code>Passenger</code> class:</p>

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
}</code></pre>

<p>Both of these classes have fields that represent attributes of flights and passengers in the real world, and most of these attributes can be represented by types built into Java, like <code>int</code> and <code>String</code>. But if we want to create a field representing an attribute that itself has multiple attributes, we can’t really do that with just the built-in types. Sure, we could break it down into multiple fields; in the example above we could also have defined <code>int upcomingFlightNo</code> and <code>String upcomingFlightAirline</code> as fields of <code>Passenger</code>. However, in a more complicated set of classes, taking this approach might leave us with a really long list of fields that’s difficult to work with.</p>

<p>Instead, we can take advantage of the fact that the <code>Flight</code> class exists and has already defined what fields a <code>Flight</code> is supposed to have. We can define a field in <code>Passenger</code> of type <code>Flight</code> that represents this passenger’s upcoming flight. This field will then store a reference to a <code>Flight</code> object.<br>
 </p>