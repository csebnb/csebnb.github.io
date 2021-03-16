// state = 1: == open to enter || state = 2: ready to collect || state = 3: == ended
let lobbies = []

function run_Auction() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        getTodayLobbyMobile()
        getTodayLobby()
		getPastLobbiesMobile()
	}else{
		getTodayLobby()
		getPastLobbies()
	}
}

setInterval(() => {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		getTodayLobbyMobile()
	}else{
		getTodayLobby()
	}

}, 1000 * 20)

var mobileAuctionRendered = 0
setInterval(() => {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
		if(	mobileAuctionRendered == 0){
			mobileAuctionAdjuster()
			getTodayLobbyMobile()
			getPastLobbiesMobile()
		}
}, 1000)

function getTodayLobby() {
	if(currentDay < 1)
		return
    $('.fi-1')[0].innerHTML = "#" + currentDay

    $('.fi-2')[0].innerHTML = abbreviate_number(calcDaysLobbyPayout(currentDay) / DESI, 2)

    let daysTotalUsersEntry = 0
    mainContract.methods.xfLobby(currentDay).call({
        shouldPollResponse: true,
    }).then(res => {
        daysTotalUsersEntry = parseFloat(res) / 10e9
        $(`.fi-4`)[0].innerHTML = ((calcDaysLobbyPayout(currentDay)) / (daysTotalUsersEntry)).toFixed(2)
		if( ( (daysTotalUsersEntry / 1e8) ) < 1)
			$(`.fi-4`)[0].innerHTML = calcDaysLobbyPayout(currentDay) / 1e8                          
    })

    let totalUserEntryETH = 0
    // how many times entered current day's lobby
    mainContract.methods.xfLobbyMembers(currentDay, user.address).call({
        shouldPollResponse: true,
    }).then(res => {
        for (var i = 0; i < res.tailIndex; i++) {
            mainContract.methods.xfLobbyEntry(user.address, currentDay, i).call({
                shouldPollResponse: true,
            }).then(res => {
                totalUserEntryETH += parseFloat(res.rawAmount)
                $('.fi-8')[0].innerHTML = abbreviate_number(totalUserEntryETH / 10e17, 7)
                $('.fi-6')[0].innerHTML = abbreviate_number(((calcDaysLobbyPayout(currentDay) / DESI) * totalUserEntryETH / (daysTotalUsersEntry)), 2)


                let daysTotalUsersEntry2 = 0
                mainContract.xfLobby(currentDay).call({
                    shouldPollResponse: true,
                }).then(res => {
                    daysTotalUsersEntry2 += parseFloat(tronWeb.fromSun(res))
                    $('.fi-7')[0].innerHTML = abbreviate_number(((daysTotalUsersEntry2 * 0.95) * totalUserEntryETH / daysTotalUsersEntry), 2)
                })

            })
        }
    })

    mainContract.methods.xfLobby(currentDay).call({
        shouldPollResponse: true,
    }).then(res => {
        daysTotalUsersEntry = parseFloat(res)
        $(`.fi-10`)[0].innerHTML = abbreviate_number(daysTotalUsersEntry / 10e17, 7)
    })

}

function calcDaysLobbyPayout(day) {
    if (day <= 365) {
        return 25000 * (100000000)
    } else {
        return 25000 * (100000000)
    }
}

let clcD1 = true

function getPastLobbies() {
    $('.holder-list')[0].innerHTML = ""
    for (var i = currentDay; i > 1; i--) {

        let enBtn =
            `
        <div style="">
            <button class="button w-24 shadow-md mr-1 mb-2 bg-gray-200 text-gray-600"
                style="margin: 0;padding: 5px 10px;width: 85%; cursor: auto; float: right; background: #111 !important; color: #f23737 !important;">ENDED</button>
        </div>
        `

        let activeRow = ""
        if (!clcD1) activeRow = "tb-active-row-2"


        $('.holder-list')[0].innerHTML +=
            `
        <div class="box px-4 py-4 mb-3 flex items-center zoom-in ${activeRow}"
            style="cursor: auto; margin-bottom: 2px; color: #005af2; background: #595959;">

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 5%;text-align:center;font-weight: 900; color: #000002;">
                <span class="fi-1-day-${i - 1} inbox__item--highlight">#${i - 1}</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block; width: 14%; text-align:center; font-weight: 900; color: #000002;">
                <span class=fi-2-day-${i - 1} inbox__item--highlight">${abbreviate_number(calcDaysLobbyPayout(i - 1) / DESI, 2)}</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 15.0%;text-align:center;font-weight: 900; color: #000002;">
                <span class="fi-4-day-${i - 1} inbox__item--highlight">--</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 16.0%;text-align:center;font-weight: 900; color: #000002;">
                <span class=fi-5-day-${i - 1} inbox__item--highlight">--</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 15.5%;text-align:center;font-weight: 900; color: #000002;">
                <span class="fi-6-day-${i - 1} inbox__item--highlight" style="padding-right: 0%;">--</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 15.5%;text-align:center;font-weight: 900; color: #000002;">
                <span class="fi-8-day-${i - 1} inbox__item--highlight">--</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 15.5%;text-align:center;font-weight: 900; color: #000002;">
                <span class="fi-10-day-${i - 1} inbox__item--highlight">--</span>
            </div>

            <div class="fi-9-day-${i - 1}" style="display:inline-block;width: 15.5%;">${enBtn}</div>
        </div>
        `

        midlleCaller(i - 1)

        clcD1 = !clcD1
    }
}

