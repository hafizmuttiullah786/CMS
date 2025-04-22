"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import Notices from "@/components/Notices/Notices";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

type Props={
  dashboardStats: any
  notification: any
}
const ECommerce = (props:Props) => {
  return (
    <>
      <DataStatsOne dashboardStats={props.dashboardStats} />
      <div className="mt-4">
        <Notices  notification={props.notification}/>
      </div>
    </>
  );
};

export default ECommerce;
