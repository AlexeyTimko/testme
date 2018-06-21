import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {deleteTest, getTestList, nextPage} from "../actions";
import {ConfirmDialog} from '../../components';
import TestListItem from './test-list-item';

class TestList extends Component {
    constructor(props) {
        super(props);
        this.GAP = 200;
        let params = {};
        if (props.auth.user && props.hasOwnProperty('my')) {
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
        const {rootRef} = this;
        const {innerHeight, scrollY} = window;
        const {offsetTop, scrollHeight} = rootRef;
        const {page, nextPage} = this.props;
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
        if (i === null) return;
        let params = {
            id: this.props.list[i].id,
            token: this.props.auth.token
        };
        if (this.props.auth.user && this.props.hasOwnProperty('my')) {
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

    render() {
        const {list, l} = this.props;
        const {confirm} = this.state;
        return list.length ? (
            <div ref={this.setRootRef}>
                <ConfirmDialog open={confirm.open} close={this.closeConfirm} confirm={this.confirmDelete}
                               title={l['Confirm action']}>
                    {`${l['Are you sure?']}`}
                    <br/>
                    {`${l['Delete']} - "${confirm.i === null || list[confirm.i].name}"?`}
                </ConfirmDialog>
                {
                    list.map((test, i) => (
                        <TestListItem test={test} key={i} i={i} edit={this.edit} deleteTest={this.deleteTest}/>
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
        auth: state.auth,
        page: state.pagination
    }),
    dispatch => bindActionCreators({
        getTestList,
        deleteTest,
        nextPage,
    }, dispatch)
)(TestList);