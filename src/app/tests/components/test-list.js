import React, {Component} from 'react';
import {Card, CardBody, CardHeader, CardText} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {deleteTest, getTestList, nextPage} from "../actions";
import {Link, withRouter} from "react-router-dom";
import {ConfirmDialog} from '../../components';
import config from '../../config';
import {Paper} from "@material-ui/core";
import {Edit, Remove} from "@material-ui/icons/es/index";
import {IconButton, Tooltip} from "@material-ui/core/es/index";

class TestList extends Component {
    constructor(props){
        super(props);
        this.GAP = 200;
        let params = {};
        if(props.auth.user && props.hasOwnProperty('my')){
            params.user = props.auth.user.id
        }
        this.state = {
            params,
            confirm: {
                open: false,
                i: null
            }
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
        const { rootRef } = this;
        const { innerHeight, scrollY } = window;
        const { offsetTop, scrollHeight } = rootRef;
        const { page, nextPage } = this.props;
        if (
            innerHeight + scrollY > (offsetTop + scrollHeight) - this.GAP &&
            !page.lastPage &&
            !page.fetching
        ) {
            nextPage({
                ...this.state,
                page: page.page + 1
            });
        }
    };
    edit = i => {
        this.props.onEdit(this.props.list[i].id);
    };
    deleteTest = i => this.openConfirm(i);
    setRootRef = element => {
        this.rootRef = element;
    };
    confirmDelete = () => {
        const {i} = this.state.confirm;
        if(i === null) return;
        let params = {
            id: this.props.list[i].id,
            token: this.props.auth.token
        };
        if(this.props.auth.user && this.props.hasOwnProperty('my')){
            params.user = this.props.auth.user.id
        }

        this.props.deleteTest(params);
        this.setState({
            ...this.state,
            confirm: {
                ...this.state.confirm,
                open: false,
                i: null
            }
        });
    };
    openConfirm = i => {
        this.setState({
            ...this.state,
            confirm: {
                ...this.state.confirm,
                open: true,
                i
            }
        });
    };
    closeConfirm = () => this.setState({
        ...this.state,
        confirm: {
            ...this.state.confirm,
            open: false
        }
    });
    render(){
        const {list, auth, l} = this.props;
        const {confirm} = this.state;
        return list.length ? (
            <Paper ref={this.setRootRef} style={{padding: '1rem'}} elevation={4}>
                <ConfirmDialog open={confirm.open} close={this.closeConfirm} confirm={this.confirmDelete} title={l['Confirm action']} >
                    {`${l['Are you sure?']}`}
                    <br/>
                    {`${l['Delete']} - "${confirm.i === null || list[confirm.i].name}"?`}
                </ConfirmDialog>
                {
                    list.map((test, i) => (
                        <Card key={i} className="mb-3">
                            <CardHeader style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'space-between',
                            }}>
                                <Link to={`/tests/${test.id}`}>{test.name}</Link>
                                {
                                    (auth.user && test.user === auth.user.id)
                                        ? (
                                            <span>
                                                <Tooltip title={l['Edit']}>
                                                    <IconButton mini color="primary" onClick={() => this.edit(i)}>
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={l['Delete']}>
                                                    <IconButton mini color="secondary" onClick={() => this.deleteTest(i)}>
                                                        <Remove />
                                                    </IconButton>
                                                </Tooltip>
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
            </Paper>
        ) : null;
    }
}

export default withRouter(connect(
    state => ({
        l: state.lng._,
        list: state.tests,
        auth: state.auth,
        page: state.pagination
    }),
    dispatch => bindActionCreators({
        getTestList,
        deleteTest,
        nextPage,
    }, dispatch)
)(TestList));