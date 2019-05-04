var player; //Youtube播放器
var currentPlay = 0; //記錄目前播到第幾首歌

//當YouTube API準備好時(由YouTube那邊執行)(這個function名稱不能改)
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player",
        {
            height: "390",
            width: "640",
            videoId: playList[currentPlay],
            playerVars:{
                "autoplay": 0, //是否自動播放
                "controls": 1, //是否顯示控制項
                "start": playTime[currentPlay][0], //開始播放秒數
                "end": playTime[currentPlay][1], //結束播放秒數
                "showinfo": 0, //上方是否顯示影片標題
                "rel": 0, //結束時是否顯示相關影片
                "iv_load_policy": 3 //是否顯示置入的行銷連結
            },
            events:{
                "onReady": onPlayerReady, //下方的function名稱
                "onStateChange": onPlayerStateChange, //下方的function名稱
            }
        }
    );
}

//當YouTube播放器準備好時(由YouTube那邊執行)(這個function名稱可以改)
function onPlayerReady(event){
    $("#playButton").click(function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

//當播放器播放狀態改變時(由YouTube那邊執行)(這個function名稱可以改)
function onPlayerStateChange(event){
    console.log("PlayerStateChange: " + event.data + " , currentPlay: " + currentPlay);
    //當播放結束時
    if(event.data == 0 && (Math.floor(player.getCurrentTime())==playTime[currentPlay][1])){ //如果還沒播到最後一首，就去播下一首
        if(currentPlay < (playList.length - 1)){
            currentPlay++;
            player.loadVideoById({
                "videoId": playList[currentPlay],
                "startSeconds": playTime[currentPlay][0],
                "endSeconds": playTime[currentPlay][1],
                "suggestedQuality": "large"
            });
        } else{ //已經播到最後一首
            currentPlay = 0;
            player.cueVideoById({
                "videoId": playList[currentPlay],
                "startSeconds": playTime[currentPlay][0],
                "endSeconds": playTime[currentPlay][1],
                "suggestedQuality": "large"
            });
        }
    }
    if(player.getVideoLoadedFraction() > 0){ //避免影片還沒開始播時抓不到標題
        $("h2").text(player.getVideoData().title);
    }
}