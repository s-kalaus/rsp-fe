import '@babel/polyfill';

import { Main } from './class';

import '../styles/main.scss';

const rsp = new Main();

window.addEventListener('load', () => {

  rsp.init();

  rsp.initGameSchema();
}, true);