let clcA = 1
function midlleCaller(i) {
    clcA ++

    setTimeout(() => {
        getLobbyData(i)
    }, 300 * clcA)
}
function getLobbyData(day) {
    let daysTotalUsersEntry = 0
    mainContract.methods.xfLobby(day).call({
        shouldPollResponse: true,
    }).then(res => {
        console.log((calcDaysLobbyPayout(day) ) / daysTotalUsersEntry)
        
        daysTotalUsersEntry += parseFloat(res) / 10e9
        $(`.fi-4-day-${day}`)[0].innerHTML = ((calcDaysLobbyPayout(day) ) / (daysTotalUsersEntry )).toFixed(2)
		if( ( (daysTotalUsersEntry / 1e8) ) < 1)
			$(`.fi-4-day-${day}`)[0].innerHTML = calcDaysLobbyPayout(day) / 1e8

        $(`.fi-5-day-${day}`)[0].innerHTML = "closed"
        $(`.fi-10-day-${day}`)[0].innerHTML = abbreviate_number(daysTotalUsersEntry / 10e7, 7)
    })

    let totalUserEntryETH = 0
    // how many times entered current day's lobby
    mainContract.methods.xfLobbyMembers(day, user.address).call({
        shouldPollResponse: true,
    }).then(res => {
        for (var i = 0; i < res.tailIndex; i++) {
            mainContract.methods.xfLobbyEntry(user.address, day, i).call({
                shouldPollResponse: true,
            }).then(res => {
                totalUserEntryETH += parseFloat(res.rawAmount)
                $(`.fi-8-day-${day}`)[0].innerHTML = abbreviate_number(totalUserEntryETH / 10e17, 7)
                $(`.fi-6-day-${day}`)[0].innerHTML = abbreviate_number(((calcDaysLobbyPayout(day) / 1e11) * totalUserEntryETH / (daysTotalUsersEntry * 10e6)), 2)


                let daysTotalUsersEntry2 = 0
                mainContract.methods.xfLobby(day).call({
                    shouldPollResponse: true,
                }).then(res => {
                    daysTotalUsersEntry2 += parseFloat(res)

                })

                $(`.fi-9-day-${day}`)[0].innerHTML =
                    `
                <div style="">
                    <button class="button w-24 shadow-md mr-1 mb-2 bg-theme-9 csne-button-white"
                        style="margin: 0;padding: 5px 10px;float: right;width: 85%; float: right;" onClick="collectLobby(${day})">COLLECT</button>
                </div>
                `
            })
        }


    })

}

function collectLobby(day) {
    mainContract.methods.xfLobbyExit(day, 0).send({
        from: user.address,
        shouldPollResponse: true
    }).then(res => {}).catch(err => {
        console.error(err, "er")
    }).finally(res => {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			getPastLobbiesMobile()
		}else 
			getPastLobbies()
    })
}

function enterLobby() {
	if( currentDay < 1 ){
		$('.lobby-button')[0].innerHTML = ""
		$('.lobby-button')[1].innerHTML = ""
		alert("Auction not opened yet!")
		return
	}
	
    $('.btn-auction-enter-load')[0].style.display = "block"
    $('.btn-auction-enter-txt')[0].innerHTML = ""

    let int1 = setInterval(() => {
        if (!$(".modal.show")[0]) {
            clearInterval(int1)
            $('.btn-auction-enter-load')[0].style.display = "none"
            $('.btn-auction-enter-txt')[0].innerHTML = "ENTER"
        }
    }, 300)
}

function enterLobbyFinal() {
    let referrer = user.referrer
    if (user.referrer === zeroAddress) referrer = "0xeF6ed43EB8Ff15E336D64d1468947cA1046824E6"
 
    mainContract.methods.xfLobbyEnter(referrer).send({
        from: user.address,
        shouldPollResponse: true, 
        value: parseInt(parseFloat($('.auction-amount-entry')[0].value) * 10e17)
    }).then(res => {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			getTodayLobbyMobile()
		}else 
			getTodayLobby()
    }).catch(err => {
        console.error(err, "er")
    }).finally(res => {})

    $('.close-modal-a').click()
}


