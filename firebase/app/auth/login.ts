/*
The code begins by importing two functions, getAuth and signInWithPopup, from the "firebase/auth" module. These functions are used for user authentication with Firebase.

It also imports two variables, app and provider, from a custom module located in "../firebase/config". These variables are related to the Firebase configuration and provider settings.

The addData function is imported from another custom module located in "../firebase/addData". This function is responsible for adding data to the Firebase database.
*/

import { getAuth, signInWithPopup } from "firebase/auth";
import { app, provider } from "../firebase/config";
import addData from "../firebase/addData";

/*
The auth variable is assigned the value of getAuth(app), which initializes the authentication service with the provided Firebase app instance.
*/

const auth = getAuth(app);

/*
The code exports a default asynchronous function called signUp.
*/

export default async function signUp() {
  /*
  Inside the signUp function, two variables, result and error, are initialized with null values. These variables will store the result and error information, respectively.
  */

  let result = null,
    error = null;

  /*
  A try-catch block is used to handle potential errors during the execution of the code.
  */

  try {
    /*
    Inside the try block, the signInWithPopup function is called with the auth and provider parameters. This function initiates the sign-in process using a pop-up window provided by the specified authentication provider.

    The result of the signInWithPopup function call is assigned to the result variable. It contains information about the signed-in user.
    */
    result = await signInWithPopup(auth, provider);
    /*
    A new object, newUser, is created and populated with various properties extracted from the result.user object. These properties include uid, email, displayName, bio, photoURL, emailVerified, phoneNumber, prompts, socials, and prefs.
    */

    const newUser = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      bio: "",
      photoURL: result.user.photoURL,
      emailVerified: result.user.emailVerified,
      phoneNumber: result.user.phoneNumber,
      prompts: [],
      socials: [],
      prefs: [],
    };

    /*
    The addData function is called with the arguments "users", result.user.uid, and newUser. This function adds the newUser object to the Firebase database under the "users" collection using the user's unique identifier (UID) as the document ID. The addData function returns a promise, which is awaited.
    */

    await addData("users", result.user.uid, newUser).then(() =>
      /*
    Once the addData promise is fulfilled, a then callback is executed, which logs the message "User added to database" to the console.
    */

      console.log("User added to database")
    );

    /*
    The newUser object is logged to the console.
    */

    console.log(newUser);

    /*
    If any error occurs during the execution of the code within the try block, it will be caught in the catch block, and the error will be assigned to the error variable.
    */
  } catch (e) {
    error = e;
  }

  /*
  Finally, the function returns an object containing the result and error variables.
  */
  return { result, error };
}
