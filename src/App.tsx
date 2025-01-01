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

function calculateSeedPercentage(seed:Seed, totalWeightFor100Seeds:number) {
  return seed.desiredPercentage / seed.seedsPerPound / totalWeightFor100Seeds
}

function App() {
  const [seeds, setSeeds] = useState([] as Seed[]);
  const [totalWeight, setTotalWeight] = useState(100);

  const totalWeightFor100Seeds = seeds.reduce((acc, seed) => acc + (seed.desiredPercentage / seed.seedsPerPound), 0);
  const totalPercentage = seeds.reduce((acc, seed) => acc + seed.desiredPercentage, 0);

  return (
    <>
      <h1>Seed Mix Calculator</h1>
      <div className="card">
        <h2>Add Seed</h2>
        <input
          type="text"
          placeholder="Name"
          id="name"
        />
        <input
          type="number"
          placeholder="Seeds per pound"
          id="seedsPerPound"
        />
        <input
          type="number"
          placeholder="Desired percentage"
          id="desiredPercentage"
        />
        <button
          onClick={() => {
            const name = (document.getElementById("name") as HTMLInputElement).value;
            const seedsPerPound = parseFloat((document.getElementById("seedsPerPound") as HTMLInputElement).value);
            const desiredPercentage = parseFloat((document.getElementById("desiredPercentage") as HTMLInputElement).value);
            setSeeds([...seeds, { id: seeds.length + 1, name, seedsPerPound, desiredPercentage }]);
            //clear the inputs
            (document.getElementById("name") as HTMLInputElement).value = "";
            (document.getElementById("seedsPerPound") as HTMLInputElement).value = "";
            (document.getElementById("desiredPercentage") as HTMLInputElement).value = "";
          }}
        >
          Add Seed
        </button>
      </div>
      {
        seeds.length === 0 ? (
          <p>Add a seed to get started</p>
        ) : (

      <div className="card">
        <h2>Seeds</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Seeds per pound</th>
              <th>Desired percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {seeds.map((seed) => (
              <tr key={seed.id}>
                <td>{seed.name}</td>
                <td>{numberWithCommas(seed.seedsPerPound)}</td>
                <td>{seed.desiredPercentage}</td>
                <td>
                  <button
                    onClick={() => {
                      setSeeds(seeds.filter((s) => s.id !== seed.id));
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        )
      }
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
      {
        totalPercentage === 100 ?
           (
        <div className="card">
          <h2>Seed Percentage</h2>
          <ul>
            {seeds.map((seed) => (
              <li key={seed.id}>
                {seed.name} should be {(100 * calculateSeedPercentage(seed, totalWeightFor100Seeds)).toFixed(3)}
                % of the mix by weight, or {((totalWeight * calculateSeedPercentage(seed, totalWeightFor100Seeds)) || 0).toFixed(3)} pounds.
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Your total seed percentages must add up to 100%</p>
      )
      }
    </>
  )
}

export default App
