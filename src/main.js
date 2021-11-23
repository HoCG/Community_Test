import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
    // 이곳에 router 를 등록할 것 입니다.
    {
        path: '/',
        component: () => import ('./views/LoginPage.vue')
    }, {
        path: '/StartPage',
        component: () => import ('./views/StartPage.vue')
    }, {
        path: '/CreateCommunityPage',
        component: () => import ('./views/CreateCommunityPage.vue')
    }
];

// router 객체생성
const router = new VueRouter({routes});

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
