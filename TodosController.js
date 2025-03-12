import { TodoModel } from "./TodoModel";

export function initTodosController(api) {
    api.get("/todos", async (req, res) => {
        try {
            console.log(req.userKey);
            const todos = await TodoModel.find({ userKey: req.userKey });
            res.json(todos);
        } catch (error) {
            res.status(500).json({ error: "Ошибка при получении Todo" });
        }
    });

    // В req.body ожидается { name, description }
    api.post("/todos", async (req, res) => {
        try {
            const todo = new TodoModel({ ...req.body, userKey: req.userKey });
            await todo.save();
            res.status(201).json(todo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    api.get("/todos/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const todo = await TodoModel.findOne({ _id: id, userKey: req.userKey });
            if (!todo) return res.status(404).json({ error: "Todo не найдено" });
            res.json(todo);
        } catch (error) {
            res.status(500).json({ error: "Ошибка при получении todo по id" });
        }
    });

    api.put("/todos/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, status } = req.body;

            const todoUpdated = await TodoModel.findOneAndUpdate(
                { _id: id, userKey: req.userKey },
                { name, description, status, updatedAt: Date.now() },
                { new: true },
            );

            if (!todoUpdated) return res.status(404).json({ error: "Todo не найдено" });
            res.json(todoUpdated);
        } catch (error) {
            res.status(500).json({ error: "Ошибка при обновлении Todo" });
        }
    });

    api.delete("/todos/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const todoDeleted = await TodoModel.findOneAndDelete({ _id: id, userKey: req.userKey });
            if (!todoDeleted) return res.status(404).json({ error: "Todo не найдено" });
            res.json({ message: "Todo удалено" });
        } catch (error) {
            res.status(500).json({ error: "Ошибка при удалении todo" });
        }
    });
}
