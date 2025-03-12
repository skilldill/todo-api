import { initApi } from "./initApi";
import { initTodosController } from "./TodosController";

const api = initApi();

api.get("/healthcheck", (_, res) => {
  res.send({ status: "OK" });
});

initTodosController(api);
