var data = {
  "rss_url": 'https://recalls-rappels.canada.ca/en/feed/cfia-alerts-recalls',
  "api_key": '' // put your api key here
}

fetch('https://api.rss2json.com/v1/api.json?rss_url=' + data["rss_url"]+ "&api_key=" + data["api_key"])
  .then(response => response.json())
  .then(data => {
      writeData(data.items);
      console.log(data.items);
    });

function writeData(data) {
  // var dataRef = db.collection("data");
  for(i=0;i<data.length;i++) {
    data.setId(data[i]["guid"]);
    data.setTitle(data[i]["title"]);
    data.setPubDate(data[i]["pubDate"]);
    data.setUrl(data[i]["link"]);
  }
}

const data = {
  id : "id",
  title : "title",
  pubDate : "pubDate",
  url : "url",
  set setId(id) {
    this.id = id;
  },
  set setTitle(title) {
    this.title = title;
  },
  set setPubDate(pubDate) {
    this.pubDate = pubDate;
  },
  set setUrl(url) {
    this.url = url;
  },
  get getTitle() {
    return this.title;
  },
  get getId() {
    return this.id;
  },
  get getPubDate() {
    return this.pubDate;
  },
  get getUrl() {
    return this.url;
  }
}