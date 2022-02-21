import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import RebaseTimer from "../../components/RebaseTimer";
import { trim } from "../../helpers";
import { changeStake, changeApproval } from "../../store/slices/stake-thunk";
import "./lend.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";
import Rules from "./Rules";
import Continue from "./Continue";

function Lend() {
    const [openC, setOpenC] = useState(false);
    const [open, setOpen] = useState(false);
    const continueOpen = () => {
        setOpenC(true);
    };

    const continueClose = () => {
        setOpenC(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const [view, setView] = useState(0);
    const [quantity, setQuantity] = useState<string>("");

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const currentIndex = useSelector<IReduxState, string>(state => {
        return state.app.currentIndex;
    });
    const fiveDayRate = useSelector<IReduxState, number>(state => {
        return state.app.fiveDayRate;
    });
    const quasBalance = useSelector<IReduxState, number>(state => {
        return state.account.balances && state.account.balances.quas;
    });
    const squasBalance = useSelector<IReduxState, number>(state => {
        return state.account.balances && state.account.balances.squas;
    });
    const stakeAllowance = useSelector<IReduxState, number>(state => {
        return state.account.staking && state.account.staking.quas;
    });
    const unstakeAllowance = useSelector<IReduxState, number>(state => {
        return state.account.staking && state.account.staking.squas;
    });
    const stakingRebase = useSelector<IReduxState, number>(state => {
        return state.app.stakingRebase;
    });

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const setMax = () => {
        if (view === 0) {
            setQuantity(quasBalance == 0 ? "" : String(quasBalance));
        } else {
            setQuantity(squasBalance == 0 ? "" : String(squasBalance));
        }
    };

    const onSeekApproval = async (token: string) => {
        if (await checkWrongNetwork()) return;

        await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
    };

    const onChangeStake = async (action: string) => {
        if (await checkWrongNetwork()) return;
        if (quantity === "" || parseFloat(quantity) === 0) {
            dispatch(warning({ text: action === "stake" ? messages.before_stake : messages.before_unstake }));
        } else {
            await dispatch(changeStake({ address, action, value: String(quantity), provider, networkID: chainID }));
            setQuantity("");
        }
    };

    const hasAllowance = useCallback(
        token => {
            if (token === "time") return stakeAllowance > 0;
            if (token === "memo") return unstakeAllowance > 0;
            return 0;
        },
        [stakeAllowance],
    );

    return (
        <div className="lend-view">
            <Zoom in={true}>
                <div className="lend-card">
                    <Grid className="lend-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="lend-card-header">
                                <p className="lend-card-header-title">$sQUAS Lending</p>
                            </div>
                        </Grid>

                        <Grid item>
                            <div className="lend-card-metrics">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        <div className="lend-card-apy">
                                            <p className="lend-card-metrics-title">Your Balance </p>
                                            <p className="lend-card-metrics-value">{squasBalance} $sQUAS</p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="lend-card-tvl">
                                            <p className="lend-card-metrics-title">Credit Pool </p>
                                            <p className="lend-card-metrics-value">10,000 DAI</p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="lend-card-index">
                                            <p className="lend-card-metrics-title">Total Debt</p>
                                            <p className="lend-card-metrics-value">20,000 DAI</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="lend-card-index">
                                            <p className="lend-card-metrics-title">Available Credit</p>
                                            <p className="lend-card-metrics-value">300 DAI</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="lend-card-index">
                                            <p className="lend-card-metrics-title">Interest Rate</p>
                                            <p className="lend-card-metrics-value">2%</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="lend-card-index">
                                            <p className="lend-card-metrics-title">Expiration Date</p>
                                            <p className="lend-card-metrics-value">2022.02.30 17:08:34</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <div className="lend-card-area">
                            {!address && (
                                <div className="lend-card-wallet-notification">
                                    <p className="lend-card-wallet-desc-text">
                                        You need to repay the loan taken before the expiration date. Otherwise, your $QUAS will be burned and you will not receive a staking reward.
                                    </p>
                                    <div className="lend-card-wallet-connect-btn" onClick={connect}>
                                        Pay Back
                                    </div>
                                </div>
                            )}
                            <div>
                                <div className="lend-card-action-area">
                                    <div className="lend-card-action-row">
                                        <OutlinedInput
                                            type="number"
                                            placeholder="Amount"
                                            className="lend-card-action-input"
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                            labelWidth={0}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <div onClick={setMax} className="lend-card-action-input-btn">
                                                        <p>Max</p>
                                                    </div>
                                                </InputAdornment>
                                            }
                                        />

                                        <div className="lend-card-tab-panel">
                                            <div onClick={continueOpen} className="lend-card-tab-panel-btn">
                                                <p>Lend</p>
                                            </div>
                                            <Continue openC={openC} continueClose={continueClose} />
                                        </div>
                                    </div>

                                    <div className="lend-card-action-help-text">
                                        {address && ((!hasAllowance("time") && view === 0) || (!hasAllowance("memo") && view === 1)) && (
                                            <p>
                                                After clicking on the Lend button, your $sQuas will be locked, but staking will continue to accrue on the full amount. The loan
                                                repayment period is 30 days. In case of non-return, your $QUAS will be burned. By clicking on the button, you confirm that you have
                                                read and agree with this{" "}
                                                <span onClick={handleOpen} className="green-rules">
                                                    Rules.
                                                </span>
                                                <Rules open={open} handleClose={handleClose} />
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="lend-user-data">
                                    <div className="data-row">
                                        <p className="data-row-name">Your Balance</p>
                                        <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(quasBalance), 4)} QUAS</>}</p>
                                    </div>

                                    <div className="data-row">
                                        <p className="data-row-name">Your Collateral</p>
                                        <p className="data-row-value">10 $sQUAS</p>
                                    </div>

                                    <div className="data-row">
                                        <p className="data-row-name">You Receive</p>
                                        <p className="data-row-value">300 DAI</p>
                                    </div>

                                    <div className="data-row">
                                        <p className="data-row-name">Debt</p>
                                        <p className="data-row-value">310 DAI</p>
                                    </div>

                                    <div className="data-row">
                                        <p className="data-row-name">Expiration Date</p>
                                        <p className="data-row-value">30.02.2022</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default Lend;
