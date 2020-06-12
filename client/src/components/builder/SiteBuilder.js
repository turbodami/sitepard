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
      return (
        <section className="container text-center">
          <StepOneSite {...props} />
        </section>
      );
    case 2:
      return (
        <section className="container text-center">
          <StepTwoSite {...props} />
        </section>
      );
    case 3:
      return (
        <section className="container text-center">
          <StepThreeSite {...props} />)
        </section>
      );
    case 4:
      return (
        <section className="container text-center">
          <StepFourSite {...props} />;
        </section>
      );
    case 5:
      return (
        <section className="container text-center">
          <StepFiveSite {...props} />
        </section>
      );
    case 6:
      return (
        <section className="container text-center">
          <StepSixSite {...props} />
        </section>
      );
    case 7:
      return (
        <section className="container text-center">
          <StepSevenSite {...props} />
        </section>
      );
    case 8:
      return (
        <section className="container text-center">
          <StepEightSite {...props} />
        </section>
      );
    case 9:
      return (
        <section className="container text-center">
          <StepNineSite {...props} />
        </section>
      );
    case 10:
      return (
        <section className="container text-center">
          <StepTenSite {...props} />
        </section>
      );
    case 11:
      return (
        <section className="container text-center">
          <StepElevenSite {...props} />
        </section>
      );
    case 12:
      return (
        <section className="container text-center">
          <StepTwelveSite {...props} />
        </section>
      );
    case 13:
      return (
        <section className="container text-center">
          <StepThirteenSite {...props} />
        </section>
      );
    case 14:
      return (
        <section className="container text-center">
          <StepFourteenSite {...props} />
        </section>
      );
    case 15:
      return (
        <section className="container text-center">
          <StepOneProduct {...props} />
        </section>
      );
    case 16:
      return (
        <section className="container text-center">
          <StepTwoProduct {...props} />
        </section>
      );
    case 17:
      return (
        <section className="container text-center">
          <StepFinal {...props} />
        </section>
      );
    default:
      return <Fragment>Mi sa che ci sono problemi!</Fragment>;
  }
};

SiteBuilder.propTypes = {
  createSite: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { createSite, setAlert })(SiteBuilder);
