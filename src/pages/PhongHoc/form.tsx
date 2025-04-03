import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';
import { useModel } from '@umijs/max';

const { Option } = Select;

interface Props {
  visible: boolean;
  onClose: () => void;
  editingRoom: any;
}

const FormPhongHoc: React.FC<Props> = ({ visible, onClose, editingRoom }) => {
  const { addRoom, updateRoom } = useModel('phongHoc');
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingRoom) {
      form.setFieldsValue(editingRoom);
    } else {
      form.resetFields();
    }
  }, [editingRoom]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingRoom) {
        updateRoom({ ...editingRoom, ...values });
        message.success('Cập nhật phòng thành công!');
      } else {
        addRoom(values);
        message.success('Thêm phòng thành công!');
      }
      onClose();
    });
  };

  return (
    <Modal
      title={editingRoom ? 'Chỉnh Sửa Phòng' : 'Thêm Phòng'}
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="Mã Phòng" rules={[{ required: true, max: 10 }]}>
          <Input disabled={!!editingRoom} />
        </Form.Item>
        <Form.Item name="name" label="Tên Phòng" rules={[{ required: true, max: 50 }]}>
          <Input />
        </Form.Item>
        <Form.Item name="seats" label="Số Chỗ Ngồi" rules={[{ required: true, type: 'number', min: 10, max: 200 }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="type" label="Loại Phòng" rules={[{ required: true }]}>
          <Select>
            <Option value="LyThuyet">Lý Thuyết</Option>
            <Option value="ThucHanh">Thực Hành</Option>
            <Option value="HoiTruong">Hội Trường</Option>
          </Select>
        </Form.Item>
        <Form.Item name="manager" label="Người Phụ Trách" rules={[{ required: true }]}>
          <Select>
            <Option value="Nguyen Van A">Nguyen Van A</Option>
            <Option value="Tran Thi B">Tran Thi B</Option>
            <Option value="Le Van C">Le Van C</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormPhongHoc;
