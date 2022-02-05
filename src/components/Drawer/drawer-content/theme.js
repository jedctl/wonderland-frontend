import { createGlobalStyle } from "styled-components";
export const darkTheme = {
    body: "#232323",
    textColor: "#FFFFFF",
    headingColor: "lightblue",
    textColorActive: "#92EADA",
    buttonHoverColor: "box-shadow: 4px 4px 8px #000000, -4px -4px 8px #383838, inset 4px 4px 3px #151515, inset -4px -4px 4px #474747;",
    mobileLogoMain: "#C4C4C4",

    /* --------------------------------- header --------------------------------- */
    fill: "#EBEBEB",
    // wallet-and-token
    tokenTextColor: "#DADADA",
    // dapp-topbar-btns-wrap
    buttonStyle: "background: #232323 !important; box-shadow: 4px 4px 4px #111111, -3px -3px 4px #3f3e3e, inset 0px 0px 0px #1c1c1c, inset 0px 0px 0px #343434;",
    // .dapp-topbar::after line
    dappTopLine: "background: #4F4F4F; box-shadow: inset 2px 2px 2px #1e1e1e;",
    burgerStyle: "background: #B079F7; border: 1px solid #232323; box-shadow: -2px -2px 4px #3d3d3d, 2px 2px 4px #000000, inset -1px -1px 4px #c293ff, inset 1px 1px 4px #000000;",

    /* --------------------------------- drawer --------------------------------- */
    sunOn: "display: block;",
    moonOn: "display: none;",
    colorTitleDis: "color: #DADADA;",
    // Wallet --------------------------
    colorWalletScore: "#DADADA",
    // socials join us ---------
    colorTitleJoinUs: "color: #DADADA;",
    // line
    colorLineDrawerUD: " background: #4F4F4F; box-shadow: inset 2px 2px 2px #1e1e1e;",

    /* -------------------------------- makeStyles-content-2------------------------------- */
    makeStylesContent2: "0px 0px 0px #111111, 0px 0px 0px #3f3e3e, inset 6px 6px 4px #1c1c1c, inset -6px -6px 4px #343434;",
    CardTitleColor: "#C4C4C4;",
    // stake --------
    stakeCardTitleColor: "#C4C4C4",
    rebaseTimerColor: "color: #C4C4C4;",
    CardStakeDesColor: "#6B6B6B",
    // stake input
    stakeRadioButtonS:
        "background: #232323; border: 1px solid #232323; box-shadow: 3px 3px 4px #161616, -2px -1px 4px #3E3E3E, inset 3px 3px 4px #101010, inset -4px -4px 4px #343434;",
    stakeRadioInsBut: "border: 6px solid #232323; box-shadow: 3px 3px 4px #161616, -2px -1px 4px #3e3e3e;",
    stakeCardInputBg: " 0px 4px 4px rgb(0 0 0 / 25%), inset 5px 5px 4px #1c1c1c, inset -5px -5px 4px #343434;",
    colorHelpStakeText: "#565656",
    stakeUserDataColor: "#969696",
    // bond --------------
    bondTableColor: "#DADADA",
    bondNameTitleMobile: "#969696",
    bondTokenNameTitleMobile: "#DADADA",
    // lastBondCircle
    lastBondCircle: "box-shadow: -4px -4px 4px #353535, 4px 4px 4px #0d0d0d, inset 0px 0px 0px #343434, inset 0px 0px 0px rgba(0, 0, 0, 0.25);",
    lastBondCircleHover: "box-shadow: -2px -2px 4px #353535, 2px 2px 4px #0D0D0D, inset -4px -4px 4px #343434, inset 4px 4px 4px rgba(0, 0, 0, 0.25);",
    lastBondCirHoverDop: "background: rgba(0,0,0,0.2);",
    // bond input popup
    bondPopupBgStyle: "background: rgba(28, 28, 28, 0.96); box-shadow: -4px -4px 4px #2c2c2c, 4px 4px 4px #090909;",
    bondInputPopupStyle: "box-shadow: inset 6px 6px 4px #0D0D0D, inset -6px -6px 4px #222222;",
    bondInformPopupColor: "#969696",
    // bond setting popup
    bondHelpSettingPopup: "#565656",
    /* --------------------------------- footer --------------------------------- */
    footerColorText: "#565656",

    /* -------------------------------- massages -------------------------------- */
    massageBgColor: "background:rgba(28, 28, 28, 0.97); box-shadow: 4px 4px 4px #090909, -4px -4px 4px #2C2C2C;",
    successIconM: "#92EADA",
    collapseTextInfo: "box-shadow: inset 6px 6px 4px #0d0d0d, inset -6px -6px 4px #222222; color: #565656;",
};

