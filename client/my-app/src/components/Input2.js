import React, { useState } from "react";

const Input2 = () => {
  const [txtValue, setTxtValue] = useState("");

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    tel: "",
  });

  const { name, email, tel } = inputs; //이렇게 해야만 쓸 수 있음

  const onChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    //깊은 복사를 해야함
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  return (
    <div>
      <div>
        <label>Name</label>
        <input type="text" id="name" value={name} onChange={onChange}></input>
      </div>
      <div>
        <label>E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onChange}
        ></input>
      </div>
      <div>
        <label>Phone Number</label>
        <input type="tel" id="tel" value={tel} onChange={onChange}></input>
      </div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Tel: {tel}</p>
    </div>
  );
};

export default Input2;
