// Book stand-in for the subset of JUnit 5's Assertions the book uses; messages match JUnit's.
package org.junit.jupiter.api;

import java.util.Objects;
import org.opentest4j.AssertionFailedError;

public final class Assertions {
    private Assertions() { }

    private static boolean same(double e, double a) {
        return Double.doubleToLongBits(e) == Double.doubleToLongBits(a);
    }

    private static boolean same(float e, float a) {
        return Float.floatToIntBits(e) == Float.floatToIntBits(a);
    }

    private static String describe(Object o, boolean withClass) {
        if (o == null) return "<null>";
        if (!withClass) return "<" + o + ">";
        return o.getClass().getName() + "@" + Integer.toHexString(System.identityHashCode(o)) + "<" + o + ">";
    }

    private static void failNotEqual(Object expected, Object actual, String message) {
        boolean withClass = expected != null && actual != null
            && String.valueOf(expected).equals(String.valueOf(actual));
        String prefix = message == null || message.isBlank() ? "" : message + " ==> ";
        throw new AssertionFailedError(
            prefix + "expected: " + describe(expected, withClass) + " but was: " + describe(actual, withClass),
            expected, actual);
    }

    private static void failNotEqual(Object expected, Object actual) {
        failNotEqual(expected, actual, null);
    }

    public static <V> V fail(String message) {
        throw new AssertionFailedError(message);
    }

    public static void assertTrue(boolean condition) {
        if (!condition) failNotEqual(true, false);
    }

    public static void assertTrue(boolean condition, String message) {
        if (!condition) failNotEqual(true, false, message);
    }

    public static void assertFalse(boolean condition) {
        if (condition) failNotEqual(false, true);
    }

    public static void assertFalse(boolean condition, String message) {
        if (condition) failNotEqual(false, true, message);
    }

    public static void assertEquals(Object expected, Object actual) {
        if (!Objects.equals(expected, actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(Object expected, Object actual, String message) {
        if (!Objects.equals(expected, actual)) failNotEqual(expected, actual, message);
    }

    public static void assertNotEquals(Object unexpected, Object actual) {
        assertNotEquals(unexpected, actual, null);
    }

    public static void assertNotEquals(Object unexpected, Object actual, String message) {
        if (Objects.equals(unexpected, actual)) {
            String prefix = message == null || message.isBlank() ? "" : message + " ==> ";
            throw new AssertionFailedError(prefix + "expected: not equal but was: <" + actual + ">", unexpected, actual);
        }
    }

    public static void assertEquals(byte expected, byte actual) {
        if (!(expected == actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(byte expected, byte actual, String message) {
        if (!(expected == actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(byte expected, Byte actual) {
        if (!(actual != null && (byte) expected == (byte) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(byte expected, Byte actual, String message) {
        if (!(actual != null && (byte) expected == (byte) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Byte expected, byte actual) {
        if (!(expected != null && (byte) expected == (byte) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(Byte expected, byte actual, String message) {
        if (!(expected != null && (byte) expected == (byte) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Byte expected, Byte actual) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(Byte expected, Byte actual, String message) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(short expected, short actual) {
        if (!(expected == actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(short expected, short actual, String message) {
        if (!(expected == actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(short expected, Short actual) {
        if (!(actual != null && (short) expected == (short) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(short expected, Short actual, String message) {
        if (!(actual != null && (short) expected == (short) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Short expected, short actual) {
        if (!(expected != null && (short) expected == (short) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(Short expected, short actual, String message) {
        if (!(expected != null && (short) expected == (short) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Short expected, Short actual) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(Short expected, Short actual, String message) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(int expected, int actual) {
        if (!(expected == actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(int expected, int actual, String message) {
        if (!(expected == actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(int expected, Integer actual) {
        if (!(actual != null && (int) expected == (int) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(int expected, Integer actual, String message) {
        if (!(actual != null && (int) expected == (int) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Integer expected, int actual) {
        if (!(expected != null && (int) expected == (int) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(Integer expected, int actual, String message) {
        if (!(expected != null && (int) expected == (int) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Integer expected, Integer actual) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(Integer expected, Integer actual, String message) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(long expected, long actual) {
        if (!(expected == actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(long expected, long actual, String message) {
        if (!(expected == actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(long expected, Long actual) {
        if (!(actual != null && (long) expected == (long) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(long expected, Long actual, String message) {
        if (!(actual != null && (long) expected == (long) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Long expected, long actual) {
        if (!(expected != null && (long) expected == (long) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(Long expected, long actual, String message) {
        if (!(expected != null && (long) expected == (long) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Long expected, Long actual) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(Long expected, Long actual, String message) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(char expected, char actual) {
        if (!(expected == actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(char expected, char actual, String message) {
        if (!(expected == actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(char expected, Character actual) {
        if (!(actual != null && (char) expected == (char) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(char expected, Character actual, String message) {
        if (!(actual != null && (char) expected == (char) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Character expected, char actual) {
        if (!(expected != null && (char) expected == (char) actual)) failNotEqual(expected, actual);
    }

    public static void assertEquals(Character expected, char actual, String message) {
        if (!(expected != null && (char) expected == (char) actual)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Character expected, Character actual) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(Character expected, Character actual, String message) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(float expected, float actual) {
        if (!(same(expected, actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(float expected, float actual, String message) {
        if (!(same(expected, actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(float expected, Float actual) {
        if (!(actual != null && same((float) expected, (float) actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(float expected, Float actual, String message) {
        if (!(actual != null && same((float) expected, (float) actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Float expected, float actual) {
        if (!(expected != null && same((float) expected, (float) actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(Float expected, float actual, String message) {
        if (!(expected != null && same((float) expected, (float) actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Float expected, Float actual) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(Float expected, Float actual, String message) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(double expected, double actual) {
        if (!(same(expected, actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(double expected, double actual, String message) {
        if (!(same(expected, actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(double expected, Double actual) {
        if (!(actual != null && same((double) expected, (double) actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(double expected, Double actual, String message) {
        if (!(actual != null && same((double) expected, (double) actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Double expected, double actual) {
        if (!(expected != null && same((double) expected, (double) actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(Double expected, double actual, String message) {
        if (!(expected != null && same((double) expected, (double) actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(Double expected, Double actual) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual);
    }

    public static void assertEquals(Double expected, Double actual, String message) {
        if (!(Objects.equals(expected, actual))) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(float expected, float actual, float delta) {
        if (!(same(expected, actual) || Math.abs(expected - actual) <= delta)) failNotEqual(expected, actual);
    }

    public static void assertEquals(float expected, float actual, float delta, String message) {
        if (!(same(expected, actual) || Math.abs(expected - actual) <= delta)) failNotEqual(expected, actual, message);
    }

    public static void assertEquals(double expected, double actual, double delta) {
        if (!(same(expected, actual) || Math.abs(expected - actual) <= delta)) failNotEqual(expected, actual);
    }

    public static void assertEquals(double expected, double actual, double delta, String message) {
        if (!(same(expected, actual) || Math.abs(expected - actual) <= delta)) failNotEqual(expected, actual, message);
    }
}
