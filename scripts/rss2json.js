import { API_KEYS } from "./apikey.js";

var param = {
  "rss_url": 'https://recalls-rappels.canada.ca/en/feed/cfia-alerts-recalls',
  "api_key": API_KEYS["rss"], // put your api key here
  "order_dir": 'asc'
}



fetch('https://api.rss2json.com/v1/api.json?rss_url=' + param["rss_url"]+ "&api_key=" + param["api_key"]+"&order_dir=" +param["order_dir"])
  .then(response => response.json())
  .then(data => {
    console.log(data.items);
      writeData(data.items);
    });

// currently keeps saving duplicates
async function writeData(data) {
  var dataRef = db.collection("recallList");
  
  for(let i=0;i<data.length;i++) {
    let recentDate = await latestDate();
    let pubDay = data[i]["pubDate"].split(" ")[0].split("-")[2];
    if(pubDay > recentDate) {
      dataRef.add({
        id: data[i]["guid"],
        title: data[i]["title"],
        pubDate: data[i]["pubDate"].split(" ")[0],
        content: data[i]["content"],
        url: data[i]["link"]
      });
    }
  }
}

async function latestDate() {
  let newestDay = 0;
  await db.collection("recallList").get()
    .then(snap => {
      snap.docs.forEach(doc => {
        if(doc.data().pubDate.split(" ")[0].split("-")[2] > newestDay) {
          newestDay = doc.data().pubDate.split(" ")[0].split("-")[2];
        }
      })
    })
    return newestDay;
}


function renderRecallList() {
  let cardTemplate = document.getElementById("cardTemplate");
  db.collection("recallList").get()
  .then(snap => {
      snap.forEach(doc => { //iterate thru each doc
        var title = doc.data().title;   // get value of the "title" key
        var pubDate = doc.data().pubDate;   // get value of the "pubDate" key
        var url = doc.data().url;// get value of the "url" key
        var content = doc.data().content;// get value of the "context" key
        let newcard = cardTemplate.content.cloneNode(true);

        //update title and date and url and content
        newcard.querySelector('#title').innerHTML = title;
        newcard.querySelector('#date').innerHTML = pubDate;
        newcard.querySelector('#url').href = url;
        newcard.querySelector('#content').innerHTML = content;

        //attach to gallery
        document.getElementById("recallList-go-here").appendChild(newcard);
    })
  });
}

renderRecallList();
// const info = {
//   id : "id",
//   title : "title",
//   pubDate : "pubDate",
//   url : "url",
//   /**
//    * @param {(arg0: any) => void} id
//    */
//   set setId(id) {
//     this.id = id;
//   },
//   set setTitle(title) {
//     this.title = title;
//   },
//   set setPubDate(pubDate) {
//     this.pubDate = pubDate;
//   },
//   set setUrl(url) {
//     this.url = url;
//   },
//   get getTitle() {
//     return this.title;
//   },
//   get getId() {
//     return this.id;
//   },
//   get getPubDate() {
//     return this.pubDate;
//   },
//   get getUrl() {
//     return this.url;
//   }
// }