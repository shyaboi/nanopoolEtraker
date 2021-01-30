let req = new XMLHttpRequest();
let xdH = [];
let xdR = [];
let ydH = [];
let gtHash = []
let gcHash;
let grHash;
let gMoneyPH;
let gMoneyPD;

let cBal = 0;
let cBalChange = 0
let cTBalChange = 0
let title = document.getElementById("ethMoney")
let change = document.getElementById("ethMoneyChange")


let muhCrypto = new Chart(document.getElementById("line-chart"), {
  type: "line",
  data: {
    labels: ydH,
    datasets: [
      {
        data: xdH,
        label: "Reported Hashrate",
        borderColor: "#3cba9f",
        fill: false,
      },
      {
        data: xdR,
        label: "Calculated Hashrate",
        borderColor: "#8e5ea2",
        fill: false,
      },
      {
        data: gtHash,
        label: "Average Hashrate",
        borderColor: "#6EB1EE",
        fill: false,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: `Hashrates`,
    },
  },
});
const cDataGet = () => {
  req.open(
    "GET",
    "https://api.nanopool.org/v1/eth/balance_hashrate/0x9a024dca12158e8ba0b45bb9d4ae1b1324c38861",
    false
  );
  req.send(null);
  let data = req.responseText;
  let pData = JSON.parse(data);
  let currentBalance = pData.data.balance;
  let cHash = pData.data.hashrate;
  
  gcHash = cHash
  cBalChange = (currentBalance - cBal)
  if (cBalChange === 0) {
      // console.log(cBalChange)
      
    }else{ 

    let tc = cBalChange + cTBalChange
    change.innerHTML = '+'+tc
    // console.log(tc)
  }
  cBal = currentBalance;
  title.innerHTML = `Miner Balance ~ <span style="color: grey;">ETH</span><span style="color: green;" id="mon" >${cBal}</span>\n perDay  <spanstyle="color: green;">$${gMoneyPD}</span> ~ perHour <span style="color: green;">$${gMoneyPH}</span>`
  xdR.push(cHash);
};



const rDataGet = () => {
  req.open(
    "GET",
    "https://api.nanopool.org/v1/eth/reportedhashrate/0x9a024dca12158e8ba0b45bb9d4ae1b1324c38861",
    false
  );
  req.send(null);
  let rData = req.responseText;
  let rpData = JSON.parse(rData);
  let harsh = rpData.data;
  grHash = harsh
  xdH.push(harsh);
};




const makeMoney = () => {
    let tHash = (gcHash + grHash)/2
    gtHash.push(tHash)
    req.open(
    "GET",
    `https://api.nanopool.org/v1/eth/approximated_earnings/${tHash}`,
    false
  );
  req.send(null);
  let mData = req.responseText;
  let mpData = JSON.parse(mData);
  let mPerHour = mpData.data.hour.dollars
  let mPerDay = mpData.data.day.dollars
    gMoneyPH =  mPerHour.toFixed(2);
    gMoneyPD = mPerDay.toFixed(2);
};


var updateSel = document.getElementById("update");
var selection = 5000;
var currentSelection = 5000;
const setSel = ()=> {
  selection = (updateSel.options[updateSel.selectedIndex].value)*1000;
  // currentSelection = selection
}

const doLoop = ()=> {
  setSel()
  if (selection == currentSelection) {
    // console.log(selection, currentSelection)
    var ct = new Date();
    let stamp = ct.toISOString();
    let stampSub = stamp.substring(0, stamp.length - 8);
    rDataGet();
    cDataGet();
    ydH.push(stampSub);
    muhCrypto.update();
    makeMoney();
  }else{
    // console.log(selection, currentSelection)

    clearInterval(looper)
    currentSelection = selection
    looper = setInterval(doLoop, selection)
  }

}

let looper = setInterval(doLoop, selection);