import { useState } from "react";
import { getAddresses, TOKEN_DECIMALS, DEFAULT_NETWORK } from "../../../constants";
import { useSelector } from "react-redux";
import { Link, Fade, Popper } from "@material-ui/core";
import "./time-menu.scss";
import { IReduxState } from "../../../store/slices/state.interface";
import { getTokenUrl } from "../../../helpers";
import { ReactComponent as TokenMob } from "../../../assets/tokens/token-by-mobile.svg";

const addTokenToWallet = (tokenSymbol: string, tokenAddress: string) => async () => {
    const tokenImage = getTokenUrl(tokenSymbol.toLowerCase());

    if (window.ethereum) {
        try {
            await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: TOKEN_DECIMALS,
                        image: tokenImage,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
};

function TimeMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isEthereumAPIAvailable = window.ethereum;

    const networkID = useSelector<IReduxState, number>(state => {
        return (state.app && state.app.networkID) || DEFAULT_NETWORK;
    });

    const addresses = getAddresses(networkID);

    const SQUAS_ADDRESS = addresses.SQUAS_ADDRESS;
    const QUAS_ADDRESS = addresses.QUAS_ADDRESS;

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="time-menu-root" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
            <div className="time-menu-btn">
                <p>Buy $QUAS</p>
                <TokenMob className="img-token" />
            </div>

            <Popper className="time-menu-popper" open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                        <div className="tooltip">
                            <Link className="tooltip-item" href={`https://www.traderjoexyz.com/#/trade?inputCurrency=&outputCurrency=${QUAS_ADDRESS}`} target="_blank">
                                <p>Buy QUAS on Uniswap</p>
                            </Link>
                            <Link className="tooltip-item" href={`https://www.traderjoexyz.com/#/trade?inputCurrency=&outputCurrency=${QUAS_ADDRESS}`} target="_blank">
                                <p>Buy QUAS on Sushiswap</p>
                            </Link>
                            <Link className="tooltip-item" href={`https://www.traderjoexyz.com/#/trade?inputCurrency=&outputCurrency=${QUAS_ADDRESS}`} target="_blank">
                                <p>Wrap sQUAS</p>
                            </Link>

                            {isEthereumAPIAvailable && (
                                <div className="add-tokens">
                                    <div className="divider" />
                                    <div className="tooltip-item" onClick={addTokenToWallet("TIME", QUAS_ADDRESS)}>
                                        <p>TIME</p>
                                    </div>
                                    <div className="tooltip-item" onClick={addTokenToWallet("MEMO", SQUAS_ADDRESS)}>
                                        <p>MEMO</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}

export default TimeMenu;
