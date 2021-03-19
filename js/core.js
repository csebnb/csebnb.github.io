let network;
let contract_address;
let connection;
let mainAccount;
let interval;
let interval2;
let Accounttype = "0";
let abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"stakeholders","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"stakeLists","outputs":[{"name":"stakeId","type":"uint40"},{"name":"stakedSuns","type":"uint72"},{"name":"stakeShares","type":"uint72"},{"name":"lockedDay","type":"uint16"},{"name":"stakedDays","type":"uint16"},{"name":"unlockedDay","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"memberAddr","type":"address"},{"name":"enterDay","type":"uint256"},{"name":"entryIndex","type":"uint256"}],"name":"xfLobbyEntry","outputs":[{"name":"rawAmount","type":"uint256"},{"name":"referrerAddr","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"stakerAddr","type":"address"}],"name":"stakeCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"stakeIndex","type":"uint256"},{"name":"stakeIdParam","type":"uint40"}],"name":"stakeEnd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"allocatedSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"xfLobbyMembers","outputs":[{"name":"headIndex","type":"uint40"},{"name":"tailIndex","type":"uint40"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"memberAddr","type":"address"}],"name":"xfLobbyPendingDays","outputs":[{"name":"words","type":"uint256[2]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newStakedSuns","type":"uint256"},{"name":"newStakedDays","type":"uint256"}],"name":"stakeStart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"stakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"stakerAddr","type":"address"},{"name":"stakeIndex","type":"uint256"},{"name":"stakeIdParam","type":"uint40"}],"name":"stakeGoodAccounting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"beginDay","type":"uint256"},{"name":"endDay","type":"uint256"}],"name":"dailyDataRange","outputs":[{"name":"_dayStakeSharesTotal","type":"uint256[]"},{"name":"_dayPayoutTotal","type":"uint256[]"},{"name":"_dayDividends","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jackPotValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalStakers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"xfLobby","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beforeDay","type":"uint256"}],"name":"dailyDataUpdate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dailyData","outputs":[{"name":"dayPayoutTotal","type":"uint72"},{"name":"dayDividends","type":"uint256"},{"name":"dayStakeSharesTotal","type":"uint72"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"latestStakeId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"globals","outputs":[{"name":"lockedSunsTotal","type":"uint72"},{"name":"nextStakeSharesTotal","type":"uint72"},{"name":"shareRate","type":"uint40"},{"name":"stakePenaltyTotal","type":"uint72"},{"name":"dailyDataCount","type":"uint16"},{"name":"stakeSharesTotal","type":"uint72"},{"name":"latestStakeId","type":"uint40"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sendMultiEth","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"enterDay","type":"uint256"},{"name":"count","type":"uint256"}],"name":"xfLobbyExit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"referrerAddr","type":"address"}],"name":"xfLobbyEnter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_Staker","type":"address"}],"name":"totalStakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"xfFlush","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"isStakeholder","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"globalInfo","outputs":[{"name":"","type":"uint256[10]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"beginDay","type":"uint256"},{"name":"endDay","type":"uint256"}],"name":"xfLobbyRange","outputs":[{"name":"list","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"stakers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"enterDay","type":"uint256"},{"indexed":true,"name":"entryIndex","type":"uint256"},{"indexed":true,"name":"rawAmount","type":"uint256"}],"name":"XfLobbyEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"enterDay","type":"uint256"},{"indexed":true,"name":"entryIndex","type":"uint256"},{"indexed":true,"name":"xfAmount","type":"uint256"},{"indexed":true,"name":"referrerAddr","type":"address"}],"name":"XfLobbyExit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"updaterAddr","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"beginDay","type":"uint256"},{"indexed":false,"name":"endDay","type":"uint256"}],"name":"DailyDataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stakeId","type":"uint40"},{"indexed":true,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"stakedSuns","type":"uint256"},{"indexed":false,"name":"stakeShares","type":"uint256"},{"indexed":false,"name":"stakedDays","type":"uint256"}],"name":"StakeStart","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stakeId","type":"uint40"},{"indexed":true,"name":"stakerAddr","type":"address"},{"indexed":true,"name":"senderAddr","type":"address"},{"indexed":false,"name":"stakedSuns","type":"uint256"},{"indexed":false,"name":"stakeShares","type":"uint256"},{"indexed":false,"name":"payout","type":"uint256"},{"indexed":false,"name":"penalty","type":"uint256"}],"name":"StakeGoodAccounting","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stakeId","type":"uint40"},{"indexed":false,"name":"prevUnlocked","type":"uint40"},{"indexed":true,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"lockedDay","type":"uint256"},{"indexed":false,"name":"servedDays","type":"uint256"},{"indexed":false,"name":"stakedSuns","type":"uint256"},{"indexed":false,"name":"stakeShares","type":"uint256"},{"indexed":false,"name":"dividends","type":"uint256"},{"indexed":false,"name":"payout","type":"uint256"},{"indexed":false,"name":"penalty","type":"uint256"},{"indexed":false,"name":"stakeReturn","type":"uint256"}],"name":"StakeEnd","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stakeId","type":"uint40"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"newShareRate","type":"uint256"}],"name":"ShareRateChange","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]


