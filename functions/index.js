import * as functions from "firebase-functions";
import Koa from "koa";
import cors from "@koa/cors";
import routes from "./routes/routes.js";

const app = new Koa();

app.use(cors());
app.use(routes.allowedMethods());
app.use(routes.routes());

export const api = functions.https.onRequest(app.callback());
