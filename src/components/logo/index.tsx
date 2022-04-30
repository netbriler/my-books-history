import cn from "classnames";
import React from "react";
import LogoBigLight from "../../../public/logo-big-light.svg";
import LogoBigDark from "../../../public/logo-big.svg";
import LogoSmallLight from "../../../public/logo-small-light.svg";
import LogoSmallDark from "../../../public/logo-small.svg";
import styles from "./Logo.module.css"

export interface LogoProps {
    auto?: boolean;
    small?: boolean;
    dark?: boolean;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({auto, dark, small, className, ...props}) => {
    const LogoSmall = dark ? LogoSmallDark : LogoSmallLight;
    const LogoBig = dark ? LogoBigDark : LogoBigLight;

    if (auto) {
        return (
            <div>
                <LogoSmall className={cn(styles.logo_small, className)} {...props}/>
                <LogoBig className={cn(styles.logo_large, className)} {...props}/>
            </div>
        );
    }

    if (small) {
        return <LogoSmall {...props}/>;
    }
    return <LogoBig {...props}/>;
};

export default Logo;
