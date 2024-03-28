'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Toast, Button } from 'react-bootstrap';

function ToastShow({ text }: any) {
  const router = useRouter();

  return (
    <>
      <Toast style={{ position: 'fixed', top: '200px', left: '50%', transform: 'translate(-50%)', padding: '16px' }}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Berhasil!</strong>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
        <Button variant="success" onClick={() => router.push('/cars')}>
          Kembali ke cars
        </Button>
      </Toast>
    </>
  );
}

export default ToastShow;
