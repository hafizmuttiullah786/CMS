


// const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
// const [selectedUniversity, setSelectedUniversity] =
//   useState<OptionType | null>(null);
// const [selectedCourse, setSelectedCourse] = useState<OptionType | null>(null);
// const [selectedIntake, setSelectedIntake] = useState<OptionType | null>(null);
// const [show, setShow] = useState(false);
// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);
// const handleChange = (newValue: SingleValue<OptionType>) => {
//   setSelectedOption(newValue);
// };


// const universityOptions: OptionType[] = [
//   { value: "uk", label: "United Kingdom" },
//   { value: "canada", label: "Canada" },
//   { value: "singapore", label: "Singapore" },
//   { value: "australia", label: "Australia" },
// ];

// const courseOptions: OptionType[] = [
//   { value: "computer-science", label: "Computer Science" },
//   { value: "business", label: "Business" },
//   { value: "engineering", label: "Engineering" },
// ];

// const intakeOptions: OptionType[] = [
//   { value: "jan", label: "January" },
//   { value: "may", label: "May" },
//   { value: "sep", label: "September" },
// ];


// <Modal
// show={show}
// onHide={handleClose}
// centered
// className="apply-courses"
// >
// <Modal.Header closeButton>
//   <Modal.Title>Apply For New Course</Modal.Title>
// </Modal.Header>
// <Modal.Body>
//   <div className="apply-form">
//     <div className="form_group">
//       <div className="select_course_field">
//         <div className="select_course_field">
//           <label htmlFor="Country to Apply">Country to Apply</label>
//           <Select
//             options={universityOptions}
//             value={selectedUniversity}
//             onChange={setSelectedUniversity}
//             placeholder="Select University Country"
//             isClearable
//             isSearchable
//           />
//         </div>
//         <div className="select_course_field">
//           <label htmlFor="">Country of Student Passport</label>
//           <Select
//             options={courseOptions}
//             value={selectedCourse}
//             onChange={setSelectedCourse}
//             placeholder="Select Course"
//             isClearable
//             isSearchable
//           />
//         </div>
//         <div className="select_course_field">
//           <label htmlFor="">Intake</label>
//           <Select
//             options={intakeOptions}
//             value={selectedIntake}
//             onChange={setSelectedIntake}
//             placeholder="Select Intake"
//             isClearable
//             isSearchable
//           />
//         </div>
//         <div className="select_course_field">
//           <label htmlFor="">Course Type</label>
//           <Select
//             options={intakeOptions}
//             value={selectedIntake}
//             onChange={setSelectedIntake}
//             placeholder="Select Intake"
//             isClearable
//             isSearchable
//           />
//         </div>
//         <div className="select_course_field">
//           <label htmlFor="">University</label>
//           <Select
//             options={intakeOptions}
//             value={selectedIntake}
//             onChange={setSelectedIntake}
//             placeholder="Select Intake"
//             isClearable
//             isSearchable
//           />
//         </div>
//         <div className="select_course_field">
//           <label htmlFor="">Course</label>
//           <Select
//             options={intakeOptions}
//             value={selectedIntake}
//             onChange={setSelectedIntake}
//             placeholder="Select Intake"
//             isClearable
//             isSearchable
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// </Modal.Body>
// <Modal.Footer>
//   <Button className="applynew-courses">Apply New Courses</Button>
// </Modal.Footer>
// </Modal>