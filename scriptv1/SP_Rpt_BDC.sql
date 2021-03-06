USE [Alpha]
GO
/****** Object:  StoredProcedure [dbo].[SP_Rpt_BDC]    Script Date: 31/5/2017 01:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--SP_Rpt_BDC 191
ALTER PROC [dbo].[SP_Rpt_BDC] @BDCNo nvarchar(30)
--,@Docver int
As

	DECLARE @BQuote nvarchar(50)
	SET @BQuote = (SELECT QuotationNo FROM BDC WHERE ID = @BDCNo)

	    SELECT [dbo].[fns_GetCustomerName] (Q.AccountId) As Customer,FirstName+' '+LastName As Contact,
		J.[JobBy] As Sale,B.[Remark],J.[JobNo],CAST(J.[SWorking] AS NvarChar(20))+',-'+CAST([EWorking]AS NvarChar(20)) AS [StartDate],'' As POno
		 FROM [dbo].[JobOrder] J LEFT OUTER JOIN BDC B ON J.JobRef = B.ID
		  LEFT OUTER JOIN ag_QuoteStatusReport_ARS Q ON Q.QuoteId = B.QuotationNo
		  LEFT OUTER JOIN (SELECT Top(1) AccountId,[Name],TelephoneAccount,FaxAccount,FirstName,LastName
						  ,AddressName,Road,Tambol,Amphur,StateOrProvince,Country,PostalCode
						   FROM [Account_ARS] 
						   WHERE AccountId = (SELECT Q.AccountId FROM ag_QuoteStatusReport_ARS Q 
						   WHERE Q.QuoteId = @BQuote)) AC ON Q.AccountId = AC.AccountId
		  WHERE J.IsDeleted = '0' AND J.[JobRef] = @BDCNo

		-- --======== JobOrderIncome
		SELECT ROW_NUMBER() OVER (ORDER BY JI.ID) AS RowNum,IM.[Detail],JI.[IncomeType],JI.[UnitWeight],JI.[Qty],JI.[UnitPrice],JI.[Amount],J.Discount
		FROM JobOrder J LEFT OUTER JOIN JobOrderIncome JI ON J.ID = JI.JobID 
		LEFT OUTER JOIN IncomeMaster IM ON IM.ID = JI.IncomeType
		WHERE JI.IsDeleted = '0' AND J.JobRef = @BDCNo
		
		--======== JobOrderExpense
		SELECT ROW_NUMBER() OVER (ORDER BY JE.ID) AS RowNum,EM.[Detail],JE.[ExpenseType],JE.[UnitWeight],JE.[Qty],JE.[UnitPrice],JE.[Amount]
		FROM JobOrder J LEFT OUTER JOIN [JobOrderExpense] JE ON JE.JobID = J.ID
		LEFT OUTER JOIN ExpenseMaster EM ON EM.ID = JE.ExpenseType
		WHERE JE.IsDeleted = '0' AND J.JobRef = @BDCNo

		--======== Cost



