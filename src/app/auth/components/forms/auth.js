import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logIn} from "../../actions";
import {Button, DialogActions, DialogContent, TextField} from "@material-ui/core";

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
        const {l, close} = this.props;
        return (
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="secondary">
                        {l['Cancel']}
                    </Button>
                    <Button onClick={this.auth} color="primary">
                        {l['Enter']}
                    </Button>
                </DialogActions>
            </Fragment>
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