async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("result");

    if (!city) {
        resultDiv.innerHTML = "Please enter a city.";
        return;
    }

    const apiKey = "8289a17234ea5d99ac760a39be617c60";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    resultDiv.innerHTML = "Loading...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            resultDiv.innerHTML = "City not found.";
            return;
        }

        resultDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].main}</p>
            <p>🌡 Temp: ${data.main.temp}°C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = "Error fetching data.";
    }
}
