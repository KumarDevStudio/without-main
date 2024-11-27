import React, { useEffect, useState } from 'react';

export const Get = () => {
  const [person, setPerson] = useState({ name: '', email: '', message: '' });
  const [array, setArray] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('ArrayData')) || [];
    setArray(storedData);
  }, []);


  const handleFormSubmit = (event) => {
    event.preventDefault();

    let updatedArray = [];
    if (editing) {
      updatedArray = [...array];
      updatedArray[editIndex] = person;
      setEditing(false);
      setEditIndex(null);
    } else {
      updatedArray = [...array, person];
    }

    setArray(updatedArray);
    localStorage.setItem('ArrayData', JSON.stringify(updatedArray));  
    setPerson({ name: '', email: '', message: '' }); 
  };

  
  const handleEdit = (index) => {
    setPerson(array[index]);
    setEditing(true);
    setEditIndex(index);
  };

 
  const handleDelete = (index) => {
    const filteredArray = array.filter((_, i) => i !== index);
    setArray(filteredArray);
    localStorage.setItem('ArrayData', JSON.stringify(filteredArray)); 
  };


  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);  
  };

 
  const filteredArray = array.filter((row) =>
    Object.values(row).some(val =>
      String(val).toUpperCase().includes(searchValue.toUpperCase())
    )
  );

  return (
    <div style={{ width: '80%', margin: '20px auto', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Stored Data</h2>


      <input
        type="text"
        id="byvalue"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '5px', width: '100%' }}
      />

      {filteredArray.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Message</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArray.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.email}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.message}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <button
                    onClick={() => handleEdit(index)}
                    style={{
                      marginRight: '5px',
                      backgroundColor: '#0275d8',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      backgroundColor: '#d9534f',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', color: '#555' }}>No data available.</p>
      )}
    </div>
  );
};

export default Get;
