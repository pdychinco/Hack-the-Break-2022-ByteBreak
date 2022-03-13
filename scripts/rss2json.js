var param = {
  "rss_url": 'https://recalls-rappels.canada.ca/en/feed/cfia-alerts-recalls',
  "api_key": '' // put your api key here
}

fetch('https://api.rss2json.com/v1/api.json?rss_url=' + param["rss_url"]+ "&api_key=" + param["api_key"])
  .then(response => response.json())
  .then(data => {
    console.log(data.items);
      // writeData(data.items);
      
    });

// currently keeps saving duplicates
function writeData(data) {
  var dataRef = db.collection("data");
  
  for(i=0;i<data.length;i++) {
    if(data[i]["guid"] > largestIdCheck()) {
      dataRef.add({
        id: data[i]["guid"],
        title: data[i]["title"],
        pubDate: data[i]["pubDate"],
        url: data[i]["link"]
      });
    }else {
      continue;
    }
  }
}

function largestIdCheck() {
  let largestId = 0;
  db.collection("data").get()
    .then(snap => {
      snap.forEach(doc => {
        if(doc.data().id > largestId) {
          largestId = doc.data().id;
        }
      })
    })
    return largestId;
}

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

