import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/actions/readAction";
import { createAction } from "../../redux/actions/createAction";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { CREATE_NEWS, GET_NEWS, UPDATE_NEWS } from "../../redux/actions/types";
import { deleteAction } from "./../../redux/actions/deleteAction";
import { DELETE_NEWS } from "./../../redux/actions/types";
import { updateAction } from "./../../redux/actions/updateAction";
import { uploadImage } from "../../utility/uploadImage";

export const News = () => {
  const [createVisible, setCreateVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [name, setName] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [nameInp, setNameInp] = useState("");
  const [nameRuInp, setNameRuInp] = useState("");
  const [descriptionInp, setDescriptionInp] = useState("");
  const [descriptionRuInp, setDescriptionRuInp] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [attachment, setAttachment] = useState(null);
  const { data } = useSelector((state) => state.newsReducer);

  const onChange = async (e) => {
    setNameInp(e.target.form[1].value);
    setNameRuInp(e.target.form[2].value);
    setDescriptionInp(e.target.form[3].value);
    setDescriptionRuInp(e.target.form[4].value);
    setAttachment(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(getAction("news", GET_NEWS));
  }, [dispatch]);

  const showModal = (id) => {
    setVisible(true);
    setSelectedID(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("news", DELETE_NEWS, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("news", GET_NEWS));
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
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
                  updateAction("news", UPDATE_NEWS, selectedEditID.id, {
                    ...values,
                    attachmentId: res.attachmentId,
                  })
                );
              })
              .catch((err) => {
                console.log(err);
              })
          : dispatch(
              updateAction("news", UPDATE_NEWS, selectedEditID.id, {
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

  const showCreateModal = () => {
    setCreateVisible(true);
  };

  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);
        uploadImage(attachment)
          .then((res) => {
            dispatch(
              createAction("news", CREATE_NEWS, {
                name: values.name,
                nameRu: values.nameRu,
                description: values.description,
                descriptionRu: values.descriptionRu,
                attachmentId: res.attachmentId,
              })
            );
            dispatch(getAction("news", GET_NEWS));
            setNameInp('')
            setNameRuInp('')
            setDescriptionInp('')
            setDescriptionRuInp('')
          })
          .catch((err) => {
            console.log(err);
          });
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
      title: (
        <>
          <Button type="primary" onClick={showCreateModal}>
            <AddBoxIcon />
          </Button>
          <Modal
            title={"Yaratish"}
            visible={createVisible}
            onOk={createHandleOk}
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
              fields={[
                {
                  name: ["name"],
                  value: nameInp,
                },
                {
                  name: ["nameRu"],
                  value: nameRuInp,
                },
                {
                  name: ["description"],
                  value: descriptionInp,
                },
                {
                  name: ["descriptionRu"],
                  value: descriptionRuInp,
                },
                {
                  name: ["attachment"],
                  value: "",
                },
              ]}
            >
              <input type="file" name="attachment" onChange={onChange} />
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
          <Button type="primary" onClick={(e) => showEditModal(text)}>
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
              <input type="file" value={''} name="attachment" onChange={onChange} />
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
        <BreadcrumbHelpers to={"news"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
