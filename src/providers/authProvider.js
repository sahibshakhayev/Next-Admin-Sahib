import axios from 'axios';

const authProvider = {
  login: async ({ email, password }) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });

      const currentTime = Math.floor(Date.now() / 1000);

      // Сохраняем токены и время истечения
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('permissions', data.user_type);
      localStorage.setItem('access_token_expiry', String(currentTime + data.access_expire * 60));
      localStorage.setItem('refresh_token_expiry', String(currentTime + data.refresh_expire * 60));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
    localStorage.clear();
    return Promise.resolve();
  },

  checkAuth: async () => {
    const accessToken = localStorage.getItem('access_token');
    const accessTokenExpiry = parseInt(localStorage.getItem('access_token_expiry'), 10);
    const currentTime = Math.floor(Date.now() / 1000);

    if (accessToken && currentTime < accessTokenExpiry) {
      try {
        await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return Promise.resolve();
      } catch (error) {
        if (error.response?.status === 401) {
          return authProvider.refreshToken();
        }
      }
    }

    return Promise.reject('No valid token');
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      authProvider.logout();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    return Promise.resolve(localStorage.getItem('permissions'));
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const currentTime = Math.floor(Date.now() / 1000);
    const refreshTokenExpiry = parseInt(localStorage.getItem('refresh_token_expiry'), 10);

    if (!refreshToken || currentTime >= refreshTokenExpiry) {
      authProvider.logout();
      return Promise.reject('Session expired. Please log in again.');
    }

    try {
      const { data } = await axios.post('/api/auth/refresh', {}, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      const newAccessTokenExpiry = currentTime + data.access_expire * 60;
      const newRefreshTokenExpiry = currentTime + data.refresh_expire * 60;

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('access_token_expiry', String(newAccessTokenExpiry));
      localStorage.setItem('refresh_token_expiry', String(newRefreshTokenExpiry));

      return Promise.resolve();
    } catch (error) {
      authProvider.logout();
      return Promise.reject('Failed to refresh token');
    }
  },
};

export default authProvider;
