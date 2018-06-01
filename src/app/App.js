import React, {Component} from 'react';
import Home from './home';
import Tests from './tests';
import './App.css';
import {Route} from "react-router-dom";
import {TopMenu} from './components';

export default class App extends Component{
    render(){
        return (
            <div className="container-fluid">
                <TopMenu/>
                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/tests" component={Tests} />
                </main>
            </div>
        )
    }
}
