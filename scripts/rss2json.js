var param = {
  "rss_url": 'https://recalls-rappels.canada.ca/en/feed/cfia-alerts-recalls',
  "api_key": 'ocxzfck22k5yq4crbesblxvvbibmfu6lrzqyy2zu', // put your api key here
  "order_dir": 'asc'
}

var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth();
var day = currentDate.getDate();


fetch('https://api.rss2json.com/v1/api.json?rss_url=' + param["rss_url"]+ "&api_key=" + param["api_key"]+"&order_dir=" +param["order_dir"])
  .then(response => response.json())
  .then(data => {
    console.log(data.items);
      writeData(data.items);
    });

// currently keeps saving duplicates
async function writeData(data) {
  var dataRef = db.collection("recallList");
  
  for(i=0;i<data.length;i++) {
    let recentDate = await latestDate();
    let pubDay = data[i]["pubDate"].split(" ")[0].split("-")[2];
    if(pubDay > recentDate) {
      dataRef.add({
        id: data[i]["guid"],
        title: data[i]["title"],
        pubDate: data[i]["pubDate"],
        context: data[i]["context"],
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
  db.collection("recallList").get()
  .then(snap => {
    snap.forEach(doc => {
  var title = doc.data().title;   // get value of the "title" key
  var pubDate = doc.data().pubDate;   // get value of the "pubDate" key
  var url = doc.data().url;// get value of the "url" key
  var context = doc.data().context;// get value of the "context" key
  
  
  //update title and text and image
  document.querySelector('#title').innerHTML = title;
  document.querySelector('#date').innerHTML = pubDate;
  document.querySelector('#url').href = url;
  document.querySelector('#context').innerHTML = context;
  
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