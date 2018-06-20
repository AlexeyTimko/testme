import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadTest, saveTest, updateTest} from "../../actions";
import FileUpload from '../../../components/file-upload';
import Tooltip from '../../../components/tooltip';
import FA from 'react-fontawesome';
import QuestionList from '../question-list';
import Question from './question';
import {Paper} from "@material-ui/core";

class TestEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            fields: {
                name: {
                    regexp: /^.{3,}$/,
                    valid: null
                },
                description: {
                    regexp: /^[^]*$/,
                    valid: null
                },
                isprivate: {
                    regexp: /^.*$/,
                    valid: null
                },
                islimited: {
                    regexp: /^.*$/,
                    valid: null
                },
                timelimit: {
                    regexp: /^[\d]+$/,
                    valid: null
                },
                image: {
                    regexp: /^.*$/,
                    valid: null
                },
            },
            questionOpen: false,
            isNew: true,
            currentQuestion: null
        };
        if(props.testId > 0){
            this.state.isNew = false;
            props.loadTest(props.testId);
        }
    }
    inputChangeHandler = event => {
        const field = event.target.name,
            val = event.target.value;
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [field]: {
                    ...this.state.fields[field],
                    valid: this.state.fields[field].regexp.test(val)
                }
            }
        },
            () => this.props.updateTest({
                ...this.props.test,
                [field]: val
            })
        );
    };
    imageChangeHandler = image => {
        this.props.updateTest({
            ...this.props.test,
            image
        });
    };
    checkboxChangeHandler = event => {
        const field = event.target.name,
            val = event.target.checked;
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [field]: {
                    ...this.state.fields[field],
                    valid: this.state.fields[field].regexp.test(val)
                }
            }
        }, () => this.props.updateTest({
            ...this.props.test,
            [field]: val
        }));
    };
    validate = () => {
        let valid = true;
        for (let field in this.state.fields) {
            if (!this.state.fields.hasOwnProperty(field) || !this.state.fields[field].hasOwnProperty('regexp')) {
                continue;
            }
            switch (field) {
                case 'timeLimit':
                    if (!this.props.test.isLimited) {
                        break;
                    }
                // eslint-disable-next-line
                default:
                    if (!this.state.fields[field].regexp.test(this.props.test[field])) {
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
            let data = {
                ...this.props.test,
                token: this.props.auth.token
            };
            this.props.saveTest(data);
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
        let questions = this.props.test.questions;
        questions.splice(i, 1);
        this.props.updateTest({
            ...this.props.test,
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
        let questions = this.props.test.questions;
        if(this.state.currentQuestion !== null){
            questions[this.state.currentQuestion] = question
        }else{
            questions.push(question);
        }
        this.setState({
            ...this.state,
            currentQuestion: null
        }, () => this.props.updateTest({
            ...this.props.test,
            questions
        }));
    };
    render() {
        const {l, test} = this.props;
        return (!this.state.isNew && test.id) || this.state.isNew
            ? (
                <Paper style={{padding: '1rem'}} elevation={4}>
                    <Form onSubmit={this.save}>
                        <h1>{test.name || l['New Test']}</h1>
                        <hr/>
                        <FormGroup row>
                            <Label for="testName" sm={2}>{l['Test name']}</Label>
                            <Col sm={10}>
                                <Input name="name" id="testName" placeholder={l["Your test's name"]}
                                       valid={this.state.fields.name.valid}
                                       invalid={this.state.fields.name.valid !== null && !this.state.fields.name.valid}
                                       value={test.name} onChange={this.inputChangeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="testDescription" sm={2}>{l['Description']}</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="description" id="testDescription"
                                       placeholder={l['Describe the test']}
                                       valid={this.state.fields.description.valid}
                                       invalid={this.state.fields.description.valid !== null && !this.state.fields.description.valid}
                                       value={test.description} onChange={this.inputChangeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="testImage" sm={2}>{l['Image']}</Label>
                            <Col sm={10}>
                                <FileUpload name="image" value={test.image} onChange={this.imageChangeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="testIsLimited" name="islimited" checked={test.islimited}
                                       valid={this.state.fields.islimited.valid}
                                       invalid={this.state.fields.islimited.valid !== null && !this.state.fields.islimited.valid}
                                       onChange={this.checkboxChangeHandler}/>{' '}
                                {l['Set time limit']}
                            </Label>
                            {test.islimited ? (
                                <Input type="tel" name="timelimit" id="timeLimit" placeholder="60"
                                       valid={this.state.fields.timelimit.valid}
                                       invalid={this.state.fields.timelimit.valid !== null && !this.state.fields.timelimit.valid}
                                       value={test.timelimit}
                                       onChange={this.inputChangeHandler}/>
                            ) : null}
                        </FormGroup>
                        <fieldset>
                            <legend>{l['Questions']}</legend>
                            <QuestionList items={test.questions} onEdit={this.editQuestion}
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
                                          ? test.questions[this.state.currentQuestion]
                                          : null}/>
                        </ModalBody>
                    </Modal>
                </Paper>
            )
            : null;
    }
}

export default connect(
    state => ({
        l: state.lng._,
        auth: state.auth,
        test: state.test
    }),
    dispatch => bindActionCreators({
        saveTest,
        loadTest,
        updateTest
    }, dispatch)
)(TestEdit);