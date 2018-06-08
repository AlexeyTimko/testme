import React, {Component} from 'react';
import {register} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Col, FormGroup, Input, Label} from "reactstrap";

class RegistrationForm extends Component{
    state = {
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
    };
    changeHandler = event => {
        let valid = this.state[event.target.name].regexp.test(event.target.value);
        if(valid && event.target.name === 'passwordConfirm'){
            valid = this.state.password.value === event.target.value;
        }
        if(valid && event.target.name === 'password' && this.state.passwordConfirm.value !== ''){
            valid = this.state.passwordConfirm.value === event.target.value;
        }
        this.setState({
            ...this.state,
            [event.target.name]: {
                ...this.state[event.target.name],
                value: event.target.value,
                valid
            }
        });
    };
    keyPressHandler = event => {
        if(event.key === 'Enter'){
            this.register();
        }
    };
    validate = () => {
        let valid = true;
        for(let field in this.state){
            if(!this.state.hasOwnProperty(field) || !this.state[field].hasOwnProperty('regexp')){
                continue;
            }
            let fieldValid = true;
            if(field === 'passwordConfirm'){
                fieldValid = this.state.password.value === this.state[field].value;
            }
            if(!this.state[field].regexp.test(this.state[field].value) || !fieldValid){
                this.setState({
                    ...this.state,
                    [field]: {
                        ...this.state[field],
                        valid: false
                    }
                });
                valid = false
            }
            if(!valid) break;
        }
        return valid;
    };
    register = () => {
        if(this.validate()){
            let data = {};
            for(let field in this.state){
                if(!this.state.hasOwnProperty(field)){
                    continue;
                }
                data[field] = this.state[field].value;
            }
            this.props.register(data);
        }
    };
    render(){
        const {l} = this.props;
        return(
            <div>
                <FormGroup row>
                    <Label for="regUserEmail" sm={3}>Email</Label>
                    <Col sm={9}>
                        <Input name="email" id="regUserEmail" placeholder="you@site.com"
                               valid={this.state.email.valid}
                               invalid={this.state.email.valid !== null && !this.state.email.valid}
                               value={this.state.email.value} onChange={this.changeHandler}
                               onKeyPress={this.keyPressHandler}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="regUserPassword" sm={3}>{l['Password']}</Label>
                    <Col sm={9}>
                        <Input name="password" id="regUserPassword" type="password"
                               valid={this.state.password.valid}
                               invalid={this.state.password.valid !== null && !this.state.password.valid}
                               value={this.state.password.value} onChange={this.changeHandler}
                               onKeyPress={this.keyPressHandler}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="regUserPasswordConfirm" sm={3}>{l['Confirm password']}</Label>
                    <Col sm={9}>
                        <Input name="passwordConfirm" id="regUserPasswordConfirm" type="password"
                               valid={this.state.passwordConfirm.valid}
                               invalid={this.state.passwordConfirm.valid !== null && !this.state.passwordConfirm.valid}
                               value={this.state.passwordConfirm.value} onChange={this.changeHandler}
                               onKeyPress={this.keyPressHandler}/>
                    </Col>
                </FormGroup>
                <Button color="primary" className="mr-auto" onClick={this.register}>{l['Register']}</Button>
            </div>
        )
    }
}

export default connect(
    state => ({
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        register
    }, dispatch)
)(RegistrationForm);