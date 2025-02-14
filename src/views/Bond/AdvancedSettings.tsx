import { Box, Modal, Paper, SvgIcon, IconButton, FormControl, OutlinedInput, InputLabel, InputAdornment } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
import "./bondSettings.scss";

interface IAdvancedSettingsProps {
    open: boolean;
    handleClose: () => void;
    slippage: number;
    recipientAddress: string;
    onRecipientAddressChange: (e: any) => void;
    onSlippageChange: (e: any) => void;
}

function AdvancedSettings({ open, handleClose, slippage, recipientAddress, onRecipientAddressChange, onSlippageChange }: IAdvancedSettingsProps) {
    const [value, setValue] = useState(slippage);

    useEffect(() => {
        let timeount: any = null;
        clearTimeout(timeount);

        timeount = setTimeout(() => onSlippageChange(value), 1000);
        return () => clearTimeout(timeount);
    }, [value]);

    return (
        <Modal id="hades" open={open} onClose={handleClose} hideBackdrop>
            <Paper className="ohm-card ohm-popover">
                <div className="header-setting">
                    <div></div>
                    <p className="hades-title">Settings</p>
                    <div onClick={handleClose} className="cross-wrap"></div>
                </div>
                <Box className="card-content">
                    <InputLabel htmlFor="slippage">
                        <p className="input-lable">Slippage</p>
                    </InputLabel>
                    <FormControl variant="outlined" color="primary" fullWidth>
                        <OutlinedInput
                            id="slippage"
                            value={value}
                            onChange={(e: any) => setValue(e.target.value)}
                            fullWidth
                            type="number"
                            className="bond-input"
                            endAdornment={
                                <InputAdornment position="end">
                                    <p className="percent">%</p>
                                </InputAdornment>
                            }
                        />
                        <div className="help-text">
                            <p className="text-bond-desc">Transaction may revert if price changes by more than slippage %</p>
                        </div>
                    </FormControl>
                </Box>
                <Box className="card-content">
                    <InputLabel htmlFor="Recipient">
                        <p className="input-lable">Recipient Address</p>
                    </InputLabel>
                    <FormControl variant="outlined" color="primary" fullWidth>
                        <OutlinedInput fullWidth className="bond-input" id="slippage" value={recipientAddress} onChange={onRecipientAddressChange} />
                        <div className="help-text">
                            <p className="text-bond-desc">Choose recipient address. By default, this is your currently connected address</p>
                        </div>
                    </FormControl>
                </Box>
            </Paper>
        </Modal>
    );
}

export default AdvancedSettings;
