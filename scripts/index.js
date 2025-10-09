const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb+srv://yuanpatawaran_db_user:nDlSl84y6LQ027MK@cluster0.7nzblws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';  // e.g., mongodb+srv://user:pass@cluster0.abcde.mongodb.net/myDatabase?retryWrites=true&w=majority
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected successfully to MongoDB Atlas');

        const database = client.db('myDatabase');  // Replace with your database name
        const collection = database.collection('myCollection');  // Replace with your collection name

        // Example: Insert a document
        const doc = { name: 'Test User', email: 'test@example.com' };
        const insertResult = await collection.insertOne(doc);
        console.log('Inserted document:', insertResult.insertedId);

        // Example: Query documents
        const queryResult = await collection.findOne({ name: 'Test User' });
        console.log('Found document:', queryResult);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
}

main().catch(console.error);