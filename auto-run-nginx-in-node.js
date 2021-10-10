// Runs executable automatically if running in Node.js.
// Allows autoconf tests to pass with -s MODULARIZE=1.
if (typeof window === "undefined") {
  nginx();
}
