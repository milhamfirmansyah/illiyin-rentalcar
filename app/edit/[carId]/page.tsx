'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ToastShow from '@/app/components/ToastShow';
import { useRouter } from 'next/navigation';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';

function EditCar({ params }: { params: { carId: number } }) {
  const [data, setData] = useState<any>({});
  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [err, setErr] = useState('');
  const [load, setLoad] = useState(false);

  const token = Cookies.get('cookieToken');

  // Protected route
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  // get car by id
  const getData = async () => {
    const res = await axios.get(`https://api-car-rental.binaracademy.org/admin/car/${params.carId}`, {
      headers: {
        access_token: token,
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log(data);

  // handle edit
  const [form, setForm]: any = useState({
    nameCar: '',
    category: '',
    price: '',
  });
  const [photo, setPhoto] = useState<any>(null);

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
      const res = await axios.put(`https://api-car-rental.binaracademy.org/admin/car/${params.carId}`, formData, config);
      console.log(res.data);
      setLoad(false);
      if (res.status === 200) {
        setToast(true);
        setToastText('Data mobil berhasil diedit');
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

  return (
    <div className="padding">
      <h1 style={{ marginBottom: '46px' }}>Edit mobil</h1>
      {/* name car */}
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Nama Mobil</InputGroup.Text>
        <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text" placeholder={data.name} name="nameCar" value={form.nameCar} onChange={handleChange} />
      </InputGroup>
      {/* category */}
      <label htmlFor="category">Category</label>
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
        <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text" placeholder={`Rp. ${data.price}`} name="price" value={form.price} onChange={handleChange} />
      </InputGroup>
      {/* image */}
      <label htmlFor="image" style={{ marginRight: '70px', marginBottom: '32px' }}>
        Image
      </label>
      <input type="file" id="image" accept=".jpg, .jpeg, .png" onChange={handleChangePhoto} />
      <br />
      {/* button submit */}
      <Button variant="primary" onClick={handleSubmit} disabled={load ? true : false}>
        {load ? 'loading...' : 'Submit'}
      </Button>
      {toast && <ToastShow text={toastText} />}
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </div>
  );
}

export default EditCar;
