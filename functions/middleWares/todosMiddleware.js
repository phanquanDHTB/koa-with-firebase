import yup from "yup";
import { invalidData } from "../helpers/response.js";

const todoMiddleware = async (ctx, next) => {
    try {
        const todoData = ctx.req.body;
        const schema = yup.object().shape({
            title: yup.string().required(),
            completed: yup.boolean().required(),
        });
        await schema.validate(JSON.parse(todoData));
        await next();
    } catch (e) {
        invalidData();
    }
};

export { todoMiddleware };
