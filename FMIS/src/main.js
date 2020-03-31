// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $axios from "axios";
import VueAxios from "vue-axios";
import { post, get } from "./httpRequest/http";
import { getString, setString, setObject, getObject } from "./httpRequest/storage";
import md5 from 'js-md5';
// const cors = require('koa2-cors');
// Vue.use(cors());

Vue.use(ElementUI);
Vue.use(VueAxios, $axios);
Vue.config.productionTip = false
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$getStr = getString;
Vue.prototype.$md5 = md5;
Vue.prototype.$setStr = setString;
Vue.prototype.$setObj = setObject;
Vue.prototype.$getObj = getObject;

Vue.filter('date', function(data) { // msg 为固定的参数 即是你需要过滤的数据
    if (data) {
        var time = data.substring(0, 9);
        return time;
    }

})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

Vue.prototype.toPath = function(path) {
    var self = this;
    setTimeout(function() {
        self.$router.push({
            path: path
        });
    }, 350);
};