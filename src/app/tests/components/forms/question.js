import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import FileUpload from '../../../components/file-upload';
import Tooltip from '../../../components/tooltip';
import FA from 'react-fontawesome';
import AnswerList from '../answer-list';
import Answer from './answer';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                text: {
                    value: '',
                    regexp: /^.*$/,
                    valid: null,
                },
                image: {
                    value: '',
                    regexp: /^.*$/,
                    valid: null
                },
                weight: {
                    value: 1,
                    regexp: /^\d+$/,
                    valid: null
                },
                answers: []
            },
            answerOpen: false,
            currentAnswer: null
        };
        if(props.question){
            let {fields} = this.state;
            for(let field in fields){
                if(props.question.hasOwnProperty(field)){
                    if(field === 'answers'){
                        this.state.fields[field] = props.question[field];
                    }else{
                        this.state.fields[field].value = props.question[field];
                    }
                }
            }
        }
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
            let question = {};
            for(let field in this.state.fields){
                if(!this.state.fields.hasOwnProperty(field)){
                    continue;
                }
                if(field === 'answers'){
                    question[field] = this.state.fields[field];
                }else{
                    question[field] = this.state.fields[field].value;
                }
            }
            this.props.onSave(question);
            this.props.close();
        }
    };
    openAnswer = () => this.setState({
        ...this.state,
        answerOpen: true
    });
    hideAnswer = () => this.setState({
        ...this.state,
        answerOpen: false,
        currentAnswer: null
    });
    editAnswer = i => {
        this.setState({
            ...this.state,
            currentAnswer: i,
            answerOpen: true
        });
    };
    deleteAnswer = i => {
        let answers = this.state.fields.answers;
        answers.splice(i, 1);
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                answers
            }
        });
    };
    saveAnswer = answer => {
        let answers = this.state.fields.answers;
        if(this.state.currentAnswer !== null){
            answers[this.state.currentAnswer] = answer
        }else{
            answers.push(answer);
        }
        this.setState({
            ...this.state,
            currentAnswer: null,
            fields: {
                ...this.state.fields,
                answers
            }
        });
    };
    render(){
        const {l} = this.props;
        return (
            <div>
                <Form onSubmit={this.save}>
                    <FormGroup row>
                        <Label for="qText" sm={4}>{l['Question']}</Label>
                        <Col sm={8}>
                            <Input type="textarea" name="text" id="qText"
                                   valid={this.state.fields.text.valid}
                                   invalid={this.state.fields.text.valid !== null && !this.state.fields.text.valid}
                                   value={this.state.fields.text.value} onChange={this.inputChangeHandler}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="qImage" sm={4}>{l['Image']}</Label>
                        <Col sm={8}>
                            <FileUpload name="image" id="qImage" value={this.state.fields.image.value}
                                        onChange={this.imageChangeHandler}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="qWeight" sm={4}>{l['Weight']}</Label>
                        <Col sm={8}>
                            <Input type="tel" name="weight" id="qWeight"
                                   valid={this.state.fields.weight.valid}
                                   invalid={this.state.fields.weight.valid !== null && !this.state.fields.weight.valid}
                                   value={this.state.fields.weight.value} onChange={this.inputChangeHandler}/>
                        </Col>
                    </FormGroup>
                    <fieldset>
                        <legend>{l['Answers']}</legend>
                        <AnswerList items={this.state.fields.answers} onEdit={this.editAnswer}
                                    onDelete={this.deleteAnswer}/>
                        <FA name="plus" size="2x" className="text-success mt-1" id="add-answer"
                            style={{cursor: 'pointer'}} onClick={this.openAnswer}/>
                        <Tooltip target="add-answer">{l['Add']}</Tooltip>
                    </fieldset>
                    <FormGroup row className="mt-3">
                        <Col>
                            <Button color="warning">{l['Save']}</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Modal isOpen={this.state.answerOpen} toggle={this.hideAnswer}>
                    <ModalHeader toggle={this.hideAnswer}>{l['Answer']}</ModalHeader>
                    <ModalBody>
                        <Answer onSave={this.saveAnswer} close={this.hideAnswer}
                                answer={this.state.currentAnswer !== null
                                    ? this.state.fields.answers[this.state.currentAnswer]
                                    : null}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(
    state => ({
        l: state.lng._
    })
)(Question);