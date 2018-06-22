import React, {Component, Fragment} from 'react';
import {register} from "../../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, DialogActions, DialogContent, TextField} from "@material-ui/core";

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
        const {l, close} = this.props;
        return(
            <Fragment>
                <DialogContent>
                    <TextField
                        error={this.state.email.valid !== null && !this.state.email.valid}
                        id="userEmail"
                        label="Email"
                        name="email"
                        placeholder="you@site.com"
                        margin="normal"
                        fullWidth
                        value={this.state.email.value} onChange={this.changeHandler}
                        onKeyPress={this.keyPressHandler}
                    />
                    <TextField
                        error={this.state.password.valid !== null && !this.state.password.valid}
                        type="password"
                        id="userPassword"
                        label={l['Password']}
                        name="password"
                        margin="normal"
                        fullWidth
                        value={this.state.password.value} onChange={this.changeHandler}
                        onKeyPress={this.keyPressHandler}
                    />
                    <TextField
                        error={this.state.passwordConfirm.valid !== null && !this.state.passwordConfirm.valid}
                        type="password"
                        id="regUserPasswordConfirm"
                        label={l['Confirm password']}
                        name="passwordConfirm"
                        margin="normal"
                        fullWidth
                        value={this.state.passwordConfirm.value} onChange={this.changeHandler}
                        onKeyPress={this.keyPressHandler}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="secondary">
                        {l['Cancel']}
                    </Button>
                    <Button onClick={this.register} color="primary">
                        {l['Enter']}
                    </Button>
                </DialogActions>
            </Fragment>
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