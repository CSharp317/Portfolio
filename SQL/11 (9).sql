DECLARE @j nvarchar(max) = N'{"customers": [' +
	N'{"id" 1001, "name": "Andrew Smith", "city": "Seattle"},' +
	N'{"id" 1002, "name": "Naoi Tanaka", "city": "Tokyo"},' +
	N'{"id" 1003, "name": "Desiree Smith", "city": "Houstin"},' +
	N'{"id" 1004, "name": "Alonzo Daughtery", "city": "San Diego"},' +
	N'{"id" 1005, "name": "Maliyah Todd", "city": "Indianapolis"},' +
	N'{"id" 1006, "name": "Lewis Wade", "city": "Charlotte"},' +
	N'{"id" 1007, "name": "Greta Alvarado", "city": "Boston"},' +
	N'{"id" 1008, "name": "Sariah Hansen", "city": "Portland"},' +
	N'{"id" 1009, "name": "Aniya Costa", "city": "Las Vegas"},' +
	N'{"id" 1010, "name": "Oswaldo Bates", "city": "Milwaukee"},' +
	N'{"id" 1011, "name": "Larry Stokes", "city": "Scottsdale"},' +
	N'{"id" 1012, "name": "Kasey Larson", "city": "Buffalo"},' +
	N'{"id" 1013, "name": "Charlize McCarthy", "city": "Paris"},' +
	N'{"id" 1014, "name": "Karissa Lyons", "city": "Spokane"},' +
	N'{"id" 1015, "name": "Eric Brennan", "city": "Tacoma"},' +
	N'{"id" 1016, "name": "Cornelius Sloan", "city": "Aurora"},' +
	N'{"id" 1017, "name": "Dayanara Huynh", "city": "Yonkers"},' +
	N'{"id" 1018, "name": "Maci Moran", "city": "Akron"},' +
	N'{"id" 1019, "name": "Mikalya Curtis", "city": "Seattle"},' +
	N'{"id" 1020, "name": "Dalia Wilkins", "city": "McKinney"},' +
	N'{"id" 1021, "name": "Silas Calderon", "city": "Ontario"},' +
	N'{"id" 1022, "name": "Londyn Paul", "city": "Chattanooga"},' +
	N'{"id" 1023, "name": "Marcus Hanna", "city": "Fort Collins"},' +
	N'{"id" 1024, "name": "Ariana Barrett", "city": "Springfield"},' +
	N'{"id" 1025, "name": "Lacey Nguyen", "city": "Pomona"},' +
	N'{"id" 1026, "name": "Ryker Williamson", "city": "Kansas City"},' +
	N'{"id" 1027, "name": "Leah Moses", "city": "Murfreesboro"},' +
	N'{"id" 1028, "name": "Gage Ortiz", "city": "Athens"},' +
	N'{"id" 1029, "name": "David Proctor ", "city": "Topeka"},' +
	N'{"id" 1030, "name": "Irene Ho", "city": "Lansing"},' +
	N'{"id" 1031, "name": "Landyn Frey", "city": "Rochester"},' +
	N'{"id" 1032, "name": "Wilson Salinas", "city": "Milwaukee"}]}';

	--queries the data to be formatted as a SQL Server Table---

	--SELECT * 
	--FROM OPENJSON(@j,N'$.customers')
	--WITH (
	--CustomerID int '$.id',
	--CustomerName nvarchar(5) '$.name',
	--City nvarchar(50) '$.city'
    --);
