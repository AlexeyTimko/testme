import React, {Component} from 'react';
import {
    Button, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Nav, NavItem,
    UncontrolledDropdown
} from "reactstrap";
import {connect} from "react-redux";
import AuthForm from './forms/auth';
import RegistrationForm from './forms/registration';
import {bindActionCreators} from "redux";
import FA from 'react-fontawesome';
import {hideAuth, hideReg, logOut, showAuth, showReg} from "../actions";
import { push } from 'react-router-redux';

class TopMenuAuth extends Component{
    render() {
        const {l, auth} = this.props;
        return this.props.auth.user ? (
            <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="text-info">
                        {auth.user.email}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.props.toMyTests} className="text-secondary">
                            <FA name="book"/>{' '}
                            {l['My tests']}
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={this.props.logOut} className="text-info">
                            <FA name="sign-out"/>{' '}
                            {l['Exit']}
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        ): (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Button color="outline-success" className="my-2 my-sm-0 mr-1"
                            onClick={this.props.showAuth}><FA name="sign-in"/>{' '}{l['Log In']}</Button>
                </NavItem>
                <NavItem>
                    <Button color="primary" className="my-2 my-sm-0"
                            onClick={this.props.showReg}>{l['Sign Up']}</Button>
                </NavItem>
                <Modal isOpen={auth.authShow} toggle={this.props.hideAuth}>
                    <ModalHeader toggle={this.props.hideAuth}>{l['Log In']}</ModalHeader>
                    <ModalBody>
                        <AuthForm/>
                    </ModalBody>
                </Modal>
                <Modal isOpen={auth.regShow} toggle={this.props.hideReg}>
                    <ModalHeader toggle={this.props.hideReg}>{l['Sign Up']}</ModalHeader>
                    <ModalBody>
                        <RegistrationForm/>
                    </ModalBody>
                </Modal>
            </Nav>
        );
    }
}

export default connect(
    state => ({
        l: state.lng._,
        auth: state.auth
    }),
    dispatch => bindActionCreators({
        showAuth,
        hideAuth,
        showReg,
        hideReg,
        logOut,
        toMyTests: ()=>push('/my/tests'),
    }, dispatch)
)(TopMenuAuth);