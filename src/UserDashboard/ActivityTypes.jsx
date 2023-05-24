import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../styles/ActivityTypes.css'

export default function ActivityTypes({userPerformance}) {
    const data = userPerformance
    return <div className='activityTypes-container'>
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="55%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="kind" />
          <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
}