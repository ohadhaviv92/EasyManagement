
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


insert site04.[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('ohad92',123,'ohad','haviv','ohadhaviv92@gmail.com','0506595178')
insert site04.[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('orhay92',123,'orhay','benaim','orhay92@gmail.com','055333333')
insert site04.[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('kevesh',123,'kevsh','haviv','kevesh92@gmail.com','055333333')


insert site04.[TbUsersType] (userTypName) values ('מנהל עבודה')
insert site04.[TbUsersType] (userTypName) values ('בעל האתר')
insert site04.[TbUsersType] (userTypName) values ('בעל מקצוע')


insert [site04].[TbFaultType] (faultName) values ('נזילה')
insert [site04].[TbFaultType] (faultName) values ('שבר')
insert [site04].[TbFaultType] (faultName) values ('דלת לא תקינה')

insert site04.[TbRoomsType] (roomTypeName) values ('אמבטיה')
insert site04.[TbRoomsType] (roomTypeName) values ('חצר')
insert site04.[TbRoomsType] (roomTypeName) values ('חדר שינה')
insert site04.[TbRoomsType] (roomTypeName) values ('מרתף')
insert site04.[TbRoomsType] (roomTypeName) values ('חדר משחקים')
insert site04.[TbRoomsType] (roomTypeName) values ('מרתף')
insert site04.[TbRoomsType] (roomTypeName) values ('שירותים')
insert site04.[TbRoomsType] (roomTypeName) values ('ממ"ד')
insert site04.[TbRoomsType] (roomTypeName) values ('חדר ארונות')
insert site04.[TbRoomsType] (roomTypeName) values ('מטבח')
insert site04.[TbRoomsType] (roomTypeName) values ('סלון')



----------------------פרוצדורות----------------------------------------------------


create proc Login
@userName varchar(30),
@pass varchar(30)
as
select * from site04.[TbUsers] where [userName]=@userName and [pass]=@pass
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

 if not exists(select * from site04.[TbUsers] where [userName]=@userName )
 begin
	if not exists(select * from site04.[TbUsers] where [email]=@email )
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


alter proc AddNewSite
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

insert into site04.[TbBuildingSite] (siteName, siteAddress,siteStatus) values (@siteName,@siteAddress,1)

 set @ID = @@IDENTITY
SELECT        site04.TbBuildingSite.siteID, site04.TbBuildingSite.siteName, site04.TbBuildingSite.siteAddress, site04.TbBuildingSite.siteStatus, site04.TbUsersType.userTypeID, site04.TbUsersType.userTypName
FROM            site04.TbBuildingSite CROSS JOIN
                         site04.TbUsersType
WHERE        (site04.TbBuildingSite.siteID = @ID) AND (site04.TbUsersType.userTypeID = 1)
if(exists(select * from [site04].[TbBuildingSite] where [siteID] = @ID))
begin 
insert site04.[TbUsersInSite] (siteID, userID, userTypeID) values (@ID,@userID,1)
end

go



create proc GetSitesForUser 
@userID int
as
SELECT        site04.TbBuildingSite.siteID, site04.TbBuildingSite.siteName, site04.TbBuildingSite.siteAddress, site04.TbBuildingSite.siteStatus, site04.TbUsersType.userTypName, site04.TbUsersInSite.userID, site04.TbUsersType.userTypeID
FROM            site04.TbBuildingSite INNER JOIN
                         site04.TbUsersInSite ON site04.TbBuildingSite.siteID = site04.TbUsersInSite.siteID INNER JOIN
                         site04.TbUsersType ON site04.TbUsersInSite.userTypeID = site04.TbUsersType.userTypeID
WHERE        (site04.TbUsersInSite.userID = @userID)
go


create proc AddRoomInSite
@siteID int,
@roomTypeID int,
@roomName nvarchar(50),
@floorNumber int,
@roomPicture nvarchar(max)
as
insert into [site04].[TbRoomsInSite] (siteID, roomTypeID, roomName, floorNumber,roomPicture)  values (@siteID,@roomTypeID,@roomName,@floorNumber,@roomPicture)
select * from [site04].[TbRoomsInSite] where roomID = @@IDENTITY


go 

create proc GetAllRoomsInSite
@siteID int
as
SELECT        site04.TbBuildingSite.siteID, site04.TbRoomsType.roomTypeName, site04.TbRoomsType.roomTypeID, TbRoomsInSite_1.roomID, TbRoomsInSite_1.roomName, TbRoomsInSite_1.floorNumber, TbRoomsInSite_1.roomPicture
FROM            site04.TbBuildingSite INNER JOIN
                         site04.TbRoomsInSite AS TbRoomsInSite_1 ON site04.TbBuildingSite.siteID = TbRoomsInSite_1.siteID INNER JOIN
                         site04.TbRoomsType ON TbRoomsInSite_1.roomTypeID = site04.TbRoomsType.roomTypeID
WHERE        (site04.TbBuildingSite.siteID = @siteID)
go

create proc UpdateWorkerInSite
@workerID int, 
@workerType int,
@siteID int
as
if not exists(select * from [site04].[TbUsersInSite] where [siteID] = @siteID and [userID] = @workerID) begin 
	insert into [site04].[TbUsersInSite](siteID, userID, userTypeID) values(@siteID, @workerID, @workerType)
end
else begin
	update [site04].[TbUsersInSite] set [userTypeID] = @workerType where [siteID] = @siteID and [userID] = @workerID
end

create proc AddFault
@ownerID int,
@workerID int,
@roomID int ,
@faultType int,
@info nvarchar(max)
as
if exists (select [userID] from [site04].[TbUsersInSite] where [userID] = @workerID and [siteID] = (select [siteID] from [site04].[TbRoomsInSite] where [roomID] = @roomID)) 
begin
	insert into [site04].[TbFaultInSite] (ownerID,workerID, roomID, faultType, info, faultStatus, openDate) values (@ownerID,@workerID,@roomID,@faultType,@info,1,GETDATE())
	select * from [site04].[TbFaultInSite] where faultID = @@IDENTITY
end
go

create proc GetAllFaultsInRoom
@roomID int
as
SELECT        site04.TbFaultInSite.faultID, site04.TbFaultInSite.ownerID, site04.TbFaultInSite.workerID, site04.TbFaultType.faultName, site04.TbFaultInSite.info, site04.TbFaultInSite.faultStatus, site04.TbFaultInSite.openDate, site04.TbFaultInSite.closeDate, 
                         site04.TbRoomsInSite.roomID, site04.TbFaultInSite.faultType
FROM            site04.TbFaultInSite INNER JOIN
                         site04.TbFaultType ON site04.TbFaultInSite.faultType = site04.TbFaultType.faultID INNER JOIN
                         site04.TbRoomsInSite ON site04.TbFaultInSite.roomID = site04.TbRoomsInSite.roomID
WHERE        (site04.TbRoomsInSite.roomID = @roomID)
go


create proc GetUserInSite
@userID int,
@siteID int
as
SELECT        site04.TbUsers.userID, site04.TbUsersInSite.siteID, site04.TbUsersType.userTypeID, site04.TbUsersType.userTypName, site04.TbUsers.userName, site04.TbUsers.firstName, site04.TbUsers.lastName, site04.TbUsers.email, site04.TbUsers.tel, 
                         site04.TbUsers.img
FROM            site04.TbUsers INNER JOIN
                         site04.TbUsersInSite ON site04.TbUsers.userID = site04.TbUsersInSite.userID INNER JOIN
                         site04.TbUsersType ON site04.TbUsersInSite.userTypeID = site04.TbUsersType.userTypeID
WHERE        (site04.TbUsers.userID = @userID) AND (site04.TbUsersInSite.siteID = @siteID)

go


create proc AddFaultPicture
@faultID int,
@faultPicture nvarchar(max)
as
insert [site04].[TbFaultPicture] (faultID, faultPicture) values (@faultID,@faultPicture)
go

create proc GetFaultPicture
@faultID int
AS
SELECT        faultID, faultPicture
FROM            site04.TbFaultPicture
WHERE        (faultID = @faultID)

GO



 alter  proc SendInvaite 
 @siteID int , 
 @senderID int ,
 @reciverName nvarchar(max),
 @userTypeID int
 as
 declare @id int=(select [userID] from  [site04].[TbUsers] where [userName]=@reciverName or [email]=@reciverName )
  if(@id = @senderID)
 begin
  select 'its not possible to sent invite to yourself '
 end
 else 
 begin
   if (@id > 0)
   begin 
   if not exists(select [userID] from [site04].[TbUsersInSite] where [siteID]=@siteID and [userID]= @id)
   begin
 if not exists (select reciverID from [site04].[TbInvaites] where siteID = @siteID and [reciverID]=@id  )
 begin 
 insert [site04].[TbInvaites] (siteID, SenderID, reciverID,userTypeID ) values (@siteID,@senderID,@id,@UserTypeID)
 select userID, userName, firstName, lastName, email, img from site04.[TbUsers] where [userID]=@id
 end
 else 
 begin 
 select 'this user is alredy invited'
 end
 end

 else
 begin 
 select 'user name or email incorrect'
 end
 end
 else
     begin
  select 'this user is alredy exists in Site'
 end
 end
 go


 alter proc GetSendInvaite
 @userID int 
 as
SELECT        site04.TbBuildingSite.siteID, site04.TbBuildingSite.siteName, site04.TbBuildingSite.siteAddress, site04.TbInvaites.SenderID, site04.TbUsers.userName, site04.TbUsers.firstName, site04.TbUsers.lastName, site04.TbUsers.tel, 
                         site04.TbUsers.img, site04.TbUsers.userID, site04.TbUsers.email, site04.TbUsersType.userTypName, site04.TbInvaites.userTypeID
FROM            site04.TbInvaites INNER JOIN
                         site04.TbBuildingSite ON site04.TbInvaites.siteID = site04.TbBuildingSite.siteID INNER JOIN
                         site04.TbUsers ON site04.TbInvaites.reciverID = site04.TbUsers.userID INNER JOIN
                         site04.TbUsersType ON site04.TbInvaites.userTypeID = site04.TbUsersType.userTypeID
WHERE        (site04.TbInvaites.SenderID =  @userID)
go

 alter proc GetReciveInvaite
 @userID int
 as
SELECT        site04.TbBuildingSite.siteID, site04.TbBuildingSite.siteName, site04.TbBuildingSite.siteAddress, site04.TbInvaites.SenderID, site04.TbUsers.userName, site04.TbUsers.firstName, site04.TbUsers.lastName, site04.TbUsers.tel, 
                         site04.TbUsers.img, site04.TbUsers.userID, site04.TbUsers.email, site04.TbUsersType.userTypName, site04.TbUsersType.userTypeID
FROM            site04.TbInvaites INNER JOIN
                         site04.TbBuildingSite ON site04.TbInvaites.siteID = site04.TbBuildingSite.siteID INNER JOIN
                         site04.TbUsers ON site04.TbInvaites.SenderID = site04.TbUsers.userID INNER JOIN
                         site04.TbUsersType ON site04.TbInvaites.userTypeID = site04.TbUsersType.userTypeID
WHERE        (site04.TbInvaites.reciverID =  @userID)
go


create proc ConfirmInvaite
@siteID int,
@senderID int,
@reciverID int
as

declare @userType int= (select [userTypeID] from [site04].[TbInvaites] where [siteID]=@siteID and [SenderID]=@senderID and [reciverID]=@reciverID)
exec UpdateWorkerInSite @reciverID ,@userType ,@siteID

SELECT        site04.TbBuildingSite.siteName, site04.TbBuildingSite.siteID, site04.TbBuildingSite.siteAddress, site04.TbUsers.userName, site04.TbUsers.firstName, site04.TbUsers.lastName, site04.TbUsers.email, site04.TbUsers.tel, site04.TbUsers.img, 
                         site04.TbUsers.Token, site04.TbUsers.userID
FROM            site04.TbBuildingSite INNER JOIN
                         site04.TbInvaites ON site04.TbBuildingSite.siteID = site04.TbInvaites.siteID INNER JOIN
                         site04.TbUsers ON site04.TbInvaites.SenderID = site04.TbUsers.userID
WHERE        (site04.TbBuildingSite.siteID = @siteID) AND (site04.TbUsers.userID = @senderID) AND (site04.TbInvaites.reciverID = @reciverID)

DELETE FROM [site04].[TbInvaites] WHERE [siteID]=@siteID and [reciverID]=@reciverID;
go 

create proc RejectInvaite
@siteID int,
@senderID int,
@reciverID int
as
SELECT        site04.TbBuildingSite.siteName, site04.TbBuildingSite.siteID, site04.TbBuildingSite.siteAddress, site04.TbUsers.userName, site04.TbUsers.firstName, site04.TbUsers.lastName, site04.TbUsers.email, site04.TbUsers.tel, site04.TbUsers.img, 
                         site04.TbUsers.Token, site04.TbUsers.userID
FROM            site04.TbBuildingSite INNER JOIN
                         site04.TbInvaites ON site04.TbBuildingSite.siteID = site04.TbInvaites.siteID INNER JOIN
                         site04.TbUsers ON site04.TbInvaites.SenderID = site04.TbUsers.userID
WHERE        (site04.TbBuildingSite.siteID = @siteID) AND (site04.TbUsers.userID = @senderID) AND (site04.TbInvaites.reciverID = @reciverID)

DELETE FROM [site04].[TbInvaites] WHERE [siteID]=@siteID and [reciverID]=@reciverID;
go 


create proc DeleteInvaite
@siteID int,
@senderID int,
@reciverID int
AS
DELETE FROM [site04].[TbInvaites] WHERE [siteID]=@siteID and [reciverID]=@reciverID and [SenderID]=@senderID;
GO




