import React from 'react';
import {Alert, Modal} from "reactstrap";

export default props => (
    <Modal isOpen={props.show} toggle={props.toggle}>
        <Alert color={props.color} toggle={props.toggle}>{props.children}</Alert>
    </Modal>
);