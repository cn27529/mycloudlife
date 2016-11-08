cal
cal_event

ProfileId=1, 我
people=2, 布

cal_event-------------------日曆項目
  yyyymm    | ProfileId | people |  start   |   end  |  ....| ....|
  2016/08         1         2,3    2016/08/28   我的
  2016/08         2         3    2016/08/29   布的

//找是布日曆資料
select * from  cal_event
where 0=0
and cal_event.yyyymm='2016/08'  月
//是布的建立的 或 有人把布加進去people的
and （ cal_event.ProfileId=2 or cal_event.people like '2' )

where{
   yyyymm: '2016/08',
   ProfileId: 2
},
or{
   people &
}



--or people like '%2%' //這也是布的
