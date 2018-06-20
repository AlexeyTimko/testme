import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Container} from "reactstrap";
import TestEditForm from "../../tests/components/forms/test-edit";
import TestList from '../../tests/components/test-list';
import {showAuth} from "../../auth/actions";
import {editFormClose, editFormOpen, resetTest} from "../../tests/actions";
import {push} from 'react-router-redux';
import AddIcon from '@material-ui/icons/Add';
import {Tooltip, Button} from "@material-ui/core/es/index";

class MyTests extends Component {
    constructor(props) {
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
        if (!auth.user) {
            this.props.goTests();
        }
        return (
            <Container>
                {!editForm.visible &&
                <Tooltip title={l['Add new test']}>
                    <Button variant="fab" color="secondary" aria-label="add" onClick={this.editFormOpen}
                            style={{
                                position: 'absolute',
                                bottom: '2rem',
                                right: '2rem',
                            }}>
                        <AddIcon/>
                    </Button>
                </Tooltip>
                }
                {
                    (!editForm.visible) ? (
                        <TestList onEdit={this.editFormOpen} my/>
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