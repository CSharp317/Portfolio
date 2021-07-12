-FUNCTION RETURNS THREE LARGEST INVOICE FOR EACH CUSTOMER--
 
CREATE FUNCTION dbo.udfTopInvoices
(
	@CustomerId int 
)
RETURNS TABLE 
AS RETURN (
		SELECT TOP 3 I.InvoiceID, I.InvoiceDate, SUM(l.ExtendedPrice) AS [InvoiceValue]
			FROM dbo.SaleInvoice AS I 
			   INNER JOIN dbo.SalesInvoiceLine as L
			    ON I.InvoiceID = L.InvoiceID
		WHERE I.CustomerID = @CustomerID
		GROUP BY I.InvoiceID, I.InvoiceDate 
		ORDER BY SUM(L.ExtendedPrice) DESC

);
GO


--SELECTS ALL CUSTOMERS With THEIR THREE LARGEST INVOICES--

SELECT C.CustomerID, C.CustomerName, TI.InvoiceID, TI.InvoiceDate, TI.InvoiceValue
FROM dbo.Customer AS C
OUTER APPLY dbo.udfTopInvoices(C.CustomerID) AS TI
ORDER BY C.CustomerName, TI.InvoiceValue DESC;
Go 
