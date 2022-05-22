import {Moment} from "moment";

export interface IPossibleDate {
    date: Moment | null;
    variant: number;
}