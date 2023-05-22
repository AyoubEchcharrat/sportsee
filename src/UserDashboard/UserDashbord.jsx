import React from "react";
import BarChartActivity from "./BarChartActivity";
import KeyDataCard from "./KeyDataCard";
import Score from "./Score";
import ActivityTypes from "./ActivityTypes";
import AverageSessionsDuration from "./AverageSessionsDuration";
import UseFetch from "../Hooks/UseFetch";
import '../App.css';

function getCurrentURL() {
  var pathArray = window.location.pathname.slice(1).split("/");
  return pathArray;
}

function getUserURL(id,endpoint) {
  let getUrl;
  if (process.env.NODE_ENV === "development") {
    if(endpoint){
      endpoint = '-'+endpoint
    }
    getUrl = "/users/data-user-" + id + endpoint+".json";
    return getUrl
  }
  getUrl = "http://localhost:9000/user/" + id +'/'+endpoint+''
  console.log(getUrl)
  return getUrl;
}

function UserDashboard() {
  const pathArray = getCurrentURL();
  const {id} = Number(pathArray[1]);
  const dataOfUser = UseFetch(getUserURL(id,''));
  const getActivity = UseFetch(getUserURL(id,'activity'));
  const userActivity = getActivity?.data //HERE
  const nameOfUser = dataOfUser.data?.userInfos.firstName;
  const getPerformance = UseFetch(getUserURL(id,'performance'));
  const userPerformance = getPerformance?.data
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
            {dataOfUser?.data?.keyData.calorieCount.toLocaleString("en-US")}
          </KeyDataCard>
          <KeyDataCard type="Protéines">
            {dataOfUser?.data?.keyData.proteinCount.toLocaleString("en-US")}
          </KeyDataCard>
          <KeyDataCard type="Glucides">
            {dataOfUser?.data?.keyData.carbohydrateCount.toLocaleString("en-US")}
          </KeyDataCard>
          <KeyDataCard type="Lipides">
            {dataOfUser?.data?.keyData.lipidCount.toLocaleString("en-US")}
          </KeyDataCard>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;
