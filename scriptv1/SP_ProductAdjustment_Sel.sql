USE [Alpha]
GO
/****** Object:  StoredProcedure [dbo].[SP_ProductAdjustment_Sel]    Script Date: 30/5/2017 23:59:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--SP_ProductAdjustment_Sel
ALTER PROC [dbo].[SP_ProductAdjustment_Sel]
As

	SELECT ROW_NUMBER() OVER (ORDER BY PA.ID) AS RowNum
	  ,PA.[ID]
      ,PD.[SerialNo]
      ,PD.[MachineNo]
      ,PD.[ProductType]
	  ,PD.[Description]
      ,PD.[Brand]
      ,PD.[Size]
      ,PD.[Model]
      ,PD.[Lifetime]
      ,PD.[ReceiveDate]
      ,PD.[UnitWeight],MD.Detail As UnitWeightName
      ,PD.[Balance]
      ,PD.[Remain]
      ,PD.[Lost]
      ,PD.[Repair]
      ,PD.[Break]
      ,PD.[Img]
      ,PD.[Remark]
	  FROM ProductAdjustment PA LEFT OUTER JOIN [Product] PD ON PD.ID = PA.ProductID
	  LEFT OUTER JOIN MastertableDetail MD ON PD.UnitWeight = MD.ID
	  WHERE PA.IsDeleted = '0'



