import React from 'react'
import ReactDom from 'react-dom'
import Home from './home';
import {Provider} from 'react-redux'
import Store  from './redux/store';
import SimpleMap from './googlemap';
import Index from './index1'
ReactDom.render(
    <Provider store={Store}>
    <Index />
    </Provider>
    ,document.getElementById('root'));