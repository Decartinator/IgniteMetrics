const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb://ignitemetricscosmos:NUaZy1F7dMu4WJzmPzSm9R7IdxzzpWC6SadfonjeXjlE2L6xA4gjLrQOGUYN8yKJimLtySSRWOZMACDbKg0jZA%3D%3D@ignitemetricscosmos.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@ignitemetricscosmos@";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

app.post("/addUser", async (req, res) => {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("users_db");
    const collection = database.collection("names");

    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send("Username and password are required");
      return;
    }

    // Generate a unique shard key value
    const shardKey = generateUniqueShardKey(); // Implement this function to generate a unique shard key
    const newUser = { id: shardKey, username, password };

    console.log("Inserting new user:", newUser);
    const result = await collection.insertOne(newUser);
    console.log("Insert result:", result);

    if (result && result.insertedCount === 1) {
      res.status(201).send(`User added with ID: ${result.insertedId}`);
    } else {
      res
        .status(500)
        .send(`Failed to add user. Insert result: ${JSON.stringify(result)}`);
    }
  } catch (error) {
    console.error("Error occurred while accessing MongoDB:", error);
    res.status(500).send(error.toString());
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
});

// Example function to generate a unique shard key
function generateUniqueShardKey() {
  // Implement a mechanism to generate a unique shard key, e.g., using UUID or another unique identifier
  return new Date().getTime().toString(); // Example: using current timestamp
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
