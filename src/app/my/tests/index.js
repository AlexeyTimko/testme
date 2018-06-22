import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Container} from "reactstrap";
import TestEditForm from "../../tests/components/forms/test-edit";
import TestList from '../../tests/components/test-list';
import {showAuth} from "../../auth/actions";
import {editFormClose, editFormOpen, resetTest} from "../../tests/actions";
import {push} from 'react-router-redux';
import AddIcon from '@material-ui/icons/Add';
import {Tooltip, Button} from "@material-ui/core";
import {Search} from "../../components/index";

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

    componentWillMount = () => {
        this.editFormClose();
    };

    render() {
        const {l, auth, editForm} = this.props;
        if (!auth.user) {
            this.props.goTests();
        }
        return (
            <Container className="mt-2">
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
                        <Fragment>
                            <Search/>
                            <TestList onEdit={this.editFormOpen} my/>
                        </Fragment>
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