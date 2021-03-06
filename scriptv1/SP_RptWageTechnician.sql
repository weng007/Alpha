USE [Alpha]
GO
/****** Object:  StoredProcedure [dbo].[SP_RptWageTechnician]    Script Date: 30/5/2017 14:36:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Create
--SP_RptWageTechnician 64,'',''
ALTER PROC [dbo].[SP_RptWageTechnician] @ID int,@FromManDate DATETIME,@ToManDate DATETIME
As
DECLARE @AccountID nvarchar(100)
SET @AccountID = (SELECT top(1) AccountID FROM ag_QuoteStatusReport_ARS Q 
LEFT OUTER JOIN BDC B ON Q.QuoteID = B.QuotationNo
LEFT OUTER JOIN JobOrder J ON B.ID = J.JobRef
LEFT OUTER JOIN JobOrderManPower JM ON JM.JobID = J.ID
LEFT OUTER JOIN WageTechnician WT ON WT.ManpowerID = JM.ID
WHERE WT.TechnicianID = @ID)

	SELECT [dbo].[fns_GetTechnicianFullName]  (@ID) AS FullName

	SELECT ROW_NUMBER() OVER (ORDER BY JM.ID) AS RowNum,
	   WT.ID,
	   WT.ManpowerID,
	   WT.TechnicianID,
	   WT.Additionnal,
	   WT.Deduction,
	   J.JobNo,
	   [dbo].[fns_GetCustomerName] (@AccountID) AS CustomerName,
       J.JobSite,
	   JM.ManDate,
	   CONVERT(NVARCHAR(10),JM.ManDate,103) AS JMManDate,
	   JM.FromHour AS WorkingFrom,
	   JM.ToHour AS WorkingTo,
	   JM.TotalHours,
	   JM.ManNormal,
	   JM.ManPremium,
	   JM.ManPremium2,
	   JM.ManSpecial,
	   J.Remark,
	   J.Location,
	   EM.EmpGroup
FROM WageTechnician WT LEFT OUTER JOIN JobOrderManPower JM ON JM.ID = WT.ManpowerID
LEFT OUTER JOIN JobOrder J ON J.ID = JM.JobID 
LEFT OUTER JOIN Employee_ARS EM ON EM.PersonID = JM.TechnicianID
WHERE WT.TechnicianID = @ID 
AND JM.ManDate BETWEEN @FromManDate AND @ToManDate
AND WT.IsDeleted = '0'




