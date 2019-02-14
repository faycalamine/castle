'use strict'

const puppeteer = require('puppeteer')
async function run() {


       console.dir('**********')
       console.dir('start reuperation restaurant etoilé michelin')
       console.dir('**********')
        
        const browser1 = await puppeteer.launch()
        const page1 = await browser1.newPage()
        await page1.goto('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-1')
        let liste_restaurant_michelin = [];
        let liste_score = [];
        for(var j=1;j<=35;j++)
        {   await page1.newPage;
            await  page1.goto('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+j.toString());
            
            
            let name = await page1.evaluate(() => {
            var data=[];
            
            for(var i=1;i<=18;i++)
            {
               if(document.querySelector('#panels-content-main-leftwrapper > div.panel-panel.panels-content-main-left > div > div > ul > li:nth-child('+i.toString()+') > div > a > div.poi_card-details > div.poi_card-description > div.poi_card-display-title')!=null)
               {
             data.push(  document.querySelector('#panels-content-main-leftwrapper > div.panel-panel.panels-content-main-left > div > div > ul > li:nth-child('+i.toString()+') > div > a > div.poi_card-details > div.poi_card-description > div.poi_card-display-title').innerText);
               
            }}
            
            
            return data;

            });



            for(var i=0;i<name.length;i++)
            {
                liste_restaurant_michelin.push({"name":name[i]});
            }
            
            
        }
       
             browser1.close()

             var fs = require('fs');
            fs.writeFile("./restaurant_michelin.json", JSON.stringify(liste_restaurant_michelin, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created (restaurant_michelin.json)");
            });
}

run();  