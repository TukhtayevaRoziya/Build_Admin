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
import {
  GET_CAROUSEL,
  DELETE_CAROUSEL,
  UPDATE_CAROUSEL,
  CREATE_CAROUSEL,
} from "./../../redux/actions/types";
import { uploadImage } from "../../utility/uploadImage";

export const Carousel = () => {
  const [createVisible, setCreateVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [edit, setEdit] = useState("");
  const [editRu, setEditRu] = useState("");
  const [nameInp, setNameInp] = useState("");
  const [nameRuInp, setNameRuInp] = useState("");
  const [attachment, setAttachment] = useState(null);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { data } = useSelector((state) => state.carouselReducer);

  const onChange = async (e) => {
    setNameInp(e.target.form[1].value);
    setNameRuInp(e.target.form[2].value);
    setAttachment(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(getAction("carousel", GET_CAROUSEL));
  }, [dispatch]);

  const showModal = (id) => {
    setVisible(true);
    setSelectedID(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("carousel", DELETE_CAROUSEL, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("carousel", GET_CAROUSEL));
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showEditModal = (id) => {
    setEditVisible(true);
    setselectedEditID(id);
    setEdit(id.name);
    setEditRu(id.nameRu);
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
                  updateAction("carousel", UPDATE_CAROUSEL, selectedEditID.id, {
                    ...values,
                    attachmentId: res.attachmentId,
                  })
                );
              })
              .catch((err) => {
                console.log(err);
              })
          : dispatch(
              updateAction("carousel", UPDATE_CAROUSEL, selectedEditID.id, {
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
        uploadImage(attachment).then((res) => {
          dispatch(
            createAction("carousel", CREATE_CAROUSEL, {
              name: values.name,
              nameRu: values.nameRu,
              attachmentId: res.attachmentId,
            })
          );
          dispatch(getAction("carousel", GET_CAROUSEL));
          setNameInp('')
          setNameRuInp('')
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createHandleCancel = () => {
    setCreateVisible(false);
  };

  const columns = [
    { title: "Nom Uz", dataIndex: "name", key: "name" },
    { title: "Nom Ru", dataIndex: "nameRu", key: "nameRu" },
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
                  name: ["attachment"],
                  value: null,
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
                  value: edit,
                },
                {
                  name: ["nameRu"],
                  value: editRu,
                },
                {
                  name: ["attachment"],
                  value: null,
                },
              ]}
            >
              <input
                type="file"
                name="attachment"
                value={""}
                onChange={onChange}
              />

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
            </Form>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"carousel"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
