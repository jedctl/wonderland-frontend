import { Box, Modal, Paper, SvgIcon, IconButton, FormControl, OutlinedInput, InputLabel, InputAdornment } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./continue.scss";
import Rules from "./Rules";

interface IContSettingsProps {
    openC: boolean;
    continueClose: () => void;
}

function AdvancedContinue({ openC, continueClose }: IContSettingsProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Modal id="continue" open={openC} onClose={continueClose} hideBackdrop>
            <Paper className="ohm-card ohm-popover">
                <div className="header-setting">
                    <div></div>
                    <p className="continue-title">Before you continue</p>
                    <div onClick={continueClose} className="cross-wrap"></div>
                </div>
                <Box className="card-content">
                    <p>Have you read The Rules for using the Quasar loan?</p>
                    <div className="continue__buttons">
                        <div className="con-but green">Yes, I read and agree with the Rules</div>
                        <div onClick={handleOpen} className="con-but red">
                            No, i want to read the Rules
                        </div>
                        <Rules open={open} handleClose={handleClose} />
                    </div>
                </Box>
            </Paper>
        </Modal>
    );
}

export default AdvancedContinue;
