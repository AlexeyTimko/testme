import React, {Component} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, CardText} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getTestList} from "../actions";

class TestList extends Component {
    componentDidMount = () => {
        this.props.getTestList();
    };
    render(){
        const {l, list} = this.props;
        return list.length ? (
            <div>
                {
                    list.map((test, i) => (
                        <Card key={i} className="mb-3">
                            <CardHeader>{test.name}</CardHeader>
                            <CardBody>
                                <CardText className="text-justify" style={{"text-indent": "1rem"}}>
                                    {
                                        test.image
                                            ?(
                                                <img width="20%" className="mr-2 mb-2 pull-left" src={`http://test-me.com/img/${test.image}`} alt={test.name} />
                                            )
                                            :null
                                    }
                                    {test.description}
                                </CardText>
                            </CardBody>
                            <CardFooter>
                                <Button color="outline-info">{l['More']}</Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        ) : null;
    }
}

export default connect(
    state => ({
        l: state.lng._,
        list: state.tests,
    }),
    dispatch => bindActionCreators({
        getTestList
    }, dispatch)
)(TestList)