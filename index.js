var fs = require('fs');
var liste_hotel_restaurant = JSON.parse(fs.readFileSync('hotel_restaurant.json', 'utf8'));
var liste_michelin = JSON.parse(fs.readFileSync('restaurant_michelin.json', 'utf8'));
var couple_hotel_restaurant_etoile = [];


for(var i=0;i<=128;i++)
{
    
    for(var j=0;j<=625;j++)
    {
        if(traitement( liste_hotel_restaurant[i]['name']) == traitement( liste_michelin[j]['name']) )
        {
            couple_hotel_restaurant_etoile.push( {"name":liste_hotel_restaurant[i]['name'], "price":liste_hotel_restaurant[i]['price'], "lien":liste_hotel_restaurant[i]['lien'] })
        }
    }
}

var fs = require('fs');
    fs.writeFile("./finale-liste.json", JSON.stringify(couple_hotel_restaurant_etoile, null, 4), (err) => {
  if (err) {
      console.error(err);
      return;
  };
  console.log("File has been created (finale-liste.json)");
});

function traitement( phrase )
{
    var new_phrase='';
    phrase = phrase.toLowerCase();
    for(var i=0;i<phrase.length;i++)
    {
        var  compteur=0; 
        if(phrase[i]=='î' )
        {
            new_phrase = new_phrase+'i';compteur++;
            
        }
        if(phrase[i]=='ç' )
        {
            new_phrase = new_phrase+'c';compteur++;
            
        }
        if(phrase[i]=='à' || phrase[i]=='â')
        {
            new_phrase = new_phrase+'a';compteur++;
            
        }
        if(phrase[i]=='é' || phrase[i]=='è')
        {
            new_phrase = new_phrase+'e';compteur++;
            
        }
        if(phrase[i]==' ' || phrase[i]=='/' || phrase[i]=='' )
        {
            new_phrase = new_phrase+'';compteur++;
        }  
        if(compteur==0)
        {
            new_phrase = new_phrase+phrase[i];
        }
    }
    return new_phrase;
}

var http = require('http');
generate_html();
http.createServer(function(req, res) {  
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<!DOCTYPE html><html><head><style>table {  border-collapse: collapse;  width: 100%;} th, td {  text-align: left;  padding: 8px;} tr:nth-child(even){background-color: #f2f2f2} th {  background-color: #4CAF50;  color: white;} </style></head><body><h2>List of Hotels with a restaurant ranked in the "Guide Michelin 2019</h2><table><tr><th>Name</th><th>Price</th><th>Url Link</th></tr>'+generate_html()+'</table></body></html>');
  res.end();
}).listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888');

function generate_html()
{ 
  var chaine="";
  for(var i=0;i<couple_hotel_restaurant_etoile.length;i++)
  {
    chaine=chaine+'<tr><th>'+couple_hotel_restaurant_etoile[i]["name"]+'</th><th>'+ couple_hotel_restaurant_etoile[i]["price"]+'</th><th><a href="'+couple_hotel_restaurant_etoile[i]["lien"]+'">Link</a></th></tr>';
  }
  return chaine;
}