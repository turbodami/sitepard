const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const request = require('request');
const auth = require("../../middleware/auth");
const crypto = require("crypto");

const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

//@route    POST api/users
//@desc     register user
//@access   public
router.post(
  "/",
  [
    check("email", "please include a valide email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or + characters"
    ).isLength({
      min: 6,
      max: 20,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      //check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists!" }] });
      }

      user = new User({
        email,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      const userId = user.id;

      
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err)
           throw err;
          
          user.registrationToken = token;
          
          
          console.log("Token creato");

          user.save((err) =>  //Save token in db
          {
            if(err)
            {
              console.log(err);
              res.status(500).json({message: "Errore nel salvataggio del token"});
            }
            else
            {
              const options =   //Prepare data for mail request
              {
                url : 'http://localhost:5000/api/mail/verification/' + email,
                method: 'POST',
                headers: 
                {
                  'Content-Type': 'application/json'
                },
                json: 
                {
                  "token" : token
                }
              };

              console.log("Mail preparata")
              request(options, (err, response, body)=>  //Send request to mail route
              {
                if(err)
                {
                  console.log(error);
                  res.status(400).json({message: `Errore nell'invio della mail.`});
                }
                else if(response.statusCode === 200)
                {
                  
                  res.status(200).json({token}); //Ritorna il token per il primo login 
                  
                }
                else
                {
                  res.status(400).json({message: "Errore nell'invio della mail di verifica"});
                }
              })
            }
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error!");
    }
  }
);

router.get('/passwordForgot', (req,res) =>
{

  
  crypto.randomBytes(32, (err, buffer) =>  //Creazione del token
  {
    if(err)
    {
      console.log(err);
      return res.status(500).json({message: "Errore nella creazione del token"});
    }
    
    const token = buffer.toString('hex'); //Inizializzazione del token
    User.findOne({"email" : req.body.email}, (err, user) =>  //Funzione per salvare il token nell'utente assegnato alla mail da resettare
    {
      if(err)
      {
        console.log(err);
        return res.status(500).json({message:"Errore durante la creazione dell'oggetto utente dal db."});
      }
      if(!user)
      {
        return res.status(404).json({message: 'Utente non presente nel db.'});
      }
      else
      {
        user.passwordResetToken = token;  
        user.save((err) => //Funzione che salva effettivamente il token sul db
        {
          if(err)
          {
            return res.status(500).json({message: `Errore nel salvataggio del token nel db`});
          }
          else
          {
            const options =   //Prepare data for mail request
            {
              url : 'http://localhost:5000/api/mail/passwordReset/' + req.body.email,
              method: 'POST',
              headers: 
              {
                'Content-Type': 'application/json'
              },
              json: 
              {
                "token" : token
              }
            };

            request(options, (err, response, body)=>  //Send request to mail route
            {
              if(err)
              {
                console.log(error);
                res.status(400).json({message: `Errore nell'invio della mail.`});
              }
              else if(response.statusCode === 200)
              {
                
                res.status(200).json({token}); //Ritorna il token per il primo login 
                
              }
              else
              {
                res.status(400).json({message: "Errore nell'invio della mail di verifica"});
              }
            });
          }
        });
      }
    })
  });
});


module.exports = router;
