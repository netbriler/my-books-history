import {Link as NextLink, Spacer} from "@nextui-org/react";
import Link from "next/link";
import React, {FC} from "react";
import {IBookshelf} from "../../types/book";
import styles from "./Sidebar.module.css";

interface SidebarProps {
    selectedTab: number;
    tabs: IBookshelf[];
    setTab: (id: IBookshelf) => void,
}

const Sidebar: FC<SidebarProps> = ({selectedTab, tabs, setTab}) => {
    return (
        <div className={styles.navbar}>
            <Spacer y={1}/>
            {tabs.map(tab =>
                <span className={styles.navbar_link} key={tab.id} onClick={() => setTab(tab)}>
                    <Link href="#">
                        <NextLink color={tab.id === selectedTab ? 'primary' : 'text'}>
                            {tab.title}
                        </NextLink>
                    </Link>
                </span>
            )}
        </div>
    );
}

export default Sidebar;