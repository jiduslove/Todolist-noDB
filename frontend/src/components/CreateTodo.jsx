import axios from "axios";
import { useState } from "react";

const CreateToDo = ({ getToDoList }) => {
  const [title, setTitle] = useState("");

  const onSubmitCreateToDo = async (e) => {
    try {
      e.preventDefault();

      if (!title) {
        alert("타이틀을 입력해주세요!");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo`,
        {
          title,
          desc: `${title} 블체스 끝까지 해내자`,
        }
      );

      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다.");
        return;
      }

      getToDoList();
      setTitle(""); //기존에 투구생성창에 입력되어있던 내용을 입력하고 나면 사라져야하는데 사라지지 않을때
      // setTitle("");에 ()안에 빈값을 넣어서 빈값으로 업데이트가 되도록 설정.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex mt-2" onSubmit={onSubmitCreateToDo}>
      <input
        className="grow border-2 border-green-200 rounded-lg focus:outline-yellow-400 px-2 py-1 text-lg"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="ml-4 px-2 py-1 bg-green-200 hover:bg-yellow-400 rounded-lg text-gray-50"
        type="submit"
        value="새 투두 생성"
      />
    </form>
  );
};

export default CreateToDo;
