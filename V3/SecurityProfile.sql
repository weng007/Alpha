USE [Alpha]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_Upd]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_Upd]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfileDetail_Upd]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_SelBySecurityID]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_SelBySecurityID]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfileDetail_SelBySecurityID]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_SelByID]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_SelByID]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfileDetail_SelByID]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_Sel]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_Sel]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfileDetail_Sel]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_Ins]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_Ins]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfileDetail_Ins]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_Upd]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_Upd]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfile_Upd]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_SelByID]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_SelByID]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfile_SelByID]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_Sel]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_Sel]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfile_Sel]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_Ins]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_Ins]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfile_Ins]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_Del]    Script Date: 5/6/2017 15:37:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_Del]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SecurityProfile_Del]
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_Del]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_Del]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROC [dbo].[SP_SecurityProfile_Del] @ID int
AS
    UPDATE  [dbo].[SecurityProfile]
	SET IsDeleted = ''1''
	WHERE  ID = @ID

	UPDATE  [dbo].[SecurityProfileDetail]
	SET IsDeleted = ''1''
	WHERE  SecurityID = @ID' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_Ins]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_Ins]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROC [dbo].[SP_SecurityProfile_Ins]
		   @Profile nvarchar(100),
		   @CreateBy int,
		   @EditBy int
AS

INSERT INTO [SecurityProfile]
           ([Profile]
		   ,[IsDeleted]
		   ,[CreateDate]
           ,[CreateBy]
		   ,[EditDate]
           ,[EditBy])
     VALUES
           (@Profile,
           ''0'',
           GETDATE(),
           @CreateBy,
           GETDATE(),
           @EditBy)

SELECT @@IDENTITY' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_Sel]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_Sel]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'--SP_Product_Sel
CREATE PROC [dbo].[SP_SecurityProfile_Sel]
As
  SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
	  ,[ID]
      ,[Profile]
      ,[IsDeleted]
      ,[CreateDate]
      ,[CreateBy]
      ,[EditDate]
      ,[EditBy]
  FROM [dbo].[SecurityProfile]
  WHERE IsDeleted = ''0''



' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_SelByID]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_SelByID]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'--SP_SecurityProfile_SelByID 22
CREATE PROC [dbo].[SP_SecurityProfile_SelByID] @ID int
As
  SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
	  ,[ID]
      ,[Profile]
      ,[IsDeleted]
      ,[CreateDate]
      ,[CreateBy]
      ,[EditDate]
      ,[EditBy]
  FROM [dbo].[SecurityProfile]
  WHERE IsDeleted = ''0'' AND ID = @ID

  SELECT ROW_NUMBER() OVER (ORDER BY MD.Seq) AS RowNum
	  ,SD.[ID] As ID
      ,ISNULL(SD.[SecurityID],@ID) As SecurityID
      ,ISNULL(SD.[IsView],0) As IsView
      ,ISNULL(SD.[IsInsert],0) As IsInsert
      ,ISNULL(SD.[IsUpdate],0) As IsUpdate
      ,ISNULL(SD.[IsDelete],0) As IsDelete
      ,MD.[ID] As menuID
	  ,MD.Seq
	  ,MD.Detail As menu
      --,SD.[CreateDate]
      --,SD.[CreateBy]
      --,SD.[EditDate]
      --,SD.[EditBy]
  FROM (SELECT ID,Detail,Seq FROM MasterTableDetail WHERE TypeID= ''011'')MD LEFT OUTER JOIN 
  (SELECT ID,SecurityID,IsView,IsInsert, IsUpdate,MenuID, IsDelete, CreateDate,CreateBy, EditDate, EditBy FROM [dbo].[SecurityProfileDetail]  WHERE SecurityID = @ID)SD ON MD.ID = SD.MenuID OR SD.MenuID IS NULL
  ORDER By MD.Seq' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfile_Upd]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfile_Upd]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROC [dbo].[SP_SecurityProfile_Upd]
           @ID int,
		   @Profile nvarchar(100),
		   @EditBy int
