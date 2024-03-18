const search = document.querySelector("#search-input");
const button = document.querySelector(".js-btn");

button.addEventListener("click", async () => {
  const url = "https://api.weatherapi.com/v1";
  const apiKey = "25106ac1330141b2aab220317241603";

  try {
    const searchValue = search.value.trim();
    const response = await fetch(
      `${url}/current.json?key=${apiKey}&q=${searchValue}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      getData(data);
    } else {
      throw new Error("Failed!!!");
    }
  } catch (error) {
    console.error(error);
  }
});

const getData = (data) => {
  const info = document.querySelector(".print-here");
  const { location, current } = data;

  info.innerHTML += `
        <div class="container-weather col-3 d-flex flex-wrap p-3 text-light bg-info">
            <div class="text-danger btn-x">X</div>
            <h2 class="text-center"><span">${location.name}</span></h2>
            <section class="p-2">Humidity: ${current.humidity}</section>
            <section class="p-2">Temp: ${current.temp_c}</section>
            <div class="p-2">Wind: ${current.wind_kph}</div>
            <div class="p-2">Local Time: ${location.localtime}</div>
        </div> 
    
    `;
  const deleteWeather = document.querySelectorAll(".btn-x");
  deleteWeather.forEach((btn) => {
    btn.addEventListener("click", () => {
      const weather = document.querySelector(".container-weather");
      weather.remove();
    });
  });
};
