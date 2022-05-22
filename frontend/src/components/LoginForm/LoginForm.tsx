import React, {FC, useState} from 'react';
import {Button, Form, Input, Space} from "antd";
import {rules} from "../../utils/rules";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.user);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, registration} = useActions()

    const loginToApp = () => {
        login({login: username, password})
    }

    const registerNewUser = () => {
        registration({login: username, password})
    }

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            autoComplete="off"
        >
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
            <Form.Item
                label="Login"
                name="login"
                rules={[rules.required("Please enter login!")]}
            >
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required("Please enter password")]}
            >
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={"password"}
                />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Space>
                    <Button
                        id="login"
                        type="primary"
                        htmlType="button"
                        loading={isLoading}
                        onClick={loginToApp}
                    >
                        Login
                    </Button>
                    <Button
                        id="registration"
                        type="primary"
                        htmlType="button"
                        loading={isLoading}
                        onClick={registerNewUser}
                    >
                        Registration
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
