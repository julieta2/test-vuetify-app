import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify);


export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                background: '#f0f0f0',
                filled: '#ffffff',
            },
        },
        light: true,
    },
    icons: {
        iconfont: 'mdi',
    },
});
