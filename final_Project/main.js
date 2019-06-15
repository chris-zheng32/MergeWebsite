var ctx;
var timeInterval = 700;

var gameStatus = 0; // 0: 一開始，1: 遊戲中
var playStyle = 0; // 遊戲樣式。 0:未選擇，3:3排，5:5排
var playMode = 0; // 遊戲模式。 0:未選擇，1:閃躲模式，2:用臉接模式
//var essentialGridPosition = 
var playerGridPosition = [0, 0, 1, 0, 0]; // 紀錄玩家格子的位置
var indexOfPlayerPosition = 2; // 玩家格子在最後一排的位置index

var rowIndexOfEssentialGrid = new Array(35);
var columnIndexOfEssentialGrid = new Array(35);

var essentialGridNumberStart = 0;
var essentialGridNumberFinal = 0;
var essentialGridAmount = 0;
var theNextOneEssential = 1;

var remainLive = 10;
var currentScore = 0;
var currentLevel = 1;
var highScore = 0;

var gaming;
var gameoverAnime;

var gameoverAnimeStatus = 0;
var gameoverString = ['G', 'A', 'M', 'E', 'O', 'V', 'E', 'R'];
var indexOfGameoverString = 0;

var theColor = {
    green: '#00FF00',
    yellow: '#FFFF00',
    red: '#FF0000',
    black: '#000000',
    white: '#FFFFFF'
}

var playerColor = theColor.green;

$(document).ready(function () {
    ctx = $("#myCanvas")[0].getContext('2d');
    ctx.font = "15pt Arial";
    ctx.fillStyle = theColor.black;
    ctx.fillText("Press SPACE to restart", 120, 300);
    //InGame();
});

$(document).keydown(function (event) {
    event.preventDefault();
    if (gameStatus == 1) {
        switch (event.which) {
            case 65: // 左
                if (playStyle == 3) {
                    indexOfPlayerPosition--;
                    if (indexOfPlayerPosition < 1) {
                        indexOfPlayerPosition = 1;
                    }
                } else {
                    indexOfPlayerPosition--;
                    if (indexOfPlayerPosition < 0) {
                        indexOfPlayerPosition = 0;
                    }
                }
                ctx.beginPath();
                ctx.rect((0 + 90 * indexOfPlayerPosition), 540, 90, 90);
                ctx.fillStyle = playerColor;
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.rect((0 + 90 * (indexOfPlayerPosition + 1)), 540, 90, 90);
                ctx.fillStyle = '#FFFFFF';
                ctx.fill();
                ctx.closePath();
                playerGridPosition[indexOfPlayerPosition] = 1;
                playerGridPosition[indexOfPlayerPosition + 1] = 0;
                break;
            case 68: // 右
                if (playStyle == 3) {
                    indexOfPlayerPosition++;
                    if (indexOfPlayerPosition > 3) {
                        indexOfPlayerPosition = 3;
                    }
                } else {
                    indexOfPlayerPosition++;
                    if (indexOfPlayerPosition > 4) {
                        indexOfPlayerPosition = 4;
                    }
                }
                ctx.beginPath();
                ctx.rect((0 + 90 * indexOfPlayerPosition), 540, 90, 90);
                ctx.fillStyle = playerColor;
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.rect((0 + 90 * (indexOfPlayerPosition - 1)), 540, 90, 90);
                ctx.fillStyle = '#FFFFFF';
                ctx.fill();
                ctx.closePath();
                playerGridPosition[indexOfPlayerPosition] = 1;
                playerGridPosition[indexOfPlayerPosition - 1] = 0;
                break;
        }
    } else if (gameStatus == 0) {
        switch (event.which) {
            case 32:
                $.each($(":radio"), function (i, val) {

                    if (val.checked) {
                        if (i == 0) {
                            playStyle = 3;
                        } else if (i == 1) {
                            playStyle = 5;
                        }
                        if (i == 2) {
                            playMode = 1;
                        } else if (i == 3) {
                            playMode = 2;
                        }
                        console.log('val:' + i);
                    }
                });
                if (playStyle == 0 && playMode == 0) {
                    alert("請先選擇遊戲樣式與模式");
                } else if (playStyle == 0 && playMode != 0) {
                    alert("請先選擇遊戲樣式");
                } else if (playStyle != 0 && playMode == 0) {
                    alert("請先選擇遊戲模式");
                } else {
                    gameStatus = 1;
                    timeInterval = 700;
                    playerGridPosition = [0, 0, 1, 0, 0];
                    indexOfPlayerPosition = 2;
                    essentialGridNumberStart = 0;
                    essentialGridNumberFinal = 0;
                    essentialGridAmount = 0;
                    theNextOneEssential = 1;
                    remainLive = 10;
                    currentScore = 0;
                    currentLevel = 1;
                    gameoverAnimeStatus = 0;
                    indexOfGameoverString = 0;
                    playerColor = theColor.green;
                    InGame();
                }
                break;
        }
    }
});

function InGame() {
    ctx.beginPath();
    ctx.rect(0, 0, 450, 630);
    ctx.fillStyle = theColor.white;
    ctx.fill();
    ctx.closePath();
    gaming = setInterval(executing, timeInterval);
}

