import React, { useState,useEffect } from 'react';
import BarChartActivity from './BarChartActivity';
import { mockedCall, APIcall } from '../APIcalls/APIcalls';
import KeyDataCard from './KeyDataCard';
import Score from './Score';
import ActivityTypes from './ActivityTypes';
import AverageSessionsDuration from './AverageSessionsDuration';
import ErrorPage from './Error';
import UseFetch from '../Hooks/UseFetch';

function getCurrentURL () {
    var pathArray = window.location.pathname.slice(1).split('/')
    return pathArray
}

function getUserActivity(id){  
    const typeOfData = 'activity'
    let dataActivity
    if (process.env.NODE_ENV === 'development'){
        dataActivity = mockedCall(id,typeOfData)
    }else if(process.env.NODE_ENV === 'production'){
        dataActivity = APIcall(id,typeOfData)
    }

    return dataActivity
}

function getDataOfUser(id) {
    const typeOfData = ''
    let getUrl
     if (process.env.NODE_ENV === 'development'){
        getUrl = '/users/data-user-'+id+'.json'
    }else if(process.env.NODE_ENV === 'production'){
        getUrl = 'http://localhost:9000/user/'+id
    }
    return getUrl
}


function getTypeOfActivity(id){
    const typeOfData = 'performance'
    let TypeOfActivity 
    if (process.env.NODE_ENV === 'development'){
        TypeOfActivity = mockedCall(id,typeOfData)
    }else if(process.env.NODE_ENV === 'production'){
        TypeOfActivity = APIcall(id,typeOfData)
    }

    return TypeOfActivity
}


function getAverageActivity(id){
    const typeOfData = 'average-sessions'
    let averageActivity 
    if (process.env.NODE_ENV === 'development'){
        averageActivity = mockedCall(id,typeOfData)
    }else if(process.env.NODE_ENV === 'production'){
        averageActivity = APIcall(id,typeOfData)
    }

    return averageActivity
}


/* function CheckIfIdCorrect(){
    const pathArray = getCurrentURL()
    const id = Number(pathArray[1])
    const typeOfData = ''
    let isIdCorrect
    if (process.env.NODE_ENV === 'development'){
        isIdCorrect = mockedCall(id,typeOfData)
    }else if(process.env.NODE_ENV === 'production'){
        console.log(process.env.NODE_ENV)
        isIdCorrect = APIcall(id,typeOfData)
    }
        return isIdCorrect ? UserDashboard(id) : <ErrorPage/>
} */



function CheckIfIdCorrect(){
    const [call,UseCall] = useState([])

    const pathArray = getCurrentURL()
    const id = Number(pathArray[1])
    const typeOfData = ''
    let isIdCorrect = UseFetch(id)
    console.log(isIdCorrect)

    return isIdCorrect ?   UserDashboard(id)  : <ErrorPage/> //UserDashboard(id)
}


/*     useEffect(() => {
        if (process.env.NODE_ENV === 'development'){
            const fetchData = async () => {
                APIcall(id,typeOfData)
                .then(resp => UseCall(resp))
            }
            fetchData()

        }else if(process.env.NODE_ENV === 'production'){
            //console.log(process.env.NODE_ENV)
            //isIdCorrect = APIcall(id,typeOfData)
        }
    }) */

function UserDashboard(id) {
    const dataOfUser = UseFetch('/users/data-user-'+id+'.json')  //UseFetch(getDataOfUser(id))
    const userActivity = getUserActivity(id)
    const nameOfUser = dataOfUser.data.userInfos.firstName
    const TypeOfActivity = getTypeOfActivity(id)
    const averageActivity = getAverageActivity(id)

    return (
        <div className='dashboard-container'>
            <h1 className='dashboard-title'>Bonjour <span style={{color:'red'}}>{nameOfUser}</span></h1>
            <div className="left-block">
                <BarChartActivity userActivity={userActivity} />
                <div className="sub-activity-container">
                    <AverageSessionsDuration averageActivity={averageActivity} />
                    <ActivityTypes TypeOfActivity={TypeOfActivity}/>
                    <Score dataOfUser={dataOfUser} />
                </div>
            </div>
            <div className="right-block">
                <div className="keyData-card-container">
                    <KeyDataCard type='Calories' >
                        {dataOfUser.data.keyData.calorieCount.toLocaleString("en-US")}
                    </KeyDataCard>
                    <KeyDataCard type='Protéines' >
                        {dataOfUser.data.keyData.proteinCount.toLocaleString("en-US")}
                    </KeyDataCard>
                    <KeyDataCard type='Glucides' >
                        {dataOfUser.data.keyData.carbohydrateCount.toLocaleString("en-US")}
                    </KeyDataCard>
                    <KeyDataCard type='Lipides' >
                        {dataOfUser.data.keyData.lipidCount.toLocaleString("en-US")}
                    </KeyDataCard>
                </div>
            </div>
            
        </div>
    )
}

export default CheckIfIdCorrect;