import React, {Component} from 'react';
import {connect} from "react-redux";
import {answerTest, loadTest} from "../actions";
import {bindActionCreators} from "redux";
import {Alert, Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import FA from 'react-fontawesome';
import Question from "./question";
import Result from "./result";
import config from '../../config';
import Timer from "./timer";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: null,
            finished: false,
            question: null,
            questions: []
        };
        if (props.hasOwnProperty('id')) {
            props.loadTest(props.id);
        }
    }

    start = () => {
        this.setState({
            ...this.state,
            started: (new Date()).getTime(),
            question: 0
        });
    };

    finish = () => {
        this.setState({
            ...this.state,
            question: null,
            finished: true
        }, () => {
            this.props.answerTest({
                id: this.props.test.id,
                answers: this.state.questions
            });
        });
    };

    answer = answers => {
        let question = this.state.question + 1;
        if (question === this.props.test.questions.length) {
            question = null;
        }
        const finished = question === null;

        this.setState({
            ...this.state,
            questions: [
                ...this.state.questions,
                {
                    id: this.props.test.questions[this.state.question].id,
                    answers
                }
            ],
            question,
            finished
        }, () => {
            if (finished) {
                this.props.answerTest({
                    id: this.props.test.id,
                    answers: this.state.questions
                });
            }
        });
    };

    restart = () => {
        this.setState({
            started: null,
            finished: false,
            question: null,
            questions: []
        });
        this.props.loadTest(this.props.test.id);
    };

    render() {
        const {l, test} = this.props;
        return this.state.finished ? (<Result onRestart={this.restart}/>) :
            this.state.question !== null ? (
                    <div className="mt-2">
                        <Timer timeout={test.timelimit} onFinish={this.finish}>{l['Time left']}</Timer>
                        <Question test={test} item={test.questions[this.state.question]}
                                  onAnswer={this.answer}/>
                    </div>
                ) :
                test.id ? (
                    <Card className="mt-2">
                        {
                            test.image
                                ? (
                                    <CardImg top src={`${config.host}/img/${test.image}`}
                                             alt={test.name}/>
                                )
                                : null
                        }
                        <CardBody>
                            <CardTitle>{test.name}</CardTitle>
                            <CardText className="text-justify clearfix"
                                      style={{textIndent: "1rem"}}>
                                {test.description}
                            </CardText>
                            <CardText className="text-center">
                                <Button color="info" size="lg" onClick={this.start}>
                                    <FA name="forward"/>{' '}
                                    {l['Start test']}
                                </Button>
                            </CardText>
                        </CardBody>
                    </Card>
                ) : test === '' ? (<Alert color="warning">{l['Test not found']}</Alert>) : null
    }
}

export default connect(
    state => ({
        l: state.lng._,
        test: state.test
    }),
    dispatch => bindActionCreators({
        loadTest,
        answerTest
    }, dispatch)
)(Test);