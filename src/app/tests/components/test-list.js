import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getTestList} from "../actions";

class TestList extends Component {
    componentDidMount = () => {
        this.props.getTestList();
    };
    render(){
        return this.props.list.length ? (
            <ListGroup>
                {
                    this.props.list.map((test, i) => (
                        <ListGroupItem key={i}>
                            {test.name}
                        </ListGroupItem>
                    ))
                }
            </ListGroup>
        ) : null;
    }
}

export default connect(
    state => ({
        list: state.tests,
    }),
    dispatch => bindActionCreators({
        getTestList
    }, dispatch)
)(TestList)