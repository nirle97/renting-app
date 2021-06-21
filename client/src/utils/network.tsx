import axios from "axios";
import Cookies from "js-cookie";

const network = axios.create();

const getAccessToken = () => Cookies.get("token");

network.interceptors.request.use((config) => {
  config.headers.authorization = `bearer ${getAccessToken()}`;
  return config;
});

network.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response && error.response.status;
    const originalRequest = error.config;
    if (status === 403) {
      try {
        const { data: { data: accessToken} } = await axios.post("/auth/generate-new-token", {
          id: Cookies.get("id"),
        });
        Cookies.set("token", accessToken);
        originalRequest.headers.authorization = `bearer ${accessToken}`;
        const data = await axios(originalRequest);
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      throw error;
    }
  }
);

export default network;
