ORIGINAL_DIR=`pwd`
cd $2
javac -cp $ORIGINAL_DIR/tester.jar:. $1.java && java -classpath $ORIGINAL_DIR/tester.jar:. tester.Main $1
cd
