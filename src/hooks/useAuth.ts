import { useState } from 'react';

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (setCurrentView) => {
    if (isLogin) {
      // Handle login logic here
      console.log('Login with:', email, password);
      setCurrentView('scanner');
    } else {
      // Handle signup logic here
      console.log('Signup with:', email);
    }
  };

  return {
    isLogin,
    email,
    password,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    toggleAuthMode,
    handleSubmit,
  };
};

export default useAuth;