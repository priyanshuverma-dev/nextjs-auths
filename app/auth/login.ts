import { getAuth, signInWithPopup } from "firebase/auth";
import { app, provider } from "../firebase/config";
import addData from "../firebase/addData";

const auth = getAuth(app);

export default async function signUp() {
  let result = null,
    error = null;
  try {
    result = await signInWithPopup(auth, provider);

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

    await addData("users", result.user.uid, newUser).then(() =>
      console.log("User added to database")
    );

    console.log(newUser);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
