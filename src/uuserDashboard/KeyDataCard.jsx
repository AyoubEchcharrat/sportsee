import '../styles/KeyDataCard.css'
import calorieIcon from '../assets/calories-icon.svg'
import proteineIcon from '../assets/protein-icon.svg'
import glucideIcon from '../assets/carbs-icon.svg'
import lipideIcon from '../assets/fat-icon.svg'

export default function KeyDataCard({type,children}) {
    let icon;
    let unit;
    switch(type){
        case 'Calories' :
            unit = 'kCal'
            icon = calorieIcon
            break
        case 'Protéines' :
            unit = 'g'
            icon = proteineIcon
            break
        case 'Glucides' :
            unit = 'g'
            icon = glucideIcon
            break
        default : 
            unit = 'g'
            icon = lipideIcon
    }
    
    

    return <div className="keydata-card">
        <img src={icon} alt="" />
        <div className='keydata-value-container'>
            <div className='keydata-value-text'>{children}{unit}</div> 
            <div className='keydata-value-type'>{type} </div>
        </div>
        
        
    </div>
}