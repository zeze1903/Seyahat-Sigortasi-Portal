import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';

export default function TravelInformation({ onFormChange }) {
  const [countries, setCountries] = useState([]);
  const [formValues, setFormValues] = useState({
    startDate: null,
    endDate: null,
    country: '',
  });

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryNames = response.data.map(country => ({
          label: country.translations?.tur?.common || country.name.common // Türkçe çeviri varsa onu kullan
        }));
        setCountries(countryNames);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleDateChange = (field) => (value) => {
    const newDate = value ? dayjs(value).format('DD-MM-YYYY') : '';
    setFormValues((prev) => {
      const updatedValues = { ...prev, [field]: newDate };
      onFormChange(updatedValues); // Call onFormChange with updated values
      return updatedValues;
    });
  };

  const handleCountryChange = (event, value) => {
    setFormValues((prev) => {
      const updatedValues = { ...prev, country: value ? value.label : '' };
      onFormChange(updatedValues); // Call onFormChange with updated values
      return updatedValues;
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
        <Paper elevation={3} sx={{ padding: 5, maxWidth: 800 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Gidiş Tarihi"
                  value={formValues.startDate ? dayjs(formValues.startDate) : null}
                  onChange={handleDateChange('startDate')}
                  format="DD-MM-YYYY"
                />
              </DemoContainer>
              
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Dönüş Tarihi"
                  value={formValues.endDate ? dayjs(formValues.endDate) : null}
                  onChange={handleDateChange('endDate')}
                  format="DD-MM-YYYY"
                />
              </DemoContainer>
            </Box>
            <Autocomplete
              disablePortal
              id="country-select"
              options={countries}
              value={formValues.country ? { label: formValues.country } : null}
              onChange={handleCountryChange}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              renderInput={(params) => <TextField {...params} label="Gidilecek Ülke" />}
            />
            <Box component="div" sx={{ textAlign: 'center', fontSize: 20, mt: 2 }}>
              {"Seyahatinizle ilgili beklenmedik durumlara veya vize taleplerine göre, poliçenin başlangıç ve bitiş tarihinin seyahat tarihinizden bir gün önce ve bir gün sonra olmasını öneririz."}
            </Box>
          </Box>
        </Paper>
      </LocalizationProvider>
    </Box>
  );
}