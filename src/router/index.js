'use strict';

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Thinggies from '../components/Thinggies';

export default new Router({
   mode : 'history',
   routes : [
       {
           path : '/thingamabobs',
           component : Thinggies,
           name : 'Thinggies'
       }
   ]
});