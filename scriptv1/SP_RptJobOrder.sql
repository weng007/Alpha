USE [Alpha]
GO
/****** Object:  StoredProcedure [dbo].[SP_RptJobOrder]    Script Date: 31/5/2017 01:42:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- [dbo].[SP_RptJobOrder] 159
ALTER PROC [dbo].[SP_RptJobOrder] @ID int
As

DECLARE @BQuote nvarchar(50)
	SET @BQuote = (SELECT QuotationNo FROM JobOrder J LEFT OUTER JOIN BDC B ON J.JobRef = B.ID WHERE J.ID = @ID)
--====Table
SELECT ROW_NUMBER() OVER (ORDER BY J.ID) AS RowNum,
    J.[ID]
    ,J.[JobNo]
    ,J.[JobDate]
    ,J.[Car]
    ,J.[SWorking]
    ,J.[EWorking]
    ,J.[JobBy]
    ,J.[IssuedBy]
    ,J.[TypeWorking]
    ,J.[JobStatus]
    ,J.[Detail]
    --,C.[Name],C.Tel,C.Fax, C.Contact,C.CoWorker,C.[Address]
	, AC.[Name],AC.TelephoneAccount As Tel,AC.FaxAccount As Fax
	, (AC.FirstName +' '+AC.LastName) As Contact,(AC.FirstName +' '+AC.LastName) As CoWorker
	, (AC.AddressName+' '+Road+' '+Tambol+' '+Amphur+' '+StateOrProvince+' '+Country+' '+PostalCode) As [Address]
    ,J.[Remark]
FROM [dbo].[JobOrder] J LEFT OUTER JOIN BDC B ON J.JobRef = B.ID
  LEFT OUTER JOIN ag_QuoteStatusReport_ARS Q ON Q.QuoteId = B.QuotationNo
  LEFT OUTER JOIN (SELECT Top(1) AccountId,[Name],TelephoneAccount,FaxAccount,FirstName,LastName
				  ,AddressName,Road,Tambol,Amphur,StateOrProvince,Country,PostalCode
				   FROM [Account_ARS] 
				   WHERE AccountId = (SELECT Q.AccountId FROM ag_QuoteStatusReport_ARS Q 
				   WHERE Q.QuoteId = @BQuote)) AC ON Q.AccountId = AC.AccountId
--LEFT OUTER JOIN [Account_ARS] C ON J.CustID = C.ID
WHERE J.IsDeleted = '0' AND(J.ID = @ID)








