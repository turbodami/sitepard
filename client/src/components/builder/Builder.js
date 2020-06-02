import React, { useState, useEffect, Fragment } from "react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";
import StepEight from "./StepEight";
import StepNine from "./StepNine";
import StepTen from "./StepTen";
import StepEleven from "./StepEleven";
import StepTwelve from "./StepTwelve";
import StepThirteen from "./StepThirteen";
import StepFourteen from "./StepFourteen";
import StepFifteen from "./StepFifteen";

import { createSite } from "../../actions/site";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";

const defaultData = {
  category: "",
  name: "",
  address: "",
  palette: "",
  style: "",
  email: "",
  password: "",
  password2: "",
  logo: "",
  image: "",
  whatsappNumber: "",
  tel: "",
  timeTable: {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
  description: "",
  type: "",
};

const Builder = ({ createSite, history, setAlert }) => {
  const [formData, setFormData] = useState(defaultData);

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };

  const clientValidation = (valueToCheck) => {
    if (valueToCheck !== "") {
      nextStep();
    } else {
      setAlert("Compila tutti i campi obbligatori!", "danger");
    }
  };

  const onChange = (e) => {
    e.persist();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //handles selection for category, palette, style
  const handleSelection = (e) => {
    e.persist();
    //set proper field to proper value

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    //goes to next part of the wizard
    nextStep();
  };

  const finalSubmit = (e) => {
    e.persist();
    e.preventDefault();
    setFormData({
      ...formData,
      type: e.target.value,
    });
  };

  useEffect(() => {
    if (formData.type === "domain" || formData.type === "subdomain") {
      createSite(formData, history);
      nextStep();
    }
  }, [formData.type]);

  const props = {
    formData,
    setFormData,
    nextStep,
    prevStep,
    clientValidation,
    onChange,
    handleSelection,
    finalSubmit,
  };

  switch (step) {
    case 1:
      return <StepOne {...props} />;
    case 2:
      return <StepTwo {...props} />;
    case 3:
      return <StepThree {...props} />;
    case 4:
      return <StepFour {...props} />;
    case 5:
      return <StepFive {...props} />;
    case 6:
      return <StepSix {...props} />;
    case 7:
      return <StepSeven {...props} />;
    case 8:
      return <StepEight {...props} />;
    case 9:
      return <StepNine {...props} />;
    case 10:
      return <StepTen {...props} />;
    case 11:
      return <StepEleven {...props} />;
    case 12:
      return <StepTwelve {...props} />;
    case 13:
      return <StepThirteen {...props} />;
    case 14:
      return <StepFourteen {...props} />;
    case 15:
      return <StepFifteen {...props} />;
    default:
      return <Fragment>Mi sa che ci sono problemi!</Fragment>;
  }
};

Builder.propTypes = {
  createSite: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { createSite, setAlert })(Builder);
