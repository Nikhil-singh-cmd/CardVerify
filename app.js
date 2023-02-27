const cardNumberInput = document.getElementById("card-number");
const cnum = document.querySelector(".cnum");
const bname = document.querySelector(".bname");
const type = document.querySelector(".type");
const scheme = document.querySelector(".scheme");
const flag = document.querySelector(".cflag");
const cCity = document.querySelector(".cCity");
const bcard = document.querySelector(".card");
const validy = document.querySelector(".validity");
const root = document.querySelector(':root');

cardNumberInput.addEventListener("keyup", (event) => {
    const key = event.key;

    let card = cardNumberInput.value;
    cnum.textContent = card;
    cnum.style.color = 'white';
    bname.textContent = 'BANK Name, LTD.';
    scheme.textContent = 'Credit/Debit';
    type.textContent = 'Card Type';
    cCity.textContent = 'City, Country';
    flag.src = "images/globe.png";
    root.style.setProperty("--display",'none');

});

const cardCheck = async (cardNum)=>{
        let binNum = parseInt(cardNum.slice(0,6),10);
        try{
            cnum.style.color = 'white';
            await fetch(`https://lookup.binlist.net/${binNum}`)
            .then(response => response.json())
            .then(result => update(result));
        }
        catch(error){
            cnum.style.color = 'red';
            cnum.classList.add("cshake");
            bname.textContent = "No Info";
            cnum.textContent = "";
            cnum.insertAdjacentHTML("afterbegin",`<del>${cardNum}</del>`);
            flag.src = "images/globe.png";
            cCity.textContent = "";
            type.textContent = "";
            scheme.textContent = "";

            setTimeout(() => {
                cnum.classList.remove("cshake");
            }, 1000);

        }
    }


const check = ()=>{
    event.preventDefault();
    let cardNum = cardNumberInput.value;
    cardCheck(cardNum);
    if(validy.textContent == 'Valid Card'){
        root.style.setProperty("--valid","Green");
        root.style.setProperty("--display",'block');
    }
    else{
        root.style.setProperty("--valid","red");
        root.style.setProperty("--display",'block');
    }
}

const update = (result)=>{
    console.log(result);
    try{
        let bank_name = result.bank.name;
        bname.textContent = bank_name;
        if(bank_name == undefined) bname.textContent = "No Info";
    }
    catch{
        bname.textContent = "Unknown Bank";
    }

    let country = result.country.name;
    let cscheme = result.type;
    let ctype = result.scheme;
    let cCode = result.country.alpha2;

    if(result.bank.city != undefined){
        let city = result.bank.city;
        cCity.textContent = `${city},${cCode}`;
    }
    else{
        cCity.textContent = `${cCode}`;
    }

    type.textContent = ctype;
    scheme.textContent = cscheme;
    flag.src = `https://countryflagsapi.com/png/${country}`;

}


// const checkip=async() => {
//     let api_url="https://api.ipify.org/";
//     let ipAdd="";
//     fetch(api_url).then(response=>{
//         if(!response.ok){
//             throw new Error("Network response was not ok");
//         }
//         return response.text();
//     })
//     .then(textData=>{
//         ipAdd=textData;
//     })
//     await fetch(`https://vpnapi.io/api/${ipAdd}?key=2563c0ea6a4f4088a7fddd2684dabc6c`)
//     .then(response => response.json())
//     .then(jsonData =>{
//         let isTor=jsonData.security.tor;
//         let isvpn=jsonData.security.vpn;
//         let isproxy=jsonData.security.proxy;
//         let isrelay=jsonData.security.relay;
//         if(isTor){
//             console.log("it is tor "+isTor);
//         }
//         if(isvpn){
//             console.log("it is vpn "+isvpn);
//         }
//         if(isproxy){
//             console.log("it is proxy "+isproxy);
//         }
//         if(isrelay){
//             console.log("it is relay "+isrelay);
//         }
       
//     })
    
//     }
const ip_box = document.querySelector('.ipBox')
const user_ip = document.querySelector('.user_ip')
const user_region = document.querySelector('.region')
const vpn_logo = document.querySelector('.vpn_logo')
const tor_logo = document.querySelector('.tor_logo')
const proxy_logo = document.querySelector('.proxy_logo')
const cloud_logo = document.querySelector('.cloud_logo')
const anon_logo = document.querySelector('.anon_logo')
const threat_logo=document.querySelector('.threat_logo')
const thrt_score=document.querySelector('.threat_score')
const trst_score=document.querySelector('.trust_score')
const cross = document.querySelector('.cross')


const vpnapi = async()=>{
    let raw;
    let key = '11083cab0ab4058b87428174da90e0644de74ef95de5d34c9586110d'
    await fetch(`https://api.ipdata.co/?api-key=${key}`)
    .then(response => response.json())
    .then(result => raw = result)

    let ip = raw.ip
    let region = raw.region
    let cCode = raw.country_code
    let threat_data = raw.threat
    let trstScore=raw.threat.trust_score
    let thrtScore=raw.threat.threat_score
   
    console.log(trstScore)
    console.log(thrtScore)

    thrt_score.textContent=thrtScore
    trst_score.textContent=trstScore
    user_ip.textContent = ip
    user_region.textContent = `${region},${cCode}`

    // VPN
    if(threat_data.is_vpn == true){
        vpn_logo.style.background = 'green'
        vpn_logo.style.boxShadow = "2px 4px 11px green"
    }
    else{
        vpn_logo.style.background = 'red'
        vpn_logo.style.boxShadow = "2px 4px 11px red"
    }



    // tor
    if(threat_data.is_tor == true){
        tor_logo.style.background = 'green'
        tor_logo.style.boxShadow = "2px 4px 11px green"
    }
    else{
        tor_logo.style.background = 'red'
        tor_logo.style.boxShadow = "2px 4px 11px red"
    }



    // proxy
    if(threat_data.is_proxy == true){
        proxy_logo.style.background = 'green'
        proxy_logo.style.boxShadow = "2px 4px 11px green"
    }
    else{
        proxy_logo.style.background = 'red'
        proxy_logo.style.boxShadow = "2px 4px 11px red"
    }



    // cloud
    if(threat_data.is_icloud_relay == true){
        cloud_logo.style.background = 'green'
        cloud_logo.style.boxShadow = "2px 4px 11px green"
    }
    else{
        cloud_logo.style.background = 'red'
        cloud_logo.style.boxShadow = "2px 4px 11px red"
    }


    // anonymous
    if(threat_data.is_anonymous == true){
        anon_logo.style.background = 'green'
        anon_logo.style.boxShadow = "2px 4px 11px green"
    }
    else{
        anon_logo.style.background = 'red'
        anon_logo.style.boxShadow = "2px 4px 11px red"
    }

    //threat
    if(threat_data.is_threat == true){
        threat_logo.style.background = 'green'
        threat_logo.style.boxShadow = "2px 4px 11px green"
    }
    else{
        threat_logo.style.background = 'red'
        threat_logo.style.boxShadow = "2px 4px 11px red"
    }

    ip_box.style.display = 'block'
}

cross.addEventListener('click',()=>{
    ip_box.style.display = 'none'
})

