/*window.onload=function(){
    document.write("Hello JavaScript!");
};*/

$(document).ready(function(){
    var theDate;
    
    $("#courseTable").append("<tr id=\"theClubCourseTable\"><th>場次</th><th>時間</th><th>主題</th></tr>");
    var secondUnit = 1000;
    var minuteUnit = secondUnit * 60;
    var hourUnit = minuteUnit * 60;
    var dayUnit = hourUnit * 24;
    
    var topicCount = topic.length;
    for(var x = 0; x < topicCount ; x++){
        $("#courseTable").append("<tr>");
        $("#courseTable").append("<td>" + (x+1) + "</td>");
        $("#courseTable").append("<td id=\"startTime"+(x+1)+"\"></td>");
        $("#courseTable").append("<td>" + topic[x] + "</td>");
        $("#courseTable").append("</tr>");
    }
    
    $("#submitButton").click(function(){
        //$("H1").text($("#theFirst > li:eq(1)").text());
        theDate = setMonthAndDay($("#Month").val(), $("#Day").val());
        //console.log($("input[name=\"Month\"]").val()+' '+ $("input[name=\"Day\"]").val());
        console.log(theDate);
        $("#textBlock>p").text(theDate);
        
        for(var x = 0; x < topicCount ; x++){
            $("#courseTable td[id *= 'startTime']").eq(x).text((new Date(theDate.getTime()+x*7*dayUnit)).toLocaleDateString());
        }
        
    });
    
    $("#addNewActivity").click(function(){
        newActivity = $("#NewActivity").val();
        topic[topicCount] = newActivity;
        console.log(topic);
        console.log(topicCount);
        topicCount = topic.length;
        $("#courseTable").append("<tr>");
        $("#courseTable").append("<td>" + (topicCount) + "</td>");
        $("#courseTable").append("<td id=\"startTime"+(topicCount)+"\"></td>");
        $("#courseTable").append("<td>" + topic[topicCount-1] + "</td>");
        $("#courseTable").append("</tr>");
    });
});