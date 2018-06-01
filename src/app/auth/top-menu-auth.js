import React, {Component} from 'react';
import {
    Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Nav,
    NavItem
} from "reactstrap";
import {connect} from "react-redux";
import {logIn, register} from "./actions";
import {bindActionCreators} from "redux";

class TopMenuAuth extends Component{
    state = {
        showAuth: false,
        showReg: false,
        auth: {
            email: {
                value: '',
                // eslint-disable-next-line
                regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                valid: null
            },
            password: {
                value: '',
                regexp: /^.{8,}$/,
                valid: null
            },
        },
        reg: {
            email: {
                value: '',
                // eslint-disable-next-line
                regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                valid: null
            },
            password: {
                value: '',
                regexp: /^.{8,}$/,
                valid: null
            },
            passwordConfirm: {
                value: '',
                regexp: /^.{8,}$/,
                valid: null
            },
        }
    };
    authToggle = () => this.setState({
        ...this.state,
        showAuth: !this.state.showAuth
    });
    regToggle = () => this.setState({
        ...this.state,
        showReg: !this.state.showReg
    });
    authChangeHandler = event => {
        this.setState({
            ...this.state,
            auth:{
                ...this.state.auth,
                [event.target.name]: {
                    ...this.state.auth[event.target.name],
                    value: event.target.value,
                    valid: this.state.auth[event.target.name].regexp.test(event.target.value)
                }
            }
        });
    };
    regChangeHandler = event => {
        let valid = this.state.reg[event.target.name].regexp.test(event.target.value);
        if(valid && event.target.name === 'passwordConfirm'){
            valid = this.state.reg.password.value === event.target.value;
        }
        if(valid && event.target.name === 'password' && this.state.reg.passwordConfirm.value !== ''){
            valid = this.state.reg.passwordConfirm.value === event.target.value;
        }
        this.setState({
            ...this.state,
            reg:{
                ...this.state.reg,
                [event.target.name]: {
                    ...this.state.reg[event.target.name],
                    value: event.target.value,
                    valid
                }
            }
        });
    };
    validateAuth = () => {
        let valid = true;
        for(let field in this.state.auth){
            if(!this.state.auth.hasOwnProperty(field) || !this.state.auth[field].hasOwnProperty('regexp')){
                continue;
            }
            if(!this.state.auth[field].regexp.test(this.state.auth[field].value)){
                this.setState({
                    ...this.state,
                    auth:{
                        ...this.state.auth,
                        [field]: {
                            ...this.state.auth[field],
                            valid: false
                        }
                    }
                });
                valid = false
            }
            if(!valid) break;
        }
        return valid;
    };
    validateReg = () => {
        let valid = true;
        for(let field in this.state.reg){
            if(!this.state.reg.hasOwnProperty(field) || !this.state.reg[field].hasOwnProperty('regexp')){
                continue;
            }
            let fieldValid = true;
            if(field === 'passwordConfirm'){
                fieldValid = this.state.reg.password.value === this.state.reg[field].value;
            }
            if(!this.state.reg[field].regexp.test(this.state.reg[field].value) || !fieldValid){
                this.setState({
                    ...this.state,
                    reg:{
                        ...this.state.reg,
                        [field]: {
                            ...this.state.reg[field],
                            valid: false
                        }
                    }
                });
                valid = false
            }
            if(!valid) break;
        }
        return valid;
    };
    auth = () => {
        if(this.validateAuth()){
            let data = {};
            for(let field in this.state.auth){
                if(!this.state.auth.hasOwnProperty(field)){
                    continue;
                }
                data[field] = this.state.auth[field].value;
            }
            this.props.logIn(data);
            this.setState({
                ...this.state,
                showAuth: false
            });
        }
    };
    register = () => {
        if(this.validateReg()){
            let data = {};
            for(let field in this.state.reg){
                if(!this.state.reg.hasOwnProperty(field)){
                    continue;
                }
                data[field] = this.state.reg[field].value;
            }
            this.props.register(data);
            this.setState({
                ...this.state,
                showReg: false
            });
        }
    };
    render() {
        const {l} = this.props;
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Button color="outline-success" className="my-2 my-sm-0 mr-1"
                            onClick={this.authToggle}>{l['Log In']}</Button>
                </NavItem>
                <NavItem>
                    <Button color="primary" className="my-2 my-sm-0"
                            onClick={this.regToggle}>{l['Sign Up']}</Button>
                </NavItem>
                <Modal isOpen={this.state.showAuth} toggle={this.authToggle}>
                    <ModalHeader toggle={this.authToggle}>{l['Log In']}</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Label for="userEmail" sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input name="email" id="userEmail" placeholder="you@site.com"
                                       valid={this.state.auth.email.valid}
                                       invalid={this.state.auth.email.valid !== null && !this.state.auth.email.valid}
                                       value={this.state.auth.email.value} onChange={this.authChangeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="userPassword" sm={3}>{l['Password']}</Label>
                            <Col sm={9}>
                                <Input name="password" id="userPassword" type="password"
                                       valid={this.state.auth.password.valid}
                                       invalid={this.state.auth.password.valid !== null && !this.state.auth.password.valid}
                                       value={this.state.auth.password.value} onChange={this.authChangeHandler}/>
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="mr-auto" onClick={this.auth}>{l['Enter']}</Button>
                        <Button color="secondary" onClick={this.authToggle}>{l['Cancel']}</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.showReg} toggle={this.regToggle}>
                    <ModalHeader toggle={this.regToggle}>{l['Log In']}</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Label for="regUserEmail" sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input name="email" id="regUserEmail" placeholder="you@site.com"
                                       valid={this.state.reg.email.valid}
                                       invalid={this.state.reg.email.valid !== null && !this.state.reg.email.valid}
                                       value={this.state.reg.email.value} onChange={this.regChangeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="regUserPassword" sm={3}>{l['Password']}</Label>
                            <Col sm={9}>
                                <Input name="password" id="regUserPassword" type="password"
                                       valid={this.state.reg.password.valid}
                                       invalid={this.state.reg.password.valid !== null && !this.state.reg.password.valid}
                                       value={this.state.reg.password.value} onChange={this.regChangeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="regUserPasswordConfirm" sm={3}>{l['Confirm password']}</Label>
                            <Col sm={9}>
                                <Input name="passwordConfirm" id="regUserPasswordConfirm" type="password"
                                       valid={this.state.reg.passwordConfirm.valid}
                                       invalid={this.state.reg.passwordConfirm.valid !== null && !this.state.reg.passwordConfirm.valid}
                                       value={this.state.reg.passwordConfirm.value} onChange={this.regChangeHandler}/>
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="mr-auto" onClick={this.register}>{l['Register']}</Button>
                        <Button color="secondary" onClick={this.regToggle}>{l['Cancel']}</Button>
                    </ModalFooter>
                </Modal>
            </Nav>
        );
    }
}

export default connect(
    state => ({
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        register,
        logIn
    }, dispatch)
)(TopMenuAuth);