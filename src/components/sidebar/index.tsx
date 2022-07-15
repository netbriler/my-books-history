import {Dropdown, Link as NextLink, Spacer, User} from "@nextui-org/react";
import Link from "next/link";
import {useRouter} from "next/router";
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

    const router = useRouter()

    const user = useAppSelector(selectAuthUser);
    if (user == null) {
        return
    }

    const onDropdownSelect = (label) => {
        switch (label) {
            case 'logout':
                dispatch(logout())
                break;
            case 'privacy_policy':
                router.push('privacy')
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
                    <Dropdown.Item key="settings">
                        My Settings
                    </Dropdown.Item>
                    <Dropdown.Item key="privacy_policy" withDivider>
                        Privacy Policy
                    </Dropdown.Item>
                    <Dropdown.Item key="help_and_feedback">
                        Help & Feedback
                    </Dropdown.Item>
                    <Dropdown.Item key="logout" color="error" withDivider>
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