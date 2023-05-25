"use client";
import React from "react";
import { getAuth } from "firebase/auth";
import { app, db } from "../firebase/config";
import User from "@/Models/User";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = React.createContext(
  {} as {
    user: User | null;
  }
);

export const useAuthContext = () => React.useContext(AuthContext);

const auth = getAuth(app);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user == null) {
        setUser(null);
        setLoading(false);
        return;
      }
      let docRef = doc(db, "users", user!.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setUser(User.fromFirestore(docSnap));
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          setUser(null);
        }
        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {/* {loading ? <div>Loading...</div> : children} */}
      {children}
    </AuthContext.Provider>
  );
};
