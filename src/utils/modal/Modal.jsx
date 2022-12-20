import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/reducers/showModal';
import './Modal.css';

const Modal = (props) => {
  const dispatch = useDispatch();

  return (
    <div
      className="Modal-overlay"
      onClick={() => {
        dispatch(showModal(false));
      }}
    >
      <div
        className="delete-course-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="delete-course-modal-content">
          <div className="deleteCourse">{props && props.title}</div>
          <div className="deleteContent">Add new {props.title}</div>
          <input className="upload-inputField " />
          <div className="buttons modalInput">
            <button
              className="cancel"
              onClick={() => {
                dispatch(showModal(false));
              }}
            >
              Cancel
            </button>
            <button className="delete">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
