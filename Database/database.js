import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("todo.db");

export const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
       );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        group_id INTEGER,
        is_completed BOOLEAN,
        FOREIGN KEY(group_id) REFERENCES groups(id)
      );`
    );
  });
};

export const getGroups = (callback) => {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM groups", [], (_, { rows: { _array } }) => {
      callback(_array);
    });
  });
};

export const addGroup = (name, created_at, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO groups (name, created_at) VALUES (?, ?)",
      [name, created_at],
      (_, result) => {
        console.log("Group added with ID:", result.insertId); // Log the result
        callback(result.insertId);
      },
      (tx, error) => {
        console.error("Error inserting group:", error); // Log any errors
      }
    );
  });
};
export const getTodosByGroup = (groupId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM todos WHERE group_id = ?",
      [groupId],
      (_, { rows: { _array } }) => {
        callback(_array);
      }
    );
  });
};

export const getTodoWithGroupById = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT todos.*, groups.name AS group_name 
       FROM todos 
       LEFT JOIN groups ON todos.group_id = groups.id
       WHERE todos.id = ?`,
      [id],
      (_, { rows: { _array } }) => {
        callback(_array[0]);
      }
    );
  });
};

export const addTodo = (title, description, groupId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO todos (title, description, group_id, is_completed) VALUES (?, ?, ?, ?)",
      [title, description, groupId, false],
      (_, result) => {
        callback(result.insertId);
      }
    );
  });
};

export const updateTodo = (id, title, description, isCompleted, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE todos SET title = ?, description = ?, is_completed = ? WHERE id = ?",
      [title, description, isCompleted, id],
      (_, result) => {
        callback(result.rowsAffected);
      }
    );
  });
};

export const deleteTodo = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM todos WHERE id = ?", [id], (_, result) => {
      callback(result.rowsAffected);
    });
  });
};
