import React, {Component, Fragment} from 'react';
import {hideAuth, hideReg} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import AuthForm from './forms/auth';
import RegistrationForm from './forms/registration';
import {Dialog, DialogTitle} from "@material-ui/core";

class AuthModals extends Component {
    render() {
        const {auth, l, hideAuth, hideReg} = this.props;
        return (
            <Fragment>
                <Dialog
                    open={auth.authShow}
                    onClose={hideAuth}
                    disableEnforceFocus
                    aria-labelledby="auth-title"
                >
                    <DialogTitle id="auth-title">{l['Log In']}</DialogTitle>
                    <AuthForm close={hideAuth}/>
                </Dialog>
                <Dialog
                    open={auth.regShow}
                    onClose={hideReg}
                    disableEnforceFocus
                    aria-labelledby="reg-title"
                >
                    <DialogTitle id="reg-title">{l['Sign Up']}</DialogTitle>
                    <RegistrationForm close={hideReg}/>
                </Dialog>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        auth: state.auth,
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        hideAuth,
        hideReg
    }, dispatch)
)(AuthModals);