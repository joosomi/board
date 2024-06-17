import React from "react";

const User = ({ userData }) => {
  return (
    <tr>
      <td>{userData.name}</td>
      <td>{userData.email}</td>
    </tr>
  );
};

const UserList = () => {
  const users = [
    { email: "user1@gmail.com", name: "hello" },
    { email: "kim@gmail.com", name: "tay" },
    { email: "lee@gmail.com", name: "trav" },
    { email: "swift@gmail.com", name: "and" },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>email</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <User userData={user}></User>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
