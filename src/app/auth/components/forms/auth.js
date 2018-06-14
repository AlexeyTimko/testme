import React, {Component} from 'react';
import {Button, Col, FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logIn} from "../../actions";

class AuthForm extends Component {
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
    };
    changeHandler = event => {
        this.setState({
            ...this.state,
            [event.target.name]: {
                ...this.state[event.target.name],
                value: event.target.value,
                valid: this.state[event.target.name].regexp.test(event.target.value)
            }
        });
    };
    keyPressHandler = event => {
        if(event.key === 'Enter'){
            this.auth();
        }
    };
    validate = () => {
        let valid = true;
        for(let field in this.state){
            if(!this.state.hasOwnProperty(field) || !this.state[field].hasOwnProperty('regexp')){
                continue;
            }
            if(!this.state[field].regexp.test(this.state[field].value)){
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
    auth = () => {
        if(this.validate()){
            let data = {};
            for(let field in this.state){
                if(!this.state.hasOwnProperty(field)){
                    continue;
                }
                data[field] = this.state[field].value;
            }
            this.props.logIn(data);
        }
    };
    render(){
        const {l} = this.props;
        return (
            <div>
                <FormGroup row>
                    <Label for="userEmail" sm={3}>Email</Label>
                    <Col sm={9}>
                        <Input name="email" id="userEmail" placeholder="you@site.com"
                               valid={this.state.email.valid}
                               invalid={this.state.email.valid !== null && !this.state.email.valid}
                               value={this.state.email.value} onChange={this.changeHandler}
                               onKeyPress={this.keyPressHandler}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="userPassword" sm={3}>{l['Password']}</Label>
                    <Col sm={9}>
                        <Input name="password" id="userPassword" type="password"
                               valid={this.state.password.valid}
                               invalid={this.state.password.valid !== null && !this.state.password.valid}
                               value={this.state.password.value} onChange={this.changeHandler}
                               onKeyPress={this.keyPressHandler}/>
                    </Col>
                </FormGroup>
                <Button color="primary" className="mr-auto" onClick={this.auth}>{l['Enter']}</Button>
            </div>
        );
    }
}

export default connect(
    state => ({
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        logIn
    }, dispatch)
)(AuthForm);