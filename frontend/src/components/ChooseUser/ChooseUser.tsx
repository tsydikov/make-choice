import {Dropdown, Space, Button, Menu} from 'antd';
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import React, {FC, useEffect, useState} from "react";
import UserService from "../../api/UserService";
import {IMenuItem, initialMenuItem} from '../../models/IMenuItem'
import {useActions} from "../../hooks/useActions";

const ChooseUser: FC = () => {
    const [items, setItems] = useState<IMenuItem[]>(initialMenuItem as IMenuItem[])
    const [anotherUser, setAnotherUser] = useState('')
    const {fetchChoices} = useActions();
    useEffect(() => {
        UserService.getUsers()
            .then(({data}) => {
                const items = data.map((user) => ({
                    label: user.login,
                    key: user.userId.toString(),
                    icon: <UserOutlined/>,
                }))
                setItems(items)
            })
    }, [])
    return (
        <Dropdown overlay={<Menu items={items} onClick={(e) => {
            fetchChoices(Number(e.key))
            items.forEach((item) => {
                if (item.key === e.key) setAnotherUser(item.label)
            })
        }}/>}>
            <Button>
                <Space>
                    {anotherUser.length ? anotherUser : 'Look up to another user'}
                    <DownOutlined/>
                </Space>
            </Button>
        </Dropdown>
    )
}

export default ChooseUser;