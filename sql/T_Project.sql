
/*
Use Master
GO
Drop Database EasyManagement
GO
*/

go

CREATE DATABASE EasyManagement  
ON (NAME = 'Project_Data', 
    FILENAME = 'C:\EasyManagement\sql\T_Project_Data.MDF' , 
    SIZE = 10, 
    FILEGROWTH = 30%) 
LOG ON (NAME = 'Project_Log', 
        FILENAME = 'C:\EasyManagement\sql\T_Project_Log.LDF' ,
        SIZE = 10, 
        FILEGROWTH = 30%)
COLLATE Hebrew_CI_AS
GO




Use EasyManagement
GO




create table TbUsersType (
	userTypeID int identity(1,1) PRIMARY KEY,
	userTypName nvarchar(50) ,
);



create TABLE TbUsers (
    userID int identity (1,1) PRIMARY KEY,
	userName varchar(30) NOT NULL ,
	pass varchar(30) NOT NULL,
	firstName nvarchar(50),
	lastName nvarchar(50),
	email varchar(50),
	tel varchar(10),
	img nvarchar (max),
	Token nvarchar(max),
    
);





CREATE TABLE TbBuildingSite (
	siteID int identity(1,1) NOT NULL PRIMARY KEY,
	siteName nvarchar(100) NOT NULL ,
	siteAddress nvarchar(100) NOT NULL ,
	siteStatus bit,
	
);


create TABLE TbUsersInSite (
    siteID int FOREIGN KEY REFERENCES TbBuildingSite(siteID) ,
    userID int FOREIGN KEY REFERENCES TbUsers(userID) ,
	userTypeID int FOREIGN KEY REFERENCES TbUsersType(userTypeID) , 
	primary key(siteID,userID)
);


CREATE TABLE TbRoomsType (
	roomTypeID int identity(1,1) NOT NULL PRIMARY KEY,
	roomTypeName nvarchar(50) NOT NULL 
);


CREATE TABLE TbRoomsInSite (
    roomID  int identity(1,1) NOT NULL , 
    siteID int FOREIGN KEY REFERENCES TbBuildingSite(siteID) ,
	roomTypeID int FOREIGN KEY REFERENCES TbRoomsType(roomTypeID),
	roomName nvarchar(50),
	floorNumber int NOT NULL,
	roomPicture nvarchar(max),
	PRIMARY KEY(roomID)
	);
	

	CREATE TABLE  TbFaultType
	(
	faultID  int identity(1,1) NOT NULL PRIMARY KEY,
	faultName nvarchar(50) NOT NULL,
	);

create TABLE TbFaultInSite (
     faultID  int identity(1,1) NOT NULL ,
	 ownerID int  FOREIGN KEY REFERENCES TbUsers(userID),
	 workerID int  FOREIGN KEY REFERENCES TbUsers(userID),
     roomID  int FOREIGN KEY REFERENCES TbRoomsInSite(roomID),
	 faultType int  FOREIGN KEY REFERENCES TbfaultType(faultID),
	 info nvarchar(max),
	 faultStatus bit not null,
	 openDate date ,
	 closeDate date,
	 PRIMARY KEY(faultID) 
);

create table TbFaultPicture 
(
faultID int FOREIGN KEY REFERENCES TbFaultInSite(faultID),
faultPicture nvarchar(max)
 
 );



 create table TbInvaites 
 (
 siteID int FOREIGN KEY REFERENCES TbBuildingSite(siteID),
 SenderID int FOREIGN KEY REFERENCES TbUsers(userID),
 reciverID int FOREIGN KEY REFERENCES TbUsers(userID),
 userTypeID int FOREIGN KEY REFERENCES TbUsersType(userTypeID)
 )










------------------------הכנסת נתונים--------------------------------


