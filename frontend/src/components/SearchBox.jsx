import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BorderColor } from '@mui/icons-material';

const SearchBox = ({ onSearchComplete }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      onSearchComplete(); // Close the drawer after search
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant='outlined'
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        size="small"
        sx={{ backgroundColor: 'white', BorderColor: "#b79cc5" }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: '10px' }} style={{ backgroundColor: "#b79cc5" }}>
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
