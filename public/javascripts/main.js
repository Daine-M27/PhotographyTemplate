$(document).ready(function(){
    // $("#mainSlide").attr("src", )

    $("button").click(function(){
        var source = $(this).children("img").attr("src")

        $("#mainSlide").attr("src", source)
    })
})