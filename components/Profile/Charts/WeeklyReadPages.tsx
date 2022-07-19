import { StyleSheet } from 'react-native';

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

const labels = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];

export const data = {
    labels,
    datasets: [
        {
            label: '',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: Colors.dark.tint,
        },
    ],
};

export default function WeeklyReadPages() {
    return (
            <Bar options={options} data={data} />
    );
}
