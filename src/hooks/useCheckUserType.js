import { useEffect, useState } from "react";

const useCheckUserType = (email) => {
  const [userType, setUserTpye] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    if (email) {
      setIsUserLoading(true);
      fetch(`http://localhost:5000/api/v1/users?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setUserTpye(data?.data?.user?.accountType);
          }
          setIsUserLoading(false);
        });
    }
  }, [email]);
  return [userType, isUserLoading];
};

export default useCheckUserType;
