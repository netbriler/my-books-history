import {Dropdown, Link as NextLink, Spacer, User} from "@nextui-org/react";
import Link from "next/link";
import React, {FC} from "react";
import {logout, selectAuthUser} from "../../store/reducers/authSlice";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {IBookshelf} from "../../types/book";
import styles from "./Sidebar.module.css";

interface SidebarProps {
    selectedTab: number;
    tabs: IBookshelf[];
    setTab: (id: IBookshelf) => void;
}

const Sidebar: FC<SidebarProps> = ({selectedTab, tabs, setTab}) => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectAuthUser);
    if (user == null) {
        return
    }

    const onDropdownSelect = (label) => {
        switch (label) {
            case 'logout':
                dispatch(logout())
                break;
            default:
                alert(`To do ${label}`)
        }
    }

    return (
        <div className={styles.navbar}>
            <Dropdown placement="bottom-left">
                <Dropdown.Trigger>
                    <User zoomed pointer bordered as="button" size="lg" color="gradient"
                          name={user.name} description={'@' + user.email.split('@')[0]} src={user.picture}
                    />
                </Dropdown.Trigger>
                <Dropdown.Menu color="primary" aria-label="User Actions" onAction={onDropdownSelect}>
                    <Dropdown.Item key="settings" command="ctrl+s">
                        My Settings
                    </Dropdown.Item>
                    <Dropdown.Item key="privacy_policy" withDivider command="ctrl+p">
                        Privacy Policy
                    </Dropdown.Item>
                    <Dropdown.Item key="help_and_feedback" command="ctrl+h">
                        Help & Feedback
                    </Dropdown.Item>
                    <Dropdown.Item key="logout" color="error" command="ctrl+l" withDivider>
                        Log Out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

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