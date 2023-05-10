import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    id: "123sd",
    name: "João Küster",
  });
});

app.listen(3000, () =>
  console.log("Server up and running on http://localhost:3000")
);
