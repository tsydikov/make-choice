import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar/EventCalendar";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import MakeChoiceForm from "../components/MakeChoiceForm/MakeChoiceForm";
import {IChoice} from "../models/IChoice";
import ChooseUser from "../components/ChooseUser/ChooseUser";
import roleAllowed from "../utils/roleAllowed";

const WorkCalendar: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {fetchChoices, makeChoice} = useActions();
    const {choices} = useTypedSelector(state => state.choice)
    const {user} = useTypedSelector(state => state.user);
    const addNewEvent = async (workDayDesc: IChoice) => {
        makeChoice(workDayDesc);
        setTimeout(() => {
            fetchChoices(user.userId)
        }, 2000)
        setModalVisible(false);

    }

    useEffect(() => {
        if(user.userId) {
            fetchChoices(user.userId)
        }
    }, [user.userId])

    return (
        <Layout>
            <br/>
            <Row justify="center">
                <Button
                    onClick={() => setModalVisible(true)}
                >
                    Make Choice
                </Button>
            </Row>
            <br/>
            {roleAllowed(['admin'], user)
                ? (<div>
                <br/>
                <Row justify="center">
                    <ChooseUser/>
                </Row>
                <br/>
            </div>)
                : null
            }
            <EventCalendar choices={choices}/>
            <Modal
                title={`Status ${new Date().toDateString()}`}
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <MakeChoiceForm
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default WorkCalendar;
