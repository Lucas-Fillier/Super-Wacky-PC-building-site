import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDB() {
    if (cachedClient != null && cachedDb != null) {
        return {client: cachedClient, db: cachedDb}
    }

    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@super-wacky-cluster.ymz2op1.mongodb.net/?appName=super-wacky-cluster`;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();

    cachedClient = client;
    cachedDb = cachedClient.db('super_wacky_db');

    return {client: cachedClient, db: cachedDb};
}