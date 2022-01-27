import React, { useState, forwardRef, useCallback } from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar, SnackbarContent } from "notistack";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Message } from "../../store/slices/messages-slice";
import { Color } from "@material-ui/lab/Alert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ReactComponent as WarningIconI } from "../../assets/icons/vosIcon.svg";
import { ReactComponent as CopyClickBoard } from "../../assets/icons/copyMassage.svg";

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up("sm")]: {},
        maxWidth: 500,
    },
    card: {
        width: "100%",
    },
    error: {
        backgroundColor: "inherit",
        border: "1px solid rgba(192, 86, 86, 0.25)",
    },
    info: {
        backgroundColor: "inherit",
    },
    warning: {
        backgroundColor: "inherit",
        border: "1px solid rgba(192, 86, 86, 0.25)",
    },
    success: {
        backgroundColor: "inherit",
        border: "1px solid rgba(112, 198, 182, 0.25)",
    },
    typography: {
        color: "#FFFFFF",
        fontFamily: "Montserrat SemiBold",
    },
    actionRoot: {
        padding: "8px 8px 8px 8px",
        justifyContent: "space-between",
        color: "#FFFFFF",
    },
    icons: {
        marginLeft: "auto",
    },
    expand: {
        padding: "8px 8px",
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        color: "#FFFFFF",
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    collapse: {
        padding: 16,
    },
    checkIcon: {
        fontSize: 20,
        color: "#b3b3b3",
        paddingRight: 4,
    },
    checkIconCopy: {
        color: "#43a047",
    },
    button: {
        padding: 0,
        textTransform: "none",
    },
    errorWrap: {
        marginTop: 10,
    },
    errorText: {
        whiteSpace: "pre-wrap",
        maxHeight: 300,
        overflow: "auto",
        background: "rgba(0,0,0,0.1)",
        padding: 5,
        borderRadius: 5,
    },
}));

const SnackMessage = forwardRef<HTMLDivElement, { id: string | number; message: Message }>((props, ref) => {
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);
    const [isCopy, setIsCopy] = useState(false);

    const handleExpandClick = useCallback(() => {
        setExpanded(oldExpanded => !oldExpanded);
    }, []);

    const handleDismiss = useCallback(() => {
        closeSnackbar(props.id);
    }, [props.id, closeSnackbar]);

    const getIcon = (severity: Color) => {
        switch (severity) {
            case "error":
                return <WarningIconI />;
            case "info":
                return <WarningIconI />;
            case "success":
                return <WarningIconI className="success-icon" />;
            case "warning":
                return <WarningIconI />;
            default:
                return <div />;
        }
    };

    return (
        <SnackbarContent ref={ref} className={classes.root + " massageBgC"}>
            <Card className={classnames(classes.card, classes[props.message.severity])}>
                <CardActions classes={{ root: classes.actionRoot }}>
                    {getIcon(props.message.severity)}
                    <Typography variant="subtitle2" className={classes.typography}>
                        <div className="massages-text">{props.message.text}</div>
                    </Typography>
                    <div className={classes.icons + " massageCloseShow"}>
                        {props.message.error && (
                            <IconButton aria-label="Show more" className={classnames(classes.expand, { [classes.expandOpen]: expanded })} onClick={handleExpandClick}>
                                <ExpandMoreIcon className="show-more-icon-style" color="inherit" />
                            </IconButton>
                        )}
                        <IconButton className={classes.expand} onClick={handleDismiss}>
                            <div className="massage-close-icon"></div>
                        </IconButton>
                    </div>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Paper className={classes.collapse + " collapse-container"}>
                        <div className="copy-and-text-err">
                            <Typography>Error message: </Typography>
                            <CopyToClipboard text={JSON.stringify(props.message.error)} onCopy={() => setIsCopy(true)}>
                                <Button size="small" className={classes.button}>
                                    <CopyClickBoard />
                                </Button>
                            </CopyToClipboard>
                        </div>
                        <div className={classes.errorWrap}>
                            <Typography className={(classes.errorText, "collapse-text-info")}>{JSON.stringify(props.message.error, null, 2)}</Typography>
                        </div>
                    </Paper>
                </Collapse>
            </Card>
        </SnackbarContent>
    );
});

export default SnackMessage;
