"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import ProfileBox from "@/components/ProfileBox";
import SearchCourses from "@/components/SearchCourses/SearchCourses";
import { useEffect, useState } from "react";
import { getDashboardCourseData } from "@/Services/UserApplicationService";
import ApiNames from "@/constants/ApiNames";

const SearchCoursesRoute = () => {
  const [courseData, setCourseData] = useState<any>(null);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      // let response = await getDashboardCourseData(ApiNames.dashboardStats);

      let response = {
        courses: [
          {
            id: "course-001",
            universityId: "campus-001",
            universityName: "Oxford University",
            courseType: "Undergraduate",
            courseTypeDescription: "Bachelor's degree programs",
            courseTitle: "Bachelor of Arts in English Literature",
            courseDescription:
              "A comprehensive study of English literature from medieval to modern times, focusing on critical analysis and literary theory.",
            applicationFee: 75.0,
            tuitionFee: 35000.0,
            currency: "GBP",
            duration: 3,
            durationUnit: "years",
            availableIntakes: [
              {
                id: "intake-ox-001",
                startDate: "2024-09-05",
                endDate: "2024-10-15",
                term: "Fall 2024",
              },
            ],
          },
          {
            id: "course-002",
            universityId: "campus-001",
            universityName: "Oxford University",
            courseType: "Postgraduate",
            courseTypeDescription: "Master's degree programs",
            courseTitle: "Master of Science in Computer Science",
            courseDescription:
              "An advanced program covering algorithms, machine learning, and software engineering with research opportunities.",
            applicationFee: 90.0,
            tuitionFee: 42000.0,
            currency: "GBP",
            duration: 1,
            durationUnit: "years",
            availableIntakes: [
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
            id: "course-003",
            universityId: "campus-001",
            universityName: "Oxford University",
            courseType: "PhD",
            courseTypeDescription: "Doctoral programs",
            courseTitle: "Doctor of Philosophy in Physics",
            courseDescription:
              "A research-focused doctoral program exploring theoretical and experimental physics at the cutting edge of the field.",
            applicationFee: 100.0,
            tuitionFee: 38000.0,
            currency: "GBP",
            duration: 4,
            durationUnit: "years",
            availableIntakes: [
              {
                id: "intake-ox-001",
                startDate: "2024-09-05",
                endDate: "2024-10-15",
                term: "Fall 2024",
              },
            ],
          },
          {
            id: "course-004",
            universityId: "campus-002",
            universityName: "Harvard University",
            courseType: "Undergraduate",
            courseTypeDescription: "Bachelor's degree programs",
            courseTitle: "Bachelor of Science in Biology",
            courseDescription:
              "A comprehensive program covering molecular biology, genetics, ecology, and evolutionary biology with lab components.",
            applicationFee: 85.0,
            tuitionFee: 52000.0,
            currency: "USD",
            duration: 4,
            durationUnit: "years",
            availableIntakes: [
              {
                id: "intake-harv-001",
                startDate: "2024-08-25",
                endDate: "2024-09-30",
                term: "Fall 2024",
              },
            ],
          },
          {
            id: "course-005",
            universityId: "campus-002",
            universityName: "Harvard University",
            courseType: "Postgraduate",
            courseTypeDescription: "Master's degree programs",
            courseTitle: "Master of Business Administration",
            courseDescription:
              "A world-renowned MBA program focusing on leadership, management, and business strategy with case study methodology.",
            applicationFee: 100.0,
            tuitionFee: 78000.0,
            currency: "USD",
            duration: 2,
            durationUnit: "years",
            availableIntakes: [
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
            id: "course-006",
            universityId: "campus-003",
            universityName: "MIT",
            courseType: "Undergraduate",
            courseTypeDescription: "Bachelor's degree programs",
            courseTitle: "Bachelor of Science in Computer Engineering",
            courseDescription:
              "An innovative program combining computer science and electrical engineering with hands-on project experience.",
            applicationFee: 75.0,
            tuitionFee: 55000.0,
            currency: "USD",
            duration: 4,
            durationUnit: "years",
            availableIntakes: [
              {
                id: "intake-mit-001",
                startDate: "2024-09-01",
                endDate: "2024-10-01",
                term: "Fall 2024",
              },
            ],
          },
          {
            id: "course-007",
            universityId: "campus-003",
            universityName: "MIT",
            courseType: "PhD",
            courseTypeDescription: "Doctoral programs",
            courseTitle: "Doctor of Philosophy in Artificial Intelligence",
            courseDescription:
              "A cutting-edge research program exploring machine learning, neural networks, and AI applications with world-class faculty.",
            applicationFee: 125.0,
            tuitionFee: 62000.0,
            currency: "USD",
            duration: 5,
            durationUnit: "years",
            availableIntakes: [
              {
                id: "intake-mit-001",
                startDate: "2024-09-01",
                endDate: "2024-10-01",
                term: "Fall 2024",
              },
            ],
          },
          {
            id: "course-008",
            universityId: "campus-004",
            universityName: "University of Toronto",
            courseType: "Undergraduate",
            courseTypeDescription: "Bachelor's degree programs",
            courseTitle: "Bachelor of Arts in Psychology",
            courseDescription:
              "A comprehensive program exploring human behavior, cognition, and development with research opportunities.",
            applicationFee: 90.0,
            tuitionFee: 38000.0,
            currency: "CAD",
            duration: 4,
            durationUnit: "years",
            availableIntakes: [
              {
                id: "intake-uoft-dt-001",
                startDate: "2024-09-10",
                endDate: "2024-10-20",
                term: "Fall 2024",
              },
            ],
          },
          {
            id: "course-009",
            universityId: "campus-005",
            universityName: "University of Toronto",
            courseType: "Undergraduate",
            courseTypeDescription: "Bachelor's degree programs",
            courseTitle: "Bachelor of Commerce",
            courseDescription:
              "A business-focused program covering finance, marketing, accounting, and management with co-op opportunities.",
            applicationFee: 90.0,
            tuitionFee: 42000.0,
            currency: "CAD",
            duration: 4,
            durationUnit: "years",
            availableIntakes: [
              {
                id: "intake-uoft-miss-001",
                startDate: "2024-09-05",
                endDate: "2024-10-15",
                term: "Fall 2024",
              },
            ],
          },
          {
            id: "course-010",
            universityId: "campus-006",
            universityName: "University of Toronto",
            courseType: "Postgraduate",
            courseTypeDescription: "Master's degree programs",
            courseTitle: "Master of Environmental Science",
            courseDescription:
              "An interdisciplinary program focusing on environmental challenges, sustainability, and conservation with fieldwork components.",
            applicationFee: 110.0,
            tuitionFee: 32000.0,
            currency: "CAD",
            duration: 2,
            durationUnit: "years",
            availableIntakes: [
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
        setCourseData(response);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
    }
  };

  return (
    <>
      <div className="mx-auto w-full">
        <SearchCourses courseData={courseData}/>
      </div>
    </>
  );
};

export default SearchCoursesRoute;
