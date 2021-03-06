USE [Alpha]
GO
/****** Object:  StoredProcedure [dbo].[SP_UserLogin_SelByUserName]    Script Date: 8/6/2017 12:36:21 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_UserLogin_SelByUserName]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_UserLogin_SelByUserName]
GO
/****** Object:  StoredProcedure [dbo].[SP_UserLogin]    Script Date: 8/6/2017 12:36:21 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_UserLogin]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_UserLogin]
GO
/****** Object:  StoredProcedure [dbo].[SP_User_Upd]    Script Date: 8/6/2017 12:36:21 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_Upd]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_User_Upd]
GO
/****** Object:  StoredProcedure [dbo].[SP_User_SelByID]    Script Date: 8/6/2017 12:36:21 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_SelByID]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_User_SelByID]
GO
/****** Object:  StoredProcedure [dbo].[SP_User_SelByCondition]    Script Date: 8/6/2017 12:36:21 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_SelByCondition]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_User_SelByCondition]
GO
/****** Object:  StoredProcedure [dbo].[SP_User_Sel]    Script Date: 8/6/2017 12:36:21 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_Sel]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_User_Sel]
GO
/****** Object:  StoredProcedure [dbo].[SP_User_Ins]    Script Date: 8/6/2017 12:36:21 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_Ins]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_User_Ins]
GO
/****** Object:  StoredProcedure [dbo].[SP_User_Ins]    Script Date: 8/6/2017 12:36:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_Ins]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROC [dbo].[SP_User_Ins]
@UserName nvarchar(50),
@FirstName nvarchar(100),
@LastName nvarchar(100),
@Email nvarchar(100),
@SecurityID int,
@CreateBy int,
@EditBy int
AS
DECLARE @CheckUser int 
SET @CheckUser = (SELECT COUNT(ISNULL(ID,0)) FROM [User] WHERE UserName = @UserName AND IsDeleted = ''0'')
IF @CheckUser = 0
BEGIN
INSERT INTO [dbo].[User]
           ([UserName]
           ,[FirstName]
           ,[LastName]
           ,[Email]
           ,[SecurityID]
           ,[IsDeleted]
           ,[CreateDate]
           ,[CreateBy]
           ,[EditDate]
           ,[EditBy])
     VALUES
           (@UserName,
			@FirstName,
			@LastName,
			@Email,
			@SecurityID,
           ''0'',
           GETDATE(),
           @CreateBy,
           GETDATE(),
           @EditBy)
END
SELECT @CheckUser' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_User_Sel]    Script Date: 8/6/2017 12:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_Sel]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'--SP_User_Sel
CREATE PROC [dbo].[SP_User_Sel]
AS
	SELECT ROW_NUMBER() OVER (ORDER BY U.ID) AS RowNum
      ,U.[ID]
      ,U.[UserName]
      --,U.[Password]
      ,U.[FirstName]
      ,U.[LastName]
      ,U.[Email]
      --,U.[Status],[dbo].[fns_GetMasterName] (U.[Status]) As UserStatus
      ,U.[SecurityID],SC.[Profile] As SecurityProfile
      ,U.[IsDeleted]
      ,U.[CreateDate]
      ,U.[CreateBy]
      ,U.[EditDate]
      ,U.[EditBy]
  FROM [dbo].[User] U LEFT OUTER JOIN SecurityProfile SC ON U.SecurityID = SC.ID
  WHERE U.IsDeleted = ''0''


' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_User_SelByCondition]    Script Date: 8/6/2017 12:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_SelByCondition]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROC [dbo].[SP_User_SelByCondition]
AS
	SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
      ,[ID]
      ,[UserName]
      --,[Password]
      ,[IsDeleted]
      ,[CreateDate]
      ,[CreateBy]
      ,[EditDate]
      ,[EditBy]
  FROM [dbo].[User]
  WHERE IsDeleted = ''0'' AND ID NOT IN (SELECT UserID FROM [Authorization])


' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_User_SelByID]    Script Date: 8/6/2017 12:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_SelByID]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROC [dbo].[SP_User_SelByID]
@ID int
AS
SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
	  ,[ID]
      ,[UserName]
      --,[Password]
      ,[FirstName]
      ,[LastName]
      ,[Email]
      --,[Status]
      ,[SecurityID]
      ,[IsDeleted]
      ,[CreateDate]
      ,[CreateBy]
      ,[EditDate]
      ,[EditBy]
  FROM [dbo].[User]
  WHERE IsDeleted = ''0'' AND ID = @ID


' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_User_Upd]    Script Date: 8/6/2017 12:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_User_Upd]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROC [dbo].[SP_User_Upd]
@ID int,
@UserName nvarchar(50),
@FirstName nvarchar(100),
@LastName nvarchar(100),
@Email nvarchar(100),
@SecurityID int,
@EditBy int
AS
UPDATE [User]
   SET [UserName] = @UserName
      ,[FirstName] = @FirstName
      ,[LastName] = @LastName
      ,[Email] = @Email
      ,[SecurityID] = @SecurityID
      ,[EditDate] = GETDATE()
      ,[EditBy] = @EditBy
 WHERE ID = @ID

 SELECT @ID

' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UserLogin]    Script Date: 8/6/2017 12:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_UserLogin]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'--SP_UserLogin ''p'',''1''
CREATE PROC [dbo].[SP_UserLogin]
@UserName nvarchar(50)
As

	SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
      ,[ID]
      ,[UserName]
      ,[IsDeleted]
      ,[CreateDate]
      ,[CreateBy]
      ,[EditDate]
      ,[EditBy]
  FROM [dbo].[User]
  WHERE IsDeleted = ''0'' AND UserName = @UserName


' 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UserLogin_SelByUserName]    Script Date: 8/6/2017 12:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_UserLogin_SelByUserName]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'--SP_UserLogin_SelByUserName ''pipattra'',''12345''
CREATE PROC [dbo].[SP_UserLogin_SelByUserName]
@UserName nvarchar(50),@Password nvarchar(50)
As

	SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
      ,[ID]
      ,[UserName]
      ,[Password]
      ,[IsDeleted]
      ,[CreateDate]
      ,[CreateBy]
      ,[EditDate]
      ,[EditBy]
  FROM [dbo].[User]
  WHERE IsDeleted = ''0'' AND UserName = @UserName AND [Password] = @Password



' 
END
GO
