import { Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FieldHelpers } from "./../../utility/Helpers";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <FieldHelpers
        label="Foydalanuvchi nomi"
        name="userName"
        message="Iltimos Foydalanuvchi nomi qatorini yo'ldiring!"
      />
      <FieldHelpers
        label="Parol"
        name="password"
        message="Iltimos parol nomi qatorini yo'ldiring!"
        inp={false}
      />

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Kirish
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
