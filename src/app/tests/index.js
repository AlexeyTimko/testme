import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Container, ListGroup, ListGroupItem} from "reactstrap";
import {AddTestForm} from "./containers";
import {getTestList} from "./actions";
import FA from 'react-fontawesome';

const initialState = {
    addForm: {
        visible: false
    }
};

class Tests extends Component {
    state = initialState;
    addFormToggle = () => this.setState({
        ...this.state,
        addForm: {
            ...this.state.addForm,
            visible: !this.state.addForm.visible
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
                        <Button className="float-right" color="danger" onClick={this.addFormToggle}>
                            {l['Add new test']}
                        </Button>
                    </div>}
                <AddTestForm visible={addForm.visible} toggle={this.addFormToggle}/>
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
    getTestList
}, dispatch);

export default connect(
    state => ({
        list: state.tests,
        l: state.lng._
    }),
    mapDispatchToProps
)(Tests)