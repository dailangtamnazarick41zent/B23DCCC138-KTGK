import { useState } from 'react';
import { Room } from '@/services/phongHoc';

export default function usePhongHocModel() {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const storedRooms = localStorage.getItem('rooms');
    return storedRooms ? JSON.parse(storedRooms) : [];
  });

  const addRoom = (room: Room) => {
    setRooms((prev) => {
      const updatedRooms = [...prev, room];
      localStorage.setItem('rooms', JSON.stringify(updatedRooms));
      return updatedRooms;
    });
  };

  const updateRoom = (updatedRoom: Room) => {
    setRooms((prev) => {
      const updatedRooms = prev.map((room) =>
        room.id === updatedRoom.id ? updatedRoom : room
      );
      localStorage.setItem('rooms', JSON.stringify(updatedRooms));
      return updatedRooms;
    });
  };

  const deleteRoom = (id: string) => {
    setRooms((prev) => {
      const updatedRooms = prev.filter((room) => room.id !== id);
      localStorage.setItem('rooms', JSON.stringify(updatedRooms));
      return updatedRooms;
    });
  };

  return {
    rooms,
    addRoom,
    updateRoom,
    deleteRoom,
  };
}