insert dbo.[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('ohad92',123,'ohad','haviv','ohadhaviv92@gmail.com','0506595178')
insert dbo.[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('orhay92',123,'orhay','benaim','orhay92@gmail.com','055333333')
insert dbo.[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('kevesh',123,'kevsh','haviv','kevesh92@gmail.com','055333333')


insert dbo.[TbUsersType] (userTypName) values ('מנהל עבודה')
insert dbo.[TbUsersType] (userTypName) values ('בעל האתר')
insert dbo.[TbUsersType] (userTypName) values ('בעל מקצוע')


insert [dbo].[TbFaultType] (faultName) values ('נזילה')
insert [dbo].[TbFaultType] (faultName) values ('שבר')
insert [dbo].[TbFaultType] (faultName) values ('דלת לא תקינה')

insert dbo.[TbRoomsType] (roomTypeName) values ('אמבטיה')
insert dbo.[TbRoomsType] (roomTypeName) values ('חצר')
insert dbo.[TbRoomsType] (roomTypeName) values ('חדר שינה')
insert dbo.[TbRoomsType] (roomTypeName) values ('מרתף')
insert dbo.[TbRoomsType] (roomTypeName) values ('חדר משחקים')
insert dbo.[TbRoomsType] (roomTypeName) values ('מרתף')
insert dbo.[TbRoomsType] (roomTypeName) values ('שירותים')
insert dbo.[TbRoomsType] (roomTypeName) values ('ממ"ד')
insert dbo.[TbRoomsType] (roomTypeName) values ('חדר ארונות')
insert dbo.[TbRoomsType] (roomTypeName) values ('מטבח')
insert dbo.[TbRoomsType] (roomTypeName) values ('סלון')



----------------------פרוצדורות----------------------------------------------------


create proc Login
@userName varchar(30),
@pass varchar(30)
as
select * from dbo.[TbUsers] where [userName]=@userName and [pass]=@pass
go 

create proc Register (
@userName varchar(30),
@pass varchar(30),
@firstName nvarchar(50),
@lastName nvarchar(50),
@email varchar(50),
@tel  varchar(10)
)
as 

 if not exists(select * from dbo.[TbUsers] where [userName]=@userName )
 begin
	if not exists(select * from dbo.[TbUsers] where [email]=@email )
	 begin 
		insert into TbUsers(userName, pass, firstName, lastName, email, tel)
		values (@userName,@pass,@firstName,@lastName,@email,@tel)
		select * from TbUsers where userID = @@IDENTITY
	end
	else begin
		select 'email taken'
	end
end
else begin
	select 'user name taken'
end

go 


create proc AddNewSite
@userID int,
@siteName nvarchar(100),
@siteAddress nvarchar(100)
as

declare @site table(
siteID int NOT NULL PRIMARY KEY,
	siteName nvarchar(100) NOT NULL ,
	siteAddress nvarchar(100) NOT NULL ,
	siteStatus bit
)
declare @ID int

insert into dbo.[TbBuildingSite] (siteName, siteAddress,siteStatus) values (@siteName,@siteAddress,1)
 set @ID = @@IDENTITY
 select * from [dbo].[TbBuildingSite] where [siteID] = @ID
if(exists(select * from [dbo].[TbBuildingSite] where [siteID] = @ID))
begin 
insert dbo.[TbUsersInSite] (siteID, userID, userTypeID) values (@ID,@userID,1)
end

go



create proc GetSitesForUser 
@userID int
as
SELECT        dbo.TbBuildingSite.siteID, dbo.TbBuildingSite.siteName, dbo.TbBuildingSite.siteAddress, dbo.TbBuildingSite.siteStatus, dbo.TbUsersType.userTypName, dbo.TbUsersInSite.userID, dbo.TbUsersType.userTypeID
FROM            dbo.TbBuildingSite INNER JOIN
                         dbo.TbUsersInSite ON dbo.TbBuildingSite.siteID = dbo.TbUsersInSite.siteID INNER JOIN
                         dbo.TbUsersType ON dbo.TbUsersInSite.userTypeID = dbo.TbUsersType.userTypeID
WHERE        (dbo.TbUsersInSite.userID = @userID)
go


create proc AddRoomInSite
@siteID int,
@roomTypeID int,
@roomName nvarchar(50),
@floorNumber int,
@roomPicture nvarchar(max)
as
insert into [dbo].[TbRoomsInSite] (siteID, roomTypeID, roomName, floorNumber,roomPicture)  values (@siteID,@roomTypeID,@roomName,@floorNumber,@roomPicture)
select * from [dbo].[TbRoomsInSite] where roomID = @@IDENTITY


go 

create proc GetAllRoomsInSite
@siteID int
as
SELECT        dbo.TbBuildingSite.siteID, dbo.TbRoomsType.roomTypeName, dbo.TbRoomsType.roomTypeID, TbRoomsInSite_1.roomID, TbRoomsInSite_1.roomName, TbRoomsInSite_1.floorNumber, TbRoomsInSite_1.roomPicture
FROM            dbo.TbBuildingSite INNER JOIN
                         dbo.TbRoomsInSite AS TbRoomsInSite_1 ON dbo.TbBuildingSite.siteID = TbRoomsInSite_1.siteID INNER JOIN
                         dbo.TbRoomsType ON TbRoomsInSite_1.roomTypeID = dbo.TbRoomsType.roomTypeID
WHERE        (dbo.TbBuildingSite.siteID = @siteID)
go

create proc UpdateWorkerInSite
@workerID int, 
@workerType int,
@siteID int
as
if not exists(select * from [dbo].[TbUsersInSite] where [siteID] = @siteID and [userID] = @workerID) begin 
	insert into [dbo].[TbUsersInSite](siteID, userID, userTypeID) values(@siteID, @workerID, @workerType)
end
else begin
	update [dbo].[TbUsersInSite] set [userTypeID] = @workerType where [siteID] = @siteID and [userID] = @workerID
end

create proc AddFault
@ownerID int,
@workerID int,
@roomID int ,
@faultType int,
@info nvarchar(max)
as
if exists (select [userID] from [dbo].[TbUsersInSite] where [userID] = @workerID and [siteID] = (select [siteID] from [dbo].[TbRoomsInSite] where [roomID] = @roomID)) 
begin
	insert into [dbo].[TbFaultInSite] (ownerID,workerID, roomID, faultType, info, faultStatus, openDate) values (@ownerID,@workerID,@roomID,@faultType,@info,1,GETDATE())
	select * from [dbo].[TbFaultInSite] where faultID = @@IDENTITY
end
go

create proc GetAllFaultsInRoom
@roomID int
as
SELECT        dbo.TbFaultInSite.faultID, dbo.TbFaultInSite.ownerID, dbo.TbFaultInSite.workerID, dbo.TbFaultType.faultName, dbo.TbFaultInSite.info, dbo.TbFaultInSite.faultStatus, dbo.TbFaultInSite.openDate, dbo.TbFaultInSite.closeDate, 
                         dbo.TbRoomsInSite.roomID, dbo.TbFaultInSite.faultType
FROM            dbo.TbFaultInSite INNER JOIN
                         dbo.TbFaultType ON dbo.TbFaultInSite.faultType = dbo.TbFaultType.faultID INNER JOIN
                         dbo.TbRoomsInSite ON dbo.TbFaultInSite.roomID = dbo.TbRoomsInSite.roomID
WHERE        (dbo.TbRoomsInSite.roomID = @roomID)
go


create proc GetUserInSite
@userID int,
@siteID int
as
SELECT        dbo.TbUsers.userID, dbo.TbUsersInSite.siteID, dbo.TbUsersType.userTypeID, dbo.TbUsersType.userTypName, dbo.TbUsers.userName, dbo.TbUsers.firstName, dbo.TbUsers.lastName, dbo.TbUsers.email, dbo.TbUsers.tel, 
                         dbo.TbUsers.img
FROM            dbo.TbUsers INNER JOIN
                         dbo.TbUsersInSite ON dbo.TbUsers.userID = dbo.TbUsersInSite.userID INNER JOIN
                         dbo.TbUsersType ON dbo.TbUsersInSite.userTypeID = dbo.TbUsersType.userTypeID
WHERE        (dbo.TbUsers.userID = @userID) AND (dbo.TbUsersInSite.siteID = @siteID)

go


create proc AddFaultPicture
@faultID int,
@faultPicture nvarchar(max)
as
insert [dbo].[TbFaultPicture] (faultID, faultPicture) values (@faultID,@faultPicture)
go

create proc GetFaultPicture
@faultID int
AS
SELECT        faultID, faultPicture
FROM            dbo.TbFaultPicture
WHERE        (faultID = @faultID)

GO



 alter  proc SendInvaite 
 @siteID int , 
 @senderID int ,
 @reciverName nvarchar(max),
 @UsersType int
 as
 declare @id int=(select [userID] from  [dbo].[TbUsers] where [userName]=@reciverName or [email]=@reciverName )
  if(@id = @senderID)
 begin
  select 'its not posibale to sent invaite for self '
 end
 else 
 begin
   if (@id > 0)
   begin 
   
 if not exists (select reciverID from [dbo].[TbInvaites] where siteID = @siteID and [reciverID]=@id  )
 begin 
 insert [dbo].[TbInvaites] (siteID, SenderID, reciverID,userTypeID ) values (@siteID,@senderID,@id,@UsersType)
 select * from [dbo].[TbUsers] where [userID]=@id
 end
 else 
 begin 
 select 'this user is alredy invaite'
 end
 end
 else
 begin 
 select 'user name or email incorrect'
 end
 end
 go


 create proc GetSendInvaite
 @userID int 
 as
 SELECT        dbo.TbBuildingSite.siteName, dbo.TbBuildingSite.siteAddress, dbo.TbInvaites.SenderID, dbo.TbUsers.userName, dbo.TbUsers.firstName, dbo.TbUsers.lastName, dbo.TbUsers.tel, dbo.TbUsers.img, dbo.TbUsers.Token, 
                         dbo.TbUsers.userID, dbo.TbUsers.email
FROM            dbo.TbInvaites INNER JOIN
                         dbo.TbBuildingSite ON dbo.TbInvaites.siteID = dbo.TbBuildingSite.siteID INNER JOIN
                         dbo.TbUsers ON dbo.TbInvaites.reciverID = dbo.TbUsers.userID
WHERE        (dbo.TbInvaites.SenderID =  @userID)
go

 create proc GetReciveInvaite
  @userID int 
 as
 SELECT        dbo.TbBuildingSite.siteName, dbo.TbBuildingSite.siteAddress, dbo.TbInvaites.SenderID, dbo.TbUsers.userName, dbo.TbUsers.firstName, dbo.TbUsers.lastName, dbo.TbUsers.tel, dbo.TbUsers.img, dbo.TbUsers.Token, 
                         dbo.TbUsers.userID, dbo.TbUsers.email
FROM            dbo.TbInvaites INNER JOIN
                         dbo.TbBuildingSite ON dbo.TbInvaites.siteID = dbo.TbBuildingSite.siteID INNER JOIN
                         dbo.TbUsers ON dbo.TbInvaites.reciverID = dbo.TbUsers.userID
WHERE        (dbo.TbInvaites.ReciverID =  @userID)
go

