'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CustomNavbar from '../components/Navbar';

export default function Cars() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [nameCar, setNameCar] = useState('');
  const [idCar, setIdCar] = useState(0);
  const [categoryQuery, setCategoryQuery] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [toast, setToast] = useState(false);

  const token = Cookies.get('cookieToken');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Protected route
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  // handle filter car
  // const nameQuery = searchParams.get('name');
  // const category = searchParams.get('category');

  const handleCategoryQuery = (e: any) => {
    setCategoryQuery(e.target.value);
  };

  const handleNameQuery = (e: any) => {
    setNameQuery(e.target.value);
  };

  // fetching data
  const getData = async () => {
    try {
      const res = await axios.get(`https://api-car-rental.binaracademy.org/admin/v2/car?pageSize=20&category=${categoryQuery}&name=${nameQuery}`, {
        headers: {
          access_token: token,
        },
      });
      setData(res.data.cars);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // handle delete modal
  const handleModal = (nameCar: string, id: number): any => {
    setModal(true);
    setNameCar(nameCar);
    setIdCar(id);
  };

  // handle Delete
  const handleDelete = async (id: number) => {
    const res = await axios.delete(`https://api-car-rental.binaracademy.org/admin/car/${id}`, {
      headers: {
        access_token: token,
      },
    });
    setModal(false);
    if (res.status === 200) {
      alert(`data mobil berhasil dihapus`);
    }
    setTimeout(() => {
      location.reload();
    }, 100);
    console.log(res);
  };

  // handle edit
  const handleEdit = (id: number) => {
    router.push(`/edit/${id}`);
  };

  return (
    <>
      <CustomNavbar />

      <div className="padding">
        <h1>Cars Page</h1>
        {/* handle add car button */}
        <Button variant="primary" onClick={() => router.push('/add')} style={{ marginBottom: '8px' }}>
          Add car
        </Button>

        {/* filter car */}
        <div className="filterCar-container">
          <input type="text" placeholder="cari nama mobil" onChange={handleNameQuery} />
          <select name="" id="" onChange={handleCategoryQuery}>
            <option value="">Cari berdasarkan kategori</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <Button variant="success" onClick={getData}>
            cari
          </Button>
        </div>

        {/* Fetching Data */}
        <div className="bg-red card-grid">
          {data.map((item: any) => (
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Harga Sewa: Rp.{item.price}</Card.Text>
                <Card.Text>Kategori: {item.category}</Card.Text>
                {item.status ? <Card.Text>Status : Sudah Disewa</Card.Text> : <Card.Text>Status : ready</Card.Text>}
                <Button variant="success" style={{ marginRight: '12px' }} onClick={() => handleEdit(item.id)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleModal(item.name, item.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* handle modal if delete button on click */}
        {modal && <Modal carName={nameCar} cancel={() => setModal(false)} id={idCar} handleButton={handleDelete} />}
        {modal && <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,.7)', zIndex: 10 }}></div>}
      </div>
    </>
  );
}
