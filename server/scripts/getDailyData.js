const { CronJob } = require('cron');
const web3 = require('Web3')
const Bottleneck = require('bottleneck');


var Contract = require('web3-eth-contract');
Contract.setProvider('ws://localhost:5500');
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"stakeLists","outputs":[{"name":"stakeId","type":"uint40"},{"name":"stakedSuns","type":"uint72"},{"name":"stakeShares","type":"uint72"},{"name":"lockedDay","type":"uint16"},{"name":"stakedDays","type":"uint16"},{"name":"unlockedDay","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"memberAddr","type":"address"},{"name":"enterDay","type":"uint256"},{"name":"entryIndex","type":"uint256"}],"name":"xfLobbyEntry","outputs":[{"name":"rawAmount","type":"uint256"},{"name":"referrerAddr","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"stakerAddr","type":"address"}],"name":"stakeCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"stakeIndex","type":"uint256"},{"name":"stakeIdParam","type":"uint40"}],"name":"stakeEnd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"allocatedSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"xfLobbyMembers","outputs":[{"name":"headIndex","type":"uint40"},{"name":"tailIndex","type":"uint40"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"memberAddr","type":"address"}],"name":"xfLobbyPendingDays","outputs":[{"name":"words","type":"uint256[2]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newStakedSuns","type":"uint256"},{"name":"newStakedDays","type":"uint256"}],"name":"stakeStart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"currentDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"stakerAddr","type":"address"},{"name":"stakeIndex","type":"uint256"},{"name":"stakeIdParam","type":"uint40"}],"name":"stakeGoodAccounting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"beginDay","type":"uint256"},{"name":"endDay","type":"uint256"}],"name":"dailyDataRange","outputs":[{"name":"_dayStakeSharesTotal","type":"uint256[]"},{"name":"_dayPayoutTotal","type":"uint256[]"},{"name":"_dayDividends","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"xfLobby","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beforeDay","type":"uint256"}],"name":"dailyDataUpdate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dailyData","outputs":[{"name":"dayPayoutTotal","type":"uint72"},{"name":"dayDividends","type":"uint256"},{"name":"dayStakeSharesTotal","type":"uint72"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"globals","outputs":[{"name":"lockedSunsTotal","type":"uint72"},{"name":"nextStakeSharesTotal","type":"uint72"},{"name":"shareRate","type":"uint40"},{"name":"stakePenaltyTotal","type":"uint72"},{"name":"dailyDataCount","type":"uint16"},{"name":"stakeSharesTotal","type":"uint72"},{"name":"latestStakeId","type":"uint40"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"enterDay","type":"uint256"},{"name":"count","type":"uint256"}],"name":"xfLobbyExit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"referrerAddr","type":"address"}],"name":"xfLobbyEnter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"xfFlush","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"globalInfo","outputs":[{"name":"","type":"uint256[10]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"beginDay","type":"uint256"},{"name":"endDay","type":"uint256"}],"name":"xfLobbyRange","outputs":[{"name":"list","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"enterDay","type":"uint256"},{"indexed":true,"name":"entryIndex","type":"uint256"},{"indexed":true,"name":"rawAmount","type":"uint256"}],"name":"XfLobbyEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"enterDay","type":"uint256"},{"indexed":true,"name":"entryIndex","type":"uint256"},{"indexed":true,"name":"xfAmount","type":"uint256"},{"indexed":true,"name":"referrerAddr","type":"address"}],"name":"XfLobbyExit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"updaterAddr","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"beginDay","type":"uint256"},{"indexed":false,"name":"endDay","type":"uint256"}],"name":"DailyDataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stakeId","type":"uint40"},{"indexed":true,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"stakedSuns","type":"uint256"},{"indexed":false,"name":"stakeShares","type":"uint256"},{"indexed":false,"name":"stakedDays","type":"uint256"}],"name":"StakeStart","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stakeId","type":"uint40"},{"indexed":true,"name":"stakerAddr","type":"address"},{"indexed":true,"name":"senderAddr","type":"address"},{"indexed":false,"name":"stakedSuns","type":"uint256"},{"indexed":false,"name":"stakeShares","type":"uint256"},{"indexed":false,"name":"payout","type":"uint256"},{"indexed":false,"name":"penalty","type":"uint256"}],"name":"StakeGoodAccounting","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stakeId","type":"uint40"},{"indexed":false,"name":"prevUnlocked","type":"uint40"},{"indexed":true,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"lockedDay","type":"uint256"},{"indexed":false,"name":"servedDays","type":"uint256"},{"indexed":false,"name":"stakedSuns","type":"uint256"},{"indexed":false,"name":"stakeShares","type":"uint256"},{"indexed":false,"name":"dividends","type":"uint256"},{"indexed":false,"name":"payout","type":"uint256"},{"indexed":false,"name":"penalty","type":"uint256"},{"indexed":false,"name":"stakeReturn","type":"uint256"}],"name":"StakeEnd","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stakeId","type":"uint40"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"newShareRate","type":"uint256"}],"name":"ShareRateChange","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},
{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
const address = "0x9506c699846C1f4CB3B7FC559D86fCF9398b4243";
var contract = new Contract(abi, address);
const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 30 });


const onTick = async () => {
    try {
        
        const Day = require('../models/day');
        
        const res = await contract.methods.currentDay().call();
        console.log("CurrentDayyyy===>", web3.eth(res._hex) * 1000000)
        const currentDay = web3.eth(res._hex) * 1000000;
        let daysData = await Promise.all(
            Array.from(Array(currentDay).keys())
                .reverse()
                .map((i) => {
                    return limiter.schedule(async () => {
                        const res = await contract.eth.dailyData(i).call({
                            shouldPollResponse: false,
                        });

                        const dayPayoutTotal = parseFloat(
                            web3.eth(res.dayPayoutTotal._hex)
                        );
                        const dayDividends = parseFloat(
                            web3.eth(res.dayDividends._hex)
                        );
                        const dayStakeSharesTotal = parseFloat(
                            web3.eth(res.dayStakeSharesTotal._hex)
                        );
                        return {
                            day: i,
                            totalDividends: dayDividends,
                            stakeSharesTotal: dayStakeSharesTotal,
                            payoutTotal: dayPayoutTotal,
                        };
                    });
                })
        );

        daysData = daysData.reverse();
        daysData = daysData.slice(1);
        await Day.deleteMany();
        //socket.emit('newRecords', daysData);
        console.log('all recordsss to insert==>>>', daysData)
        const insertRes = await Day.insertMany(daysData)
        console.log('all recordsss inserted==>>>', insertRes.length)
    } catch (err) {
        console.log('an err occurred==>>>', err);
    }
}

onTick();

const job = new CronJob(
    '*/15 * * * *',
    onTick,
    null,
    false,
    'America/New_York'
);

module.exports = job;
