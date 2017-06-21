--SELECT DAYOFWEEK('2017-02-03')

--DECLARE @dateofweek date
--DECLARE @TFrom float
--SET @dateofweek = (SELECT CAST('2017-05-20' AS DATETIME))

--SELECT FORMAT(@dateofweek,'dddd')
--SELECT CASE FORMAT(@dateofweek,'dddd') WHEN 'Saturday' THEN 1 END

--COUNT(COUNT(FORMAT(@dateofweek,'dddd') = 'Saturday'))
--SELECT COUNT(HolidayDate) FROM HolidayYear
--WHERE HolidayDate = @dateofweek

--SELECT [dbo].[fns_GetHoliday] ('2017-01-12')
--SELECT DATEDIFF(time,'2017-05-17 09:00','2017-05-17 7:30') AS DiffDate

--DECLARE @manDate datetime
--DECLARE @isHoliday int
-- SET @manDate = (SELECT CAST('2017-05-17' AS DATETIME))
-- SET @IsHoliday = (SELECT [dbo].[fns_GetHoliday] (@manDate,17))
-- SELECT @manDate
-- SELECT @IsHoliday




--DECLARE @fromTime Datetime, @toTime Datetime

--DECLARE @isHoliday int
--DECLARE @manDate datetime
--DECLARE @fromHour1 datetime
--DECLARE @fromHour2 datetime
--DECLARE @toHour1 datetime
--DECLARE @toHour2 datetime
--DECLARE @deductionMorning int
--DECLARE @deductionEvening int
--DECLARE @sarary money
--SET @fromTime = (SELECT '01:00'+':00')
--SET @manDate = (SELECT CAST('2017-05-17' AS DATETIME))
--SET @fromHour1 = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), '09:00:00'))
--SET @fromHour2 = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), '07:30:00'))

--SET @toHour1 = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), '17:00:00'))
--SET @toHour2 = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), '20:00:00'))
--SET @deductionMorning = (SELECT DATEDIFF(minute,@Fromhour1,@Fromhour2))
--SET @deductionEvening = (SELECT DATEDIFF(minute,@Tohour1,@Tohour2))
--SET @IsHoliday = (SELECT [dbo].[fns_GetHoliday] (@manDate,17))
--SET @sarary = (SELECT (20000/20)/8)

----วันจันทร์-ศุกร์
--IF(@IsHoliday = 0)
--BEGIN
--	-- กลางวัน
--	SELECT @sarary*(480+ CASE WHEN @deductionMorning < 0 THEN @deductionMorning ELSE 0 END + CASE WHEN @deductionEvening < 0 THEN @deductionEvening ELSE 0 END)
--	--กลางคืน
--	SELECT (@sarary*(CASE WHEN @deductionEvening > 0 THEN @deductionEvening ELSE 0 END))*1.5
--END
----วันเสาร์-อาทิตย์ นักขัตฤกษ์
--ELSE
--BEGIN
--	-- กลางวัน
--	SELECT @sarary*(480+ CASE WHEN @deductionMorning < 0 THEN @deductionMorning ELSE 0 END + CASE WHEN @deductionEvening < 0 THEN @deductionEvening ELSE 0 END)
--	--กลางคืน
--	SELECT (@sarary*(CASE WHEN @deductionEvening > 0 THEN @deductionEvening ELSE 0 END))*3
--END

--DECLARE @TimeFrom nvarchar(20)
----SELECT RIGHT('0'+CAST(7 AS VARCHAR(3)),2)
--SET @TimeFrom = (SELECT RIGHT('0'+CAST(7 AS VARCHAR(3)),2)+':'+RIGHT('0'+CAST(0 AS VARCHAR(3)),2))
--SELECT @TimeFrom+':00'



DECLARE @isHoliday int
DECLARE @toHour datetime
DECLARE @endHour datetime
DECLARE @deductionMorning int
DECLARE @deductionEvening int
DECLARE @fromHour datetime
DECLARE @startHour datetime
DECLARE @manDate datetime
DECLARE @fromTime Datetime, @toTime Datetime
SET @fromTime = (SELECT '09:00')
DECLARE @fromTime1 Datetime, @toTime1 Datetime
SET @fromTime1 = (SELECT CAST(@fromTime AS nvarchar(50))+':00')
SET @toTime1 = (SELECT '17:00'+':00')
SELECT @fromTime1

SET @manDate = (SELECT CAST('2017-05-17' AS DATETIME))
SET @fromHour = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), @fromTime))
SET @startHour = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), '07:30:00'))

SET @toHour = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), @toTime))
SET @endHour = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), '17:00:00'))

SET @deductionMorning = (SELECT DATEDIFF(minute,@fromhour,@startHour))
SET @deductionEvening = (SELECT DATEDIFF(minute,@toHour,@endHour))
SELECT ((480-@deductionMorning)-@deductionEvening)/60
--SELECT @deductionEvening

