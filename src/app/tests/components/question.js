import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader, CardImg, CardTitle, FormGroup, Input, Label} from "reactstrap";
import FA from 'react-fontawesome';

export default class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            answers: []
        };
    }
    checkHandler = id => {
        let answers = [...this.state.answers];
        const i = answers.indexOf(id);
        if(i >= 0){
            answers.splice(i, 1);
        }else{
            answers.push(id);
        }
        this.setState({
            ...this.state,
            answers
        });
    };
    render(){
        const {item, onAnswer, test} = this.props;
        return (
            <Card>
                <CardHeader>{test.name}</CardHeader>
                <CardBody>
                    {item.text?(<CardTitle className="text-justify clearfix" style={{textIndent: "1rem"}}>{item.text}</CardTitle>):null}
                    {item.image?(<CardImg src={`http://test-me.com/img/${item.image}`}/>):null}
                    <hr/>
                    {item.answers.map(answer => (
                        <FormGroup key={answer.id} check>
                            <Label check>
                                <Input type="checkbox" checked={this.state.answers.indexOf(answer.id) >= 0}
                                       onChange={()=>this.checkHandler(answer.id)}/>{' '}
                                {answer.text}
                            </Label>
                        </FormGroup>
                    ))}
                </CardBody>
                <Button color="success" size="lg" onClick={()=>onAnswer(this.state.answers)}>
                    <FA name="check"/>{' '}
                    OK
                </Button>
            </Card>
        );
    }
}