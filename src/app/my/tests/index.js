import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Container} from "reactstrap";
import TestEditForm from "../../tests/components/forms/test-edit";
import TestList from '../../tests/components/test-list';
import {showAuth} from "../../auth/actions";
import {editFormClose, editFormOpen, resetTest} from "../../tests/actions";
import { push } from 'react-router-redux';

class MyTests extends Component {
    constructor(props){
        super(props);
        this.state = {
            editForm: {
                visible: false,
                isNew: true,
                id: null
            }
        };
    }
    editFormOpen = (id = null) => {
        this.props.editFormOpen(id);
    };
    editFormClose = () => {
        this.props.editFormClose();
        this.props.resetTest();
    };
    render() {
        const {l, auth, editForm} = this.props;
        if(!auth.user){
            this.props.goTests();
        }
        return (
            <Container>
                {!editForm.visible &&
                    <div className="clearfix px-0 py-2">
                        <Button className="float-right" color="danger" onClick={this.editFormOpen}>
                            {l['Add new test']}
                        </Button>
                    </div>
                }
                {
                    (!editForm.visible) ? (
                        <TestList onEdit={this.editFormOpen} my />
                    ) : (
                        <TestEditForm testId={editForm.id} visible={editForm.visible} close={this.editFormClose}/>
                    )
                }
            </Container>
        );
    }
}

export default connect(
    state => ({
        l: state.lng._,
        auth: state.auth,
        editForm: state.editForm,
    }),
    dispatch => bindActionCreators({
        showAuth,
        resetTest,
        editFormOpen,
        editFormClose,
        goTests: () => push('/tests')
    }, dispatch)
)(MyTests)