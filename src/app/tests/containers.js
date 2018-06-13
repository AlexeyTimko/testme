import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {saveTest} from "./actions";
import FileUpload from '../components/file-upload';

const initialState = {
    name: {
        value: '',
        regexp: /^.{3,}$/,
        valid: null
    },
    description: {
        value: '',
        regexp: /^.*$/,
        valid: null
    },
    isPrivate: {
        value: false,
        regexp: /^.*$/,
        valid: null
    },
    isLimited: {
        value: false,
        regexp: /^.*$/,
        valid: null
    },
    timeLimit: {
        value: 0,
        regexp: /^[\d]+$/,
        valid: null
    },
    image: {
        value: '',
        regexp: /^.*$/,
        valid: null
    }
};

class AddTest extends Component {
    state = initialState;
    inputChangeHandler = event => {
        this.setState({
            ...this.state,
            [event.target.name]: {
                ...this.state[event.target.name],
                value: event.target.value,
                valid: this.state[event.target.name].regexp.test(event.target.value)
            }
        });
    };
    imageChangeHandler = image => {
        this.setState({
            ...this.state,
            image: {
                ...this.state.image,
                value: image
            }
        });
    };
    checkboxChangeHandler = event => {
        let val = event.target.checked;
        this.setState({
            ...this.state,
            [event.target.name]: {
                ...this.state[event.target.name],
                value: val,
                valid: this.state[event.target.name].regexp.test(val)
            }
        });
    };
    validate = () => {
        let valid = true;
        for(let field in this.state){
            if(!this.state.hasOwnProperty(field) || !this.state[field].hasOwnProperty('regexp')){
                continue;
            }
            switch (field){
                case 'timeLimit':
                    if(this.state.isLimited.value){
                        break;
                    }
                // eslint-disable-next-line
                default:
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
            }
        }
        return valid;
    };
    save = event => {
        event.preventDefault();
        if(this.validate()){
            this.props.saveTest({...this.state});
            this.props.toggle();
            this.setState(initialState);
        }
    };
    renderForm = () => (
        <Form onSubmit={this.save}>
            <h1>{this.props.l['New Test']}{this.state.name.value ? (`: ${this.state.name.value}`) : ''}</h1>
            <hr/>
            <FormGroup row>
                <Label for="testName" sm={2}>{this.props.l['Test name']}</Label>
                <Col sm={10}>
                    <Input name="name" id="testName" placeholder={this.props.l["Your test's name"]}
                           valid={this.state.name.valid}
                           invalid={this.state.name.valid !== null && !this.state.name.valid}
                           value={this.state.name.value} onChange={this.inputChangeHandler}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="testDescription" sm={2}>{this.props.l['Description']}</Label>
                <Col sm={10}>
                    <Input type="textarea" name="description" id="testDescription" placeholder={this.props.l['Describe the test']}
                           valid={this.state.description.valid}
                           invalid={this.state.description.valid !== null && !this.state.description.valid}
                           value={this.state.description.value} onChange={this.inputChangeHandler}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="testImage" sm={2}>{this.props.l['Image']}</Label>
                <Col sm={10}>
                    <FileUpload name="image" onChange={this.imageChangeHandler}/>
                </Col>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" id="testIsPrivate" name="isPrivate"
                           valid={this.state.isPrivate.valid}
                           invalid={this.state.isPrivate.valid !== null && !this.state.isPrivate.valid}
                           onChange={this.checkboxChangeHandler} />{' '}
                    {this.props.l['Private test']}
                </Label>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" id="testIsLimited" name="isLimited"
                           valid={this.state.isLimited.valid}
                           invalid={this.state.isLimited.valid !== null && !this.state.isLimited.valid}
                           onChange={this.checkboxChangeHandler} />{' '}
                    {this.props.l['Set time limit']}
                </Label>
            </FormGroup>
            {this.state.isLimited.value ? (
                <FormGroup row>
                    <Label for="testTimeLimit" sm={2}>{this.props.l['Time limit, sec']}</Label>
                    <Col sm={10}>
                        <Input type="tel" name="timeLimit" id="timeLimit" placeholder="60"
                               valid={this.state.timeLimit.valid}
                               invalid={this.state.timeLimit.valid !== null && !this.state.timeLimit.valid}
                               value={this.state.timeLimit.value} onChange={this.inputChangeHandler}/>
                    </Col>
                </FormGroup>
            ) : null}
            <FormGroup row className="mt-3">
                <Col>
                    <Button color="warning">{this.props.l['Save']}</Button>
                    <Button className="float-right" onClick={this.props.toggle}>{this.props.l['Close']}</Button>
                </Col>
            </FormGroup>
        </Form>
    );
    render() {
        return (
            this.props.visible
                ? this.renderForm()
                : null
        );
    }
}

export const AddTestForm = connect(
    state => ({
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        saveTest
    }, dispatch)
)(AddTest);