import api from "./api";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/attachmentContent", formData);
  return response.data;
};
