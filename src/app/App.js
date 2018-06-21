import React, {Component} from 'react';
import Home from './home';
import Tests from './tests';
import Test from  './tests/components/test';
import MyTests from  './my/tests';
import './App.css';
import {Route, withRouter} from "react-router-dom";
import {TopMenu} from './components';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {toggleFM} from "./actions";
import {FlashMessage} from "./components";
import CssBaseline from "@material-ui/core/CssBaseline";
import AuthModals from './auth/components/modals';

class App extends Component{
    render(){
        const {fm, l} = this.props;
        return (
            <div className="container-fluid">
                <CssBaseline />
                <FlashMessage show={fm.show} color={fm.color} toggle={this.props.toggleFM}>{l[fm.message]||fm.message}</FlashMessage>
                <TopMenu/>
                <AuthModals/>
                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/my/tests" component={MyTests} />
                    <Route exact path="/tests" component={Tests} />
                    <Route path="/tests/:id" component={Test} />
                </main>
            </div>
        )
    }
}

export default  withRouter(connect(
    state => ({
        fm: state.fm,
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        toggleFM
    }, dispatch)
)(App));
