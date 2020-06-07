import React, { useState, useEffect, Fragment } from "react";

import StepOneSite from "./StepOneSite";
import StepTwoSite from "./StepTwoSite";
import StepThreeSite from "./StepThreeSite";
import StepFourSite from "./StepFourSite";
import StepFiveSite from "./StepFiveSite";
import StepSixSite from "./StepSixSite";
import StepSevenSite from "./StepSevenSite";
import StepEightSite from "./StepEightSite";
import StepNineSite from "./StepNineSite";
import StepTenSite from "./StepTenSite";
import StepElevenSite from "./StepElevenSite";
import StepTwelveSite from "./StepTwelveSite";
import StepThirteenSite from "./StepThirteenSite";
import StepFourteenSite from "./StepFourteenSite";

import StepOneProduct from "./StepOneProduct";
import StepTwoProduct from "./StepTwoProduct";

import StepFinal from "./StepFinal";

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

const SiteBuilder = ({ createSite, history, setAlert }) => {
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

  const handleSelection = (e) => {
    e.persist();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

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
      console.log(formData);

      //save in db
      createSite(nextStep, formData, history);

      //nextStep();
      //history.push("/productbuilder");
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
      return <StepOneSite {...props} />;
    case 2:
      return <StepTwoSite {...props} />;
    case 3:
      return <StepThreeSite {...props} />;
    case 4:
      return <StepFourSite {...props} />;
    case 5:
      return <StepFiveSite {...props} />;
    case 6:
      return <StepSixSite {...props} />;
    case 7:
      return <StepSevenSite {...props} />;
    case 8:
      return <StepEightSite {...props} />;
    case 9:
      return <StepNineSite {...props} />;
    case 10:
      return <StepTenSite {...props} />;
    case 11:
      return <StepElevenSite {...props} />;
    case 12:
      return <StepTwelveSite {...props} />;
    case 13:
      return <StepThirteenSite {...props} />;
    case 14:
      return <StepFourteenSite {...props} />;
    case 15:
      return <StepOneProduct {...props} />;
    case 16:
      return <StepTwoProduct {...props} />;
    case 17:
      return <StepFinal {...props} />;
    default:
      return <Fragment>Mi sa che ci sono problemi!</Fragment>;
  }
};

SiteBuilder.propTypes = {
  createSite: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { createSite, setAlert })(SiteBuilder);
