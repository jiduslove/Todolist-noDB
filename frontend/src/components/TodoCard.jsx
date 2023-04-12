import { useState } from "react";

const TodoCard = ({ title }) => {
  const [isDone, setIsDone] = useState(false);

  const onClickToggle = () => {
    setIsDone(!isDone); //Toggle로 기존에 있는 값을 뒤집어주는 역할을 한다.
  };

  return (
    <>
      {isDone ? (
        <li className="flex my-4" onClick={onClickToggle}>
          <div className="relative">
            <div className="border-4 border-green-400 w-8 h-8 rounded-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white bg-pink-400 w-8 h-8 scale-75 rounded-xl"></div>
          </div>
          <div className="text-2xl ml-4">{title}</div>
        </li>
      ) : (
        <li className="flex my-4" onClick={onClickToggle}>
          <div className="border-4 border-green-400 w-8 h-8 rounded-xl"></div>
          <div className="text-2xl ml-4">{title}</div>
        </li>
      )}
    </>
  );
};

export default TodoCard;
