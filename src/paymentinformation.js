import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import styled from '@emotion/styled';

const paymentTypes = [
  { value: 'Peşin', label: 'Peşin' },
  { value: '2 Taksit', label: '2 Taksit' },
  { value: '3 Taksit', label: '3 Taksit' },
];

const CardContainer = styled(Paper)({
  position: 'relative',
  padding: 20,
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  backgroundColor: '#f5f5f5',
  marginBottom: '20px',
});

const CardInfo = styled('div')({
  position: 'absolute',
  top: 50,
  left: 20,
  color: '#000',
  textAlign: 'center',
  fontSize: 14,
});

export default function PaymentInformation({ totalAmount, referenceNumber }) {
  const [formValues, setFormValues] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentType: 'Peşin',
    terms: false,
    distanceSalesContract: false,
    cardStorageConsent: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    // Form doğrulama: Tüm onay kutuları işaretlenmiş olmalı
    const { terms, distanceSalesContract, cardStorageConsent } = formValues;
    setIsFormValid(terms && distanceSalesContract && cardStorageConsent);
  }, [formValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:44350/api/Odeme', {
        Police_No: 1, 
        Musteri_No: '12345678901', 
        Kart_No: parseInt(formValues.cardNumber.replace(/\D/g, ''), 10),
        Kul_Tarih: new Date().toISOString(),
        CVC: parseInt(formValues.cvv, 10),
      });
      console.log(response.data);
      alert('Ödeme başarıyla eklendi.');
      setFormValues({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        paymentType: 'Peşin',
        terms: false,
        distanceSalesContract: false,
        cardStorageConsent: false,
      });
    } catch (error) {
      console.error('Ödeme eklenirken hata oluştu:', error.response ? error.response.data : error.message);
      alert('Ödeme eklenirken hata oluştu.');
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {/* Üst Bilgi Bölümü */}
      <Box sx={{ width: '70%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Paper elevation={3} sx={{ padding: 2, width: '48%' }}>
          <Typography variant="h6" gutterBottom>Ödeme Bilgileri</Typography>
          <Typography variant="h6">Teklif No: {referenceNumber || 'Bilinmiyor'}</Typography>
          <Typography variant="h6">Toplam Ücret: {Number(totalAmount).toFixed(2)} TL</Typography>
        </Paper>
      </Box>

      {/* Ödeme Formu */}
      <form onSubmit={handleSubmit} style={{ width: '70%', display: 'flex', gap: 4 }}>
        <Paper elevation={3} sx={{ padding: 2, width: '50%' }}>
          <Typography variant="h6" gutterBottom>Ödeme Formu</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="İsim"
                variant="outlined"
                fullWidth
                name="cardName"
                value={formValues.cardName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Kart Numarası"
                variant="outlined"
                fullWidth
                name="cardNumber"
                value={formValues.cardNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="AA/YY"
                variant="outlined"
                fullWidth
                name="expiryDate"
                value={formValues.expiryDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                name="cvv"
                value={formValues.cvv}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Ödeme Tipi"
                name="paymentType"
                value={formValues.paymentType}
                onChange={handleInputChange}
                helperText="Lütfen ödeme tipini seçiniz"
                variant="outlined"
                fullWidth
              >
                {paymentTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <CardContainer elevation={3}>
            
            <CardInfo>
              <Typography>{formValues.cardName}</Typography>
              <Typography>{formValues.cardNumber}</Typography>
              <Typography>{formValues.expiryDate}</Typography>
              <Typography>{formValues.cvv}</Typography>
            </CardInfo>
          </CardContainer>

          <Paper elevation={3} sx={{ padding: 2, marginBottom: '20px' }}>
            <Typography variant="h6">Bilgilendirme ve Onay</Typography>
            <FormGroup sx={{ mt: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={formValues.terms} onChange={handleCheckboxChange} name="terms" />}
                label="Bilgilendirme Formunu okudum, onaylıyorum."
              />
              <FormControlLabel
                control={<Checkbox checked={formValues.distanceSalesContract} onChange={handleCheckboxChange} name="distanceSalesContract" />}
                label="Mesafeli Satış Sözleşmesini okudum, onaylıyorum."
              />
              <FormControlLabel
                control={<Checkbox checked={formValues.cardStorageConsent} onChange={handleCheckboxChange} name="cardStorageConsent" />}
                label="Kredi Kartı bilgilerimin sonraki işlemlerim için kullanılması amacıyla bilgilendirme metni kapsamında saklanmasını kabul ediyorum."
              />
            </FormGroup>
          </Paper>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isFormValid} // Butonun aktif olup olmamasını kontrol et
          >
            Ödemeyi Tamamla
          </Button>
        </Box>
      </form>
    </Box>
  );
}
