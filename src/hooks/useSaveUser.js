import { useEffect, useState } from "react";

const useSaveUser = (user) => {
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    if (user) {
      fetch("https://mobileyard-server.vercel.app/api/v1/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSavedUser(data.data.user);
          }
        });
    }
  }, [user]);

  return [savedUser];
};

export default useSaveUser;
