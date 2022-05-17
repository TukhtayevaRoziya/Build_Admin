import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/actions/authAction";
import { getAction } from "../../redux/actions/readAction";
import { createAction } from "../../redux/actions/createAction";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { deleteAction } from "../../redux/actions/deleteAction";
import { updateAction } from "../../redux/actions/updateAction";
import { GET_NETWORK, CREATE_NETWORK, UPDATE_NETWORK, DELETE_NETWORK } from './../../redux/actions/types';

export const Network = () => {
  const [createVisible, setCreateVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = (id) => {
    setVisible(true);
    setSelectedID(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("socialNetwork", DELETE_NETWORK, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showEditModal = (id) => {
    setEditVisible(true);
    setselectedEditID(id);
  };

  const editHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setEditVisible(false);
        dispatch(updateAction("socialNetwork", UPDATE_NETWORK, selectedEditID.id, values));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const editHandleCancel = () => {
    setEditVisible(false);
  };

  const { data } = useSelector((state) => state.networkReducer);

  useEffect(() => {
    dispatch(getAction("socialNetwork", GET_NETWORK));
  }, [dispatch]);

  const showCreateModal = () => {
    setCreateVisible(true);
  };

  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);
        dispatch(
          createAction("socialNetwork", CREATE_NETWORK, {
            name: values.name,
          })
        );
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const createHandleCancel = () => {
    setCreateVisible(false);
  };

  const columns = [
    { title: "Nom", dataIndex: "name", key: "name" },
    {
      title: (
        <>
          <Button type="primary" onClick={showCreateModal}>
            <AddBoxIcon />
          </Button>
          <Modal
            title={"Yaratish"}
            visible={createVisible}
            onOk={createHandleOk}
            // confirmLoading={createConfirmLoading}
            onCancel={createHandleCancel}
            okText={"yaratish"}
            cancelText={"bekor qilish"}
            htmlType="submit"
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
            >
              <FieldHelpers
                label="Nom"
                name="name"
                message="Iltimos Nom qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
          <Button type="danger" onClick={(e) => showModal(text.id)}>
            <DeleteOutlined />
          </Button>
          <Button type="primary" onClick={(e)=>showEditModal(text)}>
            <EditOutlined />
          </Button>
          <Modal
            title={"O'chirish"}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText={"o'chirish"}
            okType={"danger"}
            cancelText={"bekor qilish"}
          >
            <h2>Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz?</h2>
            <p>
              Agar siz ushbu ma'lumotlarni o'chirib tashlasangiz, qayta
              tiklanmaydi
            </p>
          </Modal>
          <Modal
            title={"Tahrirlash"}
            visible={editVisible}
            onOk={editHandleOk}
            onCancel={editHandleCancel}
            okText={"tahrirlash"}
            cancelText={"bekor qilish"}
          >
            <Form
              form={form}
              layout="vertical"
              name="name"
              initialValues={{
                modifier: "public",
              }}
            >
              <FieldHelpers
                label="Nom"
                name="name"
                message="Iltimos Nom qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"social Network"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
