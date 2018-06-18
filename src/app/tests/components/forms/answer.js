import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux";

class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                text: {
                    value: '',
                    regexp: /^[^]+$/,
                    valid: null,
                },
                correct: {
                    value: false,
                    regexp: /^.*$/,
                    valid: null
                },
            }
        };
        if(props.answer){
            let {fields} = this.state;
            for(let field in fields){
                if(props.answer.hasOwnProperty(field)){
                    this.state.fields[field].value = props.answer[field];
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
            let answer = {};
            for(let field in this.state.fields){
                if(!this.state.fields.hasOwnProperty(field)){
                    continue;
                }
                answer[field] = this.state.fields[field].value;
            }
            this.props.onSave(answer);
            this.props.close();
        }
    };
    render(){
        const {l} = this.props;
        return (
            <Form onSubmit={this.save}>
                <FormGroup row>
                    <Label for="aText" sm={4}>{l['Answer']}</Label>
                    <Col sm={8}>
                        <Input type="textarea" name="text" id="aText"
                               valid={this.state.fields.text.valid}
                               invalid={this.state.fields.text.valid !== null && !this.state.fields.text.valid}
                               value={this.state.fields.text.value} onChange={this.inputChangeHandler}/>
                    </Col>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" id="aCorrect" name="correct" checked={this.state.fields.correct.value}
                               valid={this.state.fields.correct.valid}
                               invalid={this.state.fields.correct.valid !== null && !this.state.fields.correct.valid}
                               onChange={this.checkboxChangeHandler}/>{' '}
                        {l['Correct']}
                    </Label>
                </FormGroup>
                <FormGroup row className="mt-3">
                    <Col>
                        <Button color="warning">{l['Save']}</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default connect(
    state => ({
        l: state.lng._
    })
)(Answer);