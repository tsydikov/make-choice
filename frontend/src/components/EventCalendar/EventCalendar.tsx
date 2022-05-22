import React, {FC} from 'react';
import {Calendar} from "antd";
import {Moment} from "moment";
import {IChoice} from "../../models/IChoice";

interface EventCalendarProps {
    choices: IChoice[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    function dateCellRender(value: Moment) {
        const currentDayEvents = props.choices.filter(ev =>
            // @ts-ignore
            new Date(ev.createdAt).getDate() === value.toDate().getDate());
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        );
    }

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default EventCalendar;
