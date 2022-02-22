import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../../assets/icons/github.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "../../../assets/icons/telegram.svg";
import { ReactComponent as Discord } from "../../../assets/icons/discord.svg";
import { ReactComponent as Mail } from "../../../assets/icons/mail.svg";

export default function Social() {
    return (
        <div className="social-row">
            <Link href="https://t.me/quasdao" target="_blank">
                <SvgIcon color="primary" component={Telegram} />
                Telegram Channel
            </Link>

            <Link href="https://t.me/quasardao" target="_blank">
                <SvgIcon color="primary" component={Telegram} />
                Telegram Chat (EN)
            </Link>

            <Link href="https://twitter.com/QuasarFinance" target="_blank">
                <SvgIcon color="primary" component={Twitter} />
                Twitter
            </Link>

            <Link href="https://discord.gg/NP9RhakCJn" target="_blank">
                <SvgIcon color="primary" component={Discord} />
                Discord
            </Link>
            <Link href="contact@quasardao.finance" target="_blank">
                <SvgIcon color="primary" component={Mail} />
                Mail
            </Link>
        </div>
    );
}