// lightTheme-----------------------------------------------------------------------------------------------------------------------------------------------------------
export const lightTheme = {
    body: "#E5E5E5",
    textColor: "#343434",
    headingColor: "#d23669",
    textColorActive: "#70C6B6",
    buttonHoverColor: "box-shadow: 4px 4px 4px #B3B3B3, -3px -3px 4px #FFFFFF, inset -4px -4px 4px #FFFFFF, inset 4px 4px 4px #C9C9C9;",
    mobileLogoMain: "#565656",

    /* --------------------------------- header --------------------------------- */
    fillLogo: "#343434",
    // wallet-and-token
    tokenTextColor: "#343434",
    // dapp-topbar-btns-wrap
    buttonStyle: "background: #EBEBEB !important; box-shadow: 4px 4px 4px #B3B3B3, -3px -3px 4px #FFFFFF, inset 0px 0px 0px #FFFFFF, inset 0px 0px 0px #C9C9C9;",
    buttonStyleBorderT: "border: 1px solid #FFAFF7;",
    buttonStyleBorderC: "border: 1px solid #70C6B6;",
    circleBgTime: "#F2F2F2",

    // .dapp-topbar::after line
    dappTopLine: "background: #F8F8F8; box-shadow: inset 2px 2px 2px #DBDBDB;",
    burgerStyle: "background: #E988EB; border: 1px solid #EBEBEB; box-shadow: -2px -2px 4px #FFFFFF, 1px 2px 4px #B0B0B0, inset -1px -1px 2px #F9C2FA, inset 1px 1px 2px #A043A2;",

    /* --------------------------------- drawer --------------------------------- */
    ColorSettingS: "#565656;",
    sunOn: "display: none;",
    moonOn: "display: block;",
    colorTitleDis: "color: #565656;",
    // Wallet --------------------------
    // iconWallet
    iconWallet: "fill:#565656;",
    colorWalletScore: "#565656",
    plusIconWallet: "box-shadow: 3px 3px 5px #D7D7D7, -3px -3px 4px #FFFFFF;",
    // socials join us ---------
    colorTitleJoinUs: "color: #343434;",
    colorSocialColor: "color:#565656;",
    colorSocialColorIcon: "fill: #565656;",
    // line
    colorLineDrawerUD: "background: #F8F8F8; box-shadow: inset 2px 2px 2px #dbdbdb;",

    /* -------------------------------- makeStyles-content-2------------------------------- */
    makeStylesContent2: "0px 0px 0px #111111, 0px 0px 0px #3f3e3e, inset 6px 6px 4px #D1CBCB, inset -6px -6px 4px #FFFFFF;",
    CardTitleColor: "#565656;",
    // stake ------------
    stakeCardTitleColor: "#565656",
    rebaseTimerColor: "color: #969696;",
    CardStakeDesColor: "#565656",
    // stake input
    stakeRadioButtonS:
        "background: #EBEBEB; border: 1px solid #EBEBEB; box-shadow: 3px 3px 4px #ACACAC, -2px -1px 4px #FFFFFF, inset 3px 3px 4px #CDCDCD, inset -4px -4px 4px #FFFFFF;",
    stakeRadioInsBut: "border: 6px solid #EBEBEB; box-shadow: 3px 3px 4px #CDCDCD, -2px -1px 4px #FFFFFF;",
    stakeCardInputBg: "0px 0px 0px rgb(0 0 0 / 0%),  inset 5px 5px 4px #C7C7C7, inset -5px -5px 4px #FAFAFA;",
    colorHelpStakeText: "#B9B9B9",
    stakeUserDataColor: "#969696",
    // bond --------------
    bondTableColor: "#565656",
    bondNameTitleMobile: "#565656",
    bondTokenNameTitleMobile: "#565656",
    // lastBondCircle
    lastBondCircle: "box-shadow: -4px -4px 4px #FFFFFF, 4px 4px 4px #AEAEAE, inset 0px 0px 0px #FFFFFF, inset 0px 0px 0px #C9C9C9;",
    lastBondCircleHover: "box-shadow: -2px -2px 4px #FFFFFF, 2px 2px 4px #AEAEAE, inset -4px 0px 4px #FFFFFF, inset 4px 4px 4px #C9C9C9;",
    lastBondCirHoverDop: "background: rgba(180, 179, 179, 0.2);",
    // bond input popup
    bondPopupBgStyle: "background: #EBEBEB; box-shadow: 4px 4px 4px #9D9D9D, -4px -4px 4px #FFFFFF;",
    bondInputPopupStyle: "box-shadow: inset 6px 6px 4px #CCCCCC, inset -6px -6px 4px #FFFFFF;",
    bondPopupButBorder: "border: 1px solid #FFAFF7;",
    bondInformPopupColor: "#565656",
    // bond setting popup
    bondHelpSettingPopup: "#9A9A9A",
    /* --------------------------------- footer --------------------------------- */
    footerColorText: "#C4C4C4",

    /* -------------------------------- massages -------------------------------- */
    massageBgColor: "background:rgba(235, 235, 235, 0.96); box-shadow: 4px 4px 4px #9D9D9D, -4px -4px 4px #FFFFFF;",
    successIconM: "#70C6B6",
    collapseTextInfo: "box-shadow: inset 6px 6px 4px #CCCCCC, inset -6px -6px 4px #FFFFFF; color: #969696;",
};

