let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode ;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
        // console.log(code, countryList[code]);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amValue = amount.value;
    // console.log(amValue);
    if(amValue === "" || amValue < 1)
    {
        amValue = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(response);
    // console.log(data);
    // console.log(rate);

    let finalAmount = amValue * rate ;
    msg.innerText = `${amValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element)=>{
    // console.log(element);
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});