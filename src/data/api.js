export const fetchStats = () =>
    Promise.resolve({
        customers: 10243,
        income: 39403450,
    });

export const fetchIncomeChart = () =>
    Promise.resolve([
        { name: "Jan", income: 5000, expenses: 3000, profit: 2000 },
        { name: "Feb", income: 7000, expenses: 4000, profit: 3000 },
        { name: "Mar", income: 6000, expenses: 3500, profit: 2500 },
        { name: "Apr", income: 8000, expenses: 4500, profit: 3500 },
        { name: "May", income: 7500, expenses: 4000, profit: 3500 },
        { name: "Jun", income: 9000, expenses: 5000, profit: 4000 },    
    ]
    );
