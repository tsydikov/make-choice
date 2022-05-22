import React, {FC} from 'react';
import {Layout, Modal} from "antd";
import TodayList from "../components/TodayList/TodayList";
import '../App.css'
import {useTypedSelector} from "../hooks/useTypedSelector";
import Confirmation from "../components/Confirmation/Confirmation";
import {useActions} from "../hooks/useActions";

const Today: FC = () => {
    const {loginForDelete} = useTypedSelector(state => state.user);
    const {visible} = useTypedSelector(state => state.confirmForm);
    const {setConfirmFormVisible, deleteUser} = useActions();
    return (
        <Layout className="h100">
            <Modal
                title={`Are you sure you want to delete the user ${loginForDelete}? `}
                visible={visible}
                footer={null}
                onCancel={() => setConfirmFormVisible(false)}
            >
                <Confirmation confirm={() => deleteUser(loginForDelete)} />
            </Modal>
            <TodayList />
        </Layout>
    );
};

export default Today;