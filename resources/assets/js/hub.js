
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


var Dispatcher  = require('./classes/Dispatcher');
var Locale      = require('./classes/Locale');
var Config      = require('./classes/Config');

require('./bootstrap');
require('./classes/Errors');
require('./classes/Form');

require('./components');
require('babel-core/register');
require('babel-polyfill');
require('bootstrap-datepicker');
require('bootstrap-select');
require('bootstrap-switch');
require('bootstrap-tagsinput');
require('dropzone');
require('lity');
require('selectize');

import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import icons from '@fortawesome/fontawesome-free-solid'
import fontawesome from '@fortawesome/fontawesome'
fontawesome.library.add(icons)

Vue.component('fa', FontAwesomeIcon);

/**
 * Bind some bits to the window for usage.
 */


window.CandyEvent     = new Vue();
window.channels       = [];
window.config         = new Config();
window.Dispatcher     = new Dispatcher();
window.languages      = [];
window.List           = require('list.js');
window.locale         = new Locale();
window.moment         = require('moment');
window.defaultChannel = document.head.querySelector('meta[name="channel"]').content;
// Include our custom v stuff here, so we know everything is loaded

require('./directives/sortable');
import Vue from 'vue'
import Vuex from 'vuex'
import { VTooltip } from 'v-tooltip'
import VueLazyload from 'vue-lazyload'
import Language from './services/Locale/Language';
import candyhub from './candyhub';

Vue.mixin({
  methods: {
      route: route
  }
});

Vue.use(Vuex);
Vue.use(VueLazyload, {
  lazyComponent: true
});

require('./filters/attributes');
require('./filters/format-date');
require('./filters/translate');

require('chart.js');
require('chartjs-color');

Vue.filter('capitalize', function (value) {
  if (!value) return value;
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

const store = new Vuex.Store({
  state: {
    topTabs: {},
    taxes: [],
    defaultChannel: {
      handle: defaultChannel
    }
  },
  mutations: {
    addTab (state, tab) {
      state.topTabs.push(tab);
    },
    addTabs(state, tabs) {
      tabs.forEach(tab => {
        state.topTabs[tab.href] = tab;
      });
    },
    setDefaultChannel(state, channel) {
      state.defaultChannel = channel;
    },
    setTaxes(state, taxes) {
      state.taxes = taxes;
    }
  },
  getters: {
    getTopTabs(state) {
      return state.topTabs;
    },
    getDefaultChannel(state) {
      return state.defaultChannel;
    },
    getTaxes(state) {
      return state.taxes;
    }
  }
});

config.get('channels').then(response => {
  channels = response.data;
  var defaultChannel = _.filter(channels, function(channel) {
    return channel.default;
  });
  store.commit('setDefaultChannel', defaultChannel[0]);
});

config.get('taxes').then(response => {
  store.commit('setTaxes', response.data);
})

config.get('languages').then(response => {
  languages = response.data;
  languages.forEach(item => {
    if (item.default) {
      Language.setCode(item.lang);
    }
  });
});

window.trans = function (obj) {
  return Language.trans(obj);
}

Vue.directive('tooltip', VTooltip);

var CandyHelpers = {};

CandyHelpers.install = function (Vue, options) {
  Vue.capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

// Register the plugin components first so they will be overwritten by the system ones.
_.each(CandyHub.plugins, plugin => {
  _.each(plugin.components, component => {
    Vue.component(component.reference, component.component);
  });
});

// Gradually move top level components into here, so we can use local registration per component.
Vue.component('candy-sales-report', require('./components/reports/SalesReport.vue'));
Vue.component('candy-dashboard-metrics', require('./components/reports/Metrics.vue'));
Vue.component('candy-orders-report', require('./components/reports/OrdersReport.vue'));
Vue.component('candy-attributes-table', require('./components/catalogue-manager/attributes/Table.vue'));
Vue.component('candy-attribute-edit', require('./components/catalogue-manager/attributes/Edit.vue'));
Vue.component('candy-attribute-create', require('./components/catalogue-manager/attributes/Create.vue'));
Vue.component('candy-attribute-groups-table', require('./components/catalogue-manager/attribute-groups/Table.vue'));
Vue.component('candy-attribute-groups-edit', require('./components/catalogue-manager/attribute-groups/Edit.vue'));
Vue.component('candy-attribute-group-create', require('./components/catalogue-manager/attribute-groups/Create.vue'));

Vue.component('candy-product-duplicate', require('./components/catalogue-manager/products/ProductDuplicate.vue'));
Vue.component('candy-product-families-table', require('./components/catalogue-manager/product-families/Table.vue'));
Vue.component('candy-product-family-edit', require('./components/catalogue-manager/product-families/Edit.vue'));
Vue.component('candy-product-family-create', require('./components/catalogue-manager/product-families/Create.vue'));
Vue.component('candy-product-family-delete', require('./components/catalogue-manager/product-families/Delete.vue'));

Vue.component('candy-order-status-select', require('./components/elements/forms/inputs/OrderStatuses.vue'));
Vue.component('candy-daterange-picker', require('./components/elements/forms/inputs/DateRangePicker.vue'));

Vue.component('candy-order-export', require('./components/order-processing/orders/OrderExport.vue'));

Vue.component('candy-color-picker', require('./components/elements/forms/inputs/ColorPicker.vue'));
Vue.component('candy-code-mirror', require('./components/elements/forms/inputs/CodeMirror.vue'));

import VueI18n from 'vue-i18n';


const messages = {
  en: require('./lang/en.json'),
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})


Vue.component('candy-activity-log', require('./components/elements/ActivityLog.vue'));


const app = new Vue({
    el: '#app',
    store,
    i18n,
    data: {
      title: ''
    },
    mounted() {
      CandyEvent.$on('title-changed', event => {
        if (_.isString(event.title)) {
          this.title = event.title;
        } else {
          this.title = this.$options.filters.attribute(event.title, 'name');
        }
        if (event.prefix) {
          this.title = event.prefix + ' ' + this.title;
        }
      });
    }
});

Vue.use(CandyHelpers);

function formatMoney (n, c,t,d) {
  n = n / 100;
  var
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

String.prototype.camel_case = function(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

String.prototype.money = function (c,t,d) {
  return formatMoney(this, c,t,d);
}
Number.prototype.money = function (c, t, d) {
  return formatMoney(this, c, t, d);
}

String.prototype.trunc = String.prototype.trunc ||
  function(n){
      return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
  };

  Vue.filter('trunc', function (value, length = 5) {
    return value.trunc(length);
  })

window.axios.interceptors.response.use((response) => { // intercept the global error
  return response
}, function (error) {
  // if (error.response.status === 401) {
  //     window.location.href = '/login';
  //     return;
  // }
  // Do something with response error
  return Promise.reject(error)
});

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

/* Misc crap - need to remove!!! */

require('./misc.js');