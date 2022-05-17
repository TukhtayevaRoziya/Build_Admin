import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/actions/authAction";
import { getAction } from "../../redux/actions/readAction";
import { GET_CONTACTS, UPDATE_CONTACT } from "../../redux/actions/types";
import { EditOutlined } from "@ant-design/icons";
import { updateAction } from "../../redux/actions/updateAction";

export const Contact = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [address, setAddress] = useState('')
  const [addressRu, setAddressRu] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneNumberRu, setPhoneNumberRu] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { data } = useSelector((state) => state.contactReducer);

  useEffect(() => {
    dispatch(getAction("contact", GET_CONTACTS));
  }, [dispatch]);

  const showEditModal = (id) => {
    setEditVisible(true);
    setselectedEditID(id);
    setAddress(id.address)
    setAddressRu(id.addressRu)
    setPhoneNumber(id.phoneNumber)
    setPhoneNumberRu(id.phoneNumberRu)
    setEmail(id.email)
  };

  const editHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setEditVisible(false);
        dispatch(
          updateAction("contact", UPDATE_CONTACT, selectedEditID.id, values)
        );
        dispatch(getAction("contact", GET_CONTACTS));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const editHandleCancel = () => {
    setEditVisible(false);
  };



  const columns = [
    { title: "Manzil Uz", dataIndex: "address", key: "address" },
    { title: "Manzil Ru", dataIndex: "addressRu", key: "addressRu" },
    { title: "Telefon Raqam Uz", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Telefon Raqam Ru",
      dataIndex: "phoneNumberRu",
      key: "phoneNumberRu",
    },
    { title: "Elektron Manzil", dataIndex: "email", key: "email" },
    {
      title: <>----------</>,
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
          <Button type="primary" onClick={(e) => showEditModal(text)}>
            <EditOutlined />
          </Button>
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
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
              fields={[
                {
                  name: ["address"],
                  value: address,
                },
                {
                  name: ["addressRu"],
                  value: addressRu,
                },
                {
                  name: ["phoneNumber"],
                  value: phoneNumber,
                },
                {
                  name: ["phoneNumberRu"],
                  value: phoneNumberRu,
                },
                {
                  name: ["email"],
                  value: email,
                },
              ]}
            >
              <FieldHelpers
                label="Manzil Uz"
                name="address"
                message="Iltimos Manzil Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Manzil Ru"
                name="addressRu"
                message="Iltimos Manzil Ru qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Telefon Raqam Uz"
                name="phoneNumber"
                message="Iltimos Telefon Raqam Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Telefon Raqam Ru"
                name="phoneNumberRu"
                message="Iltimos Telefon Raqam Ru qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Elektron Manzil"
                name="email"
                message="Iltimos Elektron Manzil qatorini yo'ldiring!"
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
        <BreadcrumbHelpers to={"construction"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
