import "./lastbond.scss";
function LastBond(props: any) {
    return (
        <div className={`last-bonds__block ${props.classDeactivate}`}>
            <div className="last-bonds__block-title">{props.blockTitleBond}</div>
            <div className="last-bonds__block-tvl" style={{ border: "1px solid" + props.LastBondAllColor }}>
                <div style={{ color: props.LastBondAllColor }} className="block-tvl-num">
                    {props.blockTVLNum}
                </div>
                <div className="block-tvl-text">TVL</div>
                <div className="block-deactivate-text">Coming soon</div>
            </div>
            <div className="last-bonds__block-roi" style={{ color: props.LastBondAllColor }}>
                <span>{props.blockROIProc}</span>
            </div>
            <div className="last-bonds__block-footerT">{props.blockTitleBond}</div>
        </div>
    );
}

export default LastBond;
