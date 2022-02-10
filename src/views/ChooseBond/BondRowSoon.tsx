import "./bondrowsoon.scss";
import { ReactComponent as TokenBondSoon } from "../../assets/tokens/coinBondSoon.svg";
function BondRowSoon(props: any) {
    return (
        <tr className="bond-row-soon">
            <td className="bond-row-soon__left">
                <div className="MuiBox-root MuiBox-root-9">
                    <TokenBondSoon />
                </div>
                <div className="bond-name">
                    <p className="bond-name-title">Coming soon</p>
                </div>
            </td>
            <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter">
                <p className="bond-name-title">*******</p>
            </td>
            <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">
                <p className="bond-name-title">******</p>
            </td>
            <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">
                <p className="bond-name-title">*******</p>
            </td>
            <td className="MuiTableCell-root MuiTableCell-body">
                <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary" href="#/bonds/ido">
                    <div className="bond-table-btn-soon">
                        <p>Bond</p>
                    </div>
                </a>
            </td>
        </tr>
    );
}

export default BondRowSoon;
