import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Locale from 'element-ui/lib/locale/'
import lang from 'element-ui/lib/locale/lang/fr'
Locale.use(lang)
import App from './App'
import moment from 'moment'
import axios from 'axios'
import draggable from 'vuedraggable'
import VueMomentJS from 'vue-momentjs'
import DataTables from 'vue-data-tables'
Vue.config.productionTip = false
Vue.use(DataTables)
Vue.use(ElementUI, { Locale })
Vue.use(VueMomentJS, moment)
Vue.use(axios)
Vue.use(draggable)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
