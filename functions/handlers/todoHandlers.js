import { getTodos, createTodo, updateTodos, deleteTodos } from "../database/todoRepository.js";
import { serverInternal, success, created } from "../helpers/response.js";

const getTodosHandler = async (ctx) => {
    try {
        const todos = await getTodos();
        success({ ctx, content: todos });
    } catch (err) {
        serverInternal({ ctx });
    }
};

const postTodosHandler = async (ctx) => {
    try {
        const todoData = ctx.req.body;
        await createTodo(JSON.parse(todoData));
        const todos = getTodos();
        created({ ctx, content: todos });
    } catch (err) {
        serverInternal({ ctx });
    }
};

const putTodosHandler = async (ctx) => {
    try {
        const todoIds = ctx.req.body;
        await updateTodos(JSON.parse(todoIds));
        const todos = await getTodos();
        success({ ctx, content: todos });
    } catch (err) {
        serverInternal({ ctx });
    }
};

const deleteTodosHandler = async (ctx) => {
    try {
        const ids = ctx.query.ids.split(",");
        await deleteTodos(ids);
        const todos = await getTodos();
        success({ ctx, content: todos });
    } catch (err) {
        serverInternal({ ctx });
    }
};

export { getTodosHandler, postTodosHandler, putTodosHandler, deleteTodosHandler };
