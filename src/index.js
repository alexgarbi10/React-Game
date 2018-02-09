import React from 'react';
import { render } from 'react-dom';
import { Game } from 'containers';
//import registerServiceWorker from './helpers/registerServiceWorker';

const root = document.getElementById('root');

render(
    <Game boardSize={11} playerSize={25} />
, root);

//registerServiceWorker();
