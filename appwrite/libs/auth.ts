import toast from "react-hot-toast";
import { account, databases } from "./appwrite";
import { ID, Query } from "appwrite";
import { server } from "@/utils/utils";

export const loginAcc = async (email: string, password: string) => {
  try {
    const result = await account.createEmailSession(email, password);
    const userExist = await databases.listDocuments(
      server.databaseID,
      server.userCollection,
      [Query.equal("email", result.providerUid)]
    );

    console.log(userExist);
    if (userExist.documents.length === 0) {
      return null;
    }

    return result;
  } catch (err: any) {
    console.log(err);
    toast.error(`${err.message}`);
    return null;
  }
};

export const createAcc = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    const result = await account.create(ID.unique(), email, password, name);
    const loggedIn = await loginAcc(email, password);

    const userExist = await databases.listDocuments(
      server.databaseID,
      server.userCollection,
      [Query.equal("email", result.email)]
    );

    if (userExist.documents.length > 0) {
      return;
    } else {
      const createdUser = await createUserDoc(
        result.$id,
        result.name,
        result.email,
        loggedIn?.ip
      );
      console.log(createdUser);
      return createdUser;
    }
  } catch (err: any) {
    console.log(err);
    toast.error(`${err.message}`);
    return null;
  }
};

export async function getUserInfo(id: string) {
  try {
    const user = await databases.getDocument(
      server.databaseID,
      server.userCollection,
      id
    );
    return user;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export async function getSession() {
  try {
    const acc = await account.get();
    const user = await getUserInfo(acc.$id);
    return user;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export const createUserDoc = async (
  id: string,
  name: string,
  email: string,
  ip?: string
) => {
  try {
    const createdUser = await databases.createDocument(
      server.databaseID,
      server.userCollection,
      id,
      {
        name: name,
        email: email,
        ip: [ip],
      }
    );
    console.log(createdUser);

    return createdUser;
  } catch (err: any) {
    console.log(err);
    toast.error(`${err.message}`);
    return null;
  }
};
