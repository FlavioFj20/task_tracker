import { randomUUID } from 'node:crypto';
import { getDB, insertDB, saveDB, type Task } from './bd.js';


//insertDB({id:1, description:'str', status: 'done', createdAt: new Date(), updatedAt: new Date()});

export function Add(task:string) {
    const db = getDB();
    const id = db.tasks.length + 1;
    insertDB({id: id, description: task, status: 'todo', createdAt: new Date(), updatedAt: new Date()});
}

export function Update(id: number, description = "") {
    const db = getDB();

    const newDB = { tasks: []}
    newDB.tasks = db.tasks.map((task: Task) => {
        if (task.id == id)
        {
            task.description = description;
            task.updatedAt = new Date();
        }
        return (task);
    });
    saveDB(newDB);
}

export function Delete(id: number) {
    const db = getDB();

    const newDB = { tasks: []}
    newDB.tasks = db.tasks.filter((task: Task) => task.id !== id);
    newDB.tasks.forEach((task: Task, i = 0) => task.id = i + 1);
    saveDB(newDB);
}

export function List() {
    const db = getDB();

    const newDB = { tasks: []}
    db.tasks.forEach((task:Task) => {
        console.log(task)
    });
}

export function ListByStatus(status:string) {
    const db = getDB();

    const newDB = { tasks: []}
    db.tasks.forEach((task:Task) => {
        if (task.status === status)
            console.log(task)
    });
}

export function Mark(id: number, status: string) {
    const db = getDB();

    const newDB = { tasks: []}
    newDB.tasks = db.tasks.map((task: Task) => {
        if (task.id == id)
        {
            task.status = status;
            task.updatedAt = new Date();
        }
        return (task);
    });
    saveDB(newDB);
}

//const db = getDB();
//console.log(db);