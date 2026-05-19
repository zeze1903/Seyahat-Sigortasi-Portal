import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  width: '100%',
  maxWidth: '70%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

const LabelWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '20px',
}));

export default function GeneralInformation({ onFormChange, onSubmit }) {
  const [formValues, setFormValues] = useState({
    Musteri_No: '',
    Ad: '',
    Soyad: '',
    Email: '',
    Cep_Tel: '',
    Dogum_Tarih: '', // Doğum tarihi ekleniyor
    checkbox1: false,
    checkbox2: false,
  });

  const [errors, setErrors] = useState({
    Musteri_No: '',
    Ad: '',
    Soyad: '',
    Email: '',
    Cep_Tel: '',
    Dogum_Tarih: '', // Hata mesajı için Dogum_Tarih ekleniyor
  });

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    setFormValues((prev) => {
      const updatedValues = { ...prev, [field]: value };

      let errorMsg = '';

      if (field === 'Musteri_No') {
        errorMsg = /^[0-9]{11}$/.test(value) ? '' : 'Lütfen geçerli bir TC Kimlik Numarası giriniz.';
      } else if (field === 'Ad' || field === 'Soyad') {
        errorMsg = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/.test(value) ? '' : `Geçerli bir ${field === 'Ad' ? 'isim' : 'soyisim'} giriniz.`;
      } else if (field === 'Email') {
        errorMsg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Geçerli bir e-posta adresi giriniz.';
      } else if (field === 'Cep_Tel') {
        errorMsg = /^[0-9]{10,15}$/.test(value) ? '' : 'Cep telefonu numarası hatalıdır.';
      } else if (field === 'Dogum_Tarih') {
        errorMsg = value ? '' : 'Doğum tarihi gereklidir.'; // Dogum_Tarih doğrulama
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMsg,
      }));

      onFormChange(updatedValues);
      
      return updatedValues;
    });
  };

  const handleSubmit = () => {
    const isFormValid =
      !errors.Musteri_No &&
      !errors.Ad &&
      !errors.Soyad &&
      !errors.Email &&
      !errors.Cep_Tel &&
      !errors.Dogum_Tarih && // Doğum tarihi doğrulaması
      formValues.Musteri_No &&
      formValues.Ad &&
      formValues.Soyad &&
      formValues.Email &&
      formValues.Cep_Tel &&
      formValues.Dogum_Tarih && // Doğum tarihi doğrulaması
      formValues.checkbox1 &&
      formValues.checkbox2;

    if (isFormValid) {
      if (typeof onSubmit === 'function') {
        onSubmit(); // Form verilerini `App` bileşenine iletmek için `onSubmit` çağrılır.
      }
    } else {
      alert('Lütfen formu doğru doldurduğunuzdan emin olun.');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', paddingTop: 2 }}>
      <Item>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={10} md={4}>
            <LabelWrapper>
              <TextField
                id="outlined-basic-1"
                label="TC Kimlik Numarası"
                variant="outlined"
                value={formValues.Musteri_No}
                onChange={handleChange('Musteri_No')}
                error={!!errors.Musteri_No}
                sx={{ width: '100%' }}
              />
              {errors.Musteri_No && (
                <FormHelperText error>{errors.Musteri_No}</FormHelperText>
              )}
            </LabelWrapper>
          </Grid>
          <Grid item xs={10} md={4}>
            <LabelWrapper>
              <TextField
                id="outlined-basic-2"
                label="İsim"
                variant="outlined"
                value={formValues.Ad}
                onChange={handleChange('Ad')}
                error={!!errors.Ad}
                sx={{ width: '100%' }}
              />
              {errors.Ad && (
                <FormHelperText error>{errors.Ad}</FormHelperText>
              )}
            </LabelWrapper>
          </Grid>
          <Grid item xs={10} md={4}>
            <LabelWrapper>
              <TextField
                id="outlined-basic-3"
                label="Soyisim"
                variant="outlined"
                value={formValues.Soyad}
                onChange={handleChange('Soyad')}
                error={!!errors.Soyad}
                sx={{ width: '100%' }}
              />
              {errors.Soyad && (
                <FormHelperText error>{errors.Soyad}</FormHelperText>
              )}
            </LabelWrapper>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={10} md={6}>
            <LabelWrapper>
              <TextField
                id="outlined-basic-4"
                label="E-Posta Adresi"
                variant="outlined"
                value={formValues.Email}
                onChange={handleChange('Email')}
                error={!!errors.Email}
                sx={{ width: '100%' }}
              />
              {errors.Email && (
                <FormHelperText error>{errors.Email}</FormHelperText>
              )}
            </LabelWrapper>
          </Grid>
          <Grid item xs={10} md={6}>
            <LabelWrapper>
              <TextField
                id="outlined-basic-5"
                label="Cep Telefonu"
                variant="outlined"
                value={formValues.Cep_Tel}
                onChange={handleChange('Cep_Tel')}
                error={!!errors.Cep_Tel}
                sx={{ width: '100%' }}
              />
              {errors.Cep_Tel && (
                <FormHelperText error>{errors.Cep_Tel}</FormHelperText>
              )}
            </LabelWrapper>
          </Grid>
          <Grid item xs={10} md={6}> {/* Dogum_Tarih alanı */}
            <LabelWrapper>
              <TextField
                id="outlined-basic-6"
                label="Doğum Tarihi"
                variant="outlined"
                type="date"
                value={formValues.Dogum_Tarih}
                onChange={handleChange('Dogum_Tarih')}
                error={!!errors.Dogum_Tarih}
                sx={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.Dogum_Tarih && (
                <FormHelperText error>{errors.Dogum_Tarih}</FormHelperText>
              )}
            </LabelWrapper>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={10} md={12}>
            <LabelWrapper>
              <FormControlLabel
                control={<Checkbox checked={formValues.checkbox1} onChange={handleChange('checkbox1')} />}
                label="Teklif ve poliçe işlemlerinin yürütülmesi amacıyla işlenen kişisel verilere ilişkin aydınlatma metnini okudum."
                sx={{ color: '#2196f3' }}
              />
              <FormControlLabel
                control={<Checkbox checked={formValues.checkbox2} onChange={handleChange('checkbox2')} />}
                label="Ürün, hizmet, kampanya ve anketler hakkında tarafımla ticari elektronik ileti gönderilmesi ve pazarlama amacıyla iletişime geçilmesine izin veriyorum."
                sx={{ color: '#2196f3' }}
              />
            </LabelWrapper>
          </Grid>
        </Grid>
      </Item>
    </Box>
  );
}
