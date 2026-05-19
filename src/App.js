import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import GeneralInformation from './generalinformation';
import TravelInformation from './travelinformation';
import PolicyInformation from './policyinformation';
import PaymentInformation from './paymentinformation';

const steps = ['Genel Bilgiler', 'Seyahat Bilgileri', 'Poliçe Bilgileri', 'Ödeme Bilgileri'];

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [formData, setFormData] = useState({
    Musteri_No: '',
    Ad: '',
    Soyad: '',
    Email: '',
    Cep_Tel: '',
    Dogum_Tarih: '', 
    checkbox1: false,
    checkbox2: false,
    startDate: null,
    endDate: null,
    country: '',
    policyPlan: 'Süreli Paket (1 gün)',
    referenceNumber: '0620362472',
    totalAmount: 272.37, // totalAmount'ı bir sayı olarak tanımlayın
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [isFormValid, setIsFormValid] = useState(false);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    
    if (activeStep === steps.length - 1) {
      try {
        // Veriyi API'ye gönder
        const response = await axios.post('https://localhost:44350/api/musteri/register', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // API yanıtını kontrol et
        if (response.status === 200) {
          console.log('Veriler başarıyla gönderildi:', response.data);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          console.error('API yanıt hatası:', response);
        }
      } catch (error) {
        console.error('Veri gönderme hatası:', error);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      Musteri_No: '',
      Ad: '',
      Soyad: '',
      Email: '',
      Cep_Tel: '',
      Dogum_Tarih: '', 
      checkbox1: false,
      checkbox2: false,
      startDate: null,
      endDate: null,
      country: '',
      policyPlan: 'Süreli Paket (1 gün)',
      referenceNumber: '0620362472',
      totalAmount: 272.37, // totalAmount'ı bir sayı olarak tanımlayın
    });
  };

  const handleFormChange = (updatedValues) => {
    const newFormData = { ...formData, ...updatedValues };
    setFormData(newFormData);

    const isGeneralInfoValid =
      newFormData.Musteri_No &&
      newFormData.Ad &&
      newFormData.Soyad &&
      newFormData.Email &&
      newFormData.Cep_Tel &&
      newFormData.Dogum_Tarih &&
      newFormData.checkbox1 &&
      newFormData.checkbox2;

    const isTravelInfoValid =
      newFormData.startDate &&
      newFormData.endDate &&
      newFormData.country;

    const isPolicyInfoValid = newFormData.policyPlan && newFormData.referenceNumber;

    setIsFormValid(
      (activeStep === 0 && isGeneralInfoValid) ||
      (activeStep === 1 && isTravelInfoValid) ||
      (activeStep === 2 && isPolicyInfoValid)
    );
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            ANADOLU SİGORTA
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Ana Sayfa</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sigorta Satın Al</MenuItem>
            <MenuItem onClick={handleMenuClose}>En Yakın</MenuItem>
            <MenuItem onClick={handleMenuClose}>Hasar Dosya Sorgulama</MenuItem>
            <MenuItem onClick={handleMenuClose}>Bize Ulaşın</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sıkça Sorulan Sorular</MenuItem>
            <MenuItem onClick={handleMenuClose}>Giriş Yap</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Paper elevation={3} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2, mb: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6">Yurt Dışı Seyahat Sigortası</Typography>
      </Paper>
      <Stepper activeStep={activeStep} sx={{ minWidth: '50%', mt: 2 }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption"></Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Tüm adımlar tamamlandı - bitirdiniz
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Sıfırla</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && <GeneralInformation onFormChange={handleFormChange} onSubmit={handleNext} />}
          {activeStep === 1 && <TravelInformation onFormChange={handleFormChange} />}
          {activeStep === 2 && <PolicyInformation onFormChange={handleFormChange} />}
          {activeStep === 3 && <PaymentInformation totalAmount={formData.totalAmount.toFixed(2)} referenceNumber={formData.referenceNumber} />}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            {activeStep !== 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Geri
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!isFormValid}
            >
              {activeStep === steps.length - 1 ? 'Tamamla' : 'Devam'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
