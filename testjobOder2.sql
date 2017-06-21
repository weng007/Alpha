DECLARE @FTime nvarchar(10)
DECLARE @TTime nvarchar(10)
DECLARE @fromHour datetime
DECLARE @toHour datetime
DECLARE @startHour datetime
DECLARE @endHour datetime
DECLARE @mDate datetime
SET @mDate = (SELECT('2017-05-19')
SET @FTime = (SELECT '07:30')
SET @TTime = (SELECT '22:00')
SET @fromHour = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), @FTime))
SET @startHour = (SELECT DATEADD(day, DATEDIFF(day, 0, @ManDate), '07:30:00'))

SET @toHour = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), @TTime))
SET @endHour = (SELECT DATEADD(day, DATEDIFF(day, 0, @manDate), '17:00:00'))