
/*
Use Master
GO
Drop Database Project
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
	tel varchar(10)
    
);





CREATE TABLE TbBuildingSite (
	siteID int identity(1,1) NOT NULL PRIMARY KEY,
	siteAddress nvarchar(100) NOT NULL ,
	siteOwner int  FOREIGN KEY REFERENCES TbUsers(userID) ,
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
	PRIMARY KEY(roomID)
	);
	

	CREATE TABLE  TbFaultType
	(
	faultID  int identity(1,1) NOT NULL PRIMARY KEY,
	faultName nvarchar(50) NOT NULL,
	);

CREATE TABLE TbFaultInSite (
     faultID  int identity(1,1) NOT NULL ,
     roomID  int FOREIGN KEY REFERENCES TbRoomsInSite(roomID),
	 faultType int  FOREIGN KEY REFERENCES TbfaultType(faultID),
	 info nvarchar(max),
	 faultStatus bit not null,
	 PRIMARY KEY(faultID,roomID,faultType) 
);

------------------------הכנסת נתונים--------------------------------


insert [dbo].[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('ohad92',123,'ohad','haviv','ohadhaviv92@gmail.com','0506595178')
insert [dbo].[TbUsers] (userName, pass, firstName, lastName, email, tel) values ('orhay92',123,'orhay','benaim','orhay92@gmail.com','055333333')






----------------------פרוצדורות----------------------------------------------------


create proc Login
@userName varchar(30),
@pass varchar(30)
as
select * from [dbo].[TbUsers] where [userName]=@userName and [pass]=@pass
go 

alter proc Register (
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
	tel varchar(10)
)
 if not exists(select * from [dbo].[TbUsers] where [userName]=@userName )
 begin
 if not exists(select * from [dbo].[TbUsers] where [email]=@email )
 begin 
insert into TbUsers(userName, pass, firstName, lastName, email, tel)
output inserted.* into @USER
values (@userName,@pass,@firstName,@lastName,@email,@tel)
select * from @USER
end
end
go 







