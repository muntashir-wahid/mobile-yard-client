import { useEffect, useState } from "react";

const useCheckUserType = (email) => {
  const [userType, setUserTpye] = useState("");

  useEffect(() => {
    console.log("going to fetch data");
    fetch(`http://localhost:5000/api/v1/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          setUserTpye(data?.data?.user?.accountType);
        }
      });
  }, [email]);
  return [userType];
};

export default useCheckUserType;
