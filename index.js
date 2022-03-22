let fetchWeather = document.getElementById("fetchWeather");

fetchWeather.addEventListener("click", displayChart);
let city;

let apiKey = "3815c094a4cfd4e5f21aa16d45fab8bc";
let myChart;
async function displayChart() {
  city = document.getElementById("city").value;
  console.log(city);
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  let response = await fetch(url);
  let data = await response.json();
  let listEles = data.list.map((ele) => {
    return ele;
  });
  let dt_txt = listEles.map((ele) => {
    return ele.dt_txt;
  });
  console.log(dt_txt);
  console.log(listEles);
  let main = listEles.map((ele) => {
    return ele.main;
  });
  console.log(main);

  let temperatures = main.map((ele) => {
    return ele.temp;
  });
  console.log(temperatures);

  let ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dt_txt,
      datasets: [
        {
          label: `Temperatures at ${city}`,

          data: temperatures,
          backgroundColor: ["rgba(224, 176, 255, 0.2)"],
          borderColor: ["rgba(224, 176, 255, 1)"],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

let cw = document.getElementById("cw");
cw.addEventListener("click", cwData);

async function cwData() {
  city = document.getElementById("city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data.main);
  let p = document.getElementById("temp");
  p.innerHTML = `The current temperature at ${city} is ${data.main.temp}<sup>0</sup>C`;
}
