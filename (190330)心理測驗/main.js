$(document).ready(function(){
    // 建立currentQuiz，儲存目前作答到第幾題
    var currentQuiz = null;
    
    // 按下"開始作答"(或是"Next")按鈕時執行
    $("#startButton").click(function(){
        if(currentQuiz == null){
            currentQuiz = 0;
            $("#question").text(questions[0].question);
            $("#options").empty();
            for(var i=0 ; i<questions[0].answers.length ; i++){
                $("#options").append("<input type='radio' name='options' value=" + i +">" + "<label>" + questions[0].answers[i][0] + "</label><br><br>");
            }
            $("#startButton").attr("value", "Next");
        }else{
            // 巡訪每個選項是否有被選取
            $.each($(":radio"), function(i, val){
                if(val.checked){
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        var finalResult = questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);
                        $("#options").empty();
                        $("#options").append(finalAnswers[finalResult][1] + "<br><br>");
                        currentQuiz = null;
                        $("#startButton").attr("value", "重新開始");
                    }else{
                        currentQuiz = questions[currentQuiz].answers[i][1] - 1;
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        for(var i=0 ; i<questions[currentQuiz].answers.length ; i++){
                            $("#options").append("<input type='radio' name='options' value=" + i +">" + "<label>" + questions[currentQuiz].answers[i][0] + "</label><br><br>");
                        }
                    }
                    return false;
                }
            })
        }
    });
});