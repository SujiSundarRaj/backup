const menuOption = document.querySelector(".selectMenu");
var checkboxSelected = document.querySelectorAll(".checkbox");
var yearSec = document.getElementById("YearSection");
var foreCastMode = true; // true= forecast mode
var selectedYear = '2023'; // initial load dont change it
var selectedMonth = '8'; // initial load dont change it
var listArryRemoved = []; // array for removed fuels from filter
var listArryAdded = []; // array for readd fuels to filter  
var dataFromCsv = []; //array of data from csv file

//get data from csv file function call
var myChart;
loadChart();

//to get selected checkbox
for (var check of checkboxSelected) {
    check.addEventListener('click', function() {
        if (this.checked == false) {
            listArryRemoved.push(this.value);
            listArryAdded = listArryAdded.filter(e => e !== this.value);
        } else {
            listArryRemoved = listArryRemoved.filter(e => e !== this.value);
            listArryAdded.push(this.value);
        }
        console.log("listArryRemoved",listArryRemoved)
        console.log("listArryAdded",listArryAdded)
        if (listArryRemoved.length > 0) filterFuel();
        if (listArryAdded.length > 0) filterFuelAdd();
    })
}

//chart.js section

async function loadChart() {
    // config 
    await getData();
    const chartData = getChartData(selectedMonth, selectedYear);
    console.log("chartData",chartData)
    const chartConfig = {
        labels: chartData.monthList ?? [],
        datasets: [{
                label: 'Solid Fuels',
                data: chartData.solidData ?? [],
                backgroundColor: [
                    '#E76B00',
                ],
                borderColor: [
                    '#E76B00',
                ],
                borderWidth: 1
            },
            {
                label: 'Gas',
                data: chartData.gasData ?? [],
                backgroundColor: [
                    '#875aa5'
                ],
                borderColor: [
                    '#875aa5'
                ],
                borderWidth: 1
            },
            {
                label: 'Electricity',
                data: chartData.electricityData ?? [],
                backgroundColor: [
                    '#ef5675'
                ],
                borderColor: [
                    '#ef5675'
                ],
                borderWidth: 1
            },
            {
                label: 'Liquid Fuels',
                data: chartData.liquidData ?? [],
                backgroundColor: [
                    '#009773'
                ],
                borderColor: [
                    '#009773'
                ],
                borderWidth: 1
            },
        ]
    };
    const config = {
        type: 'line',
        data: chartConfig,
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Pence',
                        font: {
                            size: 14
                        }
                    },
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Period' + ' (' + (selectedYear - 1) + ' - ' + (selectedYear) + ')',
                        font: {
                            size: 14
                        }
                    },
                }
            }
        }
    };

    // render init block
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

//mode change function
function modeChange() {
  clearFilter();
    foreCastMode = !foreCastMode;
    if (foreCastMode == true) {
        yearSec.classList.add("removeSection");
        selectedMonth = '8';
        selectedYear = '2023';
    } else {
        selectedMonth = '8';
        selectedYear = '2022';
        yearSec.classList.remove("removeSection");
    }
    const chartData = getChartData(selectedMonth, selectedYear);
    updateChart(chartData);
}

//historical view data function based on selected month
function dateSelected() {
  clearFilter();
    const d = forecastForm.datepicker.value;
    selectedMonth = d.split('-')[1];
    selectedYear = d.split('-')[0];
    const chartData = getChartData(selectedMonth, selectedYear);
    updateChart(chartData);
}

// get values to display on chart based on year and month selected
function getChartData(selectedMonth, selectedYear) {
    const months = {
        january: 1,
        february: 2,
        march: 3,
        april: 4,
        may: 5,
        june: 6,
        july: 7,
        august: 8,
        september: 9,
        october: 10,
        november: 11,
        december: 12
    };    
    const monthList = [];
    const solidData = [];
    const gasData = [];
    const electricityData = [];
    const liquidData = [];
    const previousLimitYear = selectedYear - 1;
    console.log("selectedYear",selectedYear, selectedMonth)
    dataFromCsv.forEach((data) => {
        const selectedmonthIndex = data.month ? months[data.month.toLowerCase()] : -1;
        if (selectedmonthIndex !== -1 && (data.year == selectedYear && selectedMonth >= selectedmonthIndex) || (data.year == previousLimitYear && selectedmonthIndex > selectedMonth)){
          monthList.push(data.month);
           solidData.push(data.solid);
            gasData.push(data.gas);
            electricityData.push(data.electricity);
            liquidData.push(data.liquid.replaceAll('\r', ''));
        }
    });
    console.log("solid",solidData)
    return { solidData, gasData, electricityData, liquidData, previousLimitYear, monthList };
}

//update chart values
function updateChart(chartData) {
    myChart.config.data.datasets[0].data = chartData.solidData;
    myChart.config.data.datasets[1].data = chartData.gasData;
    myChart.config.data.datasets[2].data = chartData.electricityData;
    myChart.config.data.datasets[3].data = chartData.liquidData;
   myChart.config.data.labels= chartData.monthList ?? [];
if(selectedYear == 1996){
  myChart.config.options.scales.x.title.text = 'Period' + ' (' + (selectedYear) + ')';
   }else{
    myChart.config.options.scales.x.title.text = 'Period' + ' (' + (selectedYear - 1) + ' - ' + (selectedYear) + ')';
      }
      myChart.update();
}

//funtion to remove fuels from filter
function filterFuel() {
    for (let i = 0; i < listArryRemoved.length; i++) {
        if (listArryRemoved[i] == 'solid') {
            myChart.config.data.datasets[0].data = '';
        } else if (listArryRemoved[i] == 'gas') {
            myChart.config.data.datasets[1].data = '';
        } else if (listArryRemoved[i] == 'electricity') {
            myChart.config.data.datasets[2].data = '';
        } else if (listArryRemoved[i] == 'liquid') {
            myChart.config.data.datasets[3].data = '';
        }
        myChart.update();
    }
}

//funtion to readd fuels to filter
function filterFuelAdd() {
  const chartData = getChartData(selectedMonth, selectedYear);
    for (let i = 0; i < listArryAdded.length; i++) {
        if (listArryAdded[i] == 'solid') {
            myChart.config.data.datasets[0].data = chartData.solidData;
        } else if (listArryAdded[i] == 'gas') {
            myChart.config.data.datasets[1].data = chartData.gasData;
        } else if (listArryAdded[i] == 'electricity') {
            myChart.config.data.datasets[2].data = chartData.electricityData;
        } else if (listArryAdded[i] == 'liquid') {
            myChart.config.data.datasets[3].data = chartData.liquidData;
        }
        myChart.update();
    }
}

// Clear fuel checkbox when mode or date slected
function clearFilter(){
  var get= document.getElementsByName('check');  
  for(var i= 0; i<get.length; i++){  
  get[i].checked= true;}  
  }

//get value from csv file
async function getData() {
    const data = [];
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'text/csv;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    };
    onload = await fetch("./dataList.csv", requestOptions).then(res => {
        return res.text().then(response => {
            const dataTable = response.split('\n');
            const headers = dataTable[0].split(",");
            for (var i = 1; i < dataTable.length; i++) {

                var obj = {};
                var currentline = dataTable[i].split(",");

                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j].replaceAll('\r', '')] = currentline[j];
                }

                data.push(obj);

            }
            dataFromCsv = JSON.parse(JSON.stringify(data));
        })
    }).catch(function(error) {
    });
    return dataFromCsv;
}