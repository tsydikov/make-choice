import React, {FC, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Radio, Row, Space} from "antd";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {initialWorkDesc, IWorkDay} from "../../models/IWorkDay";
import {IPossibleDate} from "../../models/IPossibleDate";
import {IChoice} from "../../models/IChoice";
import * as model from "./MakeChoiceForm.model";

interface MakeChoiceFormProps {
    submit: (workDayDesc: IChoice) => void
}

const MakeChoiceForm: FC<MakeChoiceFormProps> = (props) => {
    const [workDesc, setWorkDesc] = useState<IWorkDay>(initialWorkDesc as IWorkDay);
    const [dayOff, setDayOff] = useState<IPossibleDate>({
        date: null,
        variant: 2,
    } as IPossibleDate);
    const [moving, setMoving] = useState<IPossibleDate>({
        date: null,
        variant: 3,
    } as IPossibleDate);
    useEffect(() => {
        model.createWorkDesc(
            setWorkDesc,
            workDesc,
            setMoving,
            moving,
            dayOff,
            setDayOff)
    }, [workDesc.variant, dayOff.date, moving.date])
    const {user} = useTypedSelector(state => state.user)
    const submitForm = () => {
        props.submit({
            userId: user.userId,
            description: workDesc.description,
        })
    }
    return (
        <Form onFinish={submitForm}>
            <Radio.Group onChange={e => setWorkDesc({...workDesc, variant: e.target.value})} value={workDesc.variant}>
                <Space direction="vertical">
                    {model.answerVariantsMocData.map((element, index) => (element.includes('дата'))
                        ? <Radio value={index} key={index}>
                            {element.slice(0, -4)}
                            <DatePicker
                                key={index}
                                value={index === 2 ? dayOff.date : moving.date}
                                onChange={(date) => model.selectDate(date, index, dayOff, setDayOff, moving, setMoving)}
                            />
                        </Radio>
                        : <Radio value={index} key={index}>{element}</Radio>
                    )}
                </Space>
            </Radio.Group>
            <br/>
            <br/>
            <Row justify="center">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!workDesc.description}
                    >
                        Make your choice
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default MakeChoiceForm;
