export const authService = {
  // Dados mockados de usuários para teste
  mockUsers: [
    {
      email: 'usuario@teste.com',
      password: 'Senha123'
    },
    {
      email: 'admin@teste.com',
      password: 'Admin123'
    },
    {
      email: 'test@mail.com',
      password: '123456'
    }
  ],

  async login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // Simula delay de rede
      setTimeout(() => {
        const user = this.mockUsers.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && 
          u.password === password
        );

        if (user) {
          resolve({
            id: Math.random().toString(36).substring(7),
            email: user.email,
            token: 'mock-token-' + Math.random().toString(36).substring(2)
          });
        } else {
          reject(new Error('invalid-credentials'));
        }
      }, 1000);
    });
  },
  
  async register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validação de senha
        if (password.length < 6) {
          reject(new Error('weak-password'));
          return;
        }

        // Verifica se email já existe
        if (this.mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          reject(new Error('email-already-in-use'));
          return;
        }

        // Adiciona novo usuário aos mocks
        this.mockUsers.push({ email, password });
        resolve({
          id: Math.random().toString(36).substring(7),
          email,
          token: 'mock-token-' + Math.random().toString(36).substring(2)
        });
      }, 1000);
    });
  }
};