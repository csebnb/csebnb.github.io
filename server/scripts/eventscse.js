const Web3 = require('web3'); 
const express = require('express')
const app = express()
const mongodb = require('mongodb');
const url = `http://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0x9506c699846C1f4CB3B7FC559D86fCF9398b4243&apikey=YYQK4KE4VEHUFR9GUXXDPEUWZ5MB8TS357`;
const { PORT, mongoUri } = require('./config')

const INFURA_KEY = "b4010e3fdc4446f08391fa1dd1854de4"; // Insert your own key here :)
const ETHERSCAN_API_KEY = "YYQK4KE4VEHUFR9GUXXDPEUWZ5MB8TS357";
const web3 = new Web3('wss://ropsten.infura.io/ws/v3/'  +  INFURA_KEY);
const CONTRACT_ADDRESS = "0x9506c699846C1f4CB3B7FC559D86fCF9398b4243";
const etherescan_url = `http://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`

async function getContractAbi() {
    const etherescan_response = await client.getPromise(etherescan_url)
    const CONTRACT_ABI = JSON.parse(etherescan_response.data.result);
    
    return CONTRACT_ABI;
}
try{
async function eventQuery(){
const CONTRACT_ABI = getContractAbi();
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
/*    Code to query events here       */    
}
contract = CONTRACT_ADDRESS
eventQuery();
const START_BLOCK = 9232000;
const END_BLOCK = 'latest';
contract.methods.getPastEvents("allEvents",
    {                               
        fromBlock: START_BLOCK,     
        toBlock: END_BLOCK // You can also specify 'latest'          
    })
    require('./csebnb.github.io-master/server/scripts/updateEvents').start()
    require('./csebnb.github.io-master/server/scripts/getDailyData').start()
    require('./csebnb.github.io-master/server/scripts/getDataPoints').start();
    events => console.log(events)  }                            

catch {((err) => console.error(err));}
finally{
    app.listen(PORT, () => console.log(`App Listening at http://localhost:${PORT}/csebnb.github.io-master/`))
}