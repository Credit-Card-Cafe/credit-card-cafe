export const quiz:{ title: string; prompts: { reqs: string[]; prompt: string; }[]; }[] = [ 
    {title: "Who are we personalizing for?", prompts: [
        {reqs: [], prompt: "Me!"},
        {reqs: [], prompt: "My Business"}
    ]},
    {title: "I am a...", prompts: [
        {reqs: ["0.0"], prompt: "Beginner to Credit Cards"},
        {reqs: ["0.0"], prompt: "Student"},
        {reqs: ["0.0"], prompt: "Current Credit Card User"},
        {reqs: ["0.1"], prompt: "Small Business Decision Maker"},
        {reqs: ["0.1"], prompt: "Large Business Decision Maker"},
        {reqs: ["0.1"], prompt: "Employee"},
    ]},
    {title: "My Credit Score is...", prompts: [
        {reqs: [], prompt: "I don't have one"},
        {reqs: [], prompt: "300 - 579"},
        {reqs: [], prompt: "580 - 669"},
        {reqs: [], prompt: "670 - 739"},
        {reqs: [], prompt: "740 - 799"},
        {reqs: [], prompt: "800 - 850"},
        {reqs: ["1.4"], prompt: "Skip"},
    ]},
    {title: "My Financial Flexibility is...", prompts: [
        {reqs: [], prompt: "None"},
        {reqs: [], prompt: "Some"}, 
        {reqs: [], prompt: "Comfortable"},
        {reqs: [], prompt: "Very comfortable"}, 
    ]},
    {title: "I'm looking to...", prompts: [
        {reqs: ["0.0", "2.0", "2.1", "2.2"], prompt: "Build or improve my credit"},
        {reqs: ["2.2", "2.3", "3.1", "3.2", "3.3"], prompt: "Pay off existing credit card debt faster"}, 
        {reqs: ["2.3", "2.4", "2.5", "3.2", "3.3"], prompt: "Earn rewards on my everyday spending"},
        {reqs: ["0.0", "2.3", "2.4", "2.5", "3.2", "3.3"], prompt: "Save on travel expenses and perks"}, 
        {reqs: ["0.0", "2.4", "2.5", "3.2", "3.3"], prompt: "Access Premium Perks"},
        {reqs: ['0.1'], prompt: "Manage finances for my business"}, 
        {reqs: ["0.0", "2.4", "2.5", "3.3"], prompt: "Churn, Baby, Churn!"}, 
        {reqs: [], prompt: "Other/Not sure yet."},
    ]},
    {title:"My biggest expense is...", prompts: [
        {reqs: [], prompt: "Travel"},
        {reqs: [], prompt: "Dining"},
        {reqs: ["0.0"], prompt: "Groceries"},
        {reqs: [], prompt: "Gas / Transport"},
        {reqs: ["0.0"], prompt: "Shopping"},
        {reqs: ["0.1"], prompt: "Office needs"},
        {reqs: ["0.1"], prompt: "Large purchases"},
        {reqs: ["0.0"], prompt: "Covered by another card"},
        {reqs: [], prompt: "Other"}
    ]}
]
