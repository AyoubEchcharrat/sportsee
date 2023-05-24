import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/barchartActivity.css'

function BarChartActivity({userActivity}) {
    const data = userActivity

    const renderCustomAxisTick = ({payload,x,y}) => {
      return <text fill='#9B9EAC' x={x - 5} y={y + 15}>{payload.index + 1}</text>
    }   
    const norender = () => {
      return null
    }

    const renderTooltip = ({payload,active}) => {
      if (active){
        return <div className='tooltip-container'>
        <p className='label'>{payload[0].value}kg</p>
        <p className='label'>{payload[1].value}kCal</p>
    </div>
      }

    }

    return (
      Object.keys(data).length === 0 ? 
        <div className="daily-activity-container"></div> 
        :
        <div className="daily-activity-container">  
          <h2 className='title-activity'>Activité quotidienne</h2>
          <ResponsiveContainer width='100%' height='100%' >
              <BarChart data={data?.sessions} //HERE 
                margin={{
                  top: 5,
                  right: 0,
                  left: -20,
                  bottom: 5 }} >
                <CartesianGrid strokeDasharray="3 3"  vertical={false}/>
                <XAxis dataKey="day" tick={renderCustomAxisTick} stroke='#DEDEDE'/>
                <YAxis yAxisId="left" stroke='#9B9EAC' orientation="right" domain={['dataMin-1', 'dataMax+1']}  tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" tick={norender}  tickLine={false} axisLine={false}/>
                <Tooltip content={renderTooltip} />
                <Legend iconSize='8' iconType='circle' width={400} wrapperStyle={{ top: -63, right: -10, borderRadius: 3, lineHeight: '40px' }} />
                <Bar name='Poids (kg)' barSize={7} radius={[20, 20, 0 ,0]} yAxisId="left" dataKey="kilogram" fill="#282D30" />
                <Bar name='Calories brûlées (kCal)' barSize={7} radius={[20, 20, 0 ,0]} yAxisId="right" dataKey="calories"  fill="#E60000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
      );
}

export default BarChartActivity;