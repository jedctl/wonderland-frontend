import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import BondLogo from "../../components/BondLogo";
import AdvancedSettings from "./AdvancedSettings";
import { IconButton, SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as SettingsIcon } from "../../assets/icons/iconset.svg";
import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
import { useEscape } from "../../hooks";
import { IAllBondData } from "../../hooks/bonds";

interface IBondHeaderProps {
    bond: IAllBondData;
    slippage: number;
    recipientAddress: string;
    onRecipientAddressChange: (e: any) => void;
    onSlippageChange: (e: any) => void;
}

function BondHeader({ bond, slippage, recipientAddress, onRecipientAddressChange, onSlippageChange }: IBondHeaderProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let history = useHistory();

    useEscape(() => {
        if (open) handleClose;
        else history.push("/bonds");
    });

    return (
        <div className="bond-header">
            <div className="bond-settings">
                <IconButton onClick={handleOpen}>
                    <SvgIcon color="primary" component={SettingsIcon} />
                </IconButton>
                <AdvancedSettings
                    open={open}
                    handleClose={handleClose}
                    slippage={slippage}
                    recipientAddress={recipientAddress}
                    onRecipientAddressChange={onRecipientAddressChange}
                    onSlippageChange={onSlippageChange}
                />
            </div>

            {!bond.isIDO && (
                <div className="bond-header-logo">
                    <BondLogo bond={bond} />
                    <div className="bond-header-name">
                        <p>{bond.displayName}</p>
                    </div>
                </div>
            )}

            <Link component={NavLink} to="/bonds" className="cancel-bond"></Link>
        </div>
    );
}

export default BondHeader;
