import { parseArgs } from "node:util";
import { Add, Delete, List, ListByStatus, Mark, Update } from "./tasks.js";

function handleAddCommand(arg: string | undefined, extra: string[] | undefined) {
    if (!arg) {
      console.error("Error: The 'add' command a description.");
      console.log('Example: test add "Buy groceries"');
      process.exit(1);
    }
    
    console.log(`✅ Adding item: "${arg}"`);
    Add(arg);
    if (extra) {
      console.warn(`Warning: Extra arguments ignored: ${extra.join(", ")}`);
    }
}

function handleUpdateCommand(id: number, args: string[]){ 
    if ((!args || args.length < 1)) {
        console.log('Warning: Not enough arguments');
        process.exit(1);
    }
    console.log(`✅ Updating item: "${args[0]}"`);
    Update(id, args[0]);
    if (args.length > 1) {
      console.warn(`Warning: Extra arguments ignored: ${args.slice(1).join(", ")}`);
    }
}

function handleDeleteCommand(id: number, args: string[] | undefined)
{
  if (!id) {
    console.error("Error: Inform the ID or name of the item to delete.");
    process.exit(1);
  }
  console.log(`🗑️  Deleting item: "${id}"`);
  Delete(id);
  if (args && args.length > 0) {
    console.warn(`Warning: Extra arguments ignored: ${args.slice(1).join(", ")}`);
  }
}

function handleMarkCommand(id: number, args: string[] | undefined, status: boolean)
{
  if (!id) {
    console.error("Error: Inform the ID or name of the item to delete.");
    process.exit(1);
  }
  if (status){
      console.log(`Marking item as done '${id}'.`);
      Mark(id, "done");
  }
  else{
      console.log(`Marking in progress item '${id}'.`);
      Mark(id, "in-progress");
  }
  if (args && args.length > 0) {
    console.warn(`Warning: Extra arguments ignored: ${args.slice(1).join(", ")}`);
  }
}

function handleListCommand(arg: string | undefined){
    switch(arg)
    {
        case "done":
            console.log("📋 List all done items...");
            ListByStatus("done");
            break;
        case "todo" :
            console.log("📋 List all to do items...");
            ListByStatus("todo");
            break;
        case "in-progress" :
            console.log("📋 List all in-progress items...");
            ListByStatus("in-progress");
            break;
        default:
            if (!arg){
                console.log("📋 List all of items...");
                List();
            }
            else {
                console.error(`Error: unknown status'${arg}'.`);
                console.log("Valid status: done, todo, in-progress");
                process.exit(1);
            }
    }
}

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
        handleAddCommand(mainArg, otherArgs);
        break;

      case "update":
        handleUpdateCommand(Number(mainArg), otherArgs);
        break;

      case "delete":
        handleDeleteCommand(Number(mainArg), otherArgs);
        break;

      case "list":
        handleListCommand(mainArg);
        break;

      case "mark-in-progress":
        handleMarkCommand(Number(mainArg), otherArgs, false);
        break;
    
      case "mark-done":
        handleMarkCommand(Number(mainArg), otherArgs, true);
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

export default main;