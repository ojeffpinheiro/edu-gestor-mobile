export const authService = {
  async login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // Validação básica - substitua por sua lógica real
      if (email === 'test@mail.com' && password === '123456') {
        setTimeout(resolve, 1000); // Simula delay de rede
      } else {
        setTimeout(() => reject(new Error('invalid-credentials')), 1000);
      }
    });
  },
  
  async register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      if (password.length >= 6) {
        setTimeout(resolve, 1000);
      } else {
        setTimeout(() => reject(new Error('weak-password')), 1000);
      }
    });
  }
};