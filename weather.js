const API = {
    KEY: "552314045233f8f1671e41a9a0fe3387",
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q="
}

let city = document.querySelector(".search-box");

city.addEventListener('keypress', function (e) {

    if (e.keyCode == '13') {
        let cityName = city.value;
        fetch(`${API.BASE_URL}${cityName}&appid=${API.KEY}`)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);

                //update City
                let city = document.querySelector(".city");
                city.innerText = `${response.name},${response.sys.country}`;

                //update date using Date Function
                //From -> Mon Sep 26 2022
                //To -> Monday 26 September 2022

                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                let fullDate = new Date();
                let currDay = days[fullDate.getDay()];
                let currDate = fullDate.getDate();
                let currMonth = months[fullDate.getMonth()];
                let currYear = fullDate.getFullYear();

                let date = document.querySelector(".date");
                date.innerText = `${currDay} ${currDate} ${currMonth} ${currYear}`;

                //update temperature
                let temp = document.querySelector(".temp");
                let tempInF = response.main.temp;
                //Conversion from Kelvin to celsius
                let tempInC = Math.round(tempInF - 273.15);
                temp.innerText = `${tempInC}°C`;

                //update Weather
                let weather = document.querySelector(".weather");
                weather.innerText = response.weather[0].description;

                //update min-max temperature
                let min_max_temp = document.querySelector(".hi-low");
                let min_tempInC = Math.round(response.main.temp_min - 273.15);
                let max_tempInC = Math.round(response.main.temp_max - 273.15);
                min_max_temp.innerText = `${min_tempInC}°C / ${max_tempInC}°C`;

            })
    }
});



