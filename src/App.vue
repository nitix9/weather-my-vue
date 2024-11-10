<template>
  <h1>Приложение погоды</h1>
  <div class="city-chosen">
    <p>выбранный город</p>
  </div>
  <select @change="getWeatherData(),getWeatherPredict()" id="select_">
    <option value="Нижний Тагил">Нижний Тагил</option>
    <option value="Екатеринбург">Екатеринбург</option>
    <option value="Москва">Москва</option>
  </select>
  <div class="load" v-if="!weather_data">
    <p>Загрузка...</p>
  </div>
  <div class="weather-cont" v-else>
    <div class="weather-data">
      <div class="weather-data__city-container">
        <h2>Город - {{ weather_data.name }}</h2>
      </div>
      <div class="weather-data__date">
        <h2>Сегодня</h2>
      </div>
      <div class="weather-data__weather-parameters">
        <p>
          Температура: {{ weather_data.main.temp }} °C
        </p>
        <p>Ветер: {{ weather_data.wind.speed }} м/с, {{ getWindDirection(weather_data.wind.deg) }}</p>
        <p>Влажность: {{ weather_data.main.humidity }} %</p>
        <p>Давление: {{ weather_data.main.pressure }} hPa</p>
      </div>
      <div class="weather-data__description-container"><img
          :src="`https://openweathermap.org/img/wn/${weather_data.weather[0].icon}@2x.png`">
        <p> {{ weather_data.weather[0].description }}</p>
      </div>
    </div>
  </div>
  <div v-if="!arrFilterDate">Загрузка...</div>
  <div v-else>
    <div class="predicted-container" v-for="item,index of arrFilterDate" v-bind:key="index">
      <PredictedWeather :weather-predict="weather_predict??null" :index-weather="item" :get-degw="getWindDirection"/>
    </div>
  </div>
</template>

<script>
import PredictedWeather from './components/PredictedWeather.vue';
export default {
  name: "App",
  data() {
    return {
      weather_predict: null,
      weather_data: null,
      weather_date:new Date(1730570400*1000),
      latlon:null,
      arrFilterDate:null,
    };
  },
  mounted() {
    this.getWeatherData();
    this.getWeatherPredict();
  },
  methods: {
    getWeatherData() {
      let latLon = "lat=57.9194&lon=59.965";
      latLon = this.getValue();
      this.latlon=latLon;
      let link = `https://api.openweathermap.org/data/2.5/weather?${latLon}&appid=bb57199299dbac295d19c2e303bfe470&units=metric&lang=ru`;
      console.log(link);
      fetch(link)
        .then((resp) => resp.json())
        .then((json) => {
          this.weather_data = json;
        });
    },
    getWeatherPredict() {
            let linkPredict = `https://api.openweathermap.org/data/2.5/forecast?${this.latlon??"lat=57.9194&lon=59.965"}&appid=b92cabe8d54a8c11f45f761e5d5570cb&units=metric&lang=ru`;
            console.log(linkPredict)
            fetch(linkPredict)
                .then((resp) => resp.json())
                .then((json) => {
                    this.weather_predict = json;
                })
                .then(this.filterPredicted)
        },
    getValue() {
      let select = document.getElementById("select_");
      let getVal = select.value;
      return getVal == "Екатеринбург"
        ? "lat=56.88&lon=60.6122"
        : getVal == "Москва"
        ? "lat=55.7522&lon=37.6156"
        : getVal == "Нижний Тагил"
        ? "lat=57.9194&lon=59.965"
        : "lat=0&lon=0";
    },
    filterPredicted(){
        let arrDateIndex = []
        console.log(this.weather_predict.list.length)
        for (let i = 0; i < this.weather_predict.list.length; i++) {
          if (new Date(this.weather_predict.list[i].dt *1000).getDate()!=new Date().getDate() && new Date(this.weather_predict.list[i].dt *1000).getHours()==14) {
            arrDateIndex.push(i+1)
          }
          else {
            continue
          }
        }
        this.arrFilterDate=arrDateIndex;
      
    },
    getWindDirection(angle) {
    const directions = ['↓ С', '↙ СВ', '← В', '↖ ЮВ', '↑ Ю', '↗ ЮЗ', '→ З', '↘ СЗ'];
    return directions[Math.round(angle / 45) % 8];
}
  },
  components: {PredictedWeather},
};
</script>

<style>
.weather-data__date{display: flex;margin: 0 auto;padding-top: 3%;}
.weather-data__date h2{margin: 0;}
.predicted-container{display: flex;justify-content: center; padding-top:1% ;}
.city-chosen{font-size: 1.2rem}
.weather-data__weather-parameters{display:flex ;padding-left: 15%;padding-right:5%;flex-direction: column;align-items: flex-start;}
.weather-data__city-container{display: flex;margin: 0 auto;padding-top: 5%;}
.weather-data__city-container h2{margin: 0;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.weather-data__description-container{display: flex;align-items: center;width:100%;justify-content: center;padding: 0;}
.load{border:solid rgb(3, 129, 179);
  border-radius: 5%;}
body {
  background-color: rgba(0, 0, 0, 0.904);
}
.weather-data{border:solid rgba(0, 26, 51, 0.514);
  border-radius: 30px;display: flex;align-items: flex-start;flex-direction: column;background-color:rgb(71, 172, 209);
font-size: 1.2rem;width: 50vh;}
.weather-cont {
  color: white;display: flex;justify-content: center;padding-top: 1%;
}
h1 {
  color: white;
}
p {
  color: white;
}
select{font-size: 1.2rem;border-radius:5px ;}
</style>
