import React from "react";

const Message = ({ children, userMessage }) => (
  <div
    className={userMessage ? "user_message" : "foreign_message"}
    style={styles.messageWrapper}
  >
    <div style={styles.message} className="message_content">{children}</div>
  </div>
);

const styles = {
  message: {
    width: "fit-content",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "20px",
    // backgroundColor: "#377BB5",
    // color: "#fff",
    maxWidth: "80%"
  },
  messageWrapper: {
    paddingTop: "5px",
    // textAlign: "-webkit-right"
  }
};

export default Message;
