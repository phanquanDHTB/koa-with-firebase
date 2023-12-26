import { db, batch } from "./dbConfig.js";

/**
 * Represents a user object.
 *
 * @typedef {Object} Todo
 * @property {string} title
 * @property {boolean} completed
 */

/**
 *
 * @return {[Todo]}
 */
const getTodos = async (query) => {
    let todosDb = db;
    if (query?.sort) {
        todosDb = db.orderBy("createdAt", query.sort);
    }

    if (query?.limit) {
        todosDb = todosDb.limit(query.limit);
    }

    const todos = await todosDb.get();

    if (todos.empty) {
        return [];
    }

    return todos.docs.map((doc) => {
        const { createdAt, ...field } = doc.data();
        return { ...field, id: doc.id, createdAt: new Date(createdAt._seconds * 1000 + createdAt._nanoseconds / 1e6) };
    });
};

/**
 *
 * @param {{title: string, completed: boolean}} todoData
 * @return {Todo}
 */
const createTodo = async (todoData) => {
    todoData.createdAt = new Date();
    const docRef = await db.add(todoData);
    return { ...todoData, id: docRef.id };
};

/**
 *
 * @param {[number]} ids
 * @return
 */
const updateTodos = async (ids) => {
    await Promise.all(
        ids.map((docId) => {
            return db.doc(docId).update({ completed: true });
        })
    );
};

/**
 *
 * @param {[number]} ids
 * @return
 */
const deleteTodos = async (ids) => {
    await Promise.all(
        ids.map((docId) => {
            return db.doc(docId).delete();
        })
    );
};

export { getTodos, createTodo, updateTodos, deleteTodos };
