const dropList = document.querySelectorAll(".country-drop-list select");
fromCurrency = document.querySelector(".from-section select");
toCurrency = document.querySelector(".to-section select");
submitButton = document.querySelector("form button");
var validAmount = document.getElementById('valid-amount');
var exchangeRateValueTxt = document.querySelector(".exchange-dispaly")
var exchangedateTxt = document.querySelector(".exchange-date")
var lastUpdatedTxt = document.querySelector(".last-updated")
var exchangeChangeIcon = document.querySelector(".country-drop-list icon");
var inputAmount = document.querySelector(".currency-amount input");
var fromFlagImg = document.getElementById('fromFlagImg');
var toFlagImg = document.getElementById('toFlagImg');


//dynamic country list using contry-list
for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : ""
        } else if (i == 1) {
            selected = currency_code == "GBP" ? "selected" : ""
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);

        dropList[i].addEventListener("change", e => {
            loadFlag(e.target, i);
        });
    }
}

//function to load flg image in drop down based on country code
function loadFlag(res, dropListId) {
    for (code in country_list) {
        if (code == res.value) {
            //https://restcountries.com/v3.1/alpha/{country code} - api used for the country flag
            const flagUrl = `https://restcountries.com/v3.1/alpha/${country_list[code].toLowerCase()}`
            fetch(flagUrl).then((response) => response.json())
                .then((data) => {
                    if (dropListId == 0) {
                        fromFlagImg.innerHTML = `
                    <img src="${data[0].flags.png}">
                    `;
                    } else {
                        toFlagImg.innerHTML = `
                    <img src="${data[0].flags.png}">
                    `;
                    }
                });
        }
    }
}

//event listner method to get exchange value on load
window.addEventListener("load", () => {
    getExchangeRateValue();
});

//event listner method to prevent from multiple click and get exchange value 
submitButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRateValue();
});

//function to alt the currency code and flag
function exchangeAlt() {
    let tempCurrencyCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrencyCode;
    let tempFlagImg = fromFlagImg.innerHTML;
    fromFlagImg.innerHTML = toFlagImg.innerHTML;
    toFlagImg.innerHTML = tempFlagImg;
    getExchangeRateValue();
}

//validation of entered amount to convert
function validateAmount() {
    let value = inputAmount.value;
    if (value == "" || value <= "0") {
        validAmount.innerHTML = 'Please enter a valid amount';
        return false;
    } else if (value > 10000000) {
        validAmount.innerHTML = 'Amount should be less than or equal 10000000';
        return false;
    } else {
        validAmount.innerHTML = '';
        return true;
    }
}

// calculation of exchange value
function getExchangeRateValue() {
    const fromCurrencyLc = fromCurrency.value.toLowerCase();
    const toCurrencyLc = toCurrency.value.toLowerCase();
    let value = inputAmount.value;
    //http://www.floatrates.com/daily/{currency code}}.json - api used for the currency covertion
    let url = `http://www.floatrates.com/daily/${fromCurrencyLc}.json`;
    fetch(url).then(response => response.json()).then(data => {
        let toCurrencyDet = data[toCurrencyLc];
        let exchangeRate = (toCurrencyDet.rate * value).toFixed(2);;
        exchangeRateValueTxt.innerText = `${value} ${fromCurrency.value} = ${exchangeRate} ${toCurrency.value}`;
        var currentTime = getTimeFormat(new Date());
        var currentDate = getDateFormat(new Date());
        exchangedateTxt.innerHTML = "Calculation Time : " + currentDate + " " + "at" + " " + currentTime;
        var lastRateUpdateTime = getTimeFormat(new Date(toCurrencyDet.date));
        var lastRateUpdateDate = getDateFormat(new Date(toCurrencyDet.date));
        lastUpdatedTxt.innerText = "Date of last exchange rate updated : " + lastRateUpdateDate + " " + "at" + " " + lastRateUpdateTime;
    }).catch(() => {
        exchangeRateValueTxt.innerText = "Something went wrong";
    });
}

//function to format the time in hr:min
function getTimeFormat(d) {
    var time = d.toLocaleTimeString('en-GB', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
    });
    return time;
}

//function to format the daqte in dd/MMM/YYYY
function getDateFormat(d) {
    var date = d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    return date;
}

setTimeout(() =>{
    document.getElementById('splash').classList.toggle('fade');
},20000);