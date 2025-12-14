"use client";

import { useEffect } from "react";

const NotificationProvider = ({ children }) => {
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notifications ar enabled.");
      }
    });
  }, []);

  return children;
};

export default NotificationProvider;
