// src/components/game/DiceRoll.js

import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

function DiceRoll() {
    const [diceConfigurations, setDiceConfigurations] = useState([
        { id: 1, diceType: 'D6', diceCount: 1 },
    ]);
    const [result, setResult] = useState(null);

    const diceOptions = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'];

    const nodeRef = useRef(null);

    const addDiceConfiguration = () => {
        setDiceConfigurations([
            ...diceConfigurations,
            { id: Date.now(), diceType: 'D6', diceCount: 1 },
        ]);
    };

    const removeDiceConfiguration = (id) => {
        setDiceConfigurations(diceConfigurations.filter((dc) => dc.id !== id));
    };

    const updateDiceConfiguration = (id, field, value) => {
        setDiceConfigurations(
            diceConfigurations.map((dc) => {
                if (dc.id === id) {
                    return { ...dc, [field]: value };
                }
                return dc;
            })
        );
    };

    const rollDice = () => {
        let totalResult = [];
        let grandTotal = 0;
        diceConfigurations.forEach((config) => {
            let total = 0;
            let rolls = [];
            const sides = parseInt(config.diceType.replace('D', ''));
            for (let i = 0; i < config.diceCount; i++) {
                let roll = Math.floor(Math.random() * sides) + 1;
                if (config.diceType === 'D100') {
                    if (roll === 100) roll = 0;
                }
                rolls.push(roll);
                total += roll;
            }
            totalResult.push({
                diceType: config.diceType,
                diceCount: config.diceCount,
                rolls,
                total,
            });
            grandTotal += total;
        });
        setResult({ totalResult, grandTotal });
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: 0, y: 0 }}
            cancel="input,textarea,select,option,button,label"
        >
            <div className="dice-roll" ref={nodeRef}>
                <h2>Rzut kośćmi</h2>
                {diceConfigurations.map((config) => (
                    <div key={config.id} className="dice-configuration">
                        <label>
                            Typ kości:
                            <select
                                value={config.diceType}
                                onChange={(e) =>
                                    updateDiceConfiguration(
                                        config.id,
                                        'diceType',
                                        e.target.value
                                    )
                                }
                            >
                                {diceOptions.map((dice) => (
                                    <option key={dice} value={dice}>
                                        {dice}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Liczba kości:
                            <input
                                type="number"
                                min="1"
                                value={config.diceCount}
                                onChange={(e) =>
                                    updateDiceConfiguration(
                                        config.id,
                                        'diceCount',
                                        parseInt(e.target.value)
                                    )
                                }
                            />
                        </label>
                        <button onClick={() => removeDiceConfiguration(config.id)}>
                            Usuń
                        </button>
                    </div>
                ))}
                <button onClick={addDiceConfiguration}>Dodaj konfigurację kości</button>
                <button onClick={rollDice}>Rzuć</button>
                {result && (
                    <div>
                        <h3>Wynik:</h3>
                        {result.totalResult.map((res, index) => (
                            <div key={index}>
                                <p>
                                    {res.diceCount}x{res.diceType}: {res.rolls.join(', ')} (Suma: {res.total})
                                </p>
                            </div>
                        ))}
                        <h4>Suma całkowita: {result.grandTotal}</h4>
                    </div>
                )}
            </div>
        </Draggable>
    );
}

export default DiceRoll;
