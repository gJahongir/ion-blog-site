'use client'
import React, { useState } from 'react'
import { Navbar, Footer } from '../component'
import { Box, Typography, Container, TextField, Button, Grid } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import InstagramIcon from '@mui/icons-material/Instagram'
import SendIcon from '@mui/icons-material/Send'
import TelegramIcon from '@mui/icons-material/Telegram'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState<any>({})

  const validate = () => {
    let tempErrors: any = {}
    if (!formData.name) tempErrors.name = "Ismingizni kiriting"
    if (!formData.email) {
      tempErrors.email = "Emailingizni kiriting"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email formatini noto'g'ri"
    }
    if (!formData.subject) tempErrors.subject = "Mavzuni kiriting"
    if (!formData.message) tempErrors.message = "Xabaringizni kiriting"

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Input o'zgarganda xatolikni o'chirib turish
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      alert("Xabar muvaffaqiyatli yuborildi!")
      console.log(formData)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <Box className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero Section */}
      <Box className="pt-32 pb-20 bg-gradient-to-b from-blue-900/10 to-transparent">
        <Container maxWidth="lg">
          <Box className="text-center mb-16">
            <Typography
              variant="h2"
              className="text-white font-bold mb-4 "
              sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}
            >
              Biz bilan <span className="text-blue-500">Bog'laning</span>
            </Typography>
            <Typography className="text-gray-400 text-center text-sm md:text-lg max-w-2xl mx-auto">
              Loyihangiz bo'yicha savollaringiz bormi? Bizga yozing va biz siz bilan tez orada bog'lanamiz.
            </Typography>
          </Box>

          {/* Contact Info Cards - One Row */}
          <Grid container spacing={3} className="mb-12 w-full m-0">
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <ContactInfoCard
                icon={<EmailIcon className="text-blue-500" />}
                title="Email"
                value="info@example.uz"
                subtitle="Bizga xat yozing"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <ContactInfoCard
                icon={<PhoneIcon className="text-blue-500" />}
                title="Telefon"
                value="+998 90 123 45 67"
                subtitle="Dush-Shan, 9:00 - 18:00"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <ContactInfoCard
                icon={<LocationOnIcon className="text-blue-500" />}
                title="Manzil"
                value="Toshkent, Chilonzor"
                subtitle="Bizning ofisimiz"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <ContactInfoCard
                icon={<InstagramIcon className='text-blue-500' />}
                title="Instagram"
                value="@joxa20_06"
                subtitle="Bizning sahifamiz"
              />
            </Grid>
            {/* telegram */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <ContactInfoCard
                icon={<TelegramIcon className='text-blue-500' />}
                title="Telegram"
                value="@joxa20_06"
                subtitle="Bizning sahifamiz"
              />
            </Grid>

          </Grid>

          {/* Contact Form - Below Cards */}
          <Box className="bg-white/5 backdrop-blur-xl p-6 md:p-12 rounded-[30px] md:rounded-[40px] border border-white/10 shadow-2xl w-full max-w-4xl mx-auto">
            <Typography variant="h5" className="text-white font-bold mb-6 md:mb-8 text-center" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
              Bizga xabar yuboring
            </Typography>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <StyledTextField
                    fullWidth
                    label="Ismingiz"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <StyledTextField
                    fullWidth
                    label="Email manzilingiz"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={12}>
                  <StyledTextField
                    fullWidth
                    label="Mavzu"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={12}>
                  <StyledTextField
                    fullWidth
                    label="Xabaringiz"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
              </Grid>


              <Box className="text-center pt-4">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  className="bg-blue-600 w-full sm:w-auto hover:bg-blue-700 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl normal-case font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20"
                >
                  Xabarni yuborish
                </Button>
              </Box>

            </form>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

const ContactInfoCard = ({ icon, title, value, subtitle }: { icon: any, title: string, value: string, subtitle: string }) => (
  <Box className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl hover:border-blue-500/50 transition-all duration-500 group h-full flex flex-col justify-center">
    <Box className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
      {icon}
    </Box>
    <Typography className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
      {title}
    </Typography>
    <Typography className="text-white font-bold text-lg md:text-xl mb-1 truncate">
      {value}
    </Typography>
    <Typography className="text-gray-400 text-xs md:text-sm italic">
      {subtitle}
    </Typography>
  </Box>
)

const StyledTextField = ({ ...props }: any) => (
  <TextField
    {...props}
    sx={{
      '& .MuiOutlinedInput-root': {
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '20px',
        '& fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#3b82f6',
        },
      },
      '& .MuiInputLabel-root': {
        color: '#6b7280',
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#3b82f6',
      },
    }}
  />
)

export default ContactPage
