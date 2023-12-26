
// for (code in countryList){
    //     console.log(code);
    // }
    
// let base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";
let base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdown = document.querySelectorAll(".dropdown select");
let button = document.querySelector("button");
const from_curre = document.querySelector("#fromm");
const to_curre = document.querySelector("#too");
let out_message = document.querySelectorAll(".msg")[0];



for(select of dropdown){
    for(cur_code in countryList){
        new_opt = document.createElement("option");
        new_opt.innerText = cur_code ;
        new_opt.value = cur_code;
        if(select.name === "from" && cur_code === "USD"){
            new_opt.selected = "selected";
        } 
        else if(select.name === "to" && cur_code ==="INR"){
            new_opt.selected = "selected";
        }
        select.append(new_opt);
    }
    
    select.addEventListener("change",(evt)=>{
        updateFlage(evt.target);
    });
}


function updateFlage(element){
    let curr_code = element.value;
    let country_Code = countryList[curr_code];
//    console.log(element.value," have counrty ",countryList[element.value]);
    newSrc = `https://flagsapi.com/${country_Code}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
}

async function get_update_exchnage (){
    let amount = document.querySelector(".amount input");
    // console.log(amount.value);
    let amt = amount.value;
    if(amount.value === "" || amount.value<0){
        amount.value = 1;
        amt = 1;
    }
    console.log(from_curre, to_curre);
    new_url = `${base_url}/${from_curre.value.toLowerCase()}/${to_curre.value.toLowerCase()}.json`;
    // console.log(new_url);

    let  respose = await fetch(new_url);
    let data = await respose.json();
    let rate = data[to_curre.value.toLowerCase()];

    let final_amount = rate * amt ;
    console.log(final_amount);

    let message =`${amt} ${from_curre.value} = ${final_amount} ${to_curre.value}`;
    console.log(message);
    out_message.innerText = message;
}

window.addEventListener("load", ()=>{
    get_update_exchnage();
})

button.addEventListener("click", (evt)=>{
    evt.preventDefault();
   get_update_exchnage();
});