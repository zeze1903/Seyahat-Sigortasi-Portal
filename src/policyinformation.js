import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const initialPrices = {
  'Kayak Teminatı': 350,
  'Covid-19 Teminatı': 1000,
  'Ferdi Kaza Teminatı': 500,
};

const initialReferenceNumbers = {
  'Kayak Teminatı': '0620362472-K',
  'Covid-19 Teminatı': '0620362472-C',
  'Ferdi Kaza Teminatı': '0620362472-F',
};

export default function PolicyInformation({ onFormChange }) {
  const [selectedPlan, setSelectedPlan] = useState('Süreli Paket (1 gün)');
  const [referenceNumber, setReferenceNumber] = useState('0620362472');
  const [totalPrice, setTotalPrice] = useState(272.37);
  const [showExtras, setShowExtras] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState({});

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
    let newReferenceNumber;
    let newTotalPrice;
    switch (event.target.value) {
      case 'Süreli Paket (1 gün)':
        newReferenceNumber = '0620362472';
        newTotalPrice = 272.37;
        break;
      case 'Sık Paket (1 yıl)':
        newReferenceNumber = '1234567890';
        newTotalPrice = 2867.02;
        break;
      case 'Sürekli Paket (1 yıl)':
        newReferenceNumber = '0987654321';
        newTotalPrice = 5913.22;
        break;
      case 'Sınırsız Paket (1 yıl)':
        newReferenceNumber = '1357924680';
        newTotalPrice = 8522.21;
        break;
      default:
        newReferenceNumber = '0620362472';
        newTotalPrice = 272.37;
    }
    setReferenceNumber(newReferenceNumber);
    setTotalPrice(newTotalPrice);
    onFormChange({
      policyPlan: event.target.value,
      referenceNumber: newReferenceNumber,
      totalAmount: newTotalPrice
    });
  };

  const handleSelectPlan = () => {
    setShowExtras(true);
  };

  const handleExtraChange = (event) => {
    const { name, checked } = event.target;
    const updatedExtras = { ...selectedExtras, [name]: checked };
    let newTotalPrice = totalPrice;
    let newReferenceNumber = referenceNumber;

    Object.keys(initialPrices).forEach((extra) => {
      if (updatedExtras[extra]) {
        newTotalPrice += initialPrices[extra];
        newReferenceNumber = initialReferenceNumbers[extra];
      }
    });

    setSelectedExtras(updatedExtras);
    setTotalPrice(newTotalPrice);
    setReferenceNumber(newReferenceNumber);
    onFormChange({
      policyPlan: selectedPlan,
      referenceNumber: newReferenceNumber,
      totalAmount: newTotalPrice
    });
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 2, maxWidth: 1000, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Teklif No: {referenceNumber}</Typography>
        <Typography variant="h6" sx={{ marginLeft: 4 }}>Size Özel Tutar: {totalPrice.toFixed(2)} TL</Typography>
      </Paper>
      {!showExtras ? (
        <>
          <Paper elevation={3} sx={{ padding: 2, maxWidth: 1000, mt: 2 }}>
            <RadioGroup value={selectedPlan} onChange={handlePlanChange}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="center">Süreli Paket (1 gün)</TableCell>
                      <TableCell align="center">Sık Paket (1 yıl)</TableCell>
                      <TableCell align="center">Sürekli Paket (1 yıl)</TableCell>
                      <TableCell align="center">Sınırsız Paket (1 yıl)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">Yaralanma veya hastalık nedeniyle yurtdışında tıbbi tedavi</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Vefat eden sigortalının nakli</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Yaralanma veya hastalık nedeniyle sigortalının nakli</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Seyahatin iptali</TableCell>
                      <TableCell align="center">500 EUR</TableCell>
                      <TableCell align="center">500 EUR</TableCell>
                      <TableCell align="center">500 EUR</TableCell>
                      <TableCell align="center">500 EUR</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Bagajın bulunması ve sigortalıya ulaştırılması</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                      <TableCell align="center">✓</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Gecikmeli bagaj</TableCell>
                      <TableCell align="center">100 EUR</TableCell>
                      <TableCell align="center">100 EUR</TableCell>
                      <TableCell align="center">100 EUR</TableCell>
                      <TableCell align="center">100 EUR</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Pasaport veya bilet kaybı</TableCell>
                      <TableCell align="center">200 EUR</TableCell>
                      <TableCell align="center">200 EUR</TableCell>
                      <TableCell align="center">200 EUR</TableCell>
                      <TableCell align="center">200 EUR</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Peşin Tutar</TableCell>
                      <TableCell align="center">
                        <FormControlLabel value="Süreli Paket (1 gün)" control={<Radio />} label="272.37 TL" />
                      </TableCell>
                      <TableCell align="center">
                        <FormControlLabel value="Sık Paket (1 yıl)" control={<Radio />} label="2867.02 TL" />
                      </TableCell>
                      <TableCell align="center">
                        <FormControlLabel value="Sürekli Paket (1 yıl)" control={<Radio />} label="5913.22 TL" />
                      </TableCell>
                      <TableCell align="center">
                        <FormControlLabel value="Sınırsız Paket (1 yıl)" control={<Radio />} label="8522.21 TL" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </RadioGroup>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSelectPlan}>
              Seç
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Kayak Teminatı</Typography>
            <Typography variant="body1">
              Kayak ve snowboard sırasında yaşanılan yaralanmalar. Teslim işlemi yapılmış tarifeli havayolu uçuşlarında kaybolan, zarar gören, çalınan kayak ve snowboard (350 EUR)
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedExtras['Kayak Teminatı'] || false}
                    onChange={handleExtraChange}
                    name="Kayak Teminatı"
                  />
                }
                label={`Kayak Teminatı (${initialPrices['Kayak Teminatı']} EUR)`}
              />
            </FormGroup>
          </Paper>
          <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Ferdi Kaza Teminatı</Typography>
            <Typography variant="body1">
              Ferdi Kaza sigortası; kişilerin başına gelebilecek ani ve harici olaylar nedeniyle uğrayabilecekleri bedensel zararları teminat altına alır.
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedExtras['Ferdi Kaza Teminatı'] || false}
                    onChange={handleExtraChange}
                    name="Ferdi Kaza Teminatı"
                  />
                }
                label={`Ferdi Kaza Teminatı (${initialPrices['Ferdi Kaza Teminatı']} EUR)`}
              />
            </FormGroup>
          </Paper>
          <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Covid-19 Teminatı</Typography>
            <Typography variant="body1">
              Poliçe süresinde ve şartlarında belirlenmiş teminatlar kapsamında Covid-19 tedavi masraflarını teminat altına alır.
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedExtras['Covid-19 Teminatı'] || false}
                    onChange={handleExtraChange}
                    name="Covid-19 Teminatı"
                  />
                }
                label={`Covid-19 Teminatı (${initialPrices['Covid-19 Teminatı']} EUR)`}
              />
            </FormGroup>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
