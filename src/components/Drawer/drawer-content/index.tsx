import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import useBonds from "../../../hooks/bonds";
import { Link } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";
import classnames from "classnames";
import { ReactComponent as WalletIcon } from "../../../assets/icons/wallet-drawer.svg";
import { ReactComponent as SettingLangIcon } from "../../../assets/icons/iconlanguage.svg";
import { ReactComponent as SetIcon } from "../../../assets/icons/iconset.svg";
import SettingSunIcon from "../../../assets/icons/iconsun.svg";
import SettingMoonIcon from "../../../assets/icons/iconMoon.svg";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./theme.js";

function NavContent() {
    const [theme, setTheme] = useState("light");

    const switchTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const [isActive] = useState();
    // const address = useAddress();
    const { bonds } = useBonds();

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("stake") >= 0 && page === "stake") {
            return true;
        }
        if (currentPath.indexOf("bonds") >= 0 && page === "bonds") {
            return true;
        }
        return false;
    }, []);

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles />
            <div className="dapp-sidebar">
                <div className="dapp-menu-links">
                    <div className="dapp-nav">
                        <Link
                            component={NavLink}
                            to="/dashboard"
                            isActive={(match: any, location: any) => {
                                return checkPage(location, "dashboard");
                            }}
                            className={classnames("button-dapp-menu", { active: isActive })}
                        >
                            Dashboard
                        </Link>

                        <Link
                            component={NavLink}
                            to="/stake"
                            isActive={(match: any, location: any) => {
                                return checkPage(location, "stake");
                            }}
                            className={classnames("button-dapp-menu", { active: isActive })}
                        >
                            Stake
                        </Link>

                        <Link
                            component={NavLink}
                            id="bond-nav"
                            to="/bonds"
                            isActive={(match: any, location: any) => {
                                return checkPage(location, "bonds");
                            }}
                            className={classnames("button-dapp-menu", { active: isActive })}
                        >
                            Bond
                        </Link>

                        <div className="bond-discounts">
                            <p className="bond-discounts-title">Bond discounts</p>
                            {bonds.map((bond, i) => (
                                <Link component={NavLink} to={`/bonds/${bond.name}`} key={i} className={"bond"}>
                                    {!bond.bondDiscount ? (
                                        <Skeleton variant="text" width={"150px"} />
                                    ) : (
                                        <p>
                                            {bond.displayName}
                                            <span className="bond-pair-roi">{bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%</span>
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                        <div className="drawer-wallet-cs-score">
                            <WalletIcon className="wallet-icon" />
                            <span className="wallet-cs-score">24.4893 $QUAS</span>
                            <div className="drawer__wallet-bye"></div>
                        </div>
                        <div className="drawer-setting">
                            <SettingLangIcon className="draw-sitting" />
                            <SetIcon className="draw-set" />
                            <button className="button-theme" onClick={switchTheme}>
                                <img className="sun" src={SettingSunIcon} alt="SunIcon" />
                                <img className="moon" src={SettingMoonIcon} alt="MoonIcon" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="dapp-menu-doc-link">
                    <Link href="https://wonderland.gitbook.io/wonderland/" target="_blank">
                        <p>Documents</p>
                    </Link>
                    <Link href="https://legacy.wonderland.money/" target="_blank">
                        <p>Website</p>
                    </Link>
                </div>
                {/* <div className="dapp-sidebar__line">
                    <div className="line-ab"></div>
                </div> */}
                <div className="dapp-sidebar__join-us">
                    <p className="join-us-title">Join Us</p>
                    <Social />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default NavContent;
