// write jquery to handle loading images for edit gallery panel
// on folder select 
// pull image thumbnails and order data
// render each image in order with controls for delete
// add drag and drop for order and delete



$(document).ready(function() {
    // run function on page load to set initial select position options
    var firstFolder = document.querySelector("#uploadFolderSelect > option:nth-child(1)").value
    var galleryData = getGallerylengths()    
    updateOrderSelector(galleryData[firstFolder])

    // modify based on length of gallery supplied
    function updateOrderSelector(galleryLength) {
        var domElement = $("#uploadOrderSelect")
        domElement.empty();    
    
        for (let i = 1; i <= galleryLength+1; i++) {
            domElement.append(`<option value=${i}>${i}</option>`)     
        }    
    }

    // get the length of each gallery and return and object
    function getGallerylengths(){
        var data = document.getElementById("orderValues").value
        // get value from page to give to updateOrderSelector funciton
        var values = JSON.parse(data)
        return values
    }    

    // run function each time a change is made to update select options pull down
    $("#uploadFolderSelect").change(function (){
        var data = getGallerylengths()
        var selection = document.getElementById("uploadFolderSelect").value
        // var data = document.getElementById("orderValues").value
        // // get value from page to give to updateOrderSelector funciton
        // var values = JSON.parse(data)

        updateOrderSelector(data[selection])
        console.log('updated');
    })    
})



