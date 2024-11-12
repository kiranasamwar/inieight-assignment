import { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find(item => item.id === id);
    if (dt) {
      setIsUpdate(true);
      setId(id);
      setName(dt.name);
      setEmail(dt.email);
      setDateOfBirth(dt.dateOfBirth);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';

    if (!name) error += 'Name is required. ';
    if (!email) error += 'Email is required. ';
    if (!dateOfBirth) error += 'Date of Birth is required. ';

    if (!error) {
      const newEmployee = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        name,
        email,
        dateOfBirth,
      };
      setData([...data, newEmployee]);
      handleClear();
    } else {
      alert(error);
    }
  };

  const handleUpdate = () => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, name, email, dateOfBirth } : item
    );
    setData(updatedData);
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setName('');
    setEmail('');
    setDateOfBirth('');
    setIsUpdate(false);
  };

  return (
    <div className="App">
      <div className="input-label-main-container">
        <div>
          <label className="label-container">Name
            <input type="text" className="form-control input" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} />
          </label>
        </div>
        <div>
          <label className="label-container">Email
            <input type="email" className="form-control input" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </label>
        </div>
        <div>
          <label className="label-container">Date of Birth
            <input type="date" className="form-control input" onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} />
          </label>
        </div>
        <div className="buttons-container">
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
          ) : (
            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
          )}
          <button className="btn btn-danger" onClick={handleClear}>Clear</button>
        </div>
      </div>
      <table className="table table-hover table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.dateOfBirth}</td>
              <td>
                <button style={{ marginRight: "10px" }}className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
