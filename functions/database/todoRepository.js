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
    if (query?.limit) {
        const todos = await db.limit(query.limit).get();
        if (todos.empty) {
            return [];
        }
        return todos.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
    }
    if (query?.sort) {
        const todos = await db.orderBy("createdAt", query.sort).get();
        if (todos.empty) {
            return [];
        }
        return todos.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
    }
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
