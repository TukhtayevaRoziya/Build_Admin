import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/actions/authAction";
import { getAction } from "../../redux/actions/readAction";
import { EditOutlined } from "@ant-design/icons";
import { GET_HISTORY, UPDATE_HISTORY } from "./../../redux/actions/types";
import { updateAction } from "../../redux/actions/updateAction";
import { uploadImage } from "../../utility/uploadImage";

export const History = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [name, setName] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [attachment, setAttachment] = useState(null);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onChange = async (e) => {
    setName(e.target.form[1].value);
    setNameRu(e.target.form[2].value);
    setDescription(e.target.form[3].value);
    setDescriptionRu(e.target.form[4].value);
    setAttachment(e.target.files[0]);
  };

  const showEditModal = (data) => {
    setEditVisible(true);
    setselectedEditID(data);
    setName(data.name);
    setNameRu(data.nameRu);
    setDescription(data.description);
    setDescriptionRu(data.descriptionRu);
  };

  const editHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setEditVisible(false);
        attachment
          ? uploadImage(attachment)
              .then((res) => {
                dispatch(
                  updateAction("history", UPDATE_HISTORY, selectedEditID.id, {
                    ...values,
                    attachmentId: res.attachmentId,
                  })
                );
              })
              .catch((err) => {
                console.log(err);
              })
          : dispatch(
              updateAction("history", UPDATE_HISTORY, selectedEditID.id, {
                ...values,
                attachmentId: selectedEditID.attachment.id,
              })
            );
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const editHandleCancel = () => {
    setEditVisible(false);
  };

  const { data } = useSelector((state) => state.historyReducer);

  useEffect(() => {
    dispatch(getAction("history", GET_HISTORY));
  }, [dispatch]);

  const columns = [
    { title: "Nom Uz", dataIndex: "name", key: "name" },
    { title: "Nom Ru", dataIndex: "nameRu", key: "nameRu" },
    { title: "Tavsif Uz", dataIndex: "description", key: "description" },
    { title: "Tavsif Ru", dataIndex: "descriptionRu", key: "description" },
    {
      title: "Rasm",
      dataIndex: "attachmentId",
      key: "attachmentId",
      render: (text, record) => {
        return (
          <div>
            <img
              className="tableImg"
              src={process.env.REACT_APP_API_PHOTO_URL + record.attachment.url}

              alt={"rasm yo"}
            />
          </div>
        );
      },
    },
    {
      title: <>--------</>,
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
              name="name"
              initialValues={{
                modifier: "public",
              }}
              fields={[
                {
                  name: ["name"],
                  value: name,
                },
                {
                  name: ["nameRu"],
                  value: nameRu,
                },
                {
                  name: ["description"],
                  value: description,
                },
                {
                  name: ["descriptionRu"],
                  value: descriptionRu,
                },
              ]}
            >
              <input type="file" name="attachment" value={''} onChange={onChange} />
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
        <BreadcrumbHelpers to={"history"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
