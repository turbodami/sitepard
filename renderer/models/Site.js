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
  piva:
  {
    type: String
  },
  domain: {
    type: String,
    required: false,
  },
  index: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    default: true
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
  },
  style: {
    type: String,
  },

  type: {
    type: String,
  },
  createdAt:
  {
    type: Date,
    default: Date.now,
  },
  timeTable: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
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
      category: {
        type: String,
      },
    },
  ],
  categories: [
    {
      name: {
        type: String,
      },
    },
  ],

  images: [
    {
      name: {
        type: String,
      },
      link: {
        type: String,
      },
      pathS3:
      {
        type: String
      }
    },
  ],
});


module.exports = Site = mongoose.model("site", SiteSchema);