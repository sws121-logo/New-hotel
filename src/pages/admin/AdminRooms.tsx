import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Edit3, Save, X, Plus } from 'lucide-react';

const AdminRooms: React.FC = () => {
  const { rooms, updateRoomPrice } = useApp();
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  const handleEditPrice = (roomId: string, currentPrice: number) => {
    setEditingRoom(roomId);
    setEditPrice(currentPrice);
  };

  const handleSavePrice = (roomId: string) => {
    updateRoomPrice(roomId, editPrice);
    setEditingRoom(null);
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
    setEditPrice(0);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Room Management</h1>
          <p className="text-gray-600">Manage room details and pricing</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add New Room
        </button>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={room.images[0]}
                        alt={room.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{room.name}</div>
                        <div className="text-sm text-gray-500">{room.amenities.slice(0, 2).join(', ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      room.type === 'AC' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {room.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.capacity} guests
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingRoom === room.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <button
                          onClick={() => handleSavePrice(room.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          ₹{room.price}
                        </span>
                        <button
                          onClick={() => handleEditPrice(room.id, room.price)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      room.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {room.available ? 'Available' : 'Booked'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-blue-600">{rooms.length}</div>
          <div className="text-gray-600">Total Rooms</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-green-600">
            {rooms.filter(r => r.available).length}
          </div>
          <div className="text-gray-600">Available Rooms</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-purple-600">
            ₹{rooms.reduce((acc, room) => acc + room.price, 0).toLocaleString()}
          </div>
          <div className="text-gray-600">Total Room Value</div>
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;