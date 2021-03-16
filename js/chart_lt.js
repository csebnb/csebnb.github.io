function drawChartLt(days, values) {
    let chartDatLt = {
        labels: days,
        series: [
            values
        ]
    }

    let chartSettingsLt = {
        low: 0,
        showArea: true,
        width: '100%',
        height: '30vh',
        chartPadding: 50,
        labelOffset: 50,
    }

    new Chartist.Line('.ct-chart', chartDatLt, chartSettingsLt);
}

function rnChartLt() {
    let values = [],
        days = [],
        _clcDays = []
    for (var i = 1; i <= currentDay; i++) {
        days.push("Day " + i)
        _clcDays.push(i)
    }

    (function getDC() {
        if (!_clcDays[0]) return

        mainContract.methods.xfLobby(_clcDays[0]).call({
            shouldPollResponse: true,
        }).then(res => {
            values.push(parseFloat(res) / 1000000000000000000)
            _clcDays.splice(0, 1)
            if (_clcDays.length == 0) {
                drawChartLt(days, values)
                setTimeout(() => {
                    $('.ct-line')[0].style.stroke = "#F23737"
                    // $('.ct-area')[0].style.stroke = "#ff1300"

                    let dts = $('.ct-vertical')
                    for (var i = 0 ; i < dts.length ; i++) {
                        if (dts[i].innerHTML !== "0") {
                            dts[i].innerHTML = dts[i].innerHTML
                        }
                    }
                })
            }

            getDC()
        })
    })()
}

let ckInt = setInterval(() => {
    if (currentDay) {
        rnChartLt()
        clearInterval(ckInt)
    }
}, 50)