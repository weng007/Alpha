USE [Alpha]
GO
/****** Object:  StoredProcedure [dbo].[SP_BDC_Sel]    Script Date: 1/6/2017 17:18:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--SP_BDC_Sel
CREATE PROC [dbo].[SP_ChekDelBDC] @ID int
As

	SELECT ISNULL(COUNT(J.IsDeleted),0) As CountDelete FROM BDC B 
LEFT OUTER JOIN JobOrder J ON B.ID = J.JobRef
WHERE B.ID = @ID AND J.IsDeleted = '0'



