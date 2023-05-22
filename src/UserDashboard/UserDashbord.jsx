import React from "react";
import BarChartActivity from "./BarChartActivity";
import KeyDataCard from "./KeyDataCard";
import Score from "./Score";
import ActivityTypes from "./ActivityTypes";
import AverageSessionsDuration from "./AverageSessionsDuration";
import UseFetch from "../Hooks/UseFetch";
import '../App.css';
import { useParams } from "react-router-dom";

function getUserURL(id,endpoint) {
  let getUrl;
  if (process.env.NODE_ENV === "production") {
    if(endpoint){
      endpoint = '-'+endpoint
    }
    getUrl = "/users/data-user-" + id + endpoint+".json";
    return getUrl
  }else if(process.env.NODE_ENV === "development") {

    getUrl = "http://localhost:9000/user/" + id +'/'+endpoint
    console.log(getUrl)
  }

  return getUrl;
}

export const dataLoader = async ({ params }) => {
  const res = await fetch(getUserURL(params.id,''), { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
  if(!res.ok){
    return Promise.reject(new Error("La page n'est pas disponible"))
  }
  const data = await res.json();
  return { data };
}

// CLASSE QUI FORMATE LES DATA
class dataModelization {
  constructor(url,endpoint){
    this.url = url
    this.endpoint = endpoint
  }

  get username () {
    const Fetch = UseFetch(this.url)
    const user = Fetch.data?.userInfos.firstName;
    return user
  }

  get userData () {
    const Fetch = UseFetch(this.url)
    const userdata = Fetch?.data;
    return userdata
  }

  get activity () {
    const Fetch = UseFetch(this.url)
    const activity = Fetch?.data
    return activity
  }

  get performance () {
    const Fetch = UseFetch(this.url)
    const performance = Fetch?.data
    return performance
  }

}

function UserDashboard() {
  const {id} = useParams()
  console.log(id)
  const getActivity = new dataModelization(getUserURL(id,'activity'))
  const userActivity = getActivity.activity

  const getdataOfUser = new dataModelization(getUserURL(id,''))
  const dataOfUser = getdataOfUser.userData
  console.log(dataOfUser)

  const getNameOfUser =  new dataModelization(getUserURL(id,''))
  const nameOfUser = getNameOfUser.username

  const getPerformance = new dataModelization(getUserURL(id,'performance'))
  const userPerformance = getPerformance.performance
  const getAverageActivity = UseFetch(getUserURL(id,'average-sessions'));
  const userAverageActivity = getAverageActivity?.data

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Bonjour <span style={{ color: "red" }}>{nameOfUser}</span>
      </h1>
      <div className="left-block">
        <BarChartActivity userActivity={userActivity} />
        <div className="sub-activity-container">
          <AverageSessionsDuration averageActivity={userAverageActivity} />
          <ActivityTypes userPerformance={userPerformance} />
          <Score dataOfUser={dataOfUser} />
        </div>
      </div>
      <div className="right-block">
        <div className="keyData-card-container">
          <KeyDataCard type="Calories">
            {dataOfUser?.keyData.calorieCount.toLocaleString("en-US")}
          </KeyDataCard>
          <KeyDataCard type="Protéines">
            {dataOfUser?.keyData.proteinCount.toLocaleString("en-US")}
          </KeyDataCard>
          <KeyDataCard type="Glucides">
            {dataOfUser?.keyData.carbohydrateCount.toLocaleString("en-US")}
          </KeyDataCard>
          <KeyDataCard type="Lipides">
            {dataOfUser?.keyData.lipidCount.toLocaleString("en-US")}
          </KeyDataCard>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;