"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import ApiNames from "@/constants/ApiNames";
import { fetchGet } from "@/Services/NetWorkServices";
import {
  getDashboardNotifications,
  getDashboardStats,
} from "@/Services/UserApplicationService";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [notification, setNotification] = useState<any>(null);

  

  useEffect(() => {
    getStats();
    getNotification()
  }, []);

  const getStats = async () => {
    try {
      // let response = await getDashboardStats(ApiNames.dashboardStats);

      let response = {
        statusCode: 200,
        success: true,
        data: {
          totalApplication: 100,
          totalApplicationProcess: 10,
          totalcasTeam: 3,
          totalclose: 9,
        },
      };
      if (response.statusCode == 200) {
        setDashboardStats(response.data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
    }
  };

  const getNotification = async () => {
    try {
      // let response = await getDashboardNotifications(ApiNames.notification);

      let response = {
        statusCode: 200,
        success: true,
        total: 3,
        notifications: [
          {
            title: " notification title",
            description: "a sample description",
            date:"2025-04-17T17:20:00+05:00"
          },
          {
            title: " notification title 2",
            description: "a sample description2",
            date:"2025-05-17T17:20:00+05:00"
          },
          {
            title: " notification title 3",
            description: "a sample description",
            date:"2025-06-17T17:20:00+05:00"
          },
          {
            title: " notification title 4",
            description: "a sample description2",
            date:"2025-02-17T17:20:00+05:00"
          },
          {
            title: " notification title 3",
            description: "a sample description",
            date:"2025-06-17T17:20:00+05:00"
          },
          {
            title: " notification title 4",
            description: "a sample description2",
            date:"2025-02-17T17:20:00+05:00"
          },
          {
            title: " notification title 3",
            description: "a sample description",
            date:"2025-06-17T17:20:00+05:00"
          },
          {
            title: " notification title 4",
            description: "a sample description2",
            date:"2025-02-17T17:20:00+05:00"
          },
          {
            title: " notification title 3",
            description: "a sample description",
            date:"2025-06-17T17:20:00+05:00"
          },
          {
            title: " notification title 4",
            description: "a sample description2",
            date:"2025-02-17T17:20:00+05:00"
          },
        ],
      };
      if (response.statusCode == 200) {
        setNotification(response.notifications);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
    }
  };



  return (
    <>
      <ECommerce dashboardStats={dashboardStats} notification={notification}/>
    </>
  );
}