//MOBILE VIEWING CONVERSIONS
function mobileAuctionAdjuster(){
	
	//Mobile Header Adjustments
	for(let i = 0; i < $('.mobile-auction-hide').length; i++){
		$('.mobile-auction-hide')[i].innerHTML = ""
	}
	
	let headers = "Day &nbsp&nbsp&nbsp&nbsp CSE Pool &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  Receive &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Your Entry &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Total Entries &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Status "
	$('.auction-headers')[0].innerHTML = headers
	$('.auction-headers')[0].style.fontSize = "8px"
	$('.auction-headers')[0].style.width = "100vw"
	$('.auction-headers')[0].style.marginLeft = "0px"
	$('.auction-headers')[0].style.textAlign = "left"
	$('.mobile-auction-resize')[0].style.marginLeft = "0px"
	$('.mobile-auction-resize')[0].style.textAlign = "left"
	$('.mobile-auction-resize')[0].style.width = "100vw"

    $('.fi-1')[0].innerHTML = "#" + currentDay //Day
    $('.fi-1')[0].style.width = "5vw"
    $('.fi-2')[0].innerHTML = abbreviate_number(calcDaysLobbyPayout(currentDay) / DESI, 2) //Total CSE Available
    $('.fi-2')[0].style.width = "16vw"
	
	//negate useless mobile info for current day
	$('.fi-4-div')[0].innerHTML = ""
	$('.fi-5-div')[0].innerHTML = ""
	$('.fi-4-div')[0].style.width = "0vw"
	$('.fi-5-div')[0].style.width  = "0vw"
	
	//set mobile widths and px sizes for current day
	$('.fi-1-div')[0].style.width = "5vw"
	$('.fi-1')[0].style.textAlign = "center"
	
	$('.fi-2-div')[0].style.width = "16vw"
	$('.fi-2')[0].style.textAlign = "center"

	$('.fi-6-div')[0].style.width = "16vw"
	$('.fi-6')[0].style.textAlign = "center"

	$('.fi-8-div')[0].style.width = "16vw"
	$('.fi-8')[0].style.textAlign = "center"

	$('.fi-10-div')[0].style.width = "16vw"	
	$('.fi-10')[0].style.textAlign = "center"
	
	mobileAuctionRendered = 1

}

function getTodayLobbyMobile() {
	mobileAuctionAdjuster()
	
    let daysTotalUsersEntry = 0
    mainContract.methods.xfLobby(currentDay).call({
        shouldPollResponse: true,
    }).then(res => {
        daysTotalUsersEntry = parseFloat(res)
        $(`.fi-10`)[0].innerHTML = abbreviate_number(daysTotalUsersEntry / 10e17, 7)
    })
	
}

function getPastLobbiesMobile() {
    $('.holder-list')[0].innerHTML = ""
    for (var i = currentDay; i > 1; i--) {
        let enBtn =
            `
        <div style="">
            <button class="button w-24 shadow-md mr-1 mb-2 bg-gray-200 text-gray-600"
                style="margin: 0;padding: 2px 3px;width: 20vw; cursor: auto; float: center; ">ENDED</button>
        </div>
        `

        let activeRow = ""
        if (!clcD1) activeRow = "tb-active-row-2"


        $('.holder-list')[0].innerHTML +=
            `
        <div class="box px-4 py-4 mb-3 flex items-center zoom-in ${activeRow}"
            style="cursor: auto; margin-bottom: 7px;color: #000002; background: #595959;">

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 5vw;text-align:center;font-weight: 900;color: #000002;">
                <span class="fi-1-day-${i - 1} inbox__item--highlight">#${i - 1}</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block; width: 16vw; text-align:center; font-weight: 900; color: #000002;">
                <span class="fi-2-day-${i - 1} inbox__item--highlight">${abbreviate_number(calcDaysLobbyPayout(i - 1) / DESI, 2)}</span>
            </div>

            <div class="fi-4-div-${i - 1} w-64 sm:w-auto truncate"
                style="display:inline-block;width: 0vw;text-align:center;font-weight: 900;color: #000002;">
                <span class="fi-4-day-${i - 1} inbox__item--highlight">..</span>
            </div>

            <div class="fi-5-div-${i - 1} w-64 sm:w-auto truncate"
                style="display:inline-block;width: 0vw;text-align:center;font-weight: 900;color: #000002;">
                <span class="fi-5-day-${i - 1} inbox__item--highlight">..</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 16vw;text-align:center;font-weight: 900;color: #000002;">
                <span class="fi-6-day-${i - 1} inbox__item--highlight"">..</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 16vw;text-align:center;font-weight: 900;color: #000002;">
                <span class="fi-8-day-${i - 1} inbox__item--highlight"">..</span>
            </div>

            <div class="w-64 sm:w-auto truncate"
                style="display:inline-block;width: 16vw;text-align:center;font-weight: 900;color: #000002;">
                <span class="fi-10-day-${i - 1} inbox__item--highlight"">..</span>
            </div>

            <div class="fi-9-day-${i - 1}" style="display:inline-block;width: 16vw;">${enBtn}</div>
        </div>
        `
		
        midlleCaller(i - 1)

        clcD1 = !clcD1
    }
    for (var i = 0; i < currentDay; i++) {
		$('.fi-4-div-${i}')[0].innerHTML = ""
		$('.fi-5-div-${i}')[0].innerHTML = ""
		$('.fi-4-div-${i}')[0].style.width = "0vw"
		$('.fi-5-div-${i}')[0].style.width = "0vw"
	}
}
