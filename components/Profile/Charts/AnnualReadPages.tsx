import {StyleSheet, Text} from 'react-native';

import { Bar } from 'react-chartjs-2';
import Colors from '../../../constants/Colors'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import React, {useEffect, useRef, useState} from "react";
import {loadProfileDetails} from "../../../firebase/profile.firebase";
import {profileStore} from "../../../store/profile.store";
import {DailyReadPages} from "../../../models/Profile.model";
import {toJS} from "mobx";
import {reforwardRef} from "react-chartjs-2/dist/utils";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltip:{
            displayColors: false
        }
    },
};

const labels = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];

 const INITIAL_DATA = {
    labels,
    datasets: [
        {
            label: '',
            data: [123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: Colors.dark.tint,
        },
    ],
};

const getTotalReadPagesPerMonth = (dailyReadPages:DailyReadPages[]):number[] =>{
    const monthsObj = {
        '0':0,
        '1':0,
        '2':0,
        '3':0,
        '4':0,
        '5':0,
        '6':0,
        '7':0,
        '8':0,
        '9':0,
        '10':0,
        '11':0,
    }
    dailyReadPages.map(item=>{
        const date = new Date(item.date.seconds * 1000)
        const key = date.getMonth()
        monthsObj[key] = monthsObj[key] + item.pages
    })
    return Object.values(monthsObj)
}

export default function AnnualReadPages() {
    const chartRef = useRef<ChartJS>(null);
    useEffect(async () => {
            await loadProfileDetails()

            const dailyReadPages:DailyReadPages[] = profileStore.dailyReadPages
            const totalReadPagesPerMonth = getTotalReadPagesPerMonth(dailyReadPages)
            const newBarData = INITIAL_DATA
            newBarData.datasets[0].data = totalReadPagesPerMonth
            const chart = chartRef.current;
            chart.data = newBarData
            chart.update()
    }, []);

    return (
        <>
            <Bar ref={chartRef} options={options} data={INITIAL_DATA} type='bar'/>
        </>
    );
}
