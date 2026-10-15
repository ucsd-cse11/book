# CSE 11 kit

This is the "starter kit" for running programs from the CSE 11 book

https://ucsd-cse11.github.io/book/fa26/

It has these files:

```
Pict.java          the book's picture library – Joe pushes updates here
Example.java       
ExampleTest.java   An example of using JUnit
lib/junit.jar      JUnit 6.1.3
.devcontainer/     Used by Github Codespaces
```

One straightforward way to use this repository is to use the "Use this
template" button on Github, make your own copy, and then use "<> Code" ->
"Codespaces" -> "Create codespace on main"

## Run a program

In the terminal in the Codespace:

```
java Example.java
```

There is no separate compile step: Java compiles `Example.java`, and the
`Pict.java` next to it, as it starts. The program writes `example.png`.
`ImageIO_.show` opens a window on your own computer; a Codespace has no
display, so there it writes `shown-0.png` instead.

Java 25 or newer is expected. You can run on your own computer by installing a
JDK from <https://adoptium.net>, though if you are a student you may want to
seek advice from an instructor or TA beforehand.

## Run the tests

```
javac -d out -cp lib/junit.jar *.java
java -jar lib/junit.jar execute --class-path out --scan-class-path
```

## Where this comes from

This kit is generated from the `kit/` folder of the CSE 11 book's source, one
branch per edition of the book (`fa26` is Fall 2026).
