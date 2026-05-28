'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosIns from '../../config/constant';
import { Box, Typography, TextField, Button, Paper, InputAdornment } from '@mui/material';
import { Lock, ShieldCheck, AlertCircle, User } from 'lucide-react';
import { useColorMode } from '../../context/ThemeContext';

export default function DashboardLogin() {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mode } = useColorMode();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError('Loginingizni kiriting!');
      return;
    }
    if (code.length !== 6) {
      setError('Kod 6 xonali bo\'lishi kerak!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosIns.post('/auth/login', { username, code });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ulanishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${
      mode === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <Paper className={`max-w-md w-full p-10 rounded-[40px] border shadow-2xl transition-all duration-500 ${
        mode === 'dark' ? 'bg-[#141414] border-white/10' : 'bg-white border-black/5'
      }`}>
        <Box className="flex flex-col items-center text-center space-y-6">
          <div className="p-5 rounded-3xl bg-blue-600/10 text-blue-500">
            <Lock size={40} />
          </div>
          
          <div>
            <Typography variant="h4" className={`font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
              Admin Kirish
            </Typography>
            <Typography className="text-gray-500 text-sm">
              Dashboardga kirish uchun login va maxfiy kodni kiriting.
            </Typography>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            {/* Username Input */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={18} className="text-gray-500" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  color: mode === 'dark' ? 'white' : 'black',
                  backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  '& fieldset': { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
                }
              }}
            />

            {/* Code Input */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="0 0 0 0 0 0"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              autoComplete="off"
              slotProps={{
                input: { 
                  style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.3rem', fontWeight: 'bold' } 
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  color: mode === 'dark' ? 'white' : 'black',
                  backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  '& fieldset': { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
                }
              }}
            />

            {error && (
              <Box className="flex items-center gap-2 p-4 rounded-2xl bg-rose-500/10 text-rose-500 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={loading || !username || code.length !== 6}
              className={`py-4 rounded-2xl font-bold text-lg transition-all ${
                loading ? 'opacity-70' : 'hover:scale-[1.02] active:scale-[0.98]'
              } ${
                mode === 'dark' ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {loading ? 'Tekshirilmoqda...' : 'Tizimga kirish'}
            </Button>
          </form>

          <Box className="flex items-center gap-2 text-xs text-gray-600 font-medium pt-4">
            <ShieldCheck size={14} />
            Xavfsiz ulanish faollashtirilgan
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
