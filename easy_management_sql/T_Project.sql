
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
	_endpoint nvarchar(max),
	p256dh nvarchar(max),
	auth nvarchar(max)
    
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
     roomID  int FOREIGN KEY REFERENCES TbRoomsInSite(roomID),
	 faultType int  FOREIGN KEY REFERENCES TbfaultType(faultID),
	 info nvarchar(max),
	 faultStatus bit not null,
	 PRIMARY KEY(faultID) 
);

create table TbFaultPicture 
(
faultID int FOREIGN KEY REFERENCES TbFaultInSite(faultID),
faultPicture nvarchar(max)
 PRIMARY KEY(faultID)
 );


------------------------הכנסת נתונים--------------------------------


insert dbo.[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('ohad92',123,'ohad','haviv','ohadhaviv92@gmail.com','0506595178')
insert dbo.[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('orhay92',123,'orhay','benaim','orhay92@gmail.com','055333333')

insert dbo.[TbUsersType] (userTypName) values ('מנהל עבודה')
insert dbo.[TbUsersType] (userTypName) values ('בעל האתר')
insert dbo.[TbUsersType] (userTypName) values ('בעל מקצוע')


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
declare @USER table(
	 userID int,
	userName varchar(30) NOT NULL ,
	pass varchar(30) NOT NULL,
	firstName nvarchar(50),
	lastName nvarchar(50),
	email varchar(50),
	tel varchar(10),
	img nvarchar (max),
	_endpoint nvarchar(max),
	p256dh nvarchar(max),
	auth nvarchar(max)

)
delete from @USER
 if not exists(select * from dbo.[TbUsers] where [userName]=@userName )
 begin
	if not exists(select * from dbo.[TbUsers] where [email]=@email )
	 begin 
		insert into TbUsers(userName, pass, firstName, lastName, email, tel)
		output inserted.* into @USER
		values (@userName,@pass,@firstName,@lastName,@email,@tel)
		select * from @USER
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

insert dbo.[TbBuildingSite] (siteName, siteAddress,siteStatus)
output inserted.* into @site
 values (@siteName,@siteAddress,1)
 select * from @site
if(exists(select * from @site))
begin 
declare @ID int
set @ID = (select siteID from @site)
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
insert [dbo].[TbRoomsInSite] (siteID, roomTypeID, roomName, floorNumber,roomPicture)  values (@siteID,@roomTypeID,@roomName,@floorNumber,@roomPicture)
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