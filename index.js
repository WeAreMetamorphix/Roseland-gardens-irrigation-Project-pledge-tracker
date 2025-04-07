
import React, { useState } from 'react';

const App = () => {
    const [pledges, setPledges] = useState([]);
    const [totalPledged, setTotalPledged] = useState(0);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const goal = 100;

    const handlePledge = () => {
        if (!amount || isNaN(amount) || amount <= 0) return;

        const pledge = {
            name: isAnonymous ? 'Anonymous' : name || 'Anonymous',
            amount: parseFloat(amount)
        };

        setPledges([pledge, ...pledges]);
        setTotalPledged(totalPledged + pledge.amount);
        setName('');
        setAmount('');
        setIsAnonymous(false);
    };

    const progress = Math.min((totalPledged / goal) * 100, 100);

    return (
        <div className="p-4 max-w-xl mx-auto space-y-4">
            <div className="bg-white shadow-md rounded-lg p-4">
                <h1 className="text-2xl mb-2">Roseland Garden Pledge Tracker</h1>
                <div className="h-4 bg-gray-200 rounded-full mb-4">
                    <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="mb-4">${totalPledged.toFixed(2)} pledged of ${goal} goal</p>
                <div className="space-y-2 mb-4">
                    <input
                        className="border p-2 w-full mb-2"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        className="border p-2 w-full mb-2"
                        type="text"
                        placeholder="Pledge Amount (in dollars)"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={e => setIsAnonymous(e.target.checked)}
                        />
                        <label className="ml-2">Remain Anonymous on the Webpage</label>
                    </div>
                    <button onClick={handlePledge} className="bg-blue-500 text-white py-2 px-4 rounded">Pledge</button>
                </div>
                <h2 className="text-xl mb-2">Pledge List</h2>
                <ul className="space-y-1">
                    {pledges.map((pledge, index) => (
                        <li key={index} className="border-b pb-1">{pledge.name}: ${pledge.amount.toFixed(2)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
