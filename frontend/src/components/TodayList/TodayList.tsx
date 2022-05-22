import React, {FC, useEffect, useState} from 'react';
import {Card, List} from "antd";
import {IListItemData} from "../../models/IListItemData";
import CardTitle from "./components/CardTitle";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {getTodayChoices, TodayListState} from "./TodayList.model";

const TodayList: FC = () => {
    const [todayState, setTodayState] = useState<TodayListState>({
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    } as TodayListState)
    const {isLoading} = useTypedSelector(state => state.user);
    useEffect(() => {
        getTodayChoices().then((data) => {
            setTodayState({
                loading: false,
                initLoading: false,
                data: data,
                list: data,
            })
        })
    }, [isLoading])
    return (
        <List
            loading={todayState.initLoading}
            grid={{gutter: 16, column: 4}}
            dataSource={todayState.list}
            renderItem={(item: IListItemData) => (
                <List.Item
                >
                    <Card title={<CardTitle login={item.login}/>}>{item.description}</Card>
                </List.Item>
            )}
        />
    );
};

export default TodayList;