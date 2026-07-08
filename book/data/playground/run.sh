cd $2
javac -cp /usr/local/bin/tester.jar $1.java && java -classpath /usr/local/bin/tester.jar:. tester.Main $1
cd
