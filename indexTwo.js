var bar1Data = []
let miners = ['sleepy', 'grumpy', 'doc', 'dingus', 'larry','dinus']
const theseBars = new Chart(document.getElementById("barChart"), {
    type: 'bar',
    data: {
      labels: miners,
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: bar1Data
        }
      ]
    },
    options: {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    suggestedMax: 40,    // minimum will be 0, unless there is a lower value.
                    // OR //
                    beginAtZero: true   // minimum value will be 0.
                }
            }]
        },
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});

// const bData = ()=> {
//     while(bar1Data.length < 5){
//         var r = Math.floor(Math.random() * 100) + 1;
//         if(bar1Data.indexOf(r) === -1) bar1Data.push(r);
//     }
//     theseBars.update()
// }

// bData()

// const clearIt = ()=> {
//     console.log(bar1Data)
   
//     theseBars.update();
// }
const fetchy = async (add)=> {
    let res  = await fetch(`https://api.nanopool.org/v1/eth/reportedhashrates/${add}`);
    let data = await res.json()
    return data;
}
var workks = []
var mBois = []
const makeEl = (b,m)=> {
    fetchy("0x9a024dca12158e8ba0b45bb9d4ae1b1324c38861")
    .then(data => {
        for (const i of data.data) {
            // console.log(i)
            workks.push(i)
        }
        for (const i of workks) {
            mBois.push(i.worker)
        }
    })
    // console.log(mBois)

    // let el = [222,333,444,555,333,333,444,555]


    // for (let i = 0; i < el.length; i++) {
    //     // x = Math.floor(Math.random()*1000);
    //     b[i] = el[i]
    // }
    setTimeout(() => {
        
        for (let i = 0; i < mBois.length; i++) {
            // x = Math.floor(Math.random()*1000);
            m[i] = mBois[i]
            // console.log(m[i])
            theseBars.update();
        }
    }, 1000);


    miners = mBois
    // console.log(el)
}

const upHash = (b)=> {
   

    let el = []
    for (const i of workks) {
        el.push(i.hashrate)
    }
console.log(el)
    for (let i = 0; i < el.length; i++) {
        // x = Math.floor(Math.random()*1000);
        b[i] = el[i]
    }
    theseBars.update()
}
setInterval(() => {
    upHash(bar1Data)
}, 5000);

    makeEl(bar1Data,miners)














































new Chart(document.getElementById("barChart2"), {
    type: 'bar',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});