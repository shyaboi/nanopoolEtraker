var bar1Data = []

const theseBars = new Chart(document.getElementById("barChart"), {
    type: 'bar',
    data: {
      labels: ["Africa", "Other", "3rd Thing", "Mor"],
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
                    suggestedMax: 1000,    // minimum will be 0, unless there is a lower value.
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
const makeEl = (b)=> {
    let el = []
    for (let i = 0; i < 4; i++) {
        x = Math.floor(Math.random()*1000);
        const ele = b[i];
        b[i] = x
    }
    for (let i = 0; i < b.length; i++) {
        
        el.push(b[i]);
    }
    console.log(el)
}

const thing = (b)=>{

    theseBars.update();
        
}
setInterval(() => {
    makeEl(bar1Data)
    thing(bar1Data)

}, 1000);













































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