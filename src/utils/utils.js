import axios from "axios";

const BASE_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    "x-token": process.env.REACT_APP_X_TOKEN,
  },
};

async function sendBackendPostRequest(url, data) {
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/${url}`,
      data,
      config
    );

    if (response.status === 200) {
      return response.data;
    } else {
      // Handle non-200 status codes here if needed
      return null;
    }
  } catch (error) {
    // Handle the error here
    console.error("POST request error:", error);
    return null;
  }
}

export { sendBackendPostRequest };
