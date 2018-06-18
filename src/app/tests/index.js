import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Container} from "reactstrap";
import TestEditForm from "./components/forms/test-edit";
import TestList from './components/test-list';
import {showAuth} from "../auth/actions";
import {editFormClose, editFormOpen, resetTest} from "./actions";
import {Search} from "../components/index";

class Tests extends Component {
    editFormOpen = (id = null) => {
        this.props.editFormOpen(id);
    };
    editFormClose = () => {
        this.props.editFormClose();
        this.props.resetTest();
    };
    render() {
        const {editForm} = this.props;
        return (
            <Container className="mt-2">
                {
                    (!editForm.visible) ? (
                        <div>
                            <Search/>
                            <TestList onEdit={this.editFormOpen} />
                        </div>
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
        auth: state.auth,
        editForm: state.editForm,
    }),
    dispatch => bindActionCreators({
        showAuth,
        resetTest,
        editFormOpen,
        editFormClose,
    }, dispatch)
)(Tests)