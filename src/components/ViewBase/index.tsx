import React, { useState } from "react";
import "./view-base.scss";
import Header from "../Header";
import { Hidden, makeStyles, useMediaQuery } from "@material-ui/core";
import { DRAWER_WIDTH, TRANSITION_DURATION } from "../../constants/style";
import MobileDrawer from "../Drawer/mobile-drawer";
import Drawer from "../Drawer";
import Messages from "../Messages";
import Footer from "../Footer";

interface IViewBaseProps {
    children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up("md")]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    content: {
        padding: theme.spacing(1),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: TRANSITION_DURATION,
        }),
        height: "100%",
        overflow: "auto",
        marginLeft: DRAWER_WIDTH,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: TRANSITION_DURATION,
        }),
        marginLeft: 0,
    },
}));

function ViewBase({ children }: IViewBaseProps) {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = useState(false);

    const isSmallerScreen = useMediaQuery("(max-width: 960px)");
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className="view-base-root">
            <Messages />
            <Header drawe={!isSmallerScreen} handleDrawerToggle={handleDrawerToggle} />
            <div className={classes.drawer}>
                <Hidden mdUp>
                    <MobileDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                </Hidden>
                <Hidden smDown>
                    <Drawer />
                </Hidden>
            </div>
            <svg className="mobileLogoMain" width="150" height="43" viewBox="0 0 150 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M57.54 10.8V27.828C57.54 31.644 54.444 34.776 50.592 34.776C46.776 34.776 43.68 31.644 43.68 27.828V10.8H41.34V27.612C41.34 32.724 45.48 36.864 50.592 36.864C55.704 36.864 59.844 32.724 59.844 27.612V10.8H57.54ZM61.7981 36H64.3181L72.5981 15.84L80.8781 36H83.3981L72.5981 9.936L61.7981 36ZM94.0223 21.924C90.8183 20.988 87.5423 20.052 87.5423 17.496C87.5423 14.328 90.6383 12.24 93.9503 12.24C96.9023 12.24 98.7743 13.608 100.178 15.768L102.302 14.76C100.97 12.168 97.9823 9.936 93.9503 9.936C88.9463 9.936 85.1303 13.32 85.1303 17.712C85.1303 21.204 89.3783 23.148 93.5543 24.3C96.7223 25.164 100.43 26.604 100.43 29.376C100.43 32.868 96.7223 34.56 93.3383 34.56C90.3863 34.56 87.9383 32.544 86.5343 30.132L84.3023 31.212C86.0663 34.416 89.3783 36.864 93.3383 36.864C98.6303 36.864 102.77 33.948 102.77 29.376C102.77 24.84 98.3063 23.184 94.0223 21.924ZM104.759 36H107.279L115.559 15.84L123.839 36H126.359L115.559 9.936L104.759 36ZM129.406 10.8V36H131.71V25.092H139.882L145.354 36H147.874L142.222 24.696C145.03 23.724 147.046 21.06 147.046 17.928C147.046 14.004 143.842 10.8 139.882 10.8H129.406ZM131.71 12.888H139.666C142.474 12.888 144.706 15.156 144.706 17.928C144.706 20.736 142.474 22.968 139.666 22.968H131.71V12.888Z"
                    fill="#EBEBEB"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M36.1818 38.2727L35.4545 39L14.7001 18.8293L15.9047 17.6247L36.1818 38.2727ZM13.191 14.8613L11.6537 13.2959L10.349 14.6006L11.9224 16.1298L13.191 14.8613ZM7.58913 9.15696L6.1887 10.5574L0 4.54278L1.54278 3L7.58913 9.15696Z"
                    fill="#EBEBEB"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.1682 33.5209C23.4049 35.232 20.1115 35.8858 16.8982 35.3545C13.5868 34.8071 10.6 33.0407 8.52487 30.4027C6.44979 27.7647 5.43656 24.4459 5.68436 21.0987C5.93216 17.7515 7.42308 14.6181 9.86401 12.3145C12.3049 10.0108 15.5193 8.70355 18.8752 8.64968C22.2311 8.59581 25.4858 9.79923 27.9994 12.0234C30.513 14.2475 32.1037 17.3314 32.4588 20.6689C32.7759 23.6487 32.0875 26.638 30.5206 29.1685L31.9763 30.6242C33.9569 27.6336 34.84 24.0388 34.4588 20.4561C34.0505 16.6193 32.2218 13.074 29.3322 10.5171C26.4425 7.96024 22.7009 6.57678 18.8429 6.63871C14.985 6.70064 11.2897 8.20348 8.48358 10.8518C5.67746 13.5001 3.9635 17.1023 3.67862 20.9502C3.39374 24.7982 4.55857 28.6135 6.9441 31.6462C9.32963 34.6788 12.7633 36.7094 16.5701 37.3388C20.3769 37.9682 24.2814 37.1508 27.5161 35.0473L27.1841 34.5368L26.1682 33.5209Z"
                    fill="#EBEBEB"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22.2004 28.1389C20.9071 28.8038 19.4283 29.0395 17.9816 28.8003C16.3065 28.5233 14.7955 27.6298 13.7457 26.2952C12.696 24.9607 12.1834 23.2818 12.3088 21.5885C12.4341 19.8953 13.1884 18.3101 14.4232 17.1447C15.658 15.9794 17.2841 15.318 18.9818 15.2908C20.6795 15.2635 22.326 15.8723 23.5976 16.9975C24.8692 18.1226 25.6739 19.6827 25.8535 21.3711C25.9923 22.6755 25.7503 23.9835 25.1689 25.1416L25.9216 25.8942C26.7024 24.4919 27.0367 22.8753 26.8652 21.2635C26.6587 19.3225 25.7336 17.529 24.2718 16.2355C22.81 14.942 20.9171 14.2421 18.9655 14.2735C17.0138 14.3048 15.1444 15.0651 13.7249 16.4048C12.3053 17.7445 11.4382 19.5668 11.2941 21.5134C11.15 23.46 11.7393 25.3901 12.9461 26.9243C14.1529 28.4585 15.8899 29.4857 17.8157 29.8041C19.5862 30.0968 21.3986 29.7709 22.9509 28.8895L22.2004 28.1389Z"
                    fill="#EBEBEB"
                />
            </svg>
            {}
            {children}
            <Footer></Footer>
        </div>
    );
}

export default ViewBase;
