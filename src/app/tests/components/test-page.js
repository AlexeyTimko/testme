import React, {Component} from 'react';
import {Col, Container, Row} from "reactstrap";
import Test from './test';

export default class TestPage extends Component {
    render() {
        const {match} = this.props;
        return (
            <Container className="container-fluid">
                <Row>
                    <Col sm={{size: 6, offset: 3}}>
                        <Test id={match.params.id}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}