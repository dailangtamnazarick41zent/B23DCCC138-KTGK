import React, { useState } from 'react';
import { Table, Button, Input, Select, Modal, message } from 'antd';
import { useModel } from '@umijs/max';
import FormPhongHoc from './form';

const { Search } = Input;
const { Option } = Select;

const PhongHoc: React.FC = () => {
  const { rooms, deleteRoom } = useModel('phongHoc');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa phòng này?',
      onOk: () => {
        deleteRoom(id);
        message.success('Xóa phòng thành công!');
      },
    });
  };

  const columns = [
    { title: 'Mã Phòng', dataIndex: 'id', key: 'id' },
    { title: 'Tên Phòng', dataIndex: 'name', key: 'name' },
    { title: 'Số Chỗ Ngồi', dataIndex: 'seats', key: 'seats' },
    { title: 'Loại Phòng', dataIndex: 'type', key: 'type' },
    { title: 'Người Phụ Trách', dataIndex: 'manager', key: 'manager' },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setEditingRoom(record);
              setIsModalVisible(true);
            }}
          >
            Sửa
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản Lý Phòng Học</h1>
      <div style={{ marginBottom: 16 }}>
        <Search placeholder="Tìm kiếm phòng" style={{ width: 200, marginRight: 8 }} />
        <Select placeholder="Lọc theo loại phòng" style={{ width: 200, marginRight: 8 }}>
          <Option value="">Tất cả</Option>
          <Option value="LyThuyet">Lý Thuyết</Option>
          <Option value="ThucHanh">Thực Hành</Option>
          <Option value="HoiTruong">Hội Trường</Option>
        </Select>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Thêm Phòng
        </Button>
      </div>
      <Table dataSource={rooms} columns={columns} rowKey="id" />
      <FormPhongHoc
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        editingRoom={editingRoom}
      />
    </div>
  );
};

export default PhongHoc;
