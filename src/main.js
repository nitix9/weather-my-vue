import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n';

const i18n=createI18n({
    locale: 'ru',
    fallbackLocale: 'en',
    messages: {
      en: {
        appName:'The weather app',
        cityChosen:'selected city',
        city1:'Nizhniy Tagil',
        city2:'Ekaterinburg',
        city3:'Moscow',
        load:'Loading...',
        city:'City',
        day:'Today',
        temperature:'Temperature',
        wind:'Wind',
        humidity:'Humidity',
        pressure:'Pressure'

      },
      ru: {
        appName: 'Приложение погоды',
        cityChosen:'выбранный город',
        city1:'Нижний Тагил',
        city2:'Екатеринбург',
        city3:'Москва',
        load:'Загрузка...',
        city:'Город',
        day:'Сегодня',
        temperature:'Температура',
        wind:'Ветер',
        humidity:'Влажность',
        pressure:'Давление'
      }
    }
  })
createApp(App).use(i18n).mount('#app')
