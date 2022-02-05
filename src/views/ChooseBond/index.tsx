import { useSelector } from "react-redux";
import { Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom } from "@material-ui/core";
import { BondTableData, BondDataCard } from "./BondRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { trim } from "../../helpers";
import useBonds from "../../hooks/bonds";
import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import LastBond from "./LastBond";

function ChooseBond() {
    const { bonds } = useBonds();
    const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const marketPrice = useSelector<IReduxState, number>(state => {
        return state.app.marketPrice;
    });

    const treasuryBalance = useSelector<IReduxState, number>(state => {
        return state.app.treasuryBalance;
    });

    let marketPriceValue: string;
    if (marketPrice === 0) {
        marketPriceValue = "No data";
    } else {
        marketPriceValue = trim(marketPrice, 2) + "$";
    }

    return (
        <div className="choose-bond-view">
            <Zoom in={true}>
                <div className="choose-bond-view-card">
                    <div className="choose-bond-view-card-header">
                        <p className="choose-bond-view-card-title">$QUAS bonding</p>
                    </div>

                    <Grid container item xs={12} spacing={2} className="choose-bond-view-card-metrics">
                        <Grid item xs={12} sm={6}>
                            <Box textAlign="center">
                                <p className="choose-bond-view-card-metrics-title">Treasury Balance</p>
                                <p className="choose-bond-view-card-metrics-value">
                                    {isAppLoading ? (
                                        <Skeleton width="180px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(treasuryBalance)
                                    )}
                                </p>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box textAlign="center">
                                <p className="choose-bond-view-card-metrics-title">QUAS Price</p>
                                <p className="choose-bond-view-card-metrics-value">{isAppLoading ? <Skeleton width="100px" /> : `${marketPriceValue}`}</p>
                            </Box>
                        </Grid>
                    </Grid>

                    <div className="last-bonds">
                        <p className="last-bonds__title">Last bonds</p>
                        <div className="last-bonds__blocks">
                            <LastBond classDeactivate="" blockTitleBond="IDO" LastBondAllColor="#C05656" blockTVLNum="0" blockROIProc="" />
                            <LastBond classDeactivate="deactivate" blockTitleBond="" LastBondAllColor="#E988EB" blockTVLNum="" blockROIProc="" />
                            <LastBond classDeactivate="deactivate" blockTitleBond="" LastBondAllColor="#92EADA" blockTVLNum="" blockROIProc="" />
                            <LastBond classDeactivate="deactivate" blockTitleBond="" LastBondAllColor="#43DDFF" blockTVLNum="" blockROIProc="" />
                            <LastBond classDeactivate="deactivate" blockTitleBond="" LastBondAllColor="#B079F7" blockTVLNum="" blockROIProc="" />
                        </div>
                    </div>

                    {!isSmallScreen && (
                        <Grid container item>
                            <TableContainer className="choose-bond-view-card-table">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">Mint</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">Price</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">ROI</p>
                                            </TableCell>
                                            <TableCell align="right">
                                                <p className="choose-bond-view-card-table-title">Purchased</p>
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bonds.map(bond => (
                                            <BondTableData key={bond.name} bond={bond} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}
                </div>
            </Zoom>

            {isSmallScreen && (
                <div className="choose-bond-view-card-container">
                    <Grid container item spacing={2}>
                        {bonds.map(bond => (
                            <Grid item xs={12} key={bond.name}>
                                <BondDataCard key={bond.name} bond={bond} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default ChooseBond;
