const express = require("express");

let todoData = require("../todoData.json");

const router = express.Router();

// 전체 투두리스트 조회.
router.get("/", (req, res) => {
  console.log(todoData);

  res.json(todoData);
});

// 특정 투두리스트 조회.
router.get("/:id", (req, res) => {
  //기존 DB에 있는 todo를 가져오고 DB에 없으면 error 가 뜨도록 만든 코드.
  const { id } = req.params; //params = 전달해 주는 값.

  if (parseInt(id) >= todoData.length) {
    return res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }

  res.json(todoData[parseInt(id)]); // 특정한 값을 얻기 위해서 parseInt(id) 를 추가함.
});

//투두 생성.
router.post("/", (req, res) => {
  //이 코드는 기존 내용에 내가 원하는 내용을 집어넣는 코드.
  const { title, desc } = req.body; //구조분해로 객체를 나눔

  if (!title || !desc) {
    // 둘 중 하나라도 없다는 조건이 만족할 때, 디스크립션이 없을때 결론적으로 둘중 하나라도 없을때의 조건이 성립해야한다.
    return res
      .status(400)
      .json({ error: "타이틀이나 설명 중에 하나의 값은 입력해야 합니다." });
  }

  todoData.push({ title, desc, isDone: false }); //todoData DB에 push를 해주면 DB에 추가가됨.

  res.json(todoData);
});

// 투두 수정.
router.put("/:id", (req, res) => {
  // 이 코드는 특정 저장된 내용을 내가 원하는 내용으로 전체 변경하는 코드.
  const { id } = req.params; //params로 todo를 받음. params는 하나만 받아올 수 있어서 body와는 다르다.
  const { title, desc } = req.body; //json 형식으로 todo를 받아와야 해서 body를 사용.

  if (parseInt(id) >= todoData.length) {
    return res.status(400).json({ erroe: "존재하지 않는 ID입니다." });
  }

  if (!title && !desc) {
    // 둘다 조건을 만족. 타이틀이 없을때 , 디스크립션이 없을때 결론적으로 둘다 없을때의 조건이 성립해야한다.
    return res
      .status(400)
      .json({ error: "타이틀이나 설명 중에 하나의 값은 입력해야 합니다." });
  }

  todoData[parseInt(id)] = {
    title: title ? title : todoData[parseInt(id)].title,
    desc: desc ? desc : todoData[parseInt(id)].desc, // title과 desc에 삼항연산자를 사용함으로서 title이나 desc중 원하는 값만 바꾸고 싶을때 사용한다. 기존에 값이 있으면 그냥 사용하도록 한다.
    isDone: todoData[parseInt(id)].isDone,
  };

  res.json(todoData);
});

router.put("/done/:id", (req, res) => {
  //이 코드는 저장되어 있는 결과값(done)을 바꾸는 코드(업데이트).
  const { id } = req.params; // params 대상이 입력한 값을 표현.

  if (parseInt(id) >= todoData.length) {
    return res.status(400).json({ erroe: "존재하지 않는 ID입니다." });
  }

  todoData[parseInt(id)] = {
    title: todoData[parseInt(id)].title,
    desc: todoData[parseInt(id)].desc,
    isDone: !todoData[parseInt(id)].isDone, // !가 앞에 들어가기 때문에 결과값을 뒤집는다. true,false가 있으면 결과값이 바뀌어서 나온다.
  };

  res.json(todoData);
});

// 투두 삭제.
router.delete("/:id", (req, res) => {
  // 이 코드는 저장되어 있는 내용중 지우고 싶은 내용을 지울 수 있음.
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    return res.status(400).json({ erroe: "존재하지 않는 ID입니다." }); //status(400) text뿐만 아니라 코드의 오류를 알리기 위해 작성됨.
  } //팔스인트가 투두데이타의 길이보다 크거나 같으면 에러를 출력하도록 한다.

  todoData = todoData.filter((v, i) => {
    return parseInt(id) !== i; // parseInt(id) 조회할때 쓰는 아이디 , !== 은 조건이 다른지를 묻고있다. , i는 같지가 않으면 살리고 같으면 삭제한다.
  });

  res.json(todoData);
});

module.exports = router;
