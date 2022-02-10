import "./bondrowsoonmob.scss";
import { ReactComponent as TokenBondSoon } from "../../assets/tokens/coinBondSoon.svg";
function BondRowSoonMob(props: any) {
    return (
        <div className="Bond-Row-Soon-Mob MuiPaper-root bond-data-card MuiPaper-elevation1 MuiPaper-rounded">
            <div className="bond-pair">
                <div className="bond-name-title-block">
                    <div className="MuiBox-root MuiBox-root-78">
                        <TokenBondSoon />
                    </div>
                    <div className="bond-name">
                        <p className="bond-name-title">Coming soon</p>
                    </div>
                </div>
                <div className="bond-apr">
                    <p className="apr">******</p>
                </div>
            </div>
            <div className="data-row">
                <p className="bond-name-title">Price</p>
                <p className="bond-price bond-name-title">$ 100</p>
            </div>
            <div className="data-row">
                <p className="bond-name-title">ROI</p>
                <p className="bond-name-title">0%</p>
            </div>
            <div className="data-row">
                <p className="bond-name-title">Purchased</p>
                <p className="bond-name-title">$1,000</p>
            </div>
            <div className="bond-table-block-btn">
                <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary" href="#">
                    <div className="bond-table-btn">
                        <p>Bond DAI IDO</p>
                    </div>
                </a>
                <div className="close-block-bond"></div>
            </div>
        </div>
    );
}

export default BondRowSoonMob;
