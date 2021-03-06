USE [Alpha]
GO
/****** Object:  StoredProcedure [dbo].[SP_Manpower_Carlendar]    Script Date: 30/5/2017 22:32:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--SP_Manpower_Carlendar '5'
ALTER PROC [dbo].[SP_Manpower_Carlendar] @calendarMonth int
As

	SELECT ROW_NUMBER() OVER (ORDER BY J.ID) AS RowNum,
       J.[ID]
	,[dbo].fns_GetMasterName (J.[TypeWorking]) As TypeWorkingName
	,[dbo].[fns_GetTechnicianFullName] (MP.TechnicianID)As TechFullName
	,T.EmpGroup
	,T.PositionNameTH
    ,J.[JobNo]
	,J.JobDate
    ,J.[SWorking]
    ,J.[EWorking]
  FROM JobOrderManpower MP LEFT OUTER JOIN [dbo].[JobOrder] J ON MP.JobID = J.ID
  LEFT OUTER JOIN Employee_ARS T ON MP.TechnicianID = T.PersonID
  WHERE J.IsDeleted = '0' AND MONTH([SWorking]) = @calendarMonth



