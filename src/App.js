import React, { useState } from "react";
import "./App.css";
import { Calculator } from "react-bootstrap-icons";
import DatePicker from "react-date-picker";
import moment from "moment";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';

function App() {
  const [formValues, setValue] = useState(null);
  const [result, setResult] = useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const onChange = (fieldName, fieldValue) => {
    setValue({
      ...formValues,
      [fieldName]: fieldValue,
    });
  };

  const calculateAge = () => {
    try {
      if (formValues.dob >= formValues.tillDate) {
        setResult({
          errorText: "Date of Birth should be greater than Till date!",
        });
        return;
      }

      const dateOfBirth = moment(formValues.dob);
      const endDate = moment(formValues.tillDate);

      const years = endDate.diff(dateOfBirth, "year");
      dateOfBirth.add(years, "years");

      const months = endDate.diff(dateOfBirth, "months");
      dateOfBirth.add(months, "months");

      const days = endDate.diff(dateOfBirth, "days");

      setResult({
        years: years,
        months: months,
        days: days,
      });
    } catch (e) {
      console.log(e);
      setResult({
        errorText: "Something went wrong, Please try again!",
      });
    } finally {
      setOpenDialog(true);
    }
  };

  const resetForm = () => {
    setValue(null);
    setResult(null);
  };

  return (
    <div className="container">
      <div className="main">
        <header className="app-header">
          <div>
            <Calculator color="royalblue" size={30} />
            <span>React Age Calculator</span>
          </div>
        </header>

        <div className="form-container">
          {result && !result.errorText && (
            <section>
              <p className="text-center">
                You are <b>{result.years}</b> years <b>{result.months}</b>{" "}
                months <b>{result.days}</b> days old.
              </p>
            </section>
          )}

          <section>
            <label htmlFor="dob">Date Of Birth</label>
            <DatePicker
              format="dd/MM/yyyy"
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              yearPlaceholder="YYYY"
              className="date-picker-wrapper"
              name="dob"
              onChange={(val) => onChange("dob", val)}
              value={formValues?.dob}
            />
          </section>

          <section className="pt-50">
            <label htmlFor="tillDate">Age Till Date</label>
            <DatePicker
              format="dd/MM/yyyy"
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              yearPlaceholder="YYYY"
              className="date-picker-wrapper"
              name="tillDate"
              onChange={(val) => onChange("tillDate", val)}
              value={formValues?.tillDate}
            />
          </section>

          <section className="btn-section">
            <button
              className="btn"
              disabled={!formValues || !formValues.tillDate || !formValues.dob}
              onClick={calculateAge}
            >
              Calculate Age
            </button>

            <button className="btn" disabled={!formValues} onClick={resetForm}>
              Reset
            </button>
          </section>

          <Modal
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            center
            classNames={{
              overlay: "customOverlay",
              modal: "customModal",
            }}
          >
            {result?.errorText ? (
              <h4 className="text-center">{result?.errorText}</h4>
            ) : (
                <p className="text-center">
                  You are <b>{result?.years}</b> years <b>{result?.months}</b>{" "}
                  months <b>{result?.days}</b> days old.
                </p>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
