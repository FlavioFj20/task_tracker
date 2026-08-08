# Task Tracker CLI

A simple command-line interface (CLI) to track and manage your tasks and to-do list.

Built as a solution for the [Task Tracker](https://roadmap.sh/projects/task-tracker) project from [roadmap.sh](https://roadmap.sh).

## 📌 About

**Task Tracker CLI** is a lightweight task manager that runs entirely from the terminal. It lets you add, update, delete, and organize tasks by status — all persisted in a local JSON file. No external libraries or frameworks are used for the core logic; only Node.js native modules (`fs`, `node:util`).

## ✨ Features

- **Add** new tasks with a description
- **Update** the description of an existing task
- **Delete** tasks by ID
- **Mark** tasks as `in-progress` or `done`
- **List** all tasks, or filter by status: `todo`, `in-progress`, `done`, `not-done`
- Automatic JSON file creation if it doesn't exist
- Auto-incrementing task IDs
- Timestamps for `createdAt` and `updatedAt`

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Build:** `tsc` (TypeScript compiler)
- **Dev runner:** [tsx](https://github.com/privatenumber/tsx)
- **No external runtime dependencies** — uses only native Node.js modules

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Setup

```bash
# Clone the repository
git clone git@github.com:FlavioFj20/task_tracker.git
cd task_tracker

# Install dependencies
npm install

# Build the project
npm run build

# (Optional) Link globally to use as `task_cli` from anywhere
npm link
```

## 🚀 Usage

You can run the CLI in two ways:

### Development mode (no build needed)

```bash
npm run task -- <command> [arguments]
```

### After building / linking globally

```bash
task_cli <command> [arguments]
```

### Commands

| Command | Usage | Description |
|---|---|---|
| `add` | `add "description"` | Add a new task |
| `update` | `update <id> "new description"` | Update an existing task's description |
| `delete` | `delete <id>` | Delete a task by ID |
| `mark-in-progress` | `mark-in-progress <id>` | Mark a task as in progress |
| `mark-done` | `mark-done <id>` | Mark a task as done |
| `list` | `list` | List all tasks |
| `list` | `list todo` | List tasks with `todo` status |
| `list` | `list in-progress` | List tasks with `in-progress` status |
| `list` | `list done` | List tasks with `done` status |
| `list` | `list not-done` | List tasks that are **not** done |

### Examples

```bash
# Adding a new task
npm run task -- add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating a task
npm run task -- update 1 "Buy groceries and cook dinner"

# Deleting a task
npm run task -- delete 1

# Marking a task as in progress
npm run task -- mark-in-progress 1

# Marking a task as done
npm run task -- mark-done 1

# Listing all tasks
npm run task -- list

# Listing tasks by status
npm run task -- list done
npm run task -- list todo
npm run task -- list in-progress
npm run task -- list not-done
```

## 📁 Project Structure

```
task_tracker/
├── src/
│   ├── index.ts       # Entry point — calls the main command handler
│   ├── commands.ts    # CLI argument parsing and command routing
│   ├── tasks.ts       # Task operations (add, update, delete, list, mark)
│   └── bd.ts          # JSON file read/write and Task interface
├── dist/              # Compiled JavaScript output
├── bd.json            # Task data store (auto-created)
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 Task Properties

Each task stored in `bd.json` has the following properties:

| Property | Type | Description |
|---|---|---|
| `id` | `number` | Unique identifier (auto-incremented) |
| `description` | `string` | Short description of the task |
| `status` | `string` | Current status: `todo`, `in-progress`, or `done` |
| `createdAt` | `Date` | Timestamp of when the task was created |
| `updatedAt` | `Date` | Timestamp of the last update |

## 📄 License

This project is licensed under the **MIT** License. See the [LICENSE](./LICENSE) file for details.
