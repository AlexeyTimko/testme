import React, {Component} from 'react';
import {Card, CardBody, CardHeader, CardText} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getTestList} from "../actions";
import {Link, withRouter} from "react-router-dom";
import FA from 'react-fontawesome';
import {Tooltip} from '../../components';

class TestList extends Component {
    componentDidMount = () => {
        this.props.getTestList();
    };
    edit = i => {
        this.props.onEdit(this.props.list[i].id);
    };
    render(){
        const {list, auth} = this.props;
        return list.length ? (
            <div>
                {
                    list.map((test, i) => (
                        <Card key={i} className="mb-3">
                            <CardHeader>
                                <Link to={`/tests/${test.id}`}>{test.name}</Link>
                                {
                                    (auth.user && test.user === auth.user.id)
                                        ? (
                                            <span>
                                                <FA name="edit" onClick={() => this.edit(i)} id={`edit-${i}`}
                                                    className="text-warning pull-right mr-1 mt-1"
                                                    style={{cursor: 'pointer'}}/>
                                                <Tooltip target={`edit-${i}`}>Edit</Tooltip>
                                            </span>
                                        ) : null
                                }
                            </CardHeader>
                            <CardBody>
                                <CardText className="text-justify clearfix" style={{textIndent: "1rem"}}>
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
                        </Card>
                    ))
                }
            </div>
        ) : null;
    }
}

export default withRouter(connect(
    state => ({
        l: state.lng._,
        list: state.tests,
        auth: state.auth
    }),
    dispatch => bindActionCreators({
        getTestList
    }, dispatch)
)(TestList));