import { useEffect, useState } from "react";
import ExpenseDetail from "../model/ExpenseDetail";
import { getDataFromServer } from "../services/menu";
import ExpenseTracker from "./ExpenseTracker";

function ShowData() {
  const [items, setItems] = useState<ExpenseDetail[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [sum, setSum] = useState<number | null>();
  const [rahulExpenditure, setRahulExpenditure] = useState<number>(0);
  const [rameshExpenditure, setRameshExpenditure] = useState<number>(0);
  const [showform, setShowForm] = useState<boolean>(false);

  var amountSpentByRahul: number = 0;
  var amountSpentByRamesh: number = 0;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getDataFromServer();
        setItems(data);
        setSum(data.reduce((result, v) => (result = result + v.price), 0));
        Shares(data);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchMenu();
  }, [showform]);

  const Shares = (data: ExpenseDetail[]) => {
    data.map((sams) =>
      sams.payeeName === "Rahul"
        ? (amountSpentByRahul = amountSpentByRahul + sams.price)
        : (amountSpentByRamesh = amountSpentByRamesh + sams.price)
    );
    setRahulExpenditure(amountSpentByRahul);
    setRameshExpenditure(amountSpentByRamesh);
  };

  const success = () => {
    setShowForm(false);
  };
  const cancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showform && (
        <div className="form">
          <ExpenseTracker onTrue={success} onClose={cancel} />
        </div>
      )}
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>
          Payee
        </div>
      </>
      {items &&
        items.map((user, idx) => (
          <div key={idx}>
            <div className="use-inline date">{user.purchaseDate}</div>
            <div className="use-inline">{user.product}</div>
            <div className="use-inline price">{user.price}</div>
            <div className={`use-inline ${user.payeeName}`}>
              {user.payeeName}
            </div>
          </div>
        ))}
      <hr />
      <div className="use-inline ">Total: </div>
      <span className="use-inline total">{sum}</span> <br />
      <div className="use-inline ">Rahul paid: </div>
      <span className="use-inline total Rahul">{rahulExpenditure}</span> <br />
      <div className="use-inline ">Ramesh paid: </div>
      <span className="use-inline total Ramesh">{rameshExpenditure}</span>{" "}
      <br />
      <span className="use-inline payable">
        {rahulExpenditure > rameshExpenditure ? "Pay Rahul " : "Pay Ramesh"}
      </span>
      <span className="use-inline payable price">
        {" "}
        {Math.abs((rahulExpenditure - rameshExpenditure) / 2)}
      </span>
      {error && <>{error?.message}</>}
    </>
  );
}
export default ShowData;
