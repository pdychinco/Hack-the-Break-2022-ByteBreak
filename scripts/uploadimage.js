var storageRef = firebase.storage().ref();

function uploadImage(event){
  var file = event.target.files[0];

  return storageRef.put(file).then(function(snapshot) {
    // put the file now do something...
    var fullPath = snapshot.metadata.fullPath;
    console.log(fullPath);
  }).catch(function(error){
    console.log("error uploading "+error);
  });
}

function retrieveImage(imageUri, imgElement){
  if (imageUri.startsWith('gs://')) {
    storageRef.refFromURL(imageUri).getMetadata().then(function(metadata) {
      imgElement.src = metadata.downloadURLs[0];
      console.log("URL is "+metadata.downloadURLs[0]);
    }).catch(function(error){
      console.log("error downloading "+error);
    });
  }
}