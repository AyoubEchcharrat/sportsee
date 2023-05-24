//Utils
import React from "react";
import { useParams } from "react-router-dom";
import '../App.css';
//Pages
import BarChartActivity from "./BarChartActivity";
import KeyDataCard from "./KeyDataCard";
import Score from "./Score";
import ActivityTypes from "./ActivityTypes";
import AverageSessionsDuration from "./AverageSessionsDuration";
import { getUserURL,DataModelization } from "../utility/Index";

function UserDashboard() {
  const {id} = useParams()

  const dataObjectInfos =  new DataModelization(getUserURL(id,''))
  const nameOfUser = dataObjectInfos.getUsername()
  const score = dataObjectInfos.getScore()
  const userNutrients = dataObjectInfos.getNutrients()

  const dataActivity = new DataModelization(getUserURL(id,'activity'))
  const userActivity = dataActivity.getActivity()
  console.log(userActivity)
  const dataAverageSessions =new DataModelization(getUserURL(id,'average-sessions'))
  const userAverageSessions = dataAverageSessions.getAverageSessions()

  const dataPerformance = new DataModelization(getUserURL(id,'performance'))
  const userPerformance = dataPerformance.getPerformance()


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Bonjour <span style={{ color: "red" }}>{nameOfUser}</span>
      </h1>
      <div className="left-block">
        <BarChartActivity userActivity={userActivity} />
        <div className="sub-activity-container">
          <AverageSessionsDuration userAverageSessions={userAverageSessions} />
          <ActivityTypes userPerformance={userPerformance} />
          <Score score={score} />
        </div>
      </div>
      <div className="right-block">
        <div className="keyData-card-container">
          <KeyDataCard type="Calories">
            {userNutrients?.keyData.calorieCount.toLocaleString("en-US")}
          </KeyDataCard>
          <KeyDataCard type="Protéines">
            {userNutrients?.keyData.proteinCount.toLocaleString("en-US")}
          </KeyDataCard>
          <KeyDataCard type="Glucides">
            {userNutrients?.keyData.carbohydrateCount.toLocaleString("en-US")}
          </KeyDataCard>
          <KeyDataCard type="Lipides">
            {userNutrients?.keyData.lipidCount.toLocaleString("en-US")}
          </KeyDataCard>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;