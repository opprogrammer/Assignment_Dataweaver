

import React, { useState } from 'react';

const EditModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);

  };

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(isOpen);
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {true && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal Content</h2>
            <p>This is the modal content.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;