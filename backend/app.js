const express = require("express"); // import의 역할.
const cors = require("cors");
const todoRouter = require("./routes/todo"); //common JS 방식(1,2번줄)

const app = express(); //express를 app이라는 변수로 만듬.

const port = 3010;

// app.use(cors()); 현재 상태는 아무나 들어와서 보라고 열어놓은 상태의 코드
app.use(
  cors({
    origin: "http://localhost:3000",
    Credentials: true,
  }) //origin을 해당 로컬주소 도메인만 요청을 허용하도록 하였고, Credentials으로 쿠키나 HTTP를 허용하도록 설정된 코드를 작성.
);
app.use(express.json()); //json 형식을 읽으라고 명령하는 코드.
app.use("/todo", todoRouter); //todoRouter에 연결하기 위한 코드.

app.get("/", (req, res) => {
  res.send("Hello, My World!!");
}); // 기존적으로 서버가 잘 작동되는지 확인하기 위해 만든 기본경로.

app.listen(port, () => {
  console.log(`Server listening on port: ${port}🦁 `);
}); //3010번 서버가 구동되도록 하는 코드.
