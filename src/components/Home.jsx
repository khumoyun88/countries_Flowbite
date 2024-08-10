import 
 { useState } from 'react';
import Graph from './Graph';
import Sidebar from './Sidebar';

function Home() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="Home">
      <Sidebar selectedCountry={selectedCountry} />
      <Graph onCountrySelect={handleCountrySelect} />
    </div>
  );
}

export default Home;
