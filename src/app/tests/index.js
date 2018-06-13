import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Container, ListGroup, ListGroupItem} from "reactstrap";
import {AddTestForm} from "./containers";
import {getTestList} from "./actions";
import FA from 'react-fontawesome';
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
    renderTestList = () => (
        <ListGroup>
            {
                this.props.list.map((test, i) => (
                    <ListGroupItem key={i}>
                        <FA name="play" className="text-success hidden-fa"/>{' '}
                        {test.name}
                    </ListGroupItem>
                ))
            }
        </ListGroup>
    );
    componentDidMount = () => {
        this.props.getTestList();
    };
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
                <AddTestForm visible={addForm.visible} toggle={this.addFormClose}/>
                {
                    this.props.list.length > 0
                    && !addForm.visible
                    && this.renderTestList()
                }
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getTestList,
    showAuth
}, dispatch);

export default connect(
    state => ({
        list: state.tests,
        l: state.lng._,
        auth: state.auth,
    }),
    mapDispatchToProps
)(Tests)