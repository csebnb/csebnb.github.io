const express = require('express')
const app = express()
const mongodb = require('mongodb');
const url = `https://api-ropsten.etherscan.io/api?Method=MethodID&module=logs&action=getLogs&fromBlock=9201040&toBlock=latest&address=0xa76986c19da9BF7050beaFD5c0808245203BaB71&apikey=YYQK4KE4VEHUFR9GUXXDPEUWZ5MB8TS357`;
const { PORT, mongoUri } = require('./config')
const { MongoClient } = require('mongodb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://CSE:3LpBfqLOrk2TyEit@tmt.zsfzj.mongodb.net/TMT?retryWrites=true&w=majority";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html for more details
     */
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);


    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
   async function findOneListingByName(client, nameOfListing) {
    result = await client.db("CSE").collection("cseEvents")
                        .findOne({ message: "OK" });
    if (result) {
        console.log(`Found a listing in the collection with the name 'OK':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name 'OK'`);
    }
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    await findOneListingByName(client, "OK");
};

try {  
mongodb.MongoClient.connect(mongoUri, {
        useNewUrlParser: true,        
        useUnifiedTopology: true
        
    }
    )
    .then(() => console.log('MongoBD database Connected ...'))
    .catch((err) => console.log(err));


    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
        console.log('CSE DATA Connected');
        global.socket = socket;
    });
    app.use(express.json());

app.get(url, (req, res) => res.send('mongoReady'))

app.listen(PORT, () => console.log(`App Listening at http://localhost:${PORT}`))}
finally {}