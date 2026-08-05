import fs from 'fs'

const DB_PATH = new URL('../bd.json', import.meta.url).pathname

interface Task {
    id: number;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const DEFAULT_DB = {
    "tasks": []
};

export function getDB() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 4));
        return DEFAULT_DB;
    }

    const db = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(db);
}

export const saveDB = (db: object) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 4));
    return db;
}

export const insertDB = (note: Task) => {
    const db = getDB();
    db.tasks.push(note);
    saveDB(db);
    return note;
}