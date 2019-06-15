/*window.onload=function(){
    document.write("Hello JavaScript!");
};*/

$(document).ready(function(){ // => $(document)表示等整份文件載入完成後再選擇
    $("input").click(function(){
        //$("H1").text($("#theFirst > li:eq(1)").text());
        var numberOf_theFirstListItem = $("#theFirst > li").length;
        console.log('numberOf_theFirstListItem = '+numberOf_theFirstListItem);
        var randomNum = Math.floor(Math.random()*numberOf_theFirstListItem);
        console.log('randomNum = '+randomNum);
        
        $("H1").text($("#theFirst > li").eq(randomNum).text());
        switch(randomNum){
            case 0:
                $("#foodImg > p").html("<img src=\"(190316)RandomSelector\/pic\/b1.png\">");
                break;
            case 1:
                $("#foodImg > p").html("<img src=\"(190316)RandomSelector\/pic\/x1.jpg\">");
                break;
            case 2:
                $("#foodImg > p").html("<img src=\"(190316)RandomSelector\/pic\/l1.jpg\">");
                break;     
            default:
                break;
        }
    });
});