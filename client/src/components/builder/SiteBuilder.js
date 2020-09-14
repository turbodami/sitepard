import React, { useState, useEffect, Fragment } from "react";

import Category from "./Category";
import Name from "./Name";
import Logo from "./Logo";
import Cover from "./Cover";
import Whatsapp from "./Whatsapp";
import Tel from "./Tel";
import TimeTable from "./TimeTable";
import Address from "./Address";
import Piva from "./Piva";
import Description from "./Description";
import Products from "./Products";
import Registration from "./Registration";
import Domain from "./Domain";
import Success from "./Success";

import { createSite } from "../../actions/site";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";

const defaultData = {
  category: "",
  name: "",
  domain: "",
  subdomain: "",
  address: "",
  palette: "",
  style: "",
  email: "",
  password: "",
  password2: "",
  logo: "",
  cover: "",
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
  piva: ""
};

const SiteBuilder = ({ createSite, register, history, setAlert }) => {
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
      [e.target.name]: e.target.value.toLowerCase(),
    });

    nextStep();
  };

  const registration = async (e) => {
    e.preventDefault();
    const { email, password, password2 } = formData;

    if (email !== "" || password !== "") {
      if (password !== password2) {
        setAlert("Le password non corrispondono", "danger");
      } else {
        function successRegister(result) {
          let { name } = formData;
          name = name.replace(/\s/g, '');
          name = name.toLowerCase();
          formData.subdomain = name;

          function successCreateSite(result) {
            nextStep();
          }
          function failureCreateSite(error) {
            console.log("error creating site")
          }
          const promiseCreateSite = createSite(formData, history);
          promiseCreateSite.then(successCreateSite, failureCreateSite);
        }
        function failureRegister(error) {
          console.log("error registering user");
        }

        const promiseRegister = register({ email, password });
        promiseRegister.then(successRegister, failureRegister);
        //createSite(formData, history);
      }
    } else {
      setAlert("Ci sono dei campi non validi", "danger");
    }
  };

  const props = {
    formData,
    setFormData,
    nextStep,
    prevStep,
    clientValidation,
    onChange,
    handleSelection,
    registration,
  };

  switch (step) {
    case 1:
      return <Category {...props} />;
    case 2:
      return <Name {...props} />;
    case 3:
      return <Logo {...props} />;
    case 4:
      return <Cover {...props} />;
    case 5:
      return <Whatsapp {...props} />;
    case 6:
      return <Tel {...props} />;
    case 7:
      return <TimeTable {...props} />;
    case 8:
      return <Address {...props} />;
    case 9:
      return <Piva {...props} />
    case 10:
      return <Description {...props} />;
    case 11:
      return <Registration {...props} />;
    case 12:
      return <Success {...props} />;
    default:
      return <Fragment>Mi sa che ci sono problemi!</Fragment>;
  }
};

SiteBuilder.propTypes = {
  createSite: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { createSite, register, setAlert })(SiteBuilder);
