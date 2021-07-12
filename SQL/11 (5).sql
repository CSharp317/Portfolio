--SELECTS CUSTOMERNAME, INVOICEDATE AND INVOICEVALUE FOR TRANSACTIONS THAT ARE OF GREATER VALUE THAN THE AVERAGE FOR THE STATE--

SELECT C.CustomerName, I.InvoiceDate, I.InvoiceValue
	FROM dbo.Customer AS C
		INNER JOIN dbo.SalesInvoice AS I 
			ON C.CustomerId = I.CustomerID
		WHERE I.InvoiceValue >
		(SELECT AVG(I2.InvoiceValue)
		FROM dbo.Customer AS C2
		INNER JOIN dbo.SaleInvoice AS I2
		ON C2.CustomerID = I2.CustomerID
		WHERE C2.StateProvinceID = C.StateProvinceID)
		ORDER BY C.CustomerName, I.InvoiceDate;
