const express = require("express");
const app = express();
const port = 3000;

// routes

app.get("/users", (req, res) => {
  const users = [
    {
      id: 1,
      name: "Tyler",
    },
    {
      id: 2,
      name: "Fernando",
    },
    {
      id: 3,
      name: "Tiger",
    },
  ];

  res.json(users);
});

//start

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
