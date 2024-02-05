import { Client, Account, Databases, Storage } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "658e6d7d87b7d77eab8b";

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);

export const databases = new Databases(client);

export const storage = new Storage(client);

export default client;
