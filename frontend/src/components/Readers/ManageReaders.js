import React, { useState, useEffect } from 'react';
import { getNfcReaders, deleteNfcReader } from '../services/api';
import ReaderFormModal from './ReaderFormModal';

const ManageReaders = () => {
  const [readers, setReaders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReader, setSelectedReader] = useState(null);

  useEffect(() => {
    fetchReaders();
  }, []);

  const fetchReaders = async () => {
    const data = await getNfcReaders();
    setReaders(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reader?')) {
      await deleteNfcReader(id);
      fetchReaders();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage NFC Readers</h1>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Reader
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Fundraiser</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {readers.map((reader) => (
            <tr key={reader.id}>
              <td className="border border-gray-300 px-4 py-2">{reader.id}</td>
              <td className="border border-gray-300 px-4 py-2">{reader.location}</td>
              <td className="border border-gray-300 px-4 py-2">{reader.assigned_fundraiser_id || 'None'}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-secondary text-white px-2 py-1 rounded mr-2"
                  onClick={() => setSelectedReader(reader)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(reader.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ReaderFormModal
          reader={selectedReader}
          onClose={() => setIsModalOpen(false)}
          onSave={fetchReaders}
        />
      )}
    </div>
  );
};

export default ManageReaders;
