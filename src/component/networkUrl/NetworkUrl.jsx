import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/actions/readAction";
import { EditOutlined } from "@ant-design/icons";
import { updateAction } from "../../redux/actions/updateAction";
import { GET_NETWORK_URL, UPDATE_NETWORK_URL } from "../../redux/actions/types";

export const NetworkUrl = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [selectedEditID, setselectedEditID] = useState(null);
  const { data } = useSelector((state) => state.networkUrlReducer);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAction("socialNetworkUrl", GET_NETWORK_URL));
  }, [dispatch]);

  const showEditModal = (data) => {
    setEditVisible(true);
    setselectedEditID(data);
    setName(data.url);
  };

  const editHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setEditVisible(false);
        const dataValue = {
          url: values.url,
          socialNetworkId: selectedEditID ? selectedEditID.id : null,
        };
        dispatch(
          updateAction(
            "socialNetworkUrl",
            UPDATE_NETWORK_URL,
            selectedEditID.id,
            dataValue
          )
        );

        dispatch(getAction("socialNetworkUrl", GET_NETWORK_URL));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const editHandleCancel = () => {
    setEditVisible(false);
  };

  const columns = [
    { title: "Url", dataIndex: "url", key: "url" },
    { title: "Nomi", dataIndex: "name", key: "name" },
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
                  name: ["url"],
                  value: name,
                },
                {
                  name: ["socialNetworkId"],
                  value: selectedEditID ? selectedEditID.id : null,
                },
              ]}
            >
              <FieldHelpers
                label="Url"
                name="url"
                message="Iltimos Nom qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
    },
  ];
  const dataSource = [
    {
      id: (data && data[0] && data[0].id) ? data[0].id : null,
      name: (data && data[0] && data[0].socialNetwork.name) ? data[0].socialNetwork.name : null,
      url: (data && data[0] && data[0].url) ? data[0].url : null,
    },
    {
      id: (data && data[1] && data[1].id) ? data[1].id : null,
      name: (data && data[1] && data[1].socialNetwork.name) ? data[1].socialNetwork.name : null,

      url: (data && data[1] && data[1].url) ? data[1].url : null,
    },
    {
      id: (data && data[2] && data[2].id) ? data[2].id : null,
      name: (data && data[2] && data[2].socialNetwork.name) ? data[2].socialNetwork.name : null,

      url: (data && data[2] && data[2].url) ? data[2].url : null,
    },
    {
      id: (data && data[3] && data[3].id) ? data[3].id : null,
      name: (data && data[3] && data[3].socialNetwork.name) ? data[3].socialNetwork.name : null,

      url: (data && data[3] && data[3].url) ? data[3].url : null,
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"social Network Url"} from={"home"} />
        <Table columns={columns} dataSource={dataSource} />
      </Content>
    </>
  );
};
