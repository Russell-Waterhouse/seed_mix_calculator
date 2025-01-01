import './App.css'
import { useState } from 'react'

type Seed = {
  id: number;
  name: string;
  seedsPerPound: number;
  desiredPercentage: number;
};

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateSeedPercentage(seed:Seed, foo:number) {
  return seed.desiredPercentage / seed.seedsPerPound / foo
}

function App() {
  // const [count, setCount] = useState(0);
  // const [seeds, setSeeds] = useState([] as Seed[]);
  const [totalWeight, setTotalWeight] = useState(100);

  const seeds: Seed[] = [
    {
      id: 1,
      name: 'alfalfa',
      seedsPerPound: 250000,
      desiredPercentage: 0.25,
    },
    {
      id: 2,
      name: 'clover',
      seedsPerPound: 1000000,
      desiredPercentage: 0.25,
    },
    {
      id: 3,
      name: 'rye',
      seedsPerPound: 2000000,
      desiredPercentage: 0.25,
    },
    {
      id: 4,
      name: 'wheat',
      seedsPerPound: 5000000,
      desiredPercentage: 0.25,
    },
  ];
  const foo = seeds.reduce((acc, seed) => acc + (seed.desiredPercentage / seed.seedsPerPound), 0);

  return (
    <>
      <h1>Seed Mix Calculator</h1>
      <div className="card">
        <h2>Seeds</h2>
        <ul>
          {seeds.map((seed) => (
            <li key={seed.id}>
              {seed.name} has {numberWithCommas(seed.seedsPerPound)} seeds per pound
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h2>Total Weight</h2>
        <input
          type="number"
          value={totalWeight}
          onChange={(e) => {
            setTotalWeight(parseFloat(e.target.value))
          }}
        />
      </div>
      <div className="card">
        <h2>Seed Percentage</h2>
        <ul>
          {seeds.map((seed) => (
            <li key={seed.id}>
              {seed.name} should be {(100 * calculateSeedPercentage(seed, foo)).toFixed(3)}
              % of the mix by weight, or {((totalWeight * calculateSeedPercentage(seed, foo)) || 0).toFixed(3)} pounds.
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
