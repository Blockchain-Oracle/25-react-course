import React from "react";
import Comment from "./Comment";
import "./comment.css";
export default function NestedComment() {
  const [inputValue, setInputValue] = React.useState("");
  const [comments, setComments] = React.useState([
    {
      id: 1,
      title: "this is first comment",
      children: [
        {
          id: 2,
          title: "this is 2nd children",
          children: [],
        },
        {
          id: 3,
          title: "this is 3rd children",
          children: [],
        },
      ],
    },
  ]);

  function newComment(text) {
    return {
      id: new Date().getTime(),
      title: text,
      children: [],
    };
  }

  const handleNewReply = (updatedComments, currentId, currentReply) => {
    updatedComments.forEach((comments) => {
      if (comments.id === currentId) {
        comments.children.unshift(newComment(currentReply));
      }
    });

    updatedComments.forEach((commentsChildren) => {
      handleNewReply(commentsChildren.children, currentId, currentReply);
    });
  };
  const handleReply = (currentId, currentReply) => {
    // Logic to add reply to comment
    console.log("Reply added:", currentReply, "id ", currentId);
    let cpyComment = [...comments];
    handleNewReply(cpyComment, currentId, currentReply);
    setComments(cpyComment);
  };

  return (
    <div className="nested-comment-container">
      <h1>Nested comment</h1>
      <div className="comment-wrapper">
        <textarea
          rows={5}
          cols={100}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            setComments([newComment(inputValue), ...comments]);
            setInputValue("");
          }}
        >
          Add Comment
        </button>
        <ul>
          {comments.map((comments) => (
            <Comment
              key={comments.id}
              comment={comments}
              handleReply={handleReply}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
