const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const aws = require('aws-sdk');

const Site = require("../../models/Site");
const User = require("../../models/User");

const s3 = new aws.S3(
  {
      endpoint: 'fra1.digitaloceanspaces.com',
      accessKeyId: 'JGDTMFZUJ4ZRBU53WMCQ',
      secretAccessKey: 'OnG8gclYu6L5oWFmxP073maaWGj4s1As8Z75fiA4G9E',
      bucket: 'cactus-space'
  }
);

//@route    GET api/site/me
//@desc     get current users site
//@access   private
router.get("/me", auth, async (req, res) => {
  try {
    const site = await Site.findOne({ user: req.user.id }).populate("user", [
      "email",
    ]);

    if (!site) {
      return res.status(400).json({ msg: "there is no site for this user!" });
    }

    res.json(site);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error!");
  }
});

//@route    POST api/site
//@desc     create/update user site in db (add here required fields)
//@access   public
router.post(
  "/",
  [
    auth,
    [
      check("category", "category is required").not().isEmpty(),
      check("name", "name is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      category,
      name,
      tel,
      address,
      whatsappNumber,
      domain,
      subdomain,
      description,
      piva,
      image,
      logo,
      palette,
      style,
      type,
      timeTable,
      categories,
      products,
    } = req.body;

    //build site object
    const siteFields = {};
    siteFields.user = req.user.id;
    if (category) siteFields.category = category;
    if (name) siteFields.name = name;
    if (tel) siteFields.tel = tel;
    if (domain) siteFields.domain = domain;
    if (subdomain) siteFields.subdomain = subdomain;
    if (address) siteFields.address = address;
    if (whatsappNumber) siteFields.whatsappNumber = whatsappNumber;
    if (piva) siteFields.piva = piva;
    if (description) siteFields.description = description;
    if (image) siteFields.image = image;
    if (logo) siteFields.logo = logo;
    if (palette) siteFields.palette = palette;
    if (style) siteFields.style = style;
    if (type) siteFields.type = type;
    if (timeTable) siteFields.timeTable = timeTable;
    if (categories) siteFields.categories = categories;
    if (products) siteFields.products = products;

    try {
      let site = await Site.findOne({ user: req.user.id });

      if (site) {
        //update
        site = await Site.findOneAndUpdate(
          { user: req.user.id },
          { $set: siteFields },
          { new: true }
        );

        return res.json(site);
      }

      //create
      site = new Site(siteFields);

      await site.save();

      res.json(site);
    } catch (err) {
      console.error(err.message);
      res.status(500), send("server error!");
    }
  }
);

//@route    DELETE api/site
//@desc     delete site, user & products
//@access   private
router.delete("/", auth, async (req, res) => {
  try {
    //remove site
    await Site.findOneAndRemove({ user: req.user.id });

    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "user deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error!");
  }
});

//@route    PUT api/site/products
//@desc     add site products
//@access   private
router.put(
  "/products",
  [
    auth,
    [
      check("name", "name is required!").not().isEmpty(),
      check("price", "price is required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, category, price, photo } = req.body;

    const newProduct = {
      name,
      description,
      category,
      price,
      photo,
    };

    try {
      const site = await Site.findOne({ user: req.user.id });
      console.log(site);
      site.products.unshift(newProduct);

      await site.save();

      res.json(site);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error!");
    }
  }
);

//@route    DELETE api/site/products/:prod_id
//@desc     delete product from site
//@access   private
router.delete("/products/:prod_id", auth, async (req, res) => {
  try {
    const site = await Site.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = site.products
      .map((item) => item.id)
      .indexOf(req.params.prod_id);

    site.products.splice(removeIndex, 1);

    await site.save();

    res.json(site);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error!");
  }
});

//@route    PUT api/site/categories
//@desc     add site categories
//@access   private
router.put(
  "/categories",
  [auth, [check("name", "name is required!").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const newCategory = {
      name,
    };

    try {
      const site = await Site.findOne({ user: req.user.id });
      console.log(site);
      site.categories.unshift(newCategory);

      await site.save();

      res.json(site);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error!");
    }
  }
);

//@route    DELETE api/site/categories/:cat_id
//@desc     delete category from site
//@access   private
router.delete("/categories/:cat_id", auth, async (req, res) => {
  try {
    const site = await Site.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = site.categories
      .map((item) => item.id)
      .indexOf(req.params.cat_id);

    site.categories.splice(removeIndex, 1);

    await site.save();

    res.json(site);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error!");
  }
});

router.get("/domainExists/:domain", async (req,res) =>  //Route per controllare se il sito esiste gia
{
  console.log(req.params.domain);
  try 
  {
    const site = await Site.findOne({domain: req.params.domain}, (err, site) =>
    {
      if(err)
      {
        console.log(err);
        return res.status(500).json({message: `Errore nel database,\n ${err}` });
      }
      else if(!site)
      {
        return res.status(404).json({message: 'sito non trovato'});  //Se il sito non esiste ritorna 404
      }
      else
      {
        console.log('trovato');
        return res.status(200).json({message: 'sito trovato'}); //Se esiste ritorna 200
      }
    });     
  } 
  catch (error) 
  {
    console.log(err);
    return res.status(500).json({message: `Errore nel backend, get(/domainExists/:domain)\n ${err}`});
  }
});

module.exports = router;
