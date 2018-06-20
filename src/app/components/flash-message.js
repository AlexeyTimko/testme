import React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    danger: ErrorIcon,
    info: InfoIcon,
};

export default props => {
    const Icon = variantIcon[props.color];
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={props.show}
            autoHideDuration={6000}
            onClose={props.toggle}
        >
            <SnackbarContent
                className={`bg-${props.color}`}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Icon style={{
                            fontSize: 20,
                            opacity: 0.9,
                            marginRight: '1rem',
                        }} />
                        {props.children}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={props.toggle}
                    >
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}