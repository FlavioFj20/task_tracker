console.log("Hello from task tracker")

// slice(2) removes the executable and script paths, leaving only your arguments
const rawArguments: string[] = process.argv.slice(2);

console.log("All arguments received:", rawArguments);

// Simple positional parsing example
const firstArgument = rawArguments[0];
const secondArgument = rawArguments[1];

if (firstArgument) {
    console.log(`First argument: ${firstArgument}`);
} else {
    console.log("No arguments provided.");
}