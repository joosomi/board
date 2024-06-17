import React from "react";

const BoardWrite = () => {
  return (
    <form>
      <h3>글 작성</h3>
      <div>
        <label htmlFor="title">
          <h3>Title:</h3>
        </label>
        <br />
        <input type="text" id="title" name="title" placeholder="글 제목" />
        <br />
        <br />
      </div>
      <div>
        <label htmlFor="content">
          <h3>Contents:</h3>
        </label>
        <br />
        <textarea id="content" name="content" placeholder="글 내용" />
      </div>
    </form>
  );
};

export default BoardWrite;
