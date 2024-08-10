import { Button, Drawer } from "flowbite-react";
import { useState, useEffect } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    const savedCountries = JSON.parse(localStorage.getItem("selectedCountries")) || [];
    setSelectedCountries(savedCountries);
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Drawer</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Selected Countries" />
        <Drawer.Items>
          <div>
            {selectedCountries.length === 0 ? (
              <p>No countries selected.</p>
            ) : (
              <ul>
                {selectedCountries.map((country, index) => (
                  <li key={index} className="mb-2">
                    <img src={country.flag} alt={`Flag of ${country.name}`} className="h-6 w-8" />
                    <p><strong>{country.name}</strong></p>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population.toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

export default Sidebar;
