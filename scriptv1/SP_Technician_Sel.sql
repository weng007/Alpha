USE [Alpha]
GO
/****** Object:  StoredProcedure [dbo].[SP_Technician_Sel]    Script Date: 30/5/2017 23:12:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--SP_Technician_Sel 
ALTER PROC [dbo].[SP_Technician_Sel]
As
	SELECT ROW_NUMBER() OVER (ORDER BY T.EmpGroup DESC) AS RowNum
	  ,T.PersonID As TechnicianNo
	  ,T.[Code] As HRCode
	  ,T.NameT+' '+ T.SurNameT As FirstName
      ,T.SurnameT As LastName
      ,T.EmpGroup As TechnicianTypeName
      ,T.[IDCard]
      ,T.PositionNameTH AS Position
  FROM [dbo].[Employee_ARS] T
  WHERE PositionNameTH IN ('Technical  Services','Service Technician','Service Technicians','Team Leader','Supervisor','Senior Supervisor','-')
  ORDER By EmpGroup DESC



