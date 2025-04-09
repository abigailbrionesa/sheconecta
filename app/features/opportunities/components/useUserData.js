import { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useUserData = () => {
  const user = FIREBASE_AUTH.currentUser;
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const userDoc = doc(FIREBASE_DB, "users", user.uid);
        const snap = await getDoc(userDoc);
        if (snap.exists()) {
          const data = snap.data();
          setUserData({ firstName: data.firstName, lastName: data.lastName });
        }
      };
      fetchUser();
    }
  }, [user]);

  return userData;
};

export default useUserData;
