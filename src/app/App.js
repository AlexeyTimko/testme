import React, {Component} from 'react';
import Home from './home';
import Tests from './tests';
import TestPage from  './tests/components/test-page';
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
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {deepOrange, brown} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";

const theme = createMuiTheme({
    palette: {
        primary: deepOrange,
        secondary: brown,
    },
});

const styles = {
    root: {
        backgroundColor: brown[100],
        height: '100%'
    }
};

class App extends Component{
    render(){
        const {fm, l, classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <FlashMessage show={fm.show} color={fm.color} toggle={this.props.toggleFM}>{l[fm.message]||fm.message}</FlashMessage>
                    <TopMenu/>
                    <AuthModals/>
                    <main>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/my/tests" component={MyTests} />
                        <Route exact path="/tests" component={Tests} />
                        <Route path="/tests/:id" component={TestPage} />
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default  withStyles(styles)(withRouter(connect(
    state => ({
        fm: state.fm,
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        toggleFM
    }, dispatch)
)(App)));
