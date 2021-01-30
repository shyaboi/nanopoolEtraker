let moneyMe = []
const fetcher = async ()=> {
    let mon = document.getElementById("mon")
    x = mon.innerHTML
    let res  = await fetch(`https://api.coinbase.com/v2/prices/ETH-USD/buy`);
    let data = await res.json()
    let exchange = data.data.amount
    let tots = exchange * mon.innerHTML
    console.log(tots)
    moneyMe.push(tots)
    
    moneyChart.update()
    
    console.log(mon.innerHTML)
    setTimeout(() => {
        
        moneyMe.pop()
    }, 19400);
}



const moneyChart = new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["Previous Value", "Current Value"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#01D705","#100A20", "#FDCA0C"],
        data: moneyMe
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Make Money'
      }
    }
});

const lupe = setInterval(fetcher, 10000)