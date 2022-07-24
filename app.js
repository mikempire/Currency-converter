let myHeaders = new Headers();
myHeaders.append("apikey", "H1nOflVmGLJllO6GwutoAPHLmIR4bBbX");

let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

const selectTag = document.querySelectorAll('select'),
    btn = document.querySelector('.btn'),
    changeBtn = document.querySelector('.icon .fa-exchange-alt');


let exchangeRate = document.querySelector('.exchange-rate');
let from = document.querySelector('.from select'),
    to = document.querySelector('.to select'),
    amount = document.querySelector('.amount input');


selectTag.forEach((tag, id) => {
    for (const country in country_list) {
        let selected = '';
        if (id === 0 && country === 'USD') {
            console.log(id);
            selected = 'selected';
        } else if (id === 1 && country === 'RUB') {
            console.log(id);
            selected = 'selected';
        }

        let option = `<option value="${country}" ${selected}>${country}</option>`;

        tag.insertAdjacentHTML('beforeend', option);

    }
    tag.addEventListener('change', function (event) {
        for (const country in country_list) {

            if (event.target.value === country) {
                this.parentElement.querySelector('img').src = `https://flagcdn.com/48x36/${country_list[country].toLowerCase()}.png`
            }
        }
    })
})


btn.addEventListener('click', function () {
    getExchangeRate();
});

changeBtn.addEventListener('click', function () {
    let bufer = from.value;
    from.value = to.value;
    to.value = bufer;

    let buferPic = selectTag[0].parentElement.querySelector('img').src;
    selectTag[0].parentElement.querySelector('img').src = selectTag[1].parentElement.querySelector('img').src;
    selectTag[1].parentElement.querySelector('img').src = buferPic;
    getExchangeRate();
});


async function getExchangeRate() {

    let amountValue = parseInt(amount.value);
    if (amountValue === 0 || amountValue === '') {
        amount.value = 1;
    }
    exchangeRate.innerText = 'Загружаю информацию...';
    let res = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to.value}&from=${from.value}&amount=${amountValue}`, requestOptions);
    let resText = await res.json();
    let converter = resText.result;

    console.log(converter);
    exchangeRate.innerHTML = `${amountValue} ${from.value} = ${converter.toFixed(2)} ${to.value}`
}

// H1nOflVmGLJllO6GwutoAPHLmIR4bBbX


// fetch("https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));