import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import FA from 'react-fontawesome';
import Tooltip from "../../components/tooltip";

export default props => props.items.length ? (
    <ListGroup>
        {props.items.map((item, i) => (
            <ListGroupItem key={i}>
                {item.text}
                <FA name="minus" onClick={()=>props.onDelete(i)} id={`delete-${i}`}
                    className="text-danger pull-right mt-1" style={{cursor: 'pointer'}}/>
                <Tooltip target={`delete-${i}`}>Delete</Tooltip>
                <FA name="edit" onClick={()=>props.onEdit(i)} id={`edit-${i}`}
                    className="text-warning pull-right mr-1 mt-1" style={{cursor: 'pointer'}}/>
                <Tooltip target={`edit-${i}`}>Edit</Tooltip>
            </ListGroupItem>
        ))}
    </ListGroup>
) : null;