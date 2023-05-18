import {RadialBarChart,PolarAngleAxis, RadialBar, ResponsiveContainer,Legend} from 'recharts'
import '../styles/Score.css'

export default function Score({dataOfUser}){
    const todayScore = (dataOfUser?.data?.todayScore ? dataOfUser?.data?.todayScore* 100 : dataOfUser?.data?.score* 100)
    const data = [
        { name: "Day's score" , value : todayScore,fill:"red" },
    ]

    const renderLegend = ({payload}) => {
        return <div className="legendScore-container">
            <div className="legendScore-value">
                {payload[0].payload.value}%
            </div>
            <div className="legendScore-subtext">de votre objectif</div>
        </div>
    }

    return <div className='dailyScore-container'>
    <div className="dailyScore-title">Score</div>
        <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart startAngle={205}
                    endAngle={-160} cx="50%" cy="50%" 
                    innerRadius="70%" outerRadius="83%" 
                    barSize={100} data={data}  
                    >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar cornerRadius={20} background clockWise angleAxisId={0} dataKey="value"/>
                    <Legend content={renderLegend} layout="vertical" verticalAlign="middle" />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
}