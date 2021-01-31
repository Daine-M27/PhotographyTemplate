$(document).ready(function() {   
    console.log('editGallery.js')
    
    $("div.deleteContainer > button.delete.btn.p-0.m-0").click(function (){
        deleteImage($(this).attr('data-folder'), $(this).attr('data-image'));
    })    
})



function deleteImage(folderName, imageName){
    $.ajax({
        url : '/manage/edit/delete',
        type : 'Delete',
        data : {
            'folderName' : folderName,
            'imageName' : imageName
        },
        dataType:'text',
        success: function(data){
            document.getElementById(imageName).remove();
            alert(data)
        }
        // error : function(request,error)
        // {
        //     alert("Request: "+JSON.stringify(request));
        // }
    });
}