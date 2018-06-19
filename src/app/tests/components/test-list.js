import React, {Component} from 'react';
import {Card, CardBody, CardHeader, CardText} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {deleteTest, getTestList} from "../actions";
import {Link, withRouter} from "react-router-dom";
import FA from 'react-fontawesome';
import {Tooltip} from '../../components';
import config from '../../config';

class TestList extends Component {
    constructor(props){
        super(props);
        this.GAP = 200;
        let params = {};
        if(props.auth.user && props.hasOwnProperty('my')){
            params.user = props.auth.user.id
        }
        this.state = {
            ...params,
            page: 1
        };
        this.props.getTestList(params);
    }
    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll, false);
    };
    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll, false);
    };
    handleScroll = () => {
        // const { handleScroll, rootRef } = this;
        // const { innerHeight, scrollY } = window;
        // const { offsetTop, scrollHeight } = rootRef;
        // const {page} = this.state;
        // if (
        //     innerHeight + scrollY > (offsetTop + scrollHeight) - this.GAP &&
        //     itemsCurrentPage !== itemsLastPage &&
        //     !itemsRequested
        // ) {
        //     fetchItems(itemsCurrentPage + 1).then(handleScroll);
        // }
    };
    edit = i => {
        this.props.onEdit(this.props.list[i].id);
    };
    deleteTest = i => {
        if(window.confirm(this.props.l['Are you sure?'])){
            let params = {
                id: this.props.list[i].id,
                token: this.props.auth.token
            };
            if(this.props.auth.user && this.props.hasOwnProperty('my')){
                params.user = this.props.auth.user.id
            }
            this.props.deleteTest(params);
        }
    };
    setRootRef = element => {
        this.rootRef = element;
    };
    render(){
        const {list, auth} = this.props;
        return list.length ? (
            <div ref={this.setRootRef}>
                {
                    list.map((test, i) => (
                        <Card key={i} className="mb-3">
                            <CardHeader>
                                <Link to={`/tests/${test.id}`}>{test.name}</Link>
                                {
                                    (auth.user && test.user === auth.user.id)
                                        ? (
                                            <span>
                                                <FA name="minus" onClick={() => this.deleteTest(i)} id={`delete-${i}`}
                                                    className="text-danger pull-right mr-1 mt-1"
                                                    style={{cursor: 'pointer'}}/>
                                                <Tooltip target={`delete-${i}`}>Delete</Tooltip>
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
                                                <img width="20%" className="mr-2 mb-2 pull-left" src={`${config.host}/img/${test.image}`} alt={test.name} />
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
        getTestList,
        deleteTest,
    }, dispatch)
)(TestList));