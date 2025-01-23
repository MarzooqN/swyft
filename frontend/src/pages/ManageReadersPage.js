import React, { useState, useEffect } from 'react';
import { getNfcReaders, updateNfcReader, deleteNfcReader } from '../services/api';

const ManageReadersPage = () => {
  const [readers, setReaders] = useState([]);
  const [editingReader, setEditingReader] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadReaders();
  }, []);

  const loadReaders = async () => {
    const data = await getNfcReaders();
    setReaders(data);
  };

  const handleEdit = (reader) => {
    setEditingReader(reader);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reader?")) {
      await deleteNfcReader(id);
      loadReaders();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage NFC Readers</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {readers.map((reader) => (
            <tr key={reader.id}>
              <td className="border px-4 py-2">{reader.id}</td>
              <td className="border px-4 py-2">{reader.location}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(reader)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(reader.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div>
          {/* Modal Component for Adding/Editing */}
        </div>
      )}
    </div>
  );
};

export default ManageReadersPage;
