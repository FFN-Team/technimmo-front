import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { isBefore, isAfter, addYears, subYears, format } from 'date-fns';
import './Table.css';

const style = {
  container: {
    display: 'inline-block',
    marginRight: '20px',
    verticalAlign: 'top'
  },

  label: {
    marginRight: '10px',
    fontWeight: 'bold'
  }
};

const formatPrice = (price) => {
  if (price != null) return price.toLocaleString() + ' € / m²';
  return 'Aucun bien vendu.';
};

const formatDifference = (difference, zone, currentPropertyStatistics) => {
  if (difference == null)
    return 'Aucun bien vendu pour ' + (currentPropertyStatistics.price == null ? currentPropertyStatistics.zone : zone);
  if (difference < 0)
    return (
      <p>
        <span style={{ fontWeight: 'bold', color: 'red' }}>{(difference * -1).toLocaleString() + ' % plus cher'}</span>
        {' que ' + zone}
      </p>
    );
  if (difference > 0)
    return (
      <p>
        <span style={{ fontWeight: 'bold', color: 'green' }}>{difference.toLocaleString() + ' % moins cher'}</span>
        {' que ' + zone}
      </p>
    );
  return 'Même prix que ' + zone + ' (' + difference.toLocaleString() + ' %)';
};

const PropertyPriceComparisonTable = () => {
  const { id } = useParams();
  const inputFormat = 'yyyy-MM-dd';
  const apiFormat = 'dd-MM-yyyy';
  const [startDate, setStartDate] = useState(subYears(new Date(), 100));
  const [endDate, setEndDate] = useState(new Date());
  const [currentPropertyStatistics, setCurrentPropertyStatistics] = useState();
  const [comparisonStatistics, setComparisonStatistics] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const url =
          `http://localhost:9001/api/v1/statistics/sales-history/properties/${id}?` +
          `start-date=${format(startDate, apiFormat)}&end-date=${format(endDate, apiFormat)}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setCurrentPropertyStatistics(data[0]);
        setComparisonStatistics(data.slice(1));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, [id, startDate, endDate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleChangeStartDate = (newStartDate) => {
    if (startDateIsValid(newStartDate)) setStartDate(newStartDate);
  };

  const handleChangeEndDate = (newEndDate) => {
    if (endDateIsValid(newEndDate)) setEndDate(newEndDate);
  };

  const startDateIsValid = (startDate) => {
    return isAfter(startDate, startDateMin()) && isBefore(startDate, endDate);
  };

  const endDateIsValid = (endDate) => {
    return isAfter(endDate, startDate) && isBefore(endDate, endDateMax());
  };

  const startDateMin = () => {
    const dateMin = new Date(1900, 1, 1);
    var endDateMinus100Years = subYears(endDate, 100);
    return isBefore(dateMin, endDateMinus100Years) ? endDateMinus100Years : dateMin;
  };

  const endDateMax = () => {
    const today = new Date();
    var startDatePlus100Years = addYears(startDate, 100);
    return isBefore(startDatePlus100Years, today) ? startDatePlus100Years : today;
  };

  return (
    <div>
      <h2>Comparaison des prix</h2>

      <div style={style.container}>
        <label htmlFor="startDate" style={style.label}>
          Date de début :
        </label>
        <br />
        <input
          type="date"
          id="startDate"
          name="startDate"
          style={style.input}
          onChange={(e) => handleChangeStartDate(e.target.value)}
          value={format(startDate, inputFormat)}
          min={format(startDateMin(), inputFormat)}
          max={format(endDate, inputFormat)}
        ></input>
      </div>

      <div style={style.container}>
        <label htmlFor="endDate" style={style.label}>
          Date de fin :
        </label>
        <br />
        <input
          type="date"
          id="endDate"
          name="endDate"
          style={style.input}
          onChange={(e) => handleChangeEndDate(e.target.value)}
          value={format(endDate, inputFormat)}
          min={format(startDate, inputFormat)}
          max={format(endDateMax(), inputFormat)}
        ></input>
      </div>

      <br />
      <br />
      <br />

      <label style={{ fontSize: '15px' }}>
        <span style={{ fontWeight: 'bold' }}>Prix moyen au {currentPropertyStatistics.zone}</span> :{' '}
        {formatPrice(currentPropertyStatistics.price)}
      </label>

      <br />
      <br />

      <table>
        <thead>
          <td>Différence</td>
          <td>Prix moyen au m²</td>
        </thead>
        {comparisonStatistics.map((line) => (
          <tbody key={line.zone}>
            <td>{formatDifference(line.difference, line.zone, currentPropertyStatistics)}</td>
            <td>{formatPrice(line.price)}</td>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default PropertyPriceComparisonTable;
