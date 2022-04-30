import {useTheme} from "@nextui-org/react";
import cn from "classnames";
import {useTheme as useNextTheme} from "next-themes";
import React from "react";
import useIsMounted from "../../hooks/useIsMounted";
import Blockholder from "../blockholder";
import {Moon, Sun} from "../icons";

import styles from "./ThemeToggle.module.css"

interface Props {
    className?: string;
}

export const ThemeToggle: React.FC<Props> = ({className}) => {
    const isMounted = useIsMounted();
    const {setTheme} = useNextTheme();
    const {isDark} = useTheme();

    if (!isMounted) {
        return (
            <Blockholder alt="toggle theme placeholder" width="32px" height="20px"/>
        );
    }

    const handleToggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            aria-label="toggle a light and dark color scheme"
            className={cn(styles.toggle_button, className)}
            onClick={handleToggleTheme}
        >
            {isDark ? (
                <Sun filled className={styles.toggle_button_icon} size={20}/>
            ) : (
                <Moon filled className={styles.toggle_button_icon} size={20}/>
            )}
        </button>
    );
};

export default ThemeToggle;
