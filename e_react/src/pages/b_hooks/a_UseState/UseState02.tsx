import React, { useState } from "react";
import { StringLiteral } from "typescript";

//! useState
// : "컴포넌트 내에서" 데이터에 대한 상태 관리

// - 리액트의 이벤트 핸들러와 함께 사용
// >> UI에서 발생하는 이벤트에 반응하여 상태를 변화

//! 여러 개의 입력 상태 관리
// >> 스프레드 연산자, 비구조화 할당
const fruits = ["사과", "바나나", "망고"];
const example = [...fruits]; // fruits 배열의 요소를 가져와서 새로운 참조값 배열에 넣어줌

const person = {
  name: "이승아",
  age: 50,
};

const person2 = { ...person, name: "이도경" }; // person의 요소를 가져와서 새로운 요소(person2)에 넣어줌 >> 기존에 있던 name 속성이 '이도경'으로 변경 (속성 2개 그대로)

//! 리액트 상태에서 객체를 변경할 때
const book = {
  title: "안녕",
  author: "이승아",
};

book.title = "hello"; // 리액트에서 상태 변화 인지 X
// >> setBook({ ...book, title: 'hello' });
//    : 상태 설정 함수를 사용 + 새로운 참조값에 데이터를 담아 전달

interface ILogin { 
  id: string;
  password: string;
}

export default function UseState02() {
  //# 훅 정의
  const [inputValue, setInputValue] = useState<string>(""); // 초기값: 빈 문자열

  // const [id, setId] = useState<string>("");
  // const [password, setPassword] = useState<string>(""); // id, password를 각각의 변수로 관리했기 때문에 밑에 value값 id, password로 인식 가능
  const [login, setLogin] = useState({
    id: "",
    password: "",
  });
  // 하나로 관리, 해당 형태는 login.id, login.password로 명시해야함

  // >> 따라서 구조분해할당을 해주어 value값을 id, password로 각각 사용할 수 있게 함
  const { id, password } = login;

  //# 이벤트 핸들러 정의
  // : Input 창에 Change(변화)가 일어나면 처리할(handle) 로직
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // 리액트에 있는 어떤 이벤트를 실행할건지 (onClick이면 ClickEvent)
    // let inputText = e.target.value;
    // setInputValue(inputText);
    setInputValue(e.target.value); // 위 두개 합친 것
  };

  const handleResetClick = () => {
    setInputValue("");
  };

  //# == 여러 개의 입력 값을 관리하는 핸들러 == //
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 매개변수로 전달받는 e 이벤트 객체의 target(요소) 안에는
    // , 요소에 명시되어있는 속성의 값에 접근 가능

    // - 아이디와 비밀번호의 input 창을 변경할 수 있는 핸들러
    // e.target >> 이벤트의 요소를 가져옴

    // {...login, 이벤트가발생한요소명: 이벤트가 발생한 요소의 value값}
    // { ...login, id: '안녕' }
    const { name, value } = e.target;
    setLogin({
      ...login, // id와 password 속성 모두 가지는 login 객체
      // name 키를 가진 값을 value로 설정 (해당 변경된 필드의 값만을 업데이트)
      [name]: value, // id: 'hello'
    });
  };

  //# 입력값을 초기화하는 함수
  const handleResetLogin = () => {
    setLogin({
      id: "",
      password: "",
    });
  };

  //# 폼 제출 함수 (데이터 전송)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼의 기본 제출 동작 방지

    console.log("폼 데이터가 제출되었습니다: ", login);

    // 데이터에 대한 활용(제출, 사용) 후에는 데이터에 대한 초기화가 필수! (새로고침됨) >> 기본 동작에 대한 방지가 필요
    setLogin({
      id: "",
      password: "",
    });
  };

  return (
    <div>
      <p style={{ color: "blue" }}>useState 이벤트 핸들러 같이 사용하기</p>

      {/*
      input의 텍스트를 p 태그의 내용으로 전달하는 이벤트 설정
      */}
      <input type="text" value={inputValue} onChange={handleInputChange} />

      {/*
      >> onChange 이벤트
        : 사용자가 요소에 변화를 일으킬 때마다 발생하는 이벤트
        EX) input, select, textarea 등의 요소에 적용  

      <select onChange={handleInputChange}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      */}

      <button onClick={handleResetClick}>초기화 버튼</button>
      <p>Input Value: {inputValue}</p>

      <hr />
      <h5>여러 개의 입력 상태 관리</h5>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          name="id" // 객체의 속성에 접근할 때 활용할 태그의 이름
          placeholder="아이디"
          value={id}
          onChange={handleLoginChange}
        />
        <p>아이디: {id}</p>

        <input
          type="text"
          name="password" // 객체의 속성에 접근할 때 활용할 태그의 이름
          placeholder="비밀번호"
          value={password}
          onChange={handleLoginChange}
        />
        <p>비밀번호: {password}</p>

        <button type="button" onClick={handleResetLogin}>
          초기화
        </button>
        <button type="submit">전송</button>
      </form>
    </div>
  );
}