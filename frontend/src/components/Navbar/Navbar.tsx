import React, {FC} from 'react';
import {Avatar, Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import '../../App.css'
import NavItems from "./NavItems";
import roleAllowed from "../../utils/roleAllowed";

const Navbar: FC = () => {
    const router = useHistory()
    const {isAuth, user} = useTypedSelector(state => state.user);
    const {logout} = useActions()
    return (
        <Layout.Header>
            <Row justify="space-between">
                {isAuth
                    ?
                    <>
                        <div>
                            <Avatar size={60}/>
                            <span className="userName">{user.login}</span>
                        </div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            {NavItems.map((item) =>
                                roleAllowed(item.roleAloud, user)
                                    ? (<Menu.Item
                                        onClick={() => router.push(item.path)}
                                        key={item.path}
                                    >
                                        {item.text}
                                    </Menu.Item>)
                                    : null
                            )}
                            <Menu.Item
                                onClick={logout}
                                key={'logout'}
                            >
                                Logout
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <div className="userName">Make your choice</div>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;
