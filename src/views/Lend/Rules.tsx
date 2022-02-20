import { Box, Modal, Paper, SvgIcon, IconButton, FormControl, OutlinedInput, InputLabel, InputAdornment } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./rules.scss";

interface IRulesSettingsProps {
    open: boolean;
    handleClose: () => void;
}

function AdvancedSettings({ open, handleClose }: IRulesSettingsProps) {
    return (
        <Modal id="rules" open={open} onClose={handleClose} hideBackdrop>
            <Paper className="ohm-card ohm-popover">
                <div className="header-setting">
                    <div></div>
                    <p className="rules-title">Rules for using the Quasar loan</p>
                    <div onClick={handleClose} className="cross-wrap"></div>
                </div>
                <Box className="card-content">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                        passages, and more recently with desktop publishing software like Laius PageMaker including versions of Lorem Ipsum.
                    </p>
                </Box>
            </Paper>
        </Modal>
    );
}

export default AdvancedSettings;
