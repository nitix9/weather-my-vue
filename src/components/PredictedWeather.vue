<template>
    <p v-if="!weatherPredict"></p>
    <div class="weather-cont" v-else>
        <div class="weather-data">
            <div class="weather-data__city-container">
                <h2>Город - {{ weatherPredict.city.name }}</h2>
            </div>
            <div class="weather-data__date">
                <h2>{{ getDateWeather(weatherPredict,indexWeather) }}</h2>
            </div>
            <div class="weather-data__weather-parameters">
                <p>
                    Температура: {{ weatherPredict.list[indexWeather].main.temp }} °C
                </p>
                <p>Ветер: {{weatherPredict.list[indexWeather].wind.speed }} м/с, {{ getDegw(weatherPredict.list[indexWeather].wind.deg) }}</p>
                <p>Влажность: {{ weatherPredict.list[indexWeather].main.humidity }} %</p>
                <p>Давление: {{ weatherPredict.list[indexWeather].main.pressure }} hPa</p>
            </div>
            <div class="weather-data__description-container"><img
                    :src="`https://openweathermap.org/img/wn/${weatherPredict.list[indexWeather].weather[0].icon}@2x.png`">
                <p> {{ weatherPredict.list[indexWeather].weather[0].description }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    props: ["weatherPredict", "indexWeather","getDegw"],
    
    methods: {
        getDateWeather(weatherPredict, indexWeather) {
            let weather_date = new Date(weatherPredict.list[indexWeather].dt * 1000);
            return `${weather_date.getDate() < 10 ? '0' + weather_date.getDate() : weather_date.getDate()}.${+weather_date.getMonth() + 1 < 10 ? '0' + (+weather_date.getMonth() + 1) : weather_date.getMonth() + 1}.${weather_date.getFullYear()}`
        }
    }
}
</script>
<style>
</style>
