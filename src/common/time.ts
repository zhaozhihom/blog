export const coverTime = function (date: string, format: string) {
  let time = new Date(date);
  let year = time.getFullYear(),
  month = time.getMonth() + 1 ,  //月份是从0开始的
  day = time.getDate(),
  hour = time.getHours(),
  minute = time.getMinutes(),
  second = time.getSeconds()
  switch (format) {
    case "yyyy/MM/dd": 
      return year+'/'+ add0(month)+'/'+ add0(day);
    case "yyyy年MM月dd日":
      return year+'年'+ add0(month)+'月'+ add0(day)+'日';
    default: 
      return year+'-'+ add0(month)+'-'+ add0(day);
  }
  //return  year+'-'+ add0(month)+'-'+ add0(day)+ ' '+ add0(hour)+':'+ add0(minute)+':'+ add0(second)
}

var add0 = function(m){
  return m < 10 ? '0' + m: m
};
