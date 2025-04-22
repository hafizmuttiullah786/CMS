import React from "react";
import { dataStats } from "@/types/dataStats";
import "remixicon/fonts/remixicon.css";

type Props = {
  dashboardStats: any;
};

const DataStatsOne = (props: Props) => {
  return (
    <>
      <div className="stats-wrapper">
        <div className="stats-box">
          <div className="stats-icon">
            <i className="ri-numbers-fill"></i>
          </div>
          <div>
            <div className="total_applications">Total Applications</div>
            <h3>{props.dashboardStats?.totalApplication}</h3>
          </div>
        </div>
        <div className="stats-box">
          <div className="stats-icon">
            <i className="ri-file-list-3-line"></i>
          </div>
          <div>
            <div className="total_applications">Applications Processed</div>
            <h3>{props.dashboardStats?.totalApplicationProcess}</h3>
          </div>
        </div>
        <div className="stats-box">
          <div className="stats-icon">
            <i className="ri-group-3-line"></i>
          </div>
          <div>
            <div className="total_applications">With CAS Team</div>
            <h3>{props.dashboardStats?.totalcasTeam}</h3>
          </div>
        </div>
        <div className="stats-box">
          <div className="stats-icon">
            <i className="ri-file-close-line"></i>
          </div>
          <div>
            <div className="total_applications">Case Closed</div>
            <h3>{props.dashboardStats?.totalclose}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataStatsOne;
