let req = new XMLHttpRequest();
let xdH = [];
let xdR = [];
let ydH = [];
let gtHash = []
let gcHash;
let grHash;
let gMoneyPH;
let gMoneyPD;

let cBal = 1;

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
        label: "Current Hashrate",
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
      text: `This many ETH ~ ${cBal}`,
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
  cBal = currentBalance;
  muhCrypto.options.title.text = `This many ETH ~ ${cBal}\n $ Money per Day $${gMoneyPD} ~ Hour $${gMoneyPH}`;
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
  console.log();
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

setInterval(() => {
  var ct = new Date();
  let stamp = ct.toISOString();
  let stampSub = stamp.substring(0, stamp.length - 8);
  rDataGet();
  cDataGet();
  ydH.push(stampSub);
  muhCrypto.update();
  makeMoney();
}, 45000);
