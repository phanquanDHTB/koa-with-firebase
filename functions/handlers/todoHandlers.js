import { getTodos, createTodo, updateTodos, deleteTodos } from "../database/todoRepository.js";
import { serverInternal, success, created } from "../helpers/response.js";

const getTodosHandler = async (ctx) => {
    try {
        const query = ctx.query;
        const todos = await getTodos(query);
        success({ ctx, content: todos });
    } catch (err) {
        serverInternal({ ctx });
    }
};

const postTodoHandler = async (ctx) => {
    try {
        const todoData = ctx.req.body;
        const todo = await createTodo(JSON.parse(todoData));
        created({ ctx, content: todo });
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

export { getTodosHandler, postTodoHandler, putTodosHandler, deleteTodosHandler };
