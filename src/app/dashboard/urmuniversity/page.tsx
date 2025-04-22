"use client";
import { Metadata } from "next";
import UrmUniversity from "@/components/UrmUniversity/UrmUniversity";
import { useEffect, useState } from "react";
import { getDashboardUniversitiesData } from "@/Services/UserApplicationService";
import ApiNames from "@/constants/ApiNames";

const UrmUniversityRoute = () => {
  const [universitiesData, setUniversitiesData] = useState<any>(null);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      // let response = await getDashboardUniversitiesData(ApiNames.dashboardStats);

      let response = {
        universities: [
          {
            id: "campus-001",
            universityName: "Oxford University",
            picture: "https://example.com/images/oxford-campus.jpg",
            logo: "https://example.com/logos/oxford-logo.png",
            country: "United Kingdom",
            city: "Oxford",
            address: "Oxford OX1 2JD, UK",
            intakes: [
              {
                id: "intake-ox-001",
                startDate: "2024-09-05",
                endDate: "2024-10-15",
                term: "Fall 2024",
              },
              {
                id: "intake-ox-002",
                startDate: "2025-01-10",
                endDate: "2025-02-20",
                term: "Spring 2025",
              },
            ],
          },
          {
            id: "campus-002",
            universityName: "Harvard University",
            picture: "https://example.com/images/harvard-campus.jpg",
            logo: "https://example.com/logos/harvard-logo.png",
            country: "United States",
            city: "Cambridge",
            address: "Cambridge, MA 02138, USA",
            intakes: [
              {
                id: "intake-harv-001",
                startDate: "2024-08-25",
                endDate: "2024-09-30",
                term: "Fall 2024",
              },
              {
                id: "intake-harv-002",
                startDate: "2025-01-20",
                endDate: "2025-02-28",
                term: "Spring 2025",
              },
            ],
          },
          {
            id: "campus-003",
            universityName: "MIT",
            picture: "https://example.com/images/mit-campus.jpg",
            logo: "https://example.com/logos/mit-logo.png",
            country: "United States",
            city: "Cambridge",
            address: "77 Massachusetts Ave, Cambridge, MA 02139, USA",
            intakes: [
              {
                id: "intake-mit-001",
                startDate: "2024-09-01",
                endDate: "2024-10-01",
                term: "Fall 2024",
              },
            ],
          },
          {
            id: "campus-004",
            universityName: "University of Toronto",
            picture: "https://example.com/images/uoft-downtown-campus.jpg",
            logo: "https://example.com/logos/uoft-logo.png",
            country: "Canada",
            city: "Toronto",
            address: "27 King's College Circle, Toronto, ON M5S 1A1, Canada",
            intakes: [
              {
                id: "intake-uoft-dt-001",
                startDate: "2024-09-10",
                endDate: "2024-10-20",
                term: "Fall 2024",
              },
              {
                id: "intake-uoft-dt-002",
                startDate: "2025-01-05",
                endDate: "2025-02-15",
                term: "Winter 2025",
              },
            ],
          },
          {
            id: "campus-005",
            universityName: "University of Toronto",
            picture: "https://example.com/images/uoft-mississauga-campus.jpg",
            logo: "https://example.com/logos/uoft-logo.png",
            country: "Canada",
            city: "Mississauga",
            address: "3359 Mississauga Rd, Mississauga, ON L5L 1C6, Canada",
            intakes: [
              {
                id: "intake-uoft-miss-001",
                startDate: "2024-09-05",
                endDate: "2024-10-15",
                term: "Fall 2024",
              },
              {
                id: "intake-uoft-miss-002",
                startDate: "2025-05-10",
                endDate: "2025-06-20",
                term: "Summer 2025",
              },
            ],
          },
          {
            id: "campus-006",
            universityName: "University of Toronto",
            picture: "https://example.com/images/uoft-scarborough-campus.jpg",
            logo: "https://example.com/logos/uoft-logo.png",
            country: "Canada",
            city: "Scarborough",
            address: "1265 Military Trail, Scarborough, ON M1C 1A4, Canada",
            intakes: [
              {
                id: "intake-uoft-scar-001",
                startDate: "2024-09-15",
                endDate: "2024-10-25",
                term: "Fall 2024",
              },
            ],
          },
          {
            id: "campus-007",
            universityName: "University of Toronto",
            picture: "https://example.com/images/uoft-scarborough-campus.jpg",
            logo: "https://example.com/logos/uoft-logo.png",
            country: "Canada",
            city: "Scarborough",
            address: "1265 Military Trail, Scarborough, ON M1C 1A4, Canada",
            intakes: [
              {
                id: "intake-uoft-scar-001",
                startDate: "2024-09-15",
                endDate: "2024-10-25",
                term: "Fall 2024",
              },
            ],
          },
        ],
        meta: {
          totalCount: 10,
          page: 1,
          limit: 20,
        },
      };

      if (response) {
        setUniversitiesData(response);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
    }
  };
  return (
    <>
      <div className="mx-auto w-full">
        <UrmUniversity universitiesData={universitiesData} />
      </div>
    </>
  );
};

export default UrmUniversityRoute;
