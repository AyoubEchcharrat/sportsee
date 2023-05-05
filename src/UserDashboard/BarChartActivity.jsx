import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockedCall } from '../APIcalls/APIcalls';
import '../styles/barchartActivity.css'

function BarChartActivity({id,endpoint}) {
    const data = mockedCall(id,endpoint)
    console.log(data.data.sessions)

    const renderCustomAxisTick = ({payload,x,y}) => {
      return <text x={x - 5} y={y + 15}>{payload.index + 1}</text>
    }   
    const norender = () => {
      return null
    }

    return (
        <BarChart
          width={830}
          height={320}
          data={data.data.sessions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3"  vertical={false}/>
          <XAxis dataKey="day" tick={renderCustomAxisTick}/>
          <YAxis yAxisId="left" orientation="right" domain={['dataMin-1', 'dataMax+1']}  tickLine={false} axisLine={false} />
          <YAxis yAxisId="right" tick={norender}  tickLine={false} axisLine={false}/>
          <Tooltip />
          <Legend />
          <Bar  yAxisId="left" dataKey="kilogram" fill="#282D30" />
          <Bar yAxisId="right" dataKey="calories"  fill="#E60000" />
        </BarChart>
      );
}

export default BarChartActivity;