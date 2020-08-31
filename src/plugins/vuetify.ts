import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  customProperties: true,
  theme: {
    primary: '#657ACD',
    secondary: '#F29200',
    accent: '#82B1FF',
    error: '#FF4848',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  iconfont: 'md',
});
