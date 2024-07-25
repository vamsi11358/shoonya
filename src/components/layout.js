import { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";

export default function Layout() {
  const [, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats`,
          {
            params: {
              page: currentPage,
              limit: itemsPerPage,
              filter: filterType,
              search: searchTerm ? searchTerm : undefined,
              date: filterDate ? filterDate : undefined
            }
          }
        );
        setData(response.data);
        setFilteredData(response.data);
        const totalItems = response.headers['x-total-count'];
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, filterType, filterDate, searchTerm]);

  const handleTypeChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const placeholders = Array.from({ length: itemsPerPage }).fill({});

  return (
    <>
      <div className='content'>
        <div className="border border-gray-300 rounded-md p-4 bg-blanchedalmond">
          <div className="image-container">
            <img src="https://th.bing.com/th/id/OIP.REgEsV0WdRcb6RaAoT5NowHaE3?w=254&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="yoga" />
          </div>
          <h1 className="text-xl font-bold mt-4">Discover Your Inner Peace</h1>
          <h3 className="text-lg mt-2">Join us for wellness</h3>
        </div>
      </div>
      <div className='filter flex justify-between items-center mt-4 mx-5'>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              id="filterType"
              value={filterType}
              onChange={handleTypeChange}
              className="block px-4 py-2 border border-gray-300 rounded-md bg-blue-900 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
            >
              <option value="">Select a type</option>
              <option value="Yoga">Yoga</option>
              <option value="Meditation">Meditation</option>
              <option value="Detox">Detox</option>
            </select>
          </div>
          <div className="relative">
            <select
              id="filterDate"
              value={filterDate}
              onChange={handleDateChange}
              className="block px-4 py-2 border border-gray-300 rounded-md bg-blue-900 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
            >
              <option value="">Select a date</option>
              <option value="2023-01-01">January 2023</option>
              <option value="2023-02-01">February 2023</option>
              <option value="2023-03-01">March 2023</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search retreats by title"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block px-4 py-2 border border-gray-300 rounded-md bg-blue-900 text-gray hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
          />
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-5'>
        {loading
          ? placeholders.map((_, index) => (
              <div key={index} className='card border border-gray-300 rounded-md p-4'>
                <div className='w-full h-48 bg-gray-200 rounded-md mb-4 animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded-md mb-2 animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded-md mb-2 animate-pulse'></div>
              </div>
            ))
          : filteredData.map((item) => (
              <div key={item.id} className='card border border-gray-300 rounded-md p-4'>
                <img className='w-1/2 h-48 object-cover rounded-md mb-4' src={item.image} alt={item.title} />
                <h1 className='text-xl font-bold mb-2'>{item.title}</h1>
                <p className='text-lg'>{item.description}</p>
                <p className='text-sm text-gray-600'>{formatDate(item.date)}</p>
                <p className='text-sm text-gray-600'>{item.location}</p>
              </div>
            ))}
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="px-4 py-2 border border-blue-900 rounded-md bg-blue-800 text-white hover:bg-gray-200 transition ease-in-out duration-300"
          onClick={() => setCurrentPage(prevPage => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </button>
        <button
          className="px-4 py-2 border border-blue-900 rounded-md bg-blue-800 text-white hover:bg-gray-200 transition ease-in-out duration-300"
          onClick={() => setCurrentPage(prevPage => prevPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
