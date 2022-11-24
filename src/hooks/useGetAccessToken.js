import { useEffect, useState } from "react";

const useGetAccessToken = (email, registered) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (email) {
      fetch(
        `http://localhost:5000/api/v1/jwt?email=${email}&registered=${registered}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("accessToken", data.token);
            setToken(data.token);
          }
        });
    }
  }, [email, registered]);
  return [token];
};

export default useGetAccessToken;