function executing() {
    //ctx.clearRect(0, 0, ctx.width, ctx.height);
    console.log('remainLive:' + remainLive);
    if (playMode == 1) {
        currentScore++;
    };
    console.log("Score:" + currentScore);
    if (remainLive < 7 && remainLive > 3) {
        playerColor = theColor.yellow;
    } else if (remainLive <= 3) {
        playerColor = theColor.red;
    }
    if (theNextOneEssential % 3 != 0) {
        columnIndexOfEssentialGrid[essentialGridNumberFinal] = Math.floor(Math.random() * (playStyle + 1));
        rowIndexOfEssentialGrid[essentialGridNumberFinal] = 0;
        if (playStyle == 3) {
            if (columnIndexOfEssentialGrid[essentialGridNumberFinal] == 0) {
                theNextOneEssential = 1;
            } else {
                if (essentialGridNumberFinal != 34) {
                    essentialGridNumberFinal++;
                } else {
                    essentialGridNumberFinal = 0;
                }
                essentialGridAmount++;
                theNextOneEssential++;
            }
        } else if (playStyle == 5) {
            if (columnIndexOfEssentialGrid[essentialGridNumberFinal] == 5) {
                theNextOneEssential = 1;
            } else {
                if (essentialGridNumberFinal != 34) {
                    essentialGridNumberFinal++;
                } else {
                    essentialGridNumberFinal = 0;
                }
                essentialGridAmount++;
                theNextOneEssential++;
            }
        }
    } else if (theNextOneEssential % 3 == 0) {
        theNextOneEssential = 1;
    }

    if (essentialGridNumberFinal < essentialGridNumberStart) {
        tempFinal = essentialGridNumberStart + essentialGridAmount;
    } else {
        tempFinal = essentialGridNumberFinal;
    }

    for (var i = essentialGridNumberStart; i < tempFinal; i++) {
        var index = i;
        if (i > 34) {
            index = i - 35;
        }

        if (rowIndexOfEssentialGrid[index] != 7) {
            ctx.beginPath();
            ctx.rect((0 + 90 * columnIndexOfEssentialGrid[index]), (0 + 90 * rowIndexOfEssentialGrid[index]), 90, 90);
            ctx.fillStyle = '#000000';
            ctx.fill();
            ctx.closePath();
        }
        if (rowIndexOfEssentialGrid[index] != 0) {
            ctx.beginPath();
            ctx.rect((0 + 90 * (columnIndexOfEssentialGrid[index])), (0 + 90 * (rowIndexOfEssentialGrid[index] - 1)), 90, 90);
            ctx.fillStyle = theColor.white;
            ctx.fill();
            ctx.closePath();
        }
        if (rowIndexOfEssentialGrid[index] == 6) {
            var overlappingResult = isOverlapping(index);
            if (playMode == 1) {
                if (overlappingResult == 1) {
                    remainLive--;
                    console.log("remainLive:" + remainLive);
                }
            } else if (playMode == 2) {
                if (overlappingResult == 0) {
                    remainLive--;
                } else if (overlappingResult == 1) {
                    currentScore++;
                }
            }
        }
        if (rowIndexOfEssentialGrid[index] == 7) {
            essentialGridAmount--;
            if (essentialGridNumberStart != 34) {
                essentialGridNumberStart++;
            } else {
                essentialGridNumberStart = 0;
            }

            rowIndexOfEssentialGrid[index] = 0;
            columnIndexOfEssentialGrid[index] = 0;
        }
        rowIndexOfEssentialGrid[index]++;
        ctx.beginPath();
        ctx.rect((0 + 90 * indexOfPlayerPosition), 540, 90, 90);
        ctx.fillStyle = playerColor;
        ctx.fill();
        ctx.closePath();
        $("#theScore").text("Score: " + currentScore);
        $("#remainLive").text("Remain Live: " + remainLive);
        if (remainLive == 0) {
            var snd = new Audio("final_Project/sound_effect/destruction1.mp3");
            snd.play();
            ctx.beginPath();
            ctx.rect(0, 0, 450, 630);
            ctx.fillStyle = theColor.black;
            ctx.fill();
            ctx.closePath();
            ctx.font = "30pt fantasy";
            ctx.fillStyle = theColor.red;
            ctx.fillText("GAME OVER", 135, 300);
            ctx.font = "15pt Arial";
            ctx.fillStyle = theColor.white;
            ctx.fillText("Press SPACE to restart", 120, 350);
            gameStatus = 0;
            if(highScore < currentScore){
                highScore = currentScore;
                setTimeout(function(){
                    var snd2 = new Audio("final_Project/sound_effect/cheers2.mp3");
                    snd2.play();
                }, 500);
                $("#theHighScore").text("High Score: "+highScore);
            }
            clearInterval(gaming);
        }
        if (currentScore == 30 * currentLevel && currentLevel < 4) {
            currentLevel++;
            clearInterval(gaming);
            timeInterval /= 2;
            InGame();
        }
    }
}

function isOverlapping(index) {
    var result = 0; // 0: 沒重疊，1:重疊
    if (playerGridPosition[columnIndexOfEssentialGrid[index]] == 1) {
        result = 1;
        if (playMode == 1) {
            var snd = new Audio("final_Project/sound_effect/bomb.mp3");
            snd.play();
        } else if (playMode == 2) {
            var snd;
            switch (columnIndexOfEssentialGrid[index]) {
                case 0:
                    snd = new Audio("final_Project/sound_effect/pianoC.mp3");
                    break;
                case 1:
                    snd = new Audio("final_Project/sound_effect/pianoD.mp3");
                    break;
                case 2:
                    snd = new Audio("final_Project/sound_effect/pianoE.mp3");
                    break;
                case 3:
                    snd = new Audio("final_Project/sound_effect/pianoF.mp3");
                    break;
                case 4:
                    snd = new Audio("final_Project/sound_effect/pianoG.mp3");
                    break;
            }
            snd.play();
        }
    } else {
        result = 0;
        if(playMode == 2){
            var snd = new Audio("final_Project/sound_effect/damage4.mp3");
            snd.play();
        }
    }
    console.log("isOverlapping:" + result);
    return result;
}