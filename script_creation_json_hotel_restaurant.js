'use strict'

const puppeteer = require('puppeteer')
async function run() {

 const browser = await puppeteer.launch()
 const page = await browser.newPage()

 await page.goto('https://www.relaischateaux.com/fr/site-map/etablissements')
console.dir('start recuperation url')
    let liste_url = await page.evaluate(() => {
    var data = [];
    for(var i=2;i<=150;i++)
    {
        var a = document.querySelector('#countryF > ul > li:nth-child('+i.toString()+') > a:nth-child(1)').href
        data.push(a);
    }
   
    return data;
    
});
console.dir('url chargées');
console.dir(liste_url);
let liste_hotel_restaurant = await page.evaluate(() => {
    let data = [];
    var datab=['#countryF > ul > li:nth-child(2) > a:nth-child(1)','#countryF > ul > li:nth-child(3) > a:nth-child(1)','#countryF > ul > li:nth-child(4) > a:nth-child(1)'];

    for( var i=2;i<=150;i++)
    {
      data.push(document.querySelector('#countryF > ul > li:nth-child('+i.toString()+') > a:nth-child(1)').innerText);
    }
    return data;
    
});
console.dir('hotel_restaurant_recupéres')

console.dir(liste_hotel_restaurant.length)

        let prices = [];
        let first_rubric=[];
        let second_rubric=[];
        let is_hotel_and_restaurant = [];
        let reviews=[];

    for(var i=0;i<=148;i++)
    {
        await page.newPage;
        var fail = true;
        var tentatives=1;
        //await  page.goto(liste_url[i]);
        while(fail == true)
        {
        await page.goto(liste_url[i], {waitUntil: 'load', timeout: 5000}).then(() => {
            console.log('page "'+liste_url[i]+'" chargée');
            fail=false;
            
        }).catch((res) => {
            console.log('TENTATIVE '+tentatives.toString()+' fails page: '+liste_url[i], res);
            tentatives++;
        })
        }
        if(fail==false)
        {
        let get_price = await page.evaluate(() => {
       
            if(document.querySelector('.price')!= null)
            {
                
            return document.querySelector('.price').innerText;
            }
            return 'unknow';
        });
        let get_first_rubric = await page.evaluate(() => {
       
            if(document.querySelector('body > div.jsSecondNav.will-stick > ul > li.active > a > span')!= null)
            {
                
            return document.querySelector('body > div.jsSecondNav.will-stick > ul > li.active > a > span').innerText;
            }
            return 0;
        });
        let get_second_rubric = await page.evaluate(() => {
       
            if(document.querySelector('body > div.jsSecondNav.will-stick > ul > li:nth-child(2) > a > span')!= null)
            {
                
            return document.querySelector('body > div.jsSecondNav.will-stick > ul > li:nth-child(2) > a > span').innerText;
            ;
            }
            return 0;
        });     
        let get_review = await page.evaluate(() => {
       
            if(document.querySelector('div.tripAdvisorRating > img')!= null)
            {
                
            return document.querySelector('div.tripAdvisorRating > img').title;
            
            }
            return 0;
        });   
        
        prices.push(get_price)
        reviews.push(get_review)
        first_rubric.push(get_first_rubric)
        second_rubric.push(get_second_rubric)
        if(first_rubric[i]=='Hôtel' && second_rubric[i]=="Restaurant")
        {
            is_hotel_and_restaurant.push("yes")
        }
        else
        {
            is_hotel_and_restaurant.push("no")
        }
        console.dir((i+1).toString()+ ', name :'+liste_hotel_restaurant[i]+', price: '+get_price+', review: '+reviews[i]+', is hotel & restaurant: '+is_hotel_and_restaurant[i]);
    }
 
    } 
    browser.close()

    var file_json = [];
    for(var i=0;i<liste_hotel_restaurant.length;i++)
    {
        if(is_hotel_and_restaurant[i]=="yes")
        {
        file_json.push({"name":liste_hotel_restaurant[i], "price":prices[i],"review":reviews[i], "lien": liste_url[i]})
        }
    }

    var fs = require('fs');
    fs.writeFile("./hotel_restaurant.json", JSON.stringify(file_json, null, 4), (err) => {
  if (err) {
      console.error(err);
      return;
  };
  console.log("File has been created (hotel_restaurant.json)");
});

 
}

run();  

