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
          console.warn(`Warning: Extra arguments ignored: ${otherArgs.join(", ")}`);
        }
        break;

      case "update":
        if (otherArgs.length < 1) {
            console.log('Warning: Not enough arguments');
            process.exit(1);
        }
        console.log(`✅ Updating item: "${otherArgs[0]}"`);
        if (otherArgs.length > 1) {
          console.warn(`Warning: Extra arguments ignored: ${otherArgs.slice(1).join(", ")}`);
        }
        break;

      case "delete":
        if (!mainArg) {
          console.error("Error: Inform the ID or name of the item to delete.");
          process.exit(1);
        }
        console.log(`🗑️  Deleting item: "${mainArg}"`);
        break;

      case "list":
        switch(mainArg)
        {
            case "done":
                console.log("📋 List all done items...");
                break;
            case "todo" :
                console.log("📋 List all to do items...");
                break;
            case "in-progress" :
                console.log("📋 List all in-progress items...");
                break;
            default:
                if (!mainArg)
                    console.log("📋 List all of items...");
                else {
                    console.error(`Error: unknown status'${mainArg}'.`);
                    console.log("Valid status: done, todo, in-progress");
                    process.exit(1);
                }
        }
        break;

      case "mark-in-progress":
        console.log(`Marking in progress item '${mainArg}'.`);
        break;
    
      case "mark-done":
        console.log(`Marking as done item '${mainArg}'.`)
        break;
    
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