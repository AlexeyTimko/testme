import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Container} from "reactstrap";
import TestAddForm from "./components/forms/test-add";
import TestList from './components/test-list';
import {showAuth} from "../auth/actions";

const initialState = {
    addForm: {
        visible: false
    }
};

class Tests extends Component {
    state = initialState;
    addFormOpen = () => {
        if(this.props.auth.user){
            this.setState({
                ...this.state,
                addForm: {
                    ...this.state.addForm,
                    visible: true
                }
            });
        } else {
            this.props.showAuth();
        }
    };
    addFormClose = () => this.setState({
        ...this.state,
        addForm: {
            ...this.state.addForm,
            visible: false
        }
    });
    render() {
        const {addForm} = this.state;
        const {l} = this.props;
        return (
            <Container>
                {!addForm.visible
                    && <div className="clearfix" style={{padding: ".5rem"}}>
                        <Button className="float-right" color="danger" onClick={this.addFormOpen}>
                            {l['Add new test']}
                        </Button>
                    </div>}
                {
                    (!addForm.visible) ? (
                        <TestList />
                    ) : (
                        <TestAddForm visible={addForm.visible} close={this.addFormClose}/>
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
        showAuth
    }, dispatch)
)(Tests)