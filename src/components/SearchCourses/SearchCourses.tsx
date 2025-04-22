"use client";
import { useState } from "react";
import Image from "next/image";
import Select, { SingleValue } from "react-select";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Leadsbeckettbanner from "../../../public/images/Leads-beckett-banner.jpg";
import unilogo from "../../../public/images/unilogo.png";

type OptionType = { value: string; label: string };

const countryOptions: OptionType[] = [
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "singapore", label: "Singapore" },
  { value: "australia", label: "Australia" },
];

const nationalityOptions: OptionType[] = [
  { value: "indian", label: "Indian" },
  { value: "pakistani", label: "Pakistani" },
  { value: "nigerian", label: "Nigerian" },
  // Add more if needed
];

const universityOptions: OptionType[] = [
  { value: "university of leeds", label: "University of Leeds" },
  { value: "university of toronto", label: "University of Toronto" },
  
  // Add dynamically if preferred
];

const courseTypeOptions: OptionType[] = [
  { value: "postgraduate", label: "Postgraduate" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "phd", label: "PhD" },
  { value: "mit", label: "MIT" },
];

const intakeOptions: OptionType[] = [
  { value: "september", label: "September" },
  { value: "january", label: "January" },
  { value: "may", label: "May" },
];

type Props = {
  courseData: any;
};

const SearchCourses = ({ courseData }: Props) => {
  const [country, setCountry] = useState<OptionType | null>(null);
  const [nationality, setNationality] = useState<OptionType | null>(null);
  const [university, setUniversity] = useState<OptionType | null>(null);
  const [courseType, setCourseType] = useState<OptionType | null>(null);
  const [intake, setIntake] = useState<OptionType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const coursesArray = courseData?.courses || [];

  const filteredCourses = coursesArray.filter((course: any) => {
    const matchesSearch = course.courseTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCountry = !country?.value || course.universityCountry?.toLowerCase().includes(country.value);
    const matchesNationality = !nationality?.value || course.studentNationality?.toLowerCase().includes(nationality.value);
    const matchesUniversity = !university?.value || course.universityName.toLowerCase().includes(university.value);
    const matchesCourseType = !courseType?.value || course.courseType.toLowerCase().includes(courseType.value);
    const matchesIntake = !intake?.value || course.intakeMonth?.toLowerCase().includes(intake.value);

    return matchesSearch && matchesCountry && matchesNationality && matchesUniversity && matchesCourseType && matchesIntake;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="select-courses">
      <div className="page-heading">Course ({filteredCourses.length})</div>

      <div className="search-wrapper">
        <div className="select_box">
          <Select
            isClearable
            className="select_field"
            placeholder="University Country"
            options={countryOptions}
            value={country}
            onChange={setCountry}
          />
        </div>
        <div className="select_box">
          <Select
            isClearable
            className="select_field"
            placeholder="Student Nationality"
            options={nationalityOptions}
            value={nationality}
            onChange={setNationality}
          />
        </div>
        <div className="select_box">
          <Select
            isClearable
            className="select_field"
            placeholder="University Name"
            options={universityOptions}
            value={university}
            onChange={setUniversity}
          />
        </div>
        <div className="select_box">
          <Select
            isClearable
            className="select_field"
            placeholder="Course Type"
            options={courseTypeOptions}
            value={courseType}
            onChange={setCourseType}
          />
        </div>
        <div className="select_box">
          <Select
            isClearable
            className="select_field"
            placeholder="Course Intake"
            options={intakeOptions}
            value={intake}
            onChange={setIntake}
          />
        </div>
        <div className="select_box">
          <div className="search_input">
            <i className="ri-search-line"></i>
            <input
              type="text"
              placeholder="Search by Course Name"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="course_wrapper">
        {currentCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          currentCourses.map((course: any, index: number) => (
            <div className="course_Card" key={index}>
              <div className="course_img">
                <Image src={Leadsbeckettbanner} alt="Course Banner" />
                <div className="uni_logo">
                  <Image src={unilogo} alt="University Logo" />
                </div>
              </div>
              <div className="course_detail">
                <div className="course-name">{course.courseTitle}</div>
                <div className="uni-name">{course.universityName}</div>
                <div className="course-inner-detail">
                  <div className="inner-flex">
                    <p>{course.courseTypeDescription}</p>
                    <span>{course.courseType}</span>
                  </div>
                  <div className="inner-flex">
                    <p>Tuition Fee:</p>
                    <span>
                      {course.tuitionFee} {course.currency}
                    </span>
                  </div>
                  <div className="inner-flex">
                    <p>Application Fee:</p>
                    <span>
                      {course.applicationFee} {course.currency}
                    </span>
                  </div>
                  <div className="inner-flex">
                    <p>Duration:</p>
                    <span>
                      {course.duration} {course.durationUnit}
                    </span>
                  </div>
                </div>
                <button className="apply-now-button">Apply Now</button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredCourses.length > 0 && (
        <div className="course_pagination">
          <div className="pagination-wraper">
            <button
              className="prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                className={currentPage === idx + 1 ? "active" : ""}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCourses;


