import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/`,
});

export const api = ({url, open = false, ...props}) => {
  const token = localStorage.getItem("_sfToken") ?  `${localStorage.getItem("_sfToken")}` : null;
  if(!open){
    props.headers = {
      ...props.headers,
      Authorization: props.headers && props.headers.Authorization ? props.headers.Authorization :  `Bearer ${token}`,
    }
  }
  if ("pk" in props) {
    url = `${url}/${props.pk}`;
  }
  return instance({
    url: url,
    ...props
  });
};
