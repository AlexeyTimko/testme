import React, {Component, Fragment} from 'react';
import {hideAuth, hideReg} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import AuthForm from './forms/auth';
import RegistrationForm from './forms/registration';

class AuthModals extends Component {
    render() {
        const {auth, l, hideAuth, hideReg} = this.props;
        return (
            <Fragment>
                <Modal isOpen={auth.authShow} toggle={hideAuth}>
                    <ModalHeader toggle={hideAuth}>{l['Log In']}</ModalHeader>
                    <ModalBody>
                        <AuthForm/>
                    </ModalBody>
                </Modal>
                <Modal isOpen={auth.regShow} toggle={hideReg}>
                    <ModalHeader toggle={hideReg}>{l['Sign Up']}</ModalHeader>
                    <ModalBody>
                        <RegistrationForm/>
                    </ModalBody>
                </Modal>
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