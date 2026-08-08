import { randomUUID } from 'node:crypto';
import { getDB, insertDB, saveDB, type Task } from './bd.js';


//insertDB({id:1, description:'str', status: 'done', createdAt: new Date(), updatedAt: new Date()});

export function Add(task:string) {
    const db = getDB();
    let id = 1;
    if (db.tasks.length > 1)
    {
        id = db.tasks.at(-1).id + 1;
    }
    insertDB({id: id, description: task, status: 'todo', createdAt: new Date(), updatedAt: new Date()});
    console.log(`Task added successfully (ID: ${id})`);
}

export function Update(id: number, description = "") {
    const db = getDB();
    let found = false;

    const newDB = { tasks: []}
    newDB.tasks = db.tasks.map((task: Task) => {
        if (task.id == id)
        {
            found = true;
            const old = task.description;
            task.description = description;
            task.updatedAt = new Date();
            console.log(`Task updated successfully (ID: ${id})`);
            console.log(`From '${old}' to => '${description}'`);
        }
        return (task);
    });
    if (!found)
    {
        console.log(`Task with id: ${id} not found`);
        return ;
    }
    saveDB(newDB);
}

export function Delete(id: number) {
    const db = getDB();

    const newDB = { tasks: []}
    newDB.tasks = db.tasks.filter((task: Task) => task.id !== id);
    console.log(`Task deleted successfully (ID: ${id})`);
    saveDB(newDB);
}

export function List() {
    const db = getDB();

    if (db.tasks.length == 0)
    {
        console.log(`There is no task registered in bd`);
        return ;
    }
    db.tasks.forEach((task:Task) => {
        console.log(`Task:\n\tID: ${task.id}`);
        console.log(`\tSTATUS: ${task.status}`);
        console.log(`\tDESCRIPTION: ${task.description}`);
    });
}

export function ListByStatus(status:string) {
    const db = getDB();
    let found = false;

    db.tasks.forEach((task:Task) => {
        if (task.status === status){
            found = true;
            console.log(`Task:\n\tID: ${task.id}`);
            console.log(`\tSTATUS: ${task.status}`);
            console.log(`\tDESCRIPTION: ${task.description}`);
        }
    });
    if (!found)
        console.log(`Tasks with ${status} status not found`);
}

export function ListNotDone(status:string) {
    const db = getDB();
    let found = false;


    const newDB = { tasks: []}
    db.tasks.forEach((task:Task) => {
        if (task.status !== status){
            found = true;
            console.log(`Task:\n\tID: ${task.id}`);
            console.log(`\tSTATUS: ${task.status}`);
            console.log(`\tDESCRIPTION: ${task.description}`);
        }
    });
    if (!found)
        console.log(`Tasks not found`);
}

export function Mark(id: number, status: string) {
    const db = getDB();
    let found = false;

    const newDB = { tasks: []}
    newDB.tasks = db.tasks.map((task: Task) => {
        if (task.id == id)
        {
            found = true;
            task.status = status;
            task.updatedAt = new Date();
            console.log(`Task marked as ${status} successfully (ID: ${id})`);
        }
        return (task);
    });
    if (!found)
    {
        console.log(`Task with id: ${id} not found`);
        return ;
    }
    saveDB(newDB);
}

//const db = getDB();
//console.log(db);