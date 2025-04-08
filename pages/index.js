import React, { useState } from 'react';
import '/styles/globals.css';

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
        <div className="bg-green-100 min-h-screen p-8 flex flex-col items-center">
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full mb-8 border border-green-300">
                <h1 className="text-3xl text-green-800 mb-4 text-center">🌱 Roseland Garden Pledge Tracker 🌻</h1>
                <div className="relative w-full h-6 mb-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-green-500 transition-all"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-center mb-4 text-lg">${totalPledged.toFixed(2)} pledged of ${goal} goal</p>
                <div className="space-y-2 mb-4">
                    <input
                        className="border p-2 w-full rounded"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        className="border p-2 w-full rounded"
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
                    <button onClick={handlePledge} className="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700 transition">Pledge</button>
                </div>
                <h2 className="text-xl text-green-700 mb-2 text-center">Pledge List</h2>
                <ul className="space-y-1 max-h-40 overflow-y-auto">
                    {pledges.map((pledge, index) => (
                        <li key={index} className="border-b pb-1 text-green-800">
                            {pledge.name}: ${pledge.amount.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
