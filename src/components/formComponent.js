import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-date-picker";
import Swal from "sweetalert2";

const FormComponent = () => {
  const [formValues, setValue] = useState(null);

  const onChange = (fieldName, fieldValue) => {
    setValue({
      ...formValues,
      [fieldName]: fieldValue,
    });
  };

  const calculateAge = () => {
    try {
      if (formValues.dob > formValues.tillDate) {
        Swal.fire({
          title: "Are you fool?",
          text: "Date of Birth should be greater than Till date!",
          icon: "question",
          confirmButtonText: "No!",
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
      const msg = `You are ${years} year ${months} month's and ${days} day's old!`;
      Swal.fire("Age!", msg, "success");
    } catch (e) {
      console.log(e);
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const resetForm = () => {
    setValue(null);
  };

  return (
    <div className="form-container">
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
    </div>
  );
};

export default FormComponent;
