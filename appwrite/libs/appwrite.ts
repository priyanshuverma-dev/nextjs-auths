import { server } from "@/utils/utils";
import { Client, Account, Databases } from "appwrite";

const client = new Client();

client.setEndpoint(server.endPoint).setProject(server.projectID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
