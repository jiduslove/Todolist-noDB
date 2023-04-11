const express = require("express"); // import의 역할.
const todoRouter = require("./routes/todo"); //common JS 방식(1,2번줄)

const app = express(); //express를 app이라는 변수로 만듬.

const port = 3010;

app.use(express.json()); //json 형식을 읽으라고 명령하는 코드.
app.use("/todo", todoRouter); //todoRouter에 연결하기 위한 코드.

app.get("/", (req, res) => {
  res.send("Hello, My World!!");
}); // 기존적으로 서버가 잘 작동되는지 확인하기 위해 만듬.

app.listen(port, () => {
  console.log(`Server listening on port: ${port}🦁 `);
}); //3010번 서버가 구동되도록 하는 코드.
