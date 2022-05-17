import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { BreadcrumbHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/actions/authAction";
import { getAction } from "../../redux/actions/readAction";
import { DeleteOutlined } from "@ant-design/icons";
import {
  DELETE_USER_COMMENT,
  GET_USER_COMMENT,
} from "../../redux/actions/types";
import { deleteAction } from "../../redux/actions/deleteAction";

export const UserComment = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.userCommentReducer);

  useEffect(() => {
    dispatch(getAction("userComment", GET_USER_COMMENT));
  }, [dispatch]);

  const showModal = (id) => {
    setVisible(true);
    setSelectedID(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("userComment", DELETE_USER_COMMENT, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("userComment", GET_USER_COMMENT));
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    { title: "Ism", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "nameRu" },
    { title: "Izoh", dataIndex: "comment", key: "description" },
    {
      title: <>----------</>,
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
          <Button type="danger" onClick={(e) => showModal(text.id)}>
            <DeleteOutlined />
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
        </>
      ),
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"user Comment"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
