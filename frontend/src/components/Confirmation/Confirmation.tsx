import React, {FC} from 'react';
import {Button, Form, Row} from "antd";
import {useActions} from "../../hooks/useActions";

interface ConfirmationProps {
    confirm: () => void
}

const Confirmation: FC<ConfirmationProps> = (props) => {
    const {setConfirmFormVisible} = useActions();
    const ok = () => {
        props.confirm()
        setConfirmFormVisible(false)
    }
    return (
        <Form>
            <Row justify="space-between">
                <Button
                    type="primary"
                    onClick={ok}
                >
                    Confirm
                </Button>
                <Button
                    type="primary"
                    danger onClick={() => setConfirmFormVisible(false)}
                >
                    Cancel
                </Button>
            </Row>
        </Form>
    );
};

export default Confirmation;