import React, {Component} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Progress} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Result extends Component {
    render(){
        const {l, test} = this.props;
        const result = test.result;
        const pct = result ? result.pct : 0;
        let color = 'danger';
        if(pct > 75) color = 'success';
        else if(pct > 50) color = 'info';
        else if(pct > 25) color = 'warning';
        return (
            <Card className="mt-2">
                <CardHeader>{test.name}</CardHeader>
                <CardBody>
                    <CardTitle className={`text-center`}>{l['Result']}</CardTitle>
                    <CardText className={`text-center font-weight-bold text-${color}`} style={{fontSize: "3rem"}}>{pct}%</CardText>
                    <Progress color={color} value={pct}/>
                </CardBody>
                <CardFooter>
                    <Button color="outline-info" onClick={this.props.onRestart}>{l['Try again']}</Button>
                    <Link to={`/tests`} className="btn btn-outline-success pull-right">{l['Finish']}</Link>
                </CardFooter>
            </Card>
        );
    }
}

export default withRouter(connect(
    state => ({
        l: state.lng._,
        test: state.test
    })
)(Result));