export interface Room {
  id: string;
  name: string;
  seats: number;
  type: 'LyThuyet' | 'ThucHanh' | 'HoiTruong';
  manager: string;
}

const STORAGE_KEY = 'rooms';

export const getRooms = (): Room[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRooms = (rooms: Room[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
};
