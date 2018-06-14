import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {saveTest} from "../../actions";
import FileUpload from '../../../components/file-upload';
import Tooltip from '../../../components/tooltip';
import FA from 'react-fontawesome';
import QuestionList from '../question-list';
import Question from './question';

class TestAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            fields: {
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
                },
            },
            questions: [],
            questionOpen: false,
            currentQuestion: null
        };
    }
    inputChangeHandler = event => {
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [event.target.name]: {
                    ...this.state.fields[event.target.name],
                    value: event.target.value,
                    valid: this.state.fields[event.target.name].regexp.test(event.target.value)
                }
            }
        });
    };
    imageChangeHandler = image => {
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                image: {
                    ...this.state.fields.image,
                    value: image
                }
            }
        });
    };
    checkboxChangeHandler = event => {
        let val = event.target.checked;
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [event.target.name]: {
                    ...this.state.fields[event.target.name],
                    value: val,
                    valid: this.state.fields[event.target.name].regexp.test(val)
                }
            }
        });
    };
    validate = () => {
        let valid = true;
        for (let field in this.state.fields) {
            if (!this.state.fields.hasOwnProperty(field) || !this.state.fields[field].hasOwnProperty('regexp')) {
                continue;
            }
            switch (field) {
                case 'timeLimit':
                    if (this.state.fields.isLimited.value) {
                        break;
                    }
                // eslint-disable-next-line
                default:
                    if (!this.state.fields[field].regexp.test(this.state.fields[field].value)) {
                        this.setState({
                            ...this.state,
                            fields: {
                                ...this.state.fields,
                                [field]: {
                                    ...this.state.fields[field],
                                    valid: false
                                }
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
        if (this.validate()) {
            this.props.saveTest({...this.state.fields});
            this.props.close();
        }
    };
    editQuestion = i => {
        this.setState({
            ...this.state,
            currentQuestion: i,
            questionOpen: true
        });
    };
    deleteQuestion = i => {
        let questions = this.state.questions;
        questions.splice(i, 1);
        this.setState({
            ...this.state,
            questions
        });
    };
    hideQuestion = () => this.setState({
        ...this.state,
        questionOpen: false,
        currentQuestion: null
    });
    openQuestion = () => this.setState({
        ...this.state,
        questionOpen: true
    });
    saveQuestion = question => {
        let questions = this.state.questions;
        if(this.state.currentQuestion !== null){
            questions[this.state.currentQuestion] = question
        }else{
            questions.push(question);
        }
        this.setState({
            ...this.state,
            currentQuestion: null,
            questions
        });
    };
    render() {
        const {l} = this.props;
        return this.props.visible
            ? (
                <div>
                    <Form onSubmit={this.save}>
                        <h1>{l['New Test']}{this.state.fields.name.value ? (`: ${this.state.fields.name.value}`) : ''}</h1>
                        <hr/>
                        <FormGroup row>
                            <Label for="testName" sm={2}>{l['Test name']}</Label>
                            <Col sm={10}>
                                <Input name="name" id="testName" placeholder={l["Your test's name"]}
                                       valid={this.state.fields.name.valid}
                                       invalid={this.state.fields.name.valid !== null && !this.state.fields.name.valid}
                                       value={this.state.fields.name.value} onChange={this.inputChangeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="testDescription" sm={2}>{l['Description']}</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="description" id="testDescription"
                                       placeholder={l['Describe the test']}
                                       valid={this.state.fields.description.valid}
                                       invalid={this.state.fields.description.valid !== null && !this.state.fields.description.valid}
                                       value={this.state.fields.description.value} onChange={this.inputChangeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="testImage" sm={2}>{l['Image']}</Label>
                            <Col sm={10}>
                                <FileUpload name="image" onChange={this.imageChangeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="testIsPrivate" name="isPrivate"
                                       valid={this.state.fields.isPrivate.valid}
                                       invalid={this.state.fields.isPrivate.valid !== null && !this.state.fields.isPrivate.valid}
                                       onChange={this.checkboxChangeHandler}/>{' '}
                                {l['Private test']}
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="testIsLimited" name="isLimited"
                                       valid={this.state.fields.isLimited.valid}
                                       invalid={this.state.fields.isLimited.valid !== null && !this.state.fields.isLimited.valid}
                                       onChange={this.checkboxChangeHandler}/>{' '}
                                {l['Set time limit']}
                            </Label>
                        </FormGroup>
                        {this.state.fields.isLimited.value ? (
                            <FormGroup row>
                                <Label for="testTimeLimit" sm={2}>{l['Time limit, sec']}</Label>
                                <Col sm={10}>
                                    <Input type="tel" name="timeLimit" id="timeLimit" placeholder="60"
                                           valid={this.state.fields.timeLimit.valid}
                                           invalid={this.state.fields.timeLimit.valid !== null && !this.state.fields.timeLimit.valid}
                                           value={this.state.fields.timeLimit.value}
                                           onChange={this.inputChangeHandler}/>
                                </Col>
                            </FormGroup>
                        ) : null}
                        <fieldset>
                            <legend>{l['Questions']}</legend>
                            <QuestionList items={this.state.questions} onEdit={this.editQuestion}
                                          onDelete={this.deleteQuestion}/>
                            <FA name="plus" size="2x" className="text-success mt-1" id="add-question"
                                style={{cursor: 'pointer'}} onClick={this.openQuestion}/>
                            <Tooltip target="add-question">{l['Add']}</Tooltip>
                        </fieldset>
                        <FormGroup row className="mt-3">
                            <Col>
                                <Button color="warning">{l['Save']}</Button>
                                <Button className="float-right" onClick={this.props.close}>{l['Close']}</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <Modal isOpen={this.state.questionOpen} toggle={this.hideQuestion}>
                        <ModalHeader toggle={this.hideQuestion}>{l['Question']}</ModalHeader>
                        <ModalBody>
                            <Question onSave={this.saveQuestion} close={this.hideQuestion}
                                      question={this.state.currentQuestion !== null
                                          ? this.state.questions[this.state.currentQuestion]
                                          : null}/>
                        </ModalBody>
                    </Modal>
                </div>
            )
            : null;
    }
}

export default connect(
    state => ({
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        saveTest
    }, dispatch)
)(TestAdd);