AS
UPDATE SecurityProfile
   SET 
       [Profile] = @Profile
      ,[EditDate] = GETDATE()
      ,[EditBy] = @EditBy
 WHERE ID = @ID


' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_Ins]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_Ins]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROC [dbo].[SP_SecurityProfileDetail_Ins]
		   @SecurityID int,
           @IsView nchar(1),
           @IsInsert nchar(1),
		   @IsUpdate nchar(1),
           @IsDelete nchar(1),
           @MenuID int,
		   @CreateBy int,
		   @EditBy int
AS

INSERT INTO [SecurityProfileDetail]
           ([SecurityID]
           ,[IsView]
           ,[IsInsert]
           ,[IsUpdate]
           ,[IsDelete]
		   ,[MenuID]
		   ,[IsDeleted]
		   ,[CreateDate]
           ,[CreateBy]
		   ,[EditDate]
           ,[EditBy])
     VALUES
           (@SecurityID,
           @IsView,
           @IsInsert,
           @IsUpdate,
           @IsDelete,
		   @MenuID,
           ''0'',
           GETDATE(),
           @CreateBy,
           GETDATE(),
           @EditBy)

SELECT @@IDENTITY' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_Sel]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_Sel]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'--SP_Product_Sel
CREATE PROC [dbo].[SP_SecurityProfileDetail_Sel]
As

	SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
	  ,[ID]
      ,[SecurityID]
      ,[IsView]
      ,[IsInsert]
      ,[IsUpdate]
      ,[IsDelete]
      ,[MenuID]
      ,[IsDeleted]
      ,[CreateDate]
      ,[CreateBy]
      ,[EditDate]
      ,[EditBy]
  FROM [dbo].[SecurityProfileDetail]
  WHERE IsDeleted = ''0''



' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_SelByID]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_SelByID]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'--SP_SecurityProfileDetail_SelByID 9
CREATE PROC [dbo].[SP_SecurityProfileDetail_SelByID] @ID int
As

	SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
	  ,[ID]
      ,[SecurityID]
      ,[IsView]
      ,[IsInsert]
      ,[IsUpdate]
      ,[IsDelete]
      ,[MenuID]
      ,[IsDeleted]
      ,[CreateDate]
      ,[CreateBy]
      ,[EditDate]
      ,[EditBy]
  FROM [dbo].[SecurityProfileDetail]
  WHERE IsDeleted = ''0'' AND ID = @ID



' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_SelBySecurityID]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_SelBySecurityID]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'--SP_Product_Sel
CREATE PROC [dbo].[SP_SecurityProfileDetail_SelBySecurityID] @SecurityID int
As

	SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
	  ,[ID]
      ,[SecurityID]
      ,[IsView]
      ,[IsInsert]
      ,[IsUpdate]
      ,[IsDelete]
      ,[MenuID]
      ,[IsDeleted]
      ,[CreateDate]
      ,[CreateBy]
      ,[EditDate]
      ,[EditBy]
  FROM [dbo].[SecurityProfileDetail]
  WHERE IsDeleted = ''0'' AND SecurityID = @SecurityID



' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SecurityProfileDetail_Upd]    Script Date: 5/6/2017 15:37:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_SecurityProfileDetail_Upd]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROC [dbo].[SP_SecurityProfileDetail_Upd]
           @ID int,
		   @SecurityID int,
           @IsView nchar(1),
           @IsInsert nchar(1),
		   @IsUpdate nchar(1),
           @IsDelete nchar(1),
           @MenuID int,
		   @EditBy int
AS
UPDATE SecurityProfileDetail
   SET 
       [SecurityID] = @SecurityID
      ,[IsView] = @IsView
      ,[IsInsert] = @IsInsert
      ,[IsUpdate] = @IsUpdate
      ,[IsDelete] = @IsDelete
	  ,[MenuID] = @MenuID
      ,[EditDate] = GETDATE()
      ,[EditBy] = @EditBy
 WHERE ID = @ID

' 
END
GO
