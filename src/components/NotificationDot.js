import React from "react";

const NotificationDot = () => (
  <div style={styles.wrapper}>
    <svg width="10" height="10">
      <circle cx="5" cy="5" r="5" fill="#377BB5" />
    </svg>
  </div>
);

const styles = {
  wrapper: {
    float: "right",
    paddingRight: "5px"
  }
}

export default NotificationDot;
