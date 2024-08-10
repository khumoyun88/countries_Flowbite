import  { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

function Graph({ onCountrySelect }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSelect = (country) => {
    try {
      // Retrieve current selections from localStorage
      let selectedCountries = JSON.parse(localStorage.getItem("selectedCountries")) || [];

      // Check if the country is already in the list
      const alreadySelected = selectedCountries.some(selected => selected.name === country.name);
      if (alreadySelected) {
        alert(`${country.name} is already selected.`);
        return;
      }

      // Add the new country to the list
      selectedCountries.push(country);

      // Save updated selections to localStorage
      localStorage.setItem("selectedCountries", JSON.stringify(selectedCountries));

      // Pass the selected country to the parent component
      onCountrySelect(country);
    } catch (error) {
      console.error("Error handling selection:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead>
          <TableRow>
            <TableHeadCell>Country</TableHeadCell>
            <TableHeadCell>Capital</TableHeadCell>
            <TableHeadCell>Flag</TableHeadCell>
            <TableHeadCell>Population</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {countries.map((country, index) => (
            <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {country.name.common}
              </TableCell>
              <TableCell>{country.capital ? country.capital[0] : 'No Capital'}</TableCell>
              <TableCell>
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  className="h-6 w-8"
                />
              </TableCell>
              <TableCell>{country.population.toLocaleString()}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleSelect({
                    name: country.name.common,
                    capital: country.capital ? country.capital[0] : 'No Capital',
                    flag: country.flags.png,
                    population: country.population,
                  })}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Select
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Graph;
