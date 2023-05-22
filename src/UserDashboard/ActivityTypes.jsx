import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../styles/ActivityTypes.css'

export default function ActivityTypes({userPerformance}) {
    const mapOfKinds = userPerformance ? userPerformance.kind : {}  //HERE
    let nameOfEachData = Object.values(mapOfKinds)?.map(name => {
        if(name === 'intensity'){
            name = 'Intensité'
        }
        if(name === 'cardio'){
            name = 'Cardio'
        }
        if(name === 'speed'){
            name = 'Vitesse'
        }
        if(name === 'strength'){
            name = 'Force'
        }
        if(name === 'endurence'){
            name = 'Endurence'
        }
        if(name === 'energy'){
            name = 'Énergie'
        }
        return name
    }) 

    const data = userPerformance?.data.map((value,index) => {
        return {'value':value.value,'kind':nameOfEachData[index]}
    },[])
    
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