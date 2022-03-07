// 格式化列表中的结束时间
export function formatTime (time){
    var et = new Date(time * 1);
    let y = et.getFullYear()
    let m = (et.getMonth() + 1)
    m = m > 9 ? m : '0' + m ;
    let d = et.getDate()
    d = d > 9 ? d : '0' + d ;
    var date = y + "-" + m + "-" + d;
    date = date == "1970-01-01" ? "" : date; //假如为1970-01-01 则返回空
    return date;
}
