import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://assettrack-pro-server.vercel.app/requests');
                const requests = response.data;
                const returnableCount = requests.filter(item => item.productType === 'Returnable').length;
                const nonReturnableCount = requests.filter(item => item.productType === 'Non-returnable').length;
                
                setData({
                    labels: ['Returnable', 'Non-returnable'],
                    datasets: [
                        {
                            label: 'Returnable vs Non-returnable Items',
                            data: [returnableCount, nonReturnableCount],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Total Percentage of Returnable and Non-returnable Items Requested by the Employee</h2>
            {data ? (
                <Pie data={data} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PieChart;
