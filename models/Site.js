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
  domain: {
    type: String,
    required: false,
  },
  index: {
    type: String,
    required: false,
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
