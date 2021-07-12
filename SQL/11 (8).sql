--shows number of incoices and sales value by sate and category as well as the grand totals as well as a total for each state category--
SELECT S.StateProvinceName, X.CategoryName,
	COUNT(I.InvoiceID) AS [InvoiceCount], 
	SUM(I.InvoiceValue) AS [SalesValue]

FROM dbo.Customer AS C 
	INNER JOIN dbo.StateProvinceID AS S
		ON C.StateProvinceID = S.StateProvinceID
	INNER JOIN dbo.CustomerCategory AS X
		ON C.CategoryID = X.CategoryID
	INNER JOIN dbo.SaleInvoice AS I 
		ON C.CustomerID = I.CustomerID 

	GROUP BY CUBE (X.CategoryName, S.StateProvinceName)

	ORDER BY S.StateProvinceName, X.CategoryName; 
