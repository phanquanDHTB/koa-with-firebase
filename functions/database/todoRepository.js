import { db, batch } from "./dbConfig.js";

/**
 * Represents a user object.
 *
 * @typedef {Object} Todo
 * @property {string} title - The username of the user.
 * @property {boolean} completed - The email address of the user.
 */

/**
 *
 * @return {[Todo]}
 */
const getTodos = async () => {
    const todos = await db.get();
    if (todos.empty) {
        return [];
    }
    return todos.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
};

/**
 *
 * @param {{title: string, completed: boolean}} todoData
 * @return {Todo}
 */
const createTodo = async (todoData) => {
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
