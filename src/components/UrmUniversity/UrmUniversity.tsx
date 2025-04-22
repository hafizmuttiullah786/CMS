"use client";
import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import uniicon from "../../../public/images/uni-icon.png";
import Select from "react-select";

type Props = {
  universitiesData: any;
};

const UrmUniversity = ({ universitiesData }: Props) => {
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const universityOptions = useMemo(() => {
    return universitiesData?.universities.map((uni: any) => ({
      value: uni.id,
      label: uni.universityName,
    }));
  }, [universitiesData]);

  const countryOptions = useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(universitiesData?.universities.map((uni: any) => uni.country))
    ) as string[];
    
    return uniqueCountries.map((country: string) => ({
      value: country,
      label: country,
    }));
  }, [universitiesData]);

  const filteredUniversities = useMemo(() => {
    let filtered = universitiesData?.universities || [];

    if (selectedUniversity) {
      filtered = filtered.filter(
        (uni: any) => uni.id === selectedUniversity.value
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter(
        (uni: any) => uni.country === selectedCountry.value
      );
    }

    setCurrentPage(1); // reset page when filters change
    return filtered;
  }, [selectedUniversity, selectedCountry, universitiesData]);

  const totalPages = Math.ceil(filteredUniversities?.length / pageSize);

  const paginatedUniversities = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUniversities?.slice(start, start + pageSize);
  }, [filteredUniversities, currentPage]);

  const handleUniversityChange = (selectedOption: any) => {
    setSelectedUniversity(selectedOption);
  };

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="university_list">
      <div className="page-heading">URM University</div>

      <div className="university_list_top mb-4 d-flex gap-3 flex-wrap">
        <div className="select_uni" style={{ minWidth: "250px" }}>
          <Select
            id="universitySelect"
            options={universityOptions}
            value={selectedUniversity}
            onChange={handleUniversityChange}
            className="form-control"
            placeholder="Select a university"
            isClearable
          />
        </div>

        <div className="select_country" style={{ minWidth: "250px" }}>
          <Select
            id="countrySelect"
            options={countryOptions}
            value={selectedCountry}
            onChange={handleCountryChange}
            className="form-control"
            placeholder="Select a country"
            isClearable
          />
        </div>
      </div>

      <div className="row">
        {paginatedUniversities?.map((uni: any) => (
          <div key={uni.id} className="col-lg-4 col-md-6 col-12 mb-5">
            <div className="university_card">
              <div className="uni_icon mb-2">
                <Image src={uniicon} alt="icon" />
              </div>
              <div className="short-title">
                <p>University Name</p>
                <span>{uni.universityName}</span>
              </div>
              <div className="short-title">
                <p>City</p>
                <span>{uni.city}</span>
              </div>
              <div className="short-title">
                <p>Country</p>
                <span>{uni.country}</span>
              </div>
              <div className="short-title">
                <p>Address</p>
                <span>{uni.address}</span>
              </div>
              <div className="short-title">
                <p>Intakes</p>
                <span>
                  {uni.intakes.map((intake: any) => intake.term).join(", ")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paginatedUniversities?.length === 0 && (
        <p className="text-center">No university found.</p>
      )}

      {totalPages > 1 && (
        <div className="course_pagination mt-0">
          <div className="pagination-wraper">
            <button
              className={`prev ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className={`next ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrmUniversity;
