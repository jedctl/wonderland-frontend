import "./lastbondsoon.scss";
function LastBondSoon(props: any) {
    return (
        <div className="last-bonds-soon__block">
            <div className="last-bonds-soon__block-title">{props.blockTitleBond}</div>
            <div className="last-bonds__block-tvl">
                <div className="block-deactivate-text">Coming soon</div>
            </div>
        </div>
    );
}

export default LastBondSoon;
