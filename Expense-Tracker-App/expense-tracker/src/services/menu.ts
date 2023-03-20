import axios from "axios";
import ExpenseDetail from "../model/ExpenseDetail";

const getDataFromServer = () => {
  return axios
    .get<ExpenseDetail[]>(`http://localhost:3001/items`)
    .then((response) => response.data);
};

const pushDataFromUser = (newpurchase: Omit<ExpenseDetail, "id">) => {
  return axios
    .post<ExpenseDetail>(`http://localhost:3001/items`, newpurchase, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

export { getDataFromServer, pushDataFromUser };
