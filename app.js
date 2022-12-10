//The URIs of the REST endpoint
IUPS = "https://prod-45.northeurope.logic.azure.com:443/workflows/5faa41ee76524f9d829cca52744fff9f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=czN0CZu8OkCAGjVvKs7OAGCb3EzQ_iwPUPWRB4TILBQ";

RAI = "https://prod-50.northeurope.logic.azure.com:443/workflows/099703811f3c4e8bbe28e7f5cc9d1f13/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kyXVRMFI86o1VTWZj6Fmw_skV27QPcFJkHvJtyiWAqI";

BLOB_ACCOUNT = "https://storageb00779706.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  });
  
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

  submitData = new FormData();

//Get form variables and append them to the form data object 
submitData.append('FileName', $('#FileName').val()); 
submitData.append('userID', $('#userID').val()); 
submitData.append('userName', $('#userName').val()); 
submitData.append('File', $("#UpFile")[0].files[0]);

//Post the form data to the endpoint, note the need to set the content type header
$.ajax({
url: IUPS,
data: submitData, cache: false,
enctype: 'multipart/form-data', contentType: false, processData: false,
type: 'POST',
success: function(data){

}
});


}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){

  
//Replace the current HTML in that div with a loading message
$('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');


$.getJSON(RAI, function( data ) {


//Create an array to hold all the retrieved assets 
var items = [];

//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
$.each( data, function( key, val ) {
  items.push( "<hr />");
  items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />") 
  items.push( "File : " + val["fileName"] + "<br />");
  items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />"); 
  items.push( "<hr />");
  items.push("<video width='400' height='300' controls>")
  items.push("<source src='"+BLOB_ACCOUNT + val["filePath"] +"' <br />")
  items.push("</video>")
  items.push(" <br/>")
});


//Clear the assetlist div
$('#VideoList').empty();


//Append the contents of the items array to the ImageList Div
$( "<ul/>", {
"class": "my-new-list",
html: items.join( "" )
}).appendTo( "#VideoList" );
});

 
}

