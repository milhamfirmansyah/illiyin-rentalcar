'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import ToastShow from '../components/ToastShow';
import { useRouter } from 'next/navigation';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';

function Add() {
  const [form, setForm]: any = useState({
    nameCar: '',
    category: '',
    price: '',
  });
  const [photo, setPhoto] = useState<any>(null);
  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [err, setErr] = useState('');
  const [load, setLoad] = useState(false);

  const token = Cookies.get('cookieToken');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangePhoto = (e: any) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    setLoad(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.nameCar);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('image', photo);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        access_token: token,
      },
    };

    try {
      const res = await axios.post('https://api-car-rental.binaracademy.org/admin/car', formData, config);
      console.log(res);
      setLoad(false);
      if (res.status === 201) {
        setToast(true);
        setToastText('Data mobil berhasil ditambahkan');
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
      setErr('Mohon data dilengkapi dahulu');
      setTimeout(() => {
        setErr('');
      }, 3000);
    }
  };

  // Protected route
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  return (
    <div className="padding">
      <h1 style={{ marginBottom: '48px' }}>Tambah mobil</h1>
      {/* name car */}
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Nama Mobil</InputGroup.Text>
        <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text" placeholder="Input nama mobil" name="nameCar" value={form.nameCar} onChange={handleChange} />
      </InputGroup>
      {/* category */}
      <label htmlFor="category" style={{ marginRight: '44px' }}>
        Category
      </label>
      <Form.Select aria-label="Default select example" name="category" value={form.category} onChange={handleChange} id="category">
        <option value="">Pilih Kategori</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </Form.Select>
      <br />
      {/* price */}
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Harga Mobil</InputGroup.Text>
        <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text" placeholder="Input harga mobil" name="price" value={form.price} onChange={handleChange} />
      </InputGroup>
      {/* image */}
      <label htmlFor="image" style={{ marginRight: '70px' }}>
        Image
      </label>
      <input type="file" id="image" accept=".jpg, .jpeg, .png" onChange={handleChangePhoto} style={{ marginBottom: '32px' }} />
      <br />
      <Button variant="primary" onClick={handleSubmit} disabled={load ? true : false}>
        {load ? 'loading...' : 'Submit'}
      </Button>
      {toast && <div style={{ position: 'fixed', backgroundColor: 'rgba(0,0,0,.7)', zIndex: 90 }}></div>}
      {toast && <ToastShow text={toastText} />}
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </div>
  );
}

export default Add;
