import React from "react";

export default function Comment({ comment, handleReply }) {
  const [reply, setReply] = React.useState("");
  const [showReply, setShowReply] = React.useState(false);

  return (
    <li key={comment.id} className="comment-container">
      <div className="comment-title">{comment.title}</div>

      {!showReply ? (
        <button
          className="comment-reply-button"
          onClick={() => {
            setShowReply(true);
          }}
        >
          Add Reply
        </button>
      ) : (
        <div className="reply-container">
          <textarea
            rows={2}
            cols={20}
            className="reply-textarea"
            onChange={(e) => {
              setReply(e.target.value);
            }}
            value={reply}
          />
          <br />
          <div className="reply-btn-container">
            <button
              className="submit-btn"
              onClick={() => {
                handleReply(comment.id, reply);
                setShowReply(false);
                setReply("");
              }}
            >
              Submit
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setShowReply(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {comment?.children?.length > 0 ? (
        <ul>
          {comment.children.map((childComment) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              handleReply={handleReply}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
