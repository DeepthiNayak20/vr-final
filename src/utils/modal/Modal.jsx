import React from 'react';
import './Modal.css';

const Modal = () => {
  return (
    <div className="Modal-overlay">
      <div className="delete-course-modal">
        <div className="delete-course-modal-content">
          <div className="deleteCourse">Delete Video</div>
          <div className="deleteContent">
            Are you sure you want to Delete the video
            <strong> heyyyy</strong> from the Recently courses added?
          </div>
          <div className="buttons">
            <button className="cancel">Cancel</button>
            <button className="delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
