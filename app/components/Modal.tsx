import React from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapModal from 'react-bootstrap/Modal';

type Props = {
  carName: string;
  id: number;
  cancel: () => void;
  handleButton: (param: number) => void;
};

function Modal({ carName, id, cancel, handleButton }: Props) {
  return (
    <div className="modal show" style={{ display: 'block', position: 'fixed', top: '200px', left: '50%', transform: 'translate(-50%)' }}>
      <BootstrapModal.Dialog>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>Menghapus Mobil</BootstrapModal.Title>
        </BootstrapModal.Header>

        <BootstrapModal.Body>
          <p>Apakah anda yakin ingin menghapus mobil {carName}?</p>
        </BootstrapModal.Body>

        <BootstrapModal.Footer>
          <Button variant="primary" onClick={() => handleButton(id)}>
            Ya
          </Button>
          <Button variant="secondary" onClick={cancel}>
            Batal
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal.Dialog>
    </div>
  );
}

export default Modal;