const DESI = 100000000
const SUN = 1000000
const zeroAddress = "0x0000000000000000000000000000000000000000"
var mainContract, currentDay
var contractAddress = "0xe176468C70A821e30bC39D49Ef3077c91d891B62"
var telegram = "https://t.me/csexperiment"
var twitter = "https://twitter.com/CseTron"
var trcwebsite = "https://csetron.com/"
var ercwebsite = "https://csebnb.github.io/"


//Update Header
$('.etherscan')[0].innerHTML = '<a href="https://bscscan.com/address/'+contractAddress+'" target="_blank">Contract</a>'
$('.telegram')[0].innerHTML = '<a href="'+telegram+'" target="_blank">Telegram</a>'
$('.trcwebsite')[0].innerHTML = '<a href="'+trcwebsite+'" target="_blank">CSE-Tron</a>'
// $('.ercwebsite')[0].innerHTML = '<a href="'+ercwebsite+'" target="_blank">NUI Gold</a>'
$('.trcmenu')[0].innerHTML = '<a href="'+trcwebsite+'" target="_blank" class="menu"><div class="menu__icon"><i data-feather="server"></i> </div><div class="menu__title"> CSE Tron </div></a>'
$('.telemenu')[0].innerHTML = '<a href="'+telegram+'" target="_blank" class="menu"><div class="menu__icon"><i data-feather="users"></i> </div><div class="menu__title"> Telegram </div></a>'

var csnLogo = '<div class="flex items-center justify-center""><a href="http://csebnb.github.io"><img src="./img/cseb.png" style="display: inline-block;width: 300px; height: 200px;"></div></a>';
var socialMediaSites = '<div class="flex items-center justify-center" style="border: 0;padding: 12px;">' +
'<div class="contact-info social-media"><a href="https://t.me/csexperiment"target="blank" class="fa fa-telegram" style="font-size:25px; color: #f23737; margin-right: 0px;"></a></div>' 
 +
'<div class="contact-info social-media" style="margin-left: 10px;"><a href="https://twitter.com/CseTron" target="blank" class="fa fa-twitter" style="font-size:25px; color: #f23737; margin-right: 0px;"></a></div></div>';

//Footer
$("footer").append(csnLogo + socialMediaSites);

let user = {
    address: void 0,
    balance: void 0,
    referrer: zeroAddress
}


function setUpContracts() {
    mainContract = new web3.eth.Contract(abi, contractAddress)
    if (!mainContract) return void 0

    contractLoaded()
    console.log("Contract Loaded")
	getCurrentDay()

}

