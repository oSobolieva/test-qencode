import { useState } from 'react';
import './index.css';
import LoginForm from './components/LoginForm';
import ResetPasswordForm from './components/ResetPasswordForm'
import SetPassword from './components/SetPassword';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <>
      {currentPage === 'login' && <LoginForm showResetPasswordForm={() => setCurrentPage('resetPassword')} />}
      {currentPage === 'resetPassword' && (
        <ResetPasswordForm 
          returnLoginForm={() => setCurrentPage('login')} 
          showSetPassword={() => setCurrentPage('setPassword')} 
        />
      )}
      {currentPage === 'setPassword' && <SetPassword/>}
    </>   
  );
}

export default App;
