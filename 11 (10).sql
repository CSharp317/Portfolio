--displays the number of sales orders and number of purchase orders by year and month--
SELECT COALESCE(S.Year], P.[Year]) AS [Year],
    COALESCE(S.[Month], P.[Month]) AS [Month],
	S.SalesOrders, P.PurchaseOrders

	FROM 
		  (SELECT YEAR(OrderDate) As [Year], MONTH(OrderDate) As [Month], COUNT(*) AS [SalesOrders]
			FROM dbo.SalesOrder
			GROUP BY YEAR(OrderDate), MONTH(OrderDate)) AS S
			FULL OUTER JOIN
			(SELECT YEAR(ORDERDATE) AS [Year], MONTH(OrderDate) AS [Month], COUNT(*) AS [PurchaseOrders]
			     FROM dbo.PurchaseOrder
				 GROUP BY YEAR(OrderDate), MONTH(OrderDate)) AS P

		ON S.[Year] = P.[Year] AND S.[Month] = P.[Month]

ORDER BY COALESCE(S.[Year], P.[Year]), COALESCE(S.[Month], P.[Month]);
