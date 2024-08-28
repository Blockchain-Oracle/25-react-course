import React from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

/**
 * NextedCommentPractice Component
 *
 * This component demonstrates the usage of the CommentSection component
 * from the react-comments-section library.
 *
 * CommentSection Component Documentation:
 *
 * Handling Null Data:
 * - If commentData prop is null or an empty array:
 *   - The component will render without any existing comments.
 *   - The "No comments" message will be displayed (default or customNoComment).
 *   - Users can still add new comments if they are logged in.
 *
 * Login and Current User Behavior:
 *
 * When currentUser is null:
 * - The comment input form will not be displayed.
 * - Users cannot add new comments or replies.
 * - Existing comments will be visible, but interaction (edit, delete, reply) will be disabled.
 * - Login/signup links will be shown if provided in the logIn prop.
 *
 * Login Links:
 * - If logIn.loginLink and logIn.signupLink are provided:
 *   - "Login" and "Sign Up" buttons will be displayed when the user is not logged in.
 *   - Clicking these buttons will redirect the user to the specified URLs.
 * - If logIn prop is not provided or links are empty:
 *   - No login/signup options will be displayed.
 *   - The component will still function for logged-in users (if currentUser is provided).
 *
 * Editing and Interactions:
 * - When currentUser is null, no editing, deleting, or replying to comments is possible.
 * - Only logged-in users (with a valid currentUser object) can perform these actions.
 * - The currentUser.currentUserId is used to determine if a user can edit or delete their own comments.
 *
 * Optional Props:
 * - advancedInput: Enable rich text editor input (boolean)
 * - customImg: Custom image for input field (string URL)
 * - commentsCount: Custom comment count (number)
 * - inputStyle: Style for input field (object)
 * - formStyle: Style for input form background (object)
 * - submitBtnStyle: Style for submit button (object)
 * - cancelBtnStyle: Style for cancel button (object)
 * - overlayStyle: Style for entire component background (object)
 * - imgStyle: Style for user profile images (object)
 * - hrStyle: Style for horizontal line (object)
 * - titleStyle: Style for "Comments" title (object)
 * - removeEmoji: Remove emoji feature from input (boolean)
 * - customNoComment: Custom component for no comments (function returning JSX)
 *
 * Callback Functions:
 * - onSubmitAction: Called after comment submission (function)
 * - onDeleteAction: Called after comment deletion (function)
 * - onReplyAction: Called after reply submission (function)
 * - onEditAction: Called after comment edit (function)
 * - currentData: Access current comment data after any action (function)
 *
 * Note: Remember to handle authentication in your application and update the currentUser prop
 * accordingly to enable or disable user interactions with the comment section.
 */

const NextedCommentPractice = () => {
  const data = [
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      replies: [],
    },
  ];

  return (
    <CommentSection
      // Required props
      currentUser={{
        currentUserId: "01a",
        currentUserImg:
          "https://media.licdn.com/dms/image/D4D03AQHQIlRKNkfw1w/profile-displayphoto-shrink_200_200/0/1688729986160?e=1728518400&v=beta&t=I7rZj9Iyo-Vc6JQX3B8XZ4nsTIfZs4157iM_ecQbhR0",
        currentUserProfile:
          "https://www.linkedin.com/in/abubakr-jimoh-b75189276/",
        currentUserFullName: "AJ",
      }}
      logIn={{
        loginLink: "http://localhost:3001/",
        signupLink: "http://localhost:3001/",
      }}
      commentData={data}
    />
  );
};

export default NextedCommentPractice;