window.addEventListener('load', function () {
    // Load WEB3
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        console.log("conn")
        // Or connect to a node
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:5500"));
    }

    window.eth_requestAccounts

    const loginPromise = new Promise((resolve, reject) => {
        if (window.web3) {
            resolve(true)
        } else {
            window.addEventListener('load', () => {
                let tbAcc = setInterval(() => {
                    if (window.tronWeb) resolve(true)
                    clearInterval(tbAcc)
                }, 200)

                setTimeout(() => {
                    clearInterval(tbAcc)
                }, 10000)
            })
        }
    })
        .then(() => {
            console.log("web3 logged in")
            return true
        })
        .catch((err) => {
            console.error('Error while detecting web3', err)
            return false
        })

    loginPromise.then((result) => {
        return new Promise(async (resolve, reject) => {

            web3.eth.getAccounts().then(function (result) {
                user.address = result[0]
                updateHeadAddress()

                setUpContracts()
                if ($('.ref-link')[0]) $('.ref-link')[0].value = ercwebsite+"?ref="+user.address
            })


            setInterval(async () => {
                web3.eth.getAccounts().then(function (result) {
                    if (window.web3 && user.address !== result[0]) location.reload()
                })
            }, 700)
        })
    })
})

function updateHeadAddress() {
    let p1 = user.address.slice(42 - 3)
    let p2 = user.address.slice(42 - 5)

    $('.my-acc-add')[0].innerHTML = user.address.slice(0, 3) + "..." + p2
    $('.my-acc-add')[1].innerHTML = user.address.slice(0, 5) + "..." + p2

}

function contractLoaded() {
    if (!user.address) return

    getUserBalance()
    setInterval(() => {
        getUserBalance()
    }, 1000 * 6)

    getCurrentDay()
    getJackpotBalance()


    let intso = setInterval(() => {
        if (currentDay) {
            clearInterval(intso)

            if (typeof run_Stake === "function") run_Stake()
            if (typeof run_Auction === "function") run_Auction()
            if (typeof run_Dividends === "function") run_Dividends()
        }
    }, 100)
}

function getCurrentDay() {
    mainContract.methods.currentDay().call({
        shouldPollResponse: true
    }).then(res => {
        currentDay = parseInt(res)
    })

    setTimeout(() => {
        getCurrentDay()
    }, 1000 * 60 * 7)
}

function getJackpotBalance() {
    mainContract.methods.jackPotValue().call( {
        shouldPollResponse: true
    }).then(res => {
            var balance = parseInt(res) / 1000000000000000000;
            var balanceTrunc = Math.trunc(balance);
             console.log(balance+" "+"BNB");
             $('.jpb')[0].innerHTML = abbreviate_number(balance, 4) + " BNB"
           });
}

// get balance of user and set it on the header
function getUserBalance() {
    mainContract.methods.balanceOf(user.address).call({
        shouldPollResponse: false
    }).then(res => {
        user.balance = res
        if ($('.your-token-balance-hd')[0]) $('.your-token-balance-hd')[0].innerHTML = "Your CSE balance: " + (user.balance / 100000000).toLocaleString()
    })
}

function abbreviate_number(_num, fixed) {
    let num = parseFloat(_num)
    if (num === null) {
        return null;
    } // terminate early
    if (num === 0) {
        return '0';
    } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power

    return e;
}

