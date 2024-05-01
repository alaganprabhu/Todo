import axios from "axios";
import { API_URL } from "./constant";

export const fetchTodo = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // alert("Error in Fetching", error);
    console.error("Error in Fetching", error);
    throw error;
  }
};

export const postTodo = async (payload) => {
  try {
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error("error");
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
