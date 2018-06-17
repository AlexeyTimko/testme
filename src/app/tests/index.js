import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Container} from "reactstrap";
import TestEditForm from "./components/forms/test-edit";
import TestList from './components/test-list';
import {showAuth} from "../auth/actions";
import {resetTest} from "./actions";

class Tests extends Component {
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
        if(this.props.auth.user){
            this.setState({
                ...this.state,
                editForm: {
                    ...this.state.editForm,
                    visible: true,
                    id
                }
            });
        } else {
            this.props.showAuth();
        }
    };
    editFormClose = () => this.setState({
        ...this.state,
        editForm: {
            ...this.state.editForm,
            visible: false,
            id: null
        }
    }, () => this.props.resetTest());
    render() {
        const {editForm} = this.state;
        const {l} = this.props;
        return (
            <Container>
                {!editForm.visible
                    && <div className="clearfix" style={{padding: ".5rem"}}>
                        <Button className="float-right" color="danger" onClick={this.editFormOpen}>
                            {l['Add new test']}
                        </Button>
                    </div>}
                {
                    (!editForm.visible) ? (
                        <TestList onEdit={this.editFormOpen} />
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
    }),
    dispatch => bindActionCreators({
        showAuth,
        resetTest
    }, dispatch)
)(Tests)