import Router from "koa-router";
import { getTodosHandler, postTodosHandler, putTodosHandler, deleteTodosHandler } from "../handlers/todoHandlers.js";
import { todoMiddleware } from "../middleWares/todosMiddleware.js";

const router = new Router({
    prefix: "/api/v1/",
});

router.get("todos", getTodosHandler);
router.post("todo", todoMiddleware, postTodosHandler);
router.put("todos", putTodosHandler);
router.delete("todos", deleteTodosHandler);

export default router;
