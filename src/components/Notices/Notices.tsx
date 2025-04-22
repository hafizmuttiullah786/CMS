import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import deposit from "../../../public/images/deposit.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Notification = {
  title: string;
  description: string;
  date: string;
};

type Props = {
  notification: Notification[];
  addNotification: (data: Notification) => Promise<void>;
};

const Notices = ({ notification, addNotification }: Props) => {
  const [show, setShow] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
    date: new Date(),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    setNotificationList(notification);
  }, [notification]);

  const handleClose = () => {
    setShow(false);
    setSelectedNotification(null);
  };

  const handleShow = (item: Notification) => {
    setSelectedNotification(item);
    setShow(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCreateNotice = () => {
    const newNoticeEntry: Notification = {
      title: newNotice.title,
      description: newNotice.description,
      date: newNotice.date.toISOString(),
    };
    addNotification(newNoticeEntry);
    // setNotificationList((prev) => [...prev, newNoticeEntry]);
    setShowCreateModal(false);
    setNewNotice({ title: "", description: "", date: new Date() });
  };

  return (
    <>
      {/* View Notice Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="notices_modal"
      >
        <Modal.Header>
          <Modal.Title>{selectedNotification?.title}</Modal.Title>
          <div className="close_btn" onClick={handleClose}>
            <i className="ri-close-line"></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p style={{ marginTop: "15px" }}>
            {selectedNotification?.description}
          </p>
        </Modal.Body>
      </Modal>

      {/* Create Notice Modal */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <Modal.Header>
          <div className="close_btn" onClick={() => setShowCreateModal(false)}>
            <i className="ri-close-line"></i>
          </div>
          <Modal.Title>Create New Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={newNotice.title}
              onChange={(e) =>
                setNewNotice({ ...newNotice, title: e.target.value })
              }
            />
          </div>
          <div className="form-group" style={{ marginTop: 10 }}>
            <label>Description</label>
            <textarea
              className="form-control"
              value={newNotice.description}
              onChange={(e) =>
                setNewNotice({ ...newNotice, description: e.target.value })
              }
            />
          </div>
          <div className="form-group" style={{ marginTop: 10 }}>
            <label>Date</label>
            <DatePicker
              selected={newNotice.date}
              onChange={(date) => {
                if (date) {
                  setNewNotice({ ...newNotice, date });
                }
              }}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <Button
            variant="success"
            style={{ marginTop: 15 }}
            onClick={handleCreateNotice}
          >
            Submit
          </Button>
        </Modal.Body>
      </Modal>

      {/* Notices Table */}
      <div className="notice_wrapper">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="notices_section">
              <div
                className="notices-top"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="page-heading">Important Notices</div>
                {isAdmin && (
                  <Button
                    variant="primary"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Add Notice
                  </Button>
                )}
              </div>
              <div className="table-fixed-head">
                <h3>Title</h3>
                <h3>Date</h3>
              </div>
              <div className="notices-table">
                <table>
                  {/* <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                    </tr>
                  </thead> */}
                  <tbody>
                    {notificationList?.length > 0 ? (
                      notificationList.map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>
                            <p
                              onClick={() => handleShow(item)}
                              style={{
                                cursor: "pointer",
                                display: "block",
                                marginRight: 8,
                              }}
                            >
                              <i className="ri-eye-line"></i>
                            </p>
                            {formatDate(item.date)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notices;
