import { priceUnits, trim } from "../../helpers";
import BondLogo from "../../components/BondLogo";
import { Paper, TableRow, TableCell, Slide, Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import { IAllBondData } from "../../hooks/bonds";

interface IBondProps {
    bond: IAllBondData;
}
function sdf() {
    let accordion = document.querySelectorAll(".choose-bond-view .choose-bond-view-card-container .bond-data-card");
    accordion.forEach(buttonItem => {
        buttonItem.addEventListener("click", function (e) {
            buttonItem.classList.add("active");
            const elementD = e.currentTarget as HTMLTextAreaElement;
            const butElem = elementD?.querySelector(".close-block-bond");
            butElem?.addEventListener("click", function (event) {
                buttonItem.classList.remove("active");
                event.stopPropagation();
            });
        });
    });
}

export function BondDataCard({ bond }: IBondProps) {
    const isBondLoading = !bond.bondPrice ?? true;

    return (
        <Slide direction="up" in={true}>
            <Paper onLoad={sdf} className="bond-data-card">
                <div className="bond-pair">
                    <div className="bond-name-title-block">
                        <BondLogo bond={bond} />
                        <div className="bond-name">
                            <p className="bond-name-title">{bond.displayName}</p>
                            {bond.isLP && (
                                <div>
                                    <Link href={bond.lpUrl} target="_blank">
                                        {/* <p className="bond-name-title">View Contract</p> */}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bond-apr">
                        <p className="apr">53% APR</p>
                    </div>
                </div>

                <div className="data-row">
                    <p className="bond-name-title">Price</p>
                    <p className="bond-price bond-name-title">
                        <>
                            {priceUnits(bond)} {isBondLoading ? <Skeleton width="50px" /> : trim(bond.bondPrice, 2)}
                        </>
                    </p>
                </div>

                <div className="data-row">
                    <p className="bond-name-title">ROI</p>
                    <p className="bond-name-title">{isBondLoading ? <Skeleton width="50px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}</p>
                </div>

                <div className="data-row">
                    <p className="bond-name-title">Purchased</p>
                    <p className="bond-name-title">
                        {isBondLoading ? (
                            <Skeleton width="80px" />
                        ) : (
                            new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                                minimumFractionDigits: 0,
                            }).format(bond.purchased)
                        )}
                    </p>
                </div>
                <div className="bond-table-block-btn">
                    <Link component={NavLink} to={`/bonds/${bond.name}`}>
                        <div className="bond-table-btn">
                            <p>Bond {bond.displayName}</p>
                        </div>
                    </Link>
                    <div className="close-block-bond"></div>
                </div>
            </Paper>
        </Slide>
    );
}

export function BondTableData({ bond }: IBondProps) {
    const isBondLoading = !bond.bondPrice ?? true;

    return (
        <TableRow>
            <TableCell align="left">
                <BondLogo bond={bond} />
                <div className="bond-name">
                    <p className="bond-name-title">{bond.displayName}</p>
                    {bond.isLP && (
                        <Link color="primary" href={bond.lpUrl} target="_blank">
                            <p className="bond-name-title">View Contract</p>
                        </Link>
                    )}
                </div>
            </TableCell>
            <TableCell align="center">
                <p className="bond-name-title">
                    <>
                        <span className="currency-icon">{priceUnits(bond)}</span> {isBondLoading ? <Skeleton width="50px" /> : trim(bond.bondPrice, 2)}
                    </>
                </p>
            </TableCell>
            <TableCell align="right">
                <p className="bond-name-title">{isBondLoading ? <Skeleton width="50px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}</p>
            </TableCell>
            <TableCell align="right">
                <p className="bond-name-title">
                    {isBondLoading ? (
                        <Skeleton width="50px" />
                    ) : (
                        new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                        }).format(bond.purchased)
                    )}
                </p>
            </TableCell>
            <TableCell>
                <Link component={NavLink} to={`/bonds/${bond.name}`}>
                    <div className="bond-table-btn">
                        <p>Bond</p>
                    </div>
                </Link>
            </TableCell>
        </TableRow>
    );
}
