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
import {  CREATE_COMMENT, DELETE_COMMENT, GET_COMMENTS, UPDATE_COMMENT } from '../../redux/actions/types';
import { deleteAction } from "../../redux/actions/deleteAction";
import { updateAction } from "../../redux/actions/updateAction";

export const RecentComment = () => {
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
    dispatch(deleteAction("recentComment", DELETE_COMMENT, selectedID));
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
        dispatch(updateAction("recentComment", UPDATE_COMMENT, selectedEditID.id, values));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const editHandleCancel = () => {
    setEditVisible(false);
  };

  const { data } = useSelector((state) => state.recentCommentReducer);

  useEffect(() => {
    dispatch(getAction("recentComment", GET_COMMENTS));
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
          createAction("recentComment", CREATE_COMMENT, {
            name: values.name,
            nameRu: values.nameRu,
            description: values.description,
            descriptionRu: values.descriptionRu,
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
    { title: "Nom Uz", dataIndex: "name", key: "name" },
    { title: "Nom Ru", dataIndex: "nameRu", key: "nameRu" },
    { title: "Tavsif Uz", dataIndex: "description", key: "description" },
    { title: "Tavsif Ru", dataIndex: "descriptionRu", key: "description" },
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
                label="Nom Uz"
                name="name"
                message="Iltimos Nom Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Nom Ru"
                name="nameRu"
                message="Iltimos Nom Ru qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Tavsif Uz"
                name="description"
                message="Iltimos Tavsif Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Tavsif Ru"
                name="descriptionRu"
                message="Iltimos Tavsif Ru qatorini yo'ldiring!"
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
                label="Nom Uz"
                name="name"
                message="Iltimos Nom Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Nom Ru"
                name="nameRu"
                message="Iltimos Nom Ru qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Tavsif Uz"
                name="description"
                message="Iltimos Tavsif Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Tavsif Ru"
                name="descriptionRu"
                message="Iltimos Tavsif Ru qatorini yo'ldiring!"
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
        <BreadcrumbHelpers to={"recentComment"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