function toFixedNoRounding(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

function abbreviate_number_cu1(num) {
    let number = num.replace(/,/g, '')
    const indexDes = number.indexOf(".")
    let lcNm, doSk

    if (indexDes == 1 && number[0] === "0") {
        number = number.slice(0, indexDes + 9)
        lcNm = 8
    } else if (indexDes == 1 && number[0] !== "0") {
        number = number.slice(0, indexDes + 8)
        lcNm = 7
    } else if (indexDes == 2) {
        number = number.slice(0, indexDes + 6)
        lcNm = 5
    } else if (indexDes == 3) {
        number = number.slice(0, indexDes + 4)
        lcNm = 3
    } else if (indexDes > 3) {
        number = abbreviate_number(parseFloat(number), 2)
        doSk = true
    }

    if (doSk) {
        return number
    } else {
        number = (parseFloat(number)).toLocaleString(void 0, {
            minimumFractionDigits: lcNm
        })
        return number
    }
}

function extraDesi(a) {
    if (a.indexOf(".") == -1) return a

    if (a.length - a.indexOf(".") >= 4) {
        return a
    } else if (a.length - a.indexOf(".") == 3) {
        return a + "0"
    } else if (a.length - a.indexOf(".") == 2) {
        return a + "00"
    } else if (a.length - a.indexOf(".") == 1) {
        return a + "000"
    }
}

let int1, tm1, tm2

function displayAlert(type, text, duration) {
    const elm = $(`.alert-tb`)[type - 1]
    if (!elm) return

    clearInterval(int1)
    clearTimeout(tm1)
    clearTimeout(tm2)

    elm.style.display = "block"
    elm.style.opacity = "1"

    $('.alert-inner')[type - 1].innerHTML = text

    tm1 = setTimeout(() => {
        int1 = setInterval(() => {
            elm.style.opacity = parseFloat(elm.style.opacity) - 0.01
        }, 10)
    }, duration || 3000)

    tm2 = setTimeout(() => {
        elm.style.display = "none"
        clearInterval(int1)
    }, duration + 2000 || 5000)
}

function accessCookie(cookieName) {
    let name = cookieName + "=";
    let allCookieArray = document.cookie.split(';');
    for (let i = 0; i < allCookieArray.length; i++) {
        let temp = allCookieArray[i].trim();
        if (temp.indexOf(name) == 0)
            return temp.substring(name.length, temp.length);
    }
    return "";
}

if (accessCookie("ref").length > 0) {
    if (validateAddress(accessCookie("ref"))) user.referrer = accessCookie("ref")
}

function validateAddress(address) {
    if (typeof address !== 'string')
        return false;

    if (address[0] === "0" && address[1] === "x" && address.length == 42)
        return true;

    return false;
}

function createCookie(cookieName, cookieValue, daysToExpire) {
    let date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
}

function checkURLForRef() {
    if (window.location.href.indexOf("ref=") < 0) {
        return "0xeF6ed43EB8Ff15E336D64d1468947cA1046824E6"
    } else {
        const index = window.location.href.indexOf("ref=") + 4
        return window.location.href.slice(index, index + 42)
    }
}

if (checkURLForRef().length > 0) {
    let ref = checkURLForRef();

    createCookie("ref", ref, 10000000);

    if(window.localStorage) {
        localStorage.setItem('referrerAddress', ref);
    }
}

let rTargetTime
getTimer()

function getTimer() {
    let xmlhttp_gu = new XMLHttpRequest();
    xmlhttp_gu.open("POST", "/get-next-round", true);
    xmlhttp_gu.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp_gu.send('address=' + user.address);

    xmlhttp_gu.onreadystatechange = (e) => {
        if (xmlhttp_gu.readyState !== 4 || xmlhttp_gu.status !== 200) return;
        if (xmlhttp_gu.responseText.length < 1) return;

        rTargetTime = xmlhttp_gu.responseText
    }
}

setInterval(() => {
    getTimer()
}, 1000 * 60 * 5)

setInterval(() => {
    rewardTimer()
}, 1000)

function rewardTimer() {
    if (!rTargetTime) return

    var now = new Date().getTime()
    var t = rTargetTime - now
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((t % (1000 * 60)) / 1000)

    if (hours.toString().length == 1) hours = "0" + hours
    if (minutes.toString().length == 1) minutes = "0" + minutes
    if (seconds.toString().length == 1) seconds = "0" + seconds

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.day-end-in')[0].innerHTML = `${hours} : ${minutes} : ${seconds}`

        let p2 = user.address.slice(34 - 3)
        $('.my-acc-add')[0].innerHTML = user.address.slice(0, 3) + ".." + p2
    } else {
        $('.day-end-in')[1].innerHTML = `Day Ends In: ${hours} : ${minutes} : ${seconds}`
    }
}
