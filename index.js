var req = new XMLHttpRequest();
var xdH = [];
var xdR = [];
var ydH = [];

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
      },{ 
        data: xdR,
        label: "Current Hashrate",
        borderColor: "#8e5ea2",
        fill: false
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
const cDataGet = async () => {
  req.open(
    "GET",
    "https://api.nanopool.org/v1/eth/balance_hashrate/0x9a024dca12158e8ba0b45bb9d4ae1b1324c38861",
    false
  );
  req.send(null);
  let data = await req.responseText;
  let pData = JSON.parse(data);
  let currentBalance = pData.data.balance;
  let cHash = pData.data.hashrate
  cBal = currentBalance;
  muhCrypto.options.title.text = `This many ETH ~ ${cBal}`;
  xdR.push(cHash)
};
const rDataGet = async () => {
  req.open(
    "GET",
    "https://api.nanopool.org/v1/eth/reportedhashrate/0x9a024dca12158e8ba0b45bb9d4ae1b1324c38861",
    false
  );
  req.send(null);
  let rData = await req.responseText;
  let rpData = JSON.parse(rData);
  let harsh = rpData.data
  console.log();
  xdH.push(harsh);
};
setInterval(() => {
  var ct = new Date();
  let stamp = ct.toISOString();
  rDataGet();
  cDataGet();
  ydH.push(stamp);
  muhCrypto.update();
}, 20000);
