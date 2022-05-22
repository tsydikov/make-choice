import moment, {Moment} from "moment";
import {IPossibleDate} from "../../models/IPossibleDate";
import React from "react";
import {formatDate} from "../../utils/date";
import {IWorkDay} from "../../models/IWorkDay";

export const selectDate = (
    date: Moment | null,
    index: number,
    dayOff: IPossibleDate,
    setDayOff: React.Dispatch<React.SetStateAction<IPossibleDate>>,
    moving: IPossibleDate,
    setMoving: React.Dispatch<React.SetStateAction<IPossibleDate>>
) => {
    if (date) {
        if (!date.isSameOrAfter(moment())) return
    }
    if (index === 2) {
        setDayOff({...dayOff, date: date})
        setMoving({...moving, date: null})
    } else {
        setDayOff({...dayOff, date: null})
        setMoving({...moving, date: date})
    }
}

export const answerVariantsMocData = [
    'работаю, фул тайм',
    'работаю, парт тайм',
    'не работаю, дейофф буду работать: дата',
    'переезжаю, дейофф буду работать: дата',
    'не работаю, не знаю когда буду',
]

export const createWorkDesc = (
    setWorkDesc: React.Dispatch<React.SetStateAction<IWorkDay>>,
    workDesc: IWorkDay,
    setMoving: React.Dispatch<React.SetStateAction<IPossibleDate>>,
    moving: IPossibleDate,
    dayOff: IPossibleDate,
    setDayOff: React.Dispatch<React.SetStateAction<IPossibleDate>>
) => {
    switch (workDesc.variant) {
        case 2:
            setMoving({...moving, date: null})
            dayOff.date
                ? setWorkDesc({
                    ...workDesc,
                    description: answerVariantsMocData[workDesc.variant].slice(0, -4) + formatDate(dayOff.date.toDate())
                })
                : setWorkDesc({
                    ...workDesc,
                    description: ''
                })
            break;
        case 3:
            setDayOff({...dayOff, date: null})
            moving.date
                ? setWorkDesc({
                    ...workDesc,
                    description: answerVariantsMocData[workDesc.variant].slice(0, -4) + formatDate(moving.date.toDate())
                })
                : setWorkDesc({
                    ...workDesc,
                    description: ''
                })
            break;
        default:
            setWorkDesc({
                ...workDesc,
                description: answerVariantsMocData[workDesc.variant]
            })
            setDayOff({...dayOff, date: null})
            setMoving({...moving, date: null})
    }
}