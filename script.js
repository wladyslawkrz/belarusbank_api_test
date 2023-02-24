const requestURL =
    "http://localhost:7000/bb_data";
const currencyList = document.getElementById("currency");
const addressList = document.getElementById("address");
const submitButton = document.getElementById("submit");
const buy = document.getElementById("converter_buy");
const sell = document.getElementById("converter_sell");
const currencies = ["US Dollars", "Euros", "Russian rubles", "Chinese yuans"];
bindDatasetToDropdown(currencyList, currencies);

loadAddresses();

submitButton.onclick = function () {
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            buy.innerHTML =
                "Buy: " + response[addressList.selectedIndex][selectCurrency(currencyList) + "_in"];
            sell.innerHTML =
                "Sell: " + response[addressList.selectedIndex][selectCurrency(currencyList) + "_out"];
        });
};

function selectCurrency(currenciesl) {
    switch (currenciesl.value) {
        case "US Dollars":
            return "USD";
        case "Euros":
            return "EUR";
        case "Russian rubles":
            return "RUB";
        case "Chinese yuans":
            return "CNY";
    }
}

function bindDatasetToDropdown(documentReference, dataset, el) {
    for (let index = 0; index < dataset.length; index++) {
        let newElement = document.createElement("option");
        newElement.text = dataset[index];
        documentReference.add(newElement, documentReference[index]);
    }
}

function loadAddresses() {
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            for (let index = 0; index < response.length; index++) {
                let newElement = document.createElement("option");
                newElement.text =
                    response[index]['name_type'] + ' ' +
                    response[index]['name'] +
                    ', ' +
                    response[index]['street_type'] + ' ' +
                    response[index]['street'] +
                    ', ' +
                    response[index]['home_number'];
                addressList.add(newElement, addressList[index]);
            }
        });
}