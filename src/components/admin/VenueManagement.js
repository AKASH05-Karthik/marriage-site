import React, { useState } from 'react';
import { Building, Bed, Users, MapPin, Star, Edit, Trash2, Plus } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const VenueManagement = () => {
  const { halls, rooms } = useBooking();
  const [activeTab, setActiveTab] = useState('halls');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <div className="space-y-8">
      {/* Stats Summary */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Venue Overview</h2>
            <p className="text-gray-600">Manage your marriage halls and rooms</p>
          </div>
          <button className="btn-primary flex items-center space-x-2 shadow-lg">
            <Plus className="w-5 h-5" />
            <span>Add New Venue</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 inline-flex">
          <button
            onClick={() => setActiveTab('halls')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'halls'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Building className="w-5 h-5" />
            <span>Marriage Halls ({halls.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'rooms'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Bed className="w-5 h-5" />
            <span>Rooms ({rooms.length})</span>
          </button>
        </div>
      </div>

      {/* Halls Tab */}
      {activeTab === 'halls' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {halls.map((hall) => (
            <div key={hall.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <img 
                  src={hall.image} 
                  alt={hall.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{hall.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{hall.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{hall.capacity} guests</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Prime Location</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Amenities:</h4>
                  <div className="flex flex-wrap gap-1">
                    {hall.amenities.slice(0, 3).map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hall.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{hall.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(hall.price)}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">/day</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rooms Tab */}
      {activeTab === 'rooms' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">4.7</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold">{room.type}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{room.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Amenities:</h4>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(room.price)}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">/night</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm">1-2 guests</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === 'halls' && halls.length === 0) || (activeTab === 'rooms' && rooms.length === 0)) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          {activeTab === 'halls' ? (
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          ) : (
            <Bed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          )}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No {activeTab === 'halls' ? 'Marriage Halls' : 'Rooms'} Found
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by adding your first {activeTab === 'halls' ? 'marriage hall' : 'room'}.
          </p>
          <button className="btn-primary flex items-center space-x-2 mx-auto">
            <Plus className="w-5 h-5" />
            <span>Add {activeTab === 'halls' ? 'Marriage Hall' : 'Room'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VenueManagement;
