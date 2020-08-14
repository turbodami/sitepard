const express = require("express");
const router = express.Router();
const ocean = require('digitalocean');
const digitalocean = require("digitalocean");
const client = digitalocean.client(process.env.OCEAN_TOKEN);

router.post('/create-domain', async(req,res) => //Aggiunta di un dominio con relativo CNAME www req.body contiene {"name": "dominio", "ip_address": "ip_droplet"}
{
    client.domains.create(req.body, (err, domainResult) => //Aggiunta del dominio su digital ocean
    {
        if(err)
        {
            console.log(err);
            res.status(500).json({msg: `Errore nella creazione del dominio`});
        }
        else
        {
            console.log(domainResult);
            const attributes =  //Attributi per la definizione del CNAME
            {
                type: "CNAME",
                name: "www",
                data: "@",
                priority: null,
                port: null,
                ttl: 43200,
                weight: null,
                flags: null,
                tag: null
            }

            client.domains.createRecord(req.body.name, attributes, (recordErr, recordResult) => //Aggiunta del CNAME al dominio appena inserito, permettendo di accedervi con www.dominio.com
            {
                if(err)
                {
                    console.log(recordErr);
                    res.status(500).json({msg: `Errore nella creazione del record`});
                }
                else
                {
                    console.log(recordResult);
                    res.status(200).json({msg: `Successo nella creazione del dominio e del record`});
                }
            });
        }
    });
});

module.exports = router;