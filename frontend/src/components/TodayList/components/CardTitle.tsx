import React, {FC} from 'react';
import {DeleteTwoTone} from '@ant-design/icons';
import {Button, Row, Tooltip} from "antd";
import {useActions} from "../../../hooks/useActions";

interface CardTitleProps {
    login: string
}

const CardTitle: FC<CardTitleProps> = (props) => {
    const {setConfirmFormVisible, setLoginForDelete} = useActions();
    const clickHandler = ()  => {
        setConfirmFormVisible(true)
        setLoginForDelete(props.login)
    }
    return (
        <Row justify="space-between">
            {props.login}
            <Tooltip title="delete user">
                <Button shape="circle" icon={<DeleteTwoTone />} onClick={clickHandler} />
            </Tooltip>
        </Row>
    );
};

export default CardTitle;