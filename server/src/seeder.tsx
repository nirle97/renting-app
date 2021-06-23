import axios from "axios";

const a =  [{
"likedBy" : [
],
"disLikedBy" : [ ],
"images" : [
        "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
        "https://empire-s3-production.bobvila.com/pages/538/original/Bedroom.jpg?1310503752"
],
"city" : "Tel-aviv",
"pricePerMonth" : 5000,
},
{
"likedBy" : [
        
],
"disLikedBy" : [

],
"images" : [
        "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
        "https://pix10.agoda.net/hotelImages/729/729973/729973_14093014460022501058.jpg?s=1024x768"
],
"city" : "Tel-aviv",
"pricePerMonth" : 3000,
},
{
"likedBy" : [ ],
"disLikedBy" : [ ],
"images": [
        "https://m.foolcdn.com/media/millionacres/original_images/image2_mdDMemJ.jpg?crop=4:3,smart",
        "https://mb.cision.com/Public/15507/2751657/8c6f7f913f5a3465_800x800ar.jpg"
],
"city" : "Tel-aviv",
"pricePerMonth" : 2000,
},
{
"likedBy" : [ ],
"disLikedBy" : [ ],
"images" : [
        "https://i.pinimg.com/originals/38/d7/5b/38d75b985d9d08ce0959201f8198f405.jpg",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/decorating-with-antiques-peter-dunham-living-room-1582736365.png"
],
"city": "Tel-aviv",
"pricePerMonth" : 7000,
},
{
"likedBy" : [ ],
"disLikedBy" : [ ],
"images" : [
        "https://www.huf-haus.com/fileadmin/Bilder/Objektbau/Ebenholz/Projekt_5/HUF_HAUS_Buerogebaude__11_.jpg",
        "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
],
"city" : "Tel-aviv",
"pricePerMonth" : 8500,
},
{
"likedBy" : [ ],
"disLikedBy" : [ ],
"images" : [
        "https://static01.nyt.com/images/2020/01/05/fashion/04HYPEHOUSE-15/merlin_166520088_7d6a63d1-f022-4c43-8035-6027779de53f-mobileMasterAt3x.jpg",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/small-living-rooms-bungalow-etna-nook-029-1608661123.jpg"
],
"city": "Tel-aviv",
"pricePerMonth" : 9000,
}]
a.map(async (apt) => {
        axios.post("lochalhost:8080/apartment/create",apt);

})