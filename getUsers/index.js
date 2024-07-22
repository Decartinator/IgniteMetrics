const { MongoClient } = require("mongodb");

const uri =
  "mongodb://ignitemetricscosmos:NUaZy1F7dMu4WJzmPzSm9R7IdxzzpWC6SadfonjeXjlE2L6xA4gjLrQOGUYN8yKJimLtySSRWOZMACDbKg0jZA%3D%3D@ignitemetricscosmos.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@ignitemetricscosmos@";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async function (context, req) {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("users_db");
    const collection = database.collection("names");

    // Use toArray() method to convert the cursor to an array of documents
    const names = await collection.find().toArray();
    console.log("Fetched names from database:", names);

    if (!names || names.length === 0) {
      context.res = {
        status: 404,
        body: "Names not found",
      };
    } else {
      context.res = {
        status: 200,
        body: names,
      };
    }
  } catch (error) {
    console.error("Error occurred while accessing MongoDB:", error);
    context.res = {
      status: 500,
      body: "Internal server error",
    };
  } finally {
    try {
      await client.close();
      console.log("MongoDB connection closed");
    } catch (closeError) {
      console.error(
        "Error occurred while closing MongoDB connection:",
        closeError
      );
    }
  }
};
