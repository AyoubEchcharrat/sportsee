import React, { useState, useEffect } from "react";
import BarChartActivity from "./BarChartActivity";
import { mockedCall, APIcall } from "../APIcalls/APIcalls";
import KeyDataCard from "./KeyDataCard";
import Score from "./Score";
import ActivityTypes from "./ActivityTypes";
import AverageSessionsDuration from "./AverageSessionsDuration";
import ErrorPage from "./Error";
import UseFetch from "../Hooks/UseFetch";

function getCurrentURL() {
  var pathArray = window.location.pathname.slice(1).split("/");
  return pathArray;
}

function getUserActivity(id) {
  let getUrl;
  if (process.env.NODE_ENV === "development") {

    getUrl = "/users/data-user-" + id + "-activity.json";
  } else if (process.env.NODE_ENV === "production") {
    getUrl = "http://localhost:9000/user/" + id +'/activity'
  }
  console.log(getUrl)
  return getUrl;
}

function getDataOfUser(id) {
  const typeOfData = "";
  let getUrl;
  if (process.env.NODE_ENV === "development") {
    getUrl = "/users/data-user-" + id + ".json";
  } else if (process.env.NODE_ENV === "production") {
    getUrl = "http://localhost:9000/user/" + id;
  }
  return getUrl;
}

function getTypeOfActivity(id) {
  const typeOfData = "performance";
  let TypeOfActivity;
  if (process.env.NODE_ENV === "development") {
    TypeOfActivity = mockedCall(id, typeOfData);
  } else if (process.env.NODE_ENV === "production") {
    TypeOfActivity = APIcall(id, typeOfData);
  }

  return TypeOfActivity;
}

function getAverageActivity(id) {
  const typeOfData = "average-sessions";
  let averageActivity;
  if (process.env.NODE_ENV === "development") {
    averageActivity = mockedCall(id, typeOfData);
  } else if (process.env.NODE_ENV === "production") {
    averageActivity = APIcall(id, typeOfData);
  }

  return averageActivity;
}

function CheckIfIdCorrect() {
    return <UserDashboard/>
}


function UserDashboard() {
    const pathArray = getCurrentURL();
    const id = Number(pathArray[1]);
    const url = "/users/data-user-" + id + ".json"

  const dataOfUser = UseFetch(url);
  const getActivity = UseFetch(getUserActivity(id));
  const userActivity = getActivity?.data //HERE
  console.log(userActivity)
  const nameOfUser = dataOfUser.data?.userInfos.firstName;
  const TypeOfActivity = getTypeOfActivity(id);
  const averageActivity = getAverageActivity(id);

  return (
    nameOfUser ? 
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Bonjour <span style={{ color: "red" }}>{nameOfUser}</span>
      </h1>
      <div className="left-block">
        <BarChartActivity userActivity={userActivity} />
        <div className="sub-activity-container">
          <AverageSessionsDuration averageActivity={averageActivity} />
          <ActivityTypes TypeOfActivity={TypeOfActivity} />
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
            {dataOfUser?.data?.keyData.carbohydrateCount.toLocaleString(
              "en-US"
            )}
          </KeyDataCard>
          <KeyDataCard type="Lipides">
            {dataOfUser?.data?.keyData.lipidCount.toLocaleString("en-US")}
          </KeyDataCard>
        </div>
      </div>
    </div>
  : <ErrorPage/>
  )
}

export default CheckIfIdCorrect;
