import React, { useState } from "react";
import "./footer.scss";
import { DRAWER_WIDTH, TRANSITION_DURATION } from "../../constants/style";

function Footer() {
    return (
        <div className="footer-content">
            <p>QUASAR DAO © 2022 All Rights Reserved. This is not an investment solicitation or offering. USA citizens, residents and legal entities are fully excluded.</p>
        </div>
    );
}

export default Footer;
