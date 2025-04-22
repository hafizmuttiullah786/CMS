"use client";
import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import uniicon from "../../../public/images/uni-icon.png";
import Select from "react-select";
import { Modal, Button, Form } from "react-bootstrap";

// const isAdmin = typeof window !== "undefined" && localStorage.getItem("role") === "admin";
const isAdmin = true;
type Props = {
  universitiesData: any;
};

const UrmUniversity = ({ universitiesData }: Props) => {
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [intakes, setIntakes] = useState<any[]>([]);
  const pageSize = 6;

  const universityOptions = useMemo(() => {
    return universitiesData?.universities.map((uni: any) => ({
      value: uni.id,
      label: uni.universityName,
    }));
  }, [universitiesData]);

  const countryOptions = useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(universitiesData?.universities.map((uni: any) => uni.country)),
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
        (uni: any) => uni.id === selectedUniversity.value,
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter(
        (uni: any) => uni.country === selectedCountry.value,
      );
    }

    setCurrentPage(1);
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

  const openModal = (uni?: any) => {
    setEditData(uni || null);
    setIntakes(uni?.intakes || [{ term: "", startDate: "", endDate: "" }]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditData(null);
    setIntakes([]);
  };

  const handleIntakeChange = (index: number, field: string, value: string) => {
    const updated = [...intakes];
    updated[index][field] = value;
    setIntakes(updated);
  };

  const addIntake = () => {
    setIntakes([...intakes, { term: "", startDate: "", endDate: "" }]);
  };

  const removeIntake = (index: number) => {
    const updated = intakes.filter((_, i) => i !== index);
    setIntakes(updated);
  };

  return (
    <div className="university_list">
      <div className="page-heading d-flex justify-content-between align-items-center">
        <span className="page-heading">URM University</span>
        {isAdmin && (
          <Button variant="primary" onClick={() => openModal()}>
            Add University
          </Button>
        )}
      </div>

      <div className="university_list_top d-flex mb-4 flex-wrap gap-3">
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
            <div className="university_card position-relative">
              {isAdmin && (
                <button
                  onClick={() => openModal(uni)}
                  className="edit__btn"
                >
                  ✏️
                </button>
              )}
              <div className="uniname-logo-flex">
                <div className="uni_icon">
                  <Image src={uniicon} alt="icon" />
                </div>
                <div className="short-title">
                  <p>University Name</p>
                  <span>{uni.universityName}</span>
                </div>
              </div>
              <div className="city-country-flex">
                <div className="short-title">
                  <p>City</p>
                  <span>{uni.city}</span>
                </div>
                <div className="short-title">
                  <p>Country</p>
                  <span>{uni.country}</span>
                </div>
              </div>

              {/* <div className="short-title">
                <p>Address</p>
                <span>{uni.address}</span>
              </div>
              <div className="short-title">
                <p>Intakes</p>
                <span>
                  {uni.intakes
                    .map(
                      (intake: any) =>
                        `${intake.term} (${intake.startDate} to ${intake.endDate})`
                    )
                    .join(", ")}
                </span>
              </div> */}
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

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit" : "Add"} University</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>University Name</Form.Label>
              <Form.Control
                defaultValue={editData?.universityName || ""}
                placeholder="Enter university name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                defaultValue={editData?.city || ""}
                placeholder="Enter city"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                defaultValue={editData?.country || ""}
                placeholder="Enter country"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                defaultValue={editData?.address || ""}
                placeholder="Enter address"
              />
            </Form.Group>

            <Form.Label>Intakes</Form.Label>
            {intakes.map((intake, index) => (
              <div key={index} className="mb-3 rounded border p-3">
                <Form.Group className="mb-2">
                  <Form.Label>Term</Form.Label>
                  <Form.Control
                    value={intake.term}
                    onChange={(e) =>
                      handleIntakeChange(index, "term", e.target.value)
                    }
                    placeholder="e.g., Fall 2024"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={intake.startDate}
                    onChange={(e) =>
                      handleIntakeChange(index, "startDate", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={intake.endDate}
                    onChange={(e) =>
                      handleIntakeChange(index, "endDate", e.target.value)
                    }
                  />
                </Form.Group>
                {intakes.length > 1 && (
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => removeIntake(index)}
                  >
                    Remove Intake
                  </Button>
                )}
              </div>
            ))}
            <Button variant="secondary" onClick={addIntake}>
              Add Intake
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UrmUniversity;
