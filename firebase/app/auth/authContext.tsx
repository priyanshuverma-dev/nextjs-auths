/*
The code begins with the statement "use client", which indicates that the code is intended to run on the client-side.
*/

"use client";

/*
It imports the React library from "react". This library is used for building user interfaces in React applications.
The getAuth function is imported from "firebase/auth". It is used for initializing the authentication service.
Two variables, app and db, are imported from a custom module located in "../firebase/config". These variables are related to the Firebase app and database configuration.
The User model is imported from "@/Models/User". It represents a user object with specific properties and methods.
The doc and getDoc functions are imported from "firebase/firestore". They are used for accessing and retrieving documents from the Firebase Firestore database.
*/

import React from "react";
import { getAuth } from "firebase/auth";
import { app, db } from "../firebase/config";
import User from "@/Models/User";
import { doc, getDoc } from "firebase/firestore";

/*
The code creates a AuthContext using the React.createContext function. This context will hold the user information.
*/

export const AuthContext = React.createContext(
  {} as {
    user: User | null;
  }
);

/*
The useAuthContext function is defined, which allows components to access the AuthContext using React's useContext hook.
*/

export const useAuthContext = () => React.useContext(AuthContext);

/*
The auth variable is assigned the value of getAuth(app), which initializes the authentication service with the provided Firebase app instance.
*/

const auth = getAuth(app);

/*
The AuthContextProvider component is defined. It takes a children prop, which represents the child components to be wrapped within the provider.
*/

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /*
  Inside the AuthContextProvider, two state variables are defined using the React.useState hook: user (initialized as null) and loading (initialized as true).
  */
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  /*
  The React.useEffect hook is used to perform side effects. It runs once, when the component is mounted. It sets up an event listener for changes in the user's authentication state using auth.onAuthStateChanged.
  */

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      /*
    When the authentication state changes, the callback function is executed. If the user parameter is null, it sets the user state to null, sets loading to false, and returns.
    */

      if (user == null) {
        setUser(null);
        setLoading(false);
        return;
      }

      /*
    If the user parameter is not null, it creates a document reference using doc with the db and "users" collection name, along with the user's unique identifier (UID).
    */

      let docRef = doc(db, "users", user!.uid);

      /*
    The getDoc function is called with the document reference. It retrieves the document snapshot and performs further actions using a then callback.
    */

      getDoc(docRef).then((docSnap) => {
        /*
        Inside the then callback, it checks if the document exists using docSnap.exists(). If it exists, it logs the document data to the console and sets the user state by calling User.fromFirestore with the document snapshot.
        */
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setUser(User.fromFirestore(docSnap));
        } else {
          /*
          If the document does not exist, it logs "No such document!" to the console and sets the user state to null.
          */
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          setUser(null);
        }

        /*
        Finally, it sets the loading state to false.
        */

        setLoading(false);
      });
    });
    /*
    The return statement in the useEffect hook defines a cleanup function that unsubscribes the event listener when the component is unmounted.
    */

    return () => unsubscribe();
  }, []);

  /*

  The component returns the AuthContext.Provider component, which wraps the children components. It provides the user state value through the AuthContext and makes it accessible to the nested components.

  Commented out is a conditional rendering statement that displays a loading message when loading is true. When loading is false, the children components are rendered.

  */

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
      {children}
    </AuthContext.Provider>
  );
};
