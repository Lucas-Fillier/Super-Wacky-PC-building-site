import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error(
        'Please define the MONGODB_URI environment variable in .env.local'
    );
}

let cached = global._mongoClientPromise;

if (!cached) {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    cached = global._mongoClientPromise = client.connect();
}

export async function connectToDB(dbName = 'super_wacky_db') {
    const client = await cached;
    const db = client.db(dbName);
    return { client, db };
}