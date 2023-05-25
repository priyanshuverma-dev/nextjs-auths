import { getFirestore, doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export default async function addData(
  colllection: string,
  id: string,
  data: any
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
