const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
  },
  address: {
    type: String,
  },
  whatsappNumber: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  logo: {
    type: String,
  },
  palette: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },

  type: {
    type: String,
  },
  timeTable: [
    {
      monday: {
        type: String,
      },
      tuesday: {
        type: String,
      },
      wednesday: {
        type: String,
      },
      thursday: {
        type: String,
      },
      friday: {
        type: String,
      },
      saturday: {
        type: String,
      },
      sunday: {
        type: String,
      },
    },
  ],
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      price: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
      },
    },
  ],
});

module.exports = Site = mongoose.model("site", SiteSchema);
