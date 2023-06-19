export const server = {
  endPoint: process.env.NEXT_PUBLIC_ENDPOINT || "",
  projectID: process.env.NEXT_PUBLIC_PROJECT || "",
  databaseID: process.env.NEXT_PUBLIC_DATABASE || "",
  tweetsCollection: process.env.NEXT_PUBLIC_TWEETS_COLLECTION || "",
  userCollection: process.env.NEXT_PUBLIC_USERS_COLLECTION || "",
};