// create -------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const GlobalStyles = createGlobalStyle`
    #root {
        background: ${props => props.theme.body};
        color: ${props => props.theme.textColor};
        transition: .3s ease;
    }
    .mobileLogoMain path{
        fill: ${props => props.theme.mobileLogoMain};
    }
    /* ----------------------------- connect wallet ----------------------------- */
    .walletconnect-qrcode__base .walletconnect-modal__base{
        ${props => props.theme.bondPopupBgStyle};
    }
    .web3modal-modal-lightbox .web3modal-modal-card{
        ${props => props.theme.bondPopupBgStyle};
    }
    .web3modal-modal-lightbox .web3modal-modal-card .web3modal-provider-wrapper .web3modal-provider-container .web3modal-provider-name{
        color: ${props => props.theme.stakeCardTitleColor};
    }
    .web3modal-modal-lightbox .web3modal-modal-card .web3modal-provider-wrapper .web3modal-provider-container .web3modal-provider-description{
        ${props => props.theme.rebaseTimerColor};
    }
    .walletconnect-modal__mobile__toggle a{
        ${props => props.theme.colorTitleDis};
    }
    .walletconnect-qrcode__base .walletconnect-modal__base .walletconnect-modal__mobile__toggle a{
        color: ${props => props.theme.textColorActive};
    }
    .walletconnect-qrcode__base .walletconnect-modal__base .walletconnect-modal__mobile__toggle.right__selected a:nth-child(2), .walletconnect-qrcode__base .walletconnect-modal__base .walletconnect-modal__mobile__toggle a:last-child{
        ${props => props.theme.colorTitleDis};
    }
    .walletconnect-qrcode__base .walletconnect-modal__base .walletconnect-modal__mobile__toggle.right__selected a:last-child{
        color: ${props => props.theme.textColorActive};
    }
    .walletconnect-qrcode__base .walletconnect-modal__base .walletconnect-modal__mobile__toggle .walletconnect-modal__mobile__toggle_selector{
        background: ${props => props.theme.textColorActive};
    }
    .walletconnect-qrcode__base .walletconnect-modal__base .walletconnect-modal__header .walletconnect-modal__close__wrapper .walletconnect-modal__close__icon .walletconnect-modal__close__line1, .walletconnect-qrcode__base .walletconnect-modal__base .walletconnect-modal__header .walletconnect-modal__close__wrapper .walletconnect-modal__close__icon .walletconnect-modal__close__line2{
        border:1px solid ${props => props.theme.textColorActive};
    }
    .walletconnect-qrcode__base .walletconnect-modal__base .walletconnect-qrcode__text, .walletconnect-qrcode__base .walletconnect-modal__base .walletconnect-modal__base__row h3{
        ${props => props.theme.colorTitleDis};
    }

    /* --------------------------------- header --------------------------------- */
    .dapp-topbar .container .logo svg path{
        fill: ${props => props.theme.fillLogo};
    }
    // wallet-and-token
    .dapp-topbar .wallet-and-token .wallet-cs .wallet-cs-score, .dapp-topbar .wallet-and-token .token-cs .token-cs-rate{
        color: ${props => props.theme.tokenTextColor};
    }
    // dapp-topbar-btns-wrap
    .time-menu-root .time-menu-btn, .connect-button{
        ${props => props.theme.buttonStyle};
    }
    .time-menu-root .time-menu-btn{
        ${props => props.theme.buttonStyleBorderT};
    }
    .time-menu-root .time-menu-btn:hover{
        ${props => props.theme.buttonHoverColor};
    }
    .time-menu-root .time-menu-btn .circleBg, .dapp-topbar .wallet-and-token .token-cs .circleBg{
        fill:  ${props => props.theme.circleBgTime};
    }
    .time-menu-popper{
        ${props => props.theme.bondPopupBgStyle};
    }
    .time-menu-popper .tooltip .tooltip-item p{
        color: ${props => props.theme.stakeCardTitleColor};
    }
    .time-menu-popper .tooltip .divider{
        ${props => props.theme.dappTopLine};
    }

    .connect-button{
        ${props => props.theme.buttonStyleBorderC};
        color: ${props => props.theme.textColorActive};
    }
    .connect-button:hover{
        ${props => props.theme.buttonHoverColor};
    }
    // .dapp-topbar::after line
    .dapp-topbar::after{
        ${props => props.theme.dappTopLine};
    }
    .burger::after, .burger .burger-center-line, .burger::before{
        ${props => props.theme.burgerStyle};
    }


    /* --------------------------------- drawer --------------------------------- */
    .dapp-sidebar .dapp-menu-links .dapp-nav a{
        color: ${props => props.theme.textColor};
    }
    .dapp-sidebar .dapp-menu-links .dapp-nav .button-dapp-menu:hover{
        color: ${props => props.theme.textColorActive};
    }
    .dapp-sidebar .dapp-menu-links .dapp-nav .button-dapp-menu.active{
        color: ${props => props.theme.textColorActive};
    }
    h2{
    color: ${props => props.theme.headingColor};
    }
    // bond-discounts-title
    .dapp-sidebar .dapp-menu-links .dapp-nav .bond-discounts .bond-discounts-title{
        ${props => props.theme.colorTitleDis};
    }
    // iconWallet
    .wallet-icon *{
        ${props => props.theme.iconWallet};
    }
    .dapp-sidebar .drawer-wallet-cs-score .wallet-cs-score{
        color: ${props => props.theme.colorWalletScore};
    }
    .dapp-sidebar .drawer-wallet-cs-score .drawer__wallet-bye{
        ${props => props.theme.plusIconWallet};
    }

    // icons drawer-setting
    .draw-sitting *, .draw-set *{
        fill: ${props => props.theme.ColorSettingS};
    }
    .dapp-sidebar .drawer-setting .button-theme .sun{
        ${props => props.theme.sunOn};
    }
    .dapp-sidebar .drawer-setting .button-theme .moon{
        ${props => props.theme.moonOn};
    }
    
    // socials join us ----------
    .dapp-sidebar__join-us .join-us-title{
        ${props => props.theme.colorTitleJoinUs};
    }
    .dapp-sidebar__join-us .social-row a{
        ${props => props.theme.colorSocialColor};
    }
    .dapp-sidebar__join-us .social-row a svg *{
        ${props => props.theme.colorSocialColorIcon};
    }
    // line --------------------
    .dapp-sidebar .dapp-menu-doc-link::after{
        ${props => props.theme.colorLineDrawerUD};
    }


    /* -------------------------------- makeStyles-content-2 (dashboard..------------------------------- */
    .dashboard-view, .stake-view, .choose-bond-view, .choose-bond-view .choose-bond-view-card .MuiTableBody-root .MuiTableRow-root, .choose-bond-view .choose-bond-view-card-container .bond-data-card, .choose-bond-view .choose-bond-view-card .last-bonds .last-bonds__blocks .last-bonds__block {
        box-shadow: ${props => props.theme.makeStylesContent2};
    }
    // dashboard ------------
    .dashboard-view .dashboard-infos-wrap .dashboard-card .card-title, .stake-view .stake-card .stake-card-metrics .stake-card-apy .stake-card-metrics-title, .stake-view .stake-card .stake-card-metrics .stake-card-tvl .stake-card-metrics-title, .stake-view .stake-card .stake-card-metrics .stake-card-index .stake-card-metrics-title{
        color: ${props => props.theme.CardTitleColor};
    }
    .dashboard-view .dashboard-infos-wrap .dashboard-card .card-value, .stake-view .stake-card .stake-card-metrics .stake-card-apy .stake-card-metrics-value, .stake-view .stake-card .stake-card-metrics .stake-card-tvl .stake-card-metrics-value, .stake-view .stake-card .stake-card-metrics .stake-card-index .stake-card-metrics-value{
        color: ${props => props.theme.textColorActive};
    }

    // stake ---------------
    .stake-view .stake-card .stake-card-header .stake-card-header-title{
        color: ${props => props.theme.stakeCardTitleColor};
    }
    .rebase-timer p{
        ${props => props.theme.rebaseTimerColor};
    }
    .stake-view .stake-card .stake-card-area .stake-card-wallet-notification .stake-card-wallet-desc-text{
        color: ${props => props.theme.CardStakeDesColor};
    }
    .stake-view .stake-card .stake-card-area .stake-card-wallet-notification .stake-card-wallet-connect-btn{
        ${props => props.theme.buttonStyle};
        color: ${props => props.theme.textColorActive};
    }
    .stake-view .stake-card .stake-card-area .stake-card-wallet-notification .stake-card-wallet-connect-btn:hover{
        ${props => props.theme.buttonHoverColor};
    }
    
    // stake input
    .button.r, .button.r .layer{
        ${props => props.theme.stakeRadioButtonS};
    }
    #button-1 .knobs:before{
        ${props => props.theme.stakeRadioInsBut};
    }

    .stake-view .stake-card .stake-card-area .stake-card-action-area .stake-card-action-row .stake-card-action-input{
        box-shadow: ${props => props.theme.stakeCardInputBg};
    }
    .stake-view .stake-card .stake-card-area .stake-card-action-area .stake-card-action-row .stake-card-tab-panel .stake-card-tab-panel-btn{
        ${props => props.theme.buttonStyle};
    }
    .stake-view .stake-card .stake-card-area .stake-card-action-area .stake-card-action-row .stake-card-tab-panel .stake-card-tab-panel-btn:hover{
        ${props => props.theme.buttonHoverColor};
    }
    .stake-view .stake-card .stake-card-area .stake-card-action-area .stake-card-action-help-text p{
        color: ${props => props.theme.colorHelpStakeText};
    }
    .data-row .data-row-name, .data-row .data-row-value{
        color: ${props => props.theme.stakeUserDataColor};
    }

    // bond ---------------
    .choose-bond-view .choose-bond-view-card .choose-bond-view-card-header .choose-bond-view-card-title, .choose-bond-view .choose-bond-view-card .last-bonds .last-bonds__title, .last-bonds__block .last-bonds__block-title{
        color: ${props => props.theme.stakeCardTitleColor};
    }
    .choose-bond-view .choose-bond-view-card .choose-bond-view-card-metrics .choose-bond-view-card-metrics-title{
        color: ${props => props.theme.CardTitleColor};
    }
    .choose-bond-view .choose-bond-view-card .choose-bond-view-card-metrics .choose-bond-view-card-metrics-value{
        color: ${props => props.theme.textColorActive};
    }
    .choose-bond-view .bond-table-btn{
        ${props => props.theme.buttonStyle};
    }
    .choose-bond-view .bond-table-btn:hover{
        ${props => props.theme.buttonHoverColor};
    }
    .choose-bond-view .choose-bond-view-card .choose-bond-view-card-metrics::after,  .stake-view .stake-card .stake-card-metrics::after{
        ${props => props.theme.colorLineDrawerUD};
    }

    // last bond
    .last-bonds__block .last-bonds__block-tvl{
        ${props => props.theme.lastBondCircle};
    }
    .last-bonds__block .last-bonds__block-tvl:hover{
        ${props => props.theme.lastBondCircleHover};
    }
    .last-bonds__block .last-bonds__block-tvl:hover::after{
        ${props => props.theme.lastBondCirHoverDop};
    }

    // table
    .choose-bond-view .MuiTableCell-root p{
        color: ${props => props.theme.bondTableColor};
    }

    // bond popup -------
    .bond-view .bond-header .bond-header-logo .bond-header-name, .bond-view .bond-price-data .bond-price-data-title, .bond-view .bond-price-data .bond-price-data-value{
        color: ${props => props.theme.bondTableColor};
    }
    .bond-view .bond-header .cancel-bond::before, .bond-view .bond-header .cancel-bond::after, #hades .cross-wrap::before, #hades .cross-wrap::after{
        background: ${props => props.theme.textColorActive};
    }
    .bond-view .bond-one-table .bond-one-table-btn.active p{
        color: ${props => props.theme.textColorActive};
    }
    .bond-view .bond-one-table .bond-one-table-btn.active::before{
        background: ${props => props.theme.textColorActive};
    }
    .bond-view .bond-approve-btn{
        ${props => props.theme.buttonStyle};
        ${props => props.theme.bondPopupButBorder};
    }
    .bond-view .bond-approve-btn:hover{
        ${props => props.theme.buttonHoverColor};
    }
    .bond-view .bond-card{
        ${props => props.theme.bondPopupBgStyle};
    }
    .bond-view .bond-input, #hades .bond-input{
        ${props => props.theme.bondInputPopupStyle};
    }
    .bond-view .bond-balance-title{
        color: ${props => props.theme.bondInformPopupColor};
    }
    // redeem
    .bond-card .redeem-claims .bond-approve-btn p{
        color: ${props => props.theme.textColorActive};
    }
    // setting
    #hades .ohm-popover{
        ${props => props.theme.bondPopupBgStyle};
    }
    #hades .hades-title, #hades .card-content .input-lable{
        color: ${props => props.theme.bondTableColor};
    }
    #hades .bond-input .MuiOutlinedInput-input, #hades .card-content .percent{
        color: ${props => props.theme.textColorActive};
    }
    #hades .card-content .help-text .text-bond-desc{
        color: ${props => props.theme.bondHelpSettingPopup};
    }

    .footer-content p{
        color: ${props => props.theme.footerColorText};
    }
    
    /* -------------------------------- messages -------------------------------- */
    .massageBgC{
        ${props => props.theme.massageBgColor};
    }
    .massage-close-icon::before, .massage-close-icon::after{
        background: ${props => props.theme.textColorActive};
    }
    .massages-text{
        color: ${props => props.theme.textColor};
    }
    .success-icon path{
        fill: ${props => props.theme.successIconM};
    }
    .copy-and-text-err p{
        ${props => props.theme.colorTitleDis};
    }
    .collapse-text-info{
        ${props => props.theme.collapseTextInfo};
    }


    @media(max-width:959px){
        .MuiDrawer-root .MuiPaper-root{
            background: ${props => props.theme.body};
        }
    }
    @media(max-width: 733px){
        /* -------------------------------- makeStyles-content-2 (dashboard..------------------------------- */
        // bond ---------------
        .choose-bond-view .bond-name .bond-name-title{
            color: ${props => props.theme.bondTokenNameTitleMobile};
        }
        .choose-bond-view .bond-name-title{
            color: ${props => props.theme.bondNameTitleMobile};
        }
        .choose-bond-view .bond-table-btn{
            ${props => props.theme.buttonStyleBorderT};
        }
        .choose-bond-view .close-block-bond{
            ${props => props.theme.buttonStyle};
            ${props => props.theme.buttonStyleBorderC};
        }
        .choose-bond-view .close-block-bond::after, .choose-bond-view .close-block-bond::before{
            background: ${props => props.theme.textColorActive};
        }
        .choose-bond-view .choose-bond-view-card-container .bond-data-card {
            ${props => props.theme.buttonStyle};
        }
        .choose-bond-view .choose-bond-view-card-container .bond-data-card.active{
            box-shadow: ${props => props.theme.makeStylesContent2};
        }
    }
`;
