var topic = ["毀滅來臨，喇叭作響",
             "狂亂的黃金鄉",
             "太陽熊熊燃燒之時"];
//var startDate = new Date();

function setMonthAndDay(startMonth, startDay){
    var startDate = new Date();
    
    startDate.setMonth(startMonth - 1, startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    
    return startDate;
}

//setMonthAndDay(12, 21);
