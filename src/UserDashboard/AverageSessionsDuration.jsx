import '../styles/AverageSessionsDuration.css'
import { LineChart, Line , Tooltip, ResponsiveContainer } from 'recharts'

export default function AverageSessionsDuration({averageActivity}){
    const data = averageActivity.data.sessions
    const renderTooltip = ({payload,active}) => {
        if (active){
          return <div className='tooltipAverageSessions-container'>
                <p className='AverageSessions-label'>{payload[0].value} min</p>
            </div>
        }
    }

    return (
    <div className="averageSessionsDuration-container">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={260} height={100} data={data} 
            margin={{top: 50,right: -2,left: -2,bottom: 50}}>
                <Tooltip  cursor={false} content={renderTooltip}/>
                <Line dot={false} type="monotone" dataKey="sessionLength" stroke="#fff" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
        <div className="renderAlldaysAWeek">
            <div>L</div>
            <div>M</div>
            <div>M</div>
            <div>J</div>
            <div>V</div>
            <div>S</div>
            <div>D</div>
        </div>
    </div>
    )
}