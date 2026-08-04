import { parseArgs } from "node:util";

function main() {
  try {
    const { positionals } = parseArgs({
      options: {},
      allowPositionals: true,
      strict: true,
    });

    const [command, mainArg, ...otherArgs] = positionals;

    if (!command) {
      console.error("Error: Any command given.");
      console.log("Usage correct: test <command> <argument>");
      process.exit(1);
    }

    switch (command.toLowerCase()) {
      case "add":
        if (!mainArg) {
          console.error("Error: The 'add' command a description.");
          console.log('Example: test add "Buy groceries"');
          process.exit(1);
        }
        
        console.log(`✅ Adding item: "${mainArg}"`);
        
        if (otherArgs.length > 0) {
          console.warn(`Aviso: Extra arguments ignored: ${otherArgs.join(", ")}`);
        }
        break;

      case "update":
        console.log("Updating item...");
        break;

      case "delete":
        if (!mainArg) {
          console.error("Error: Inform the ID or name of the item to delete.");
          process.exit(1);
        }
        console.log(`🗑️  Deleting item: "${mainArg}"`);
        break;

      // case "list":
      //   console.log("📋 List all of items...");
      //   break;

      default:
        console.error(`Error: unknown command'${command}'.`);
        console.log("Valid commands: add, list, remove");
        process.exit(1);
    }

  } catch (error: any) {
    console.error(`Unexpected error: ${error.message}`);
    process.exit(1);
  }
}

main();