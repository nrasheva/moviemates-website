import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Register.module.css';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { register } from '../../services/authentication.service';
import { validateCredentials } from '../../tools';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const issues = validateCredentials(email, password);

    // If there is an API error, clear the error when the user starts correcting the credentials
    setError('');
    setWarning(issues);
  }, [email, password]);

  const handleRegister = async () => {
    setSubmitted(true);

    if (!warning.length) {
      try {
        await register(email, password);

        navigate('/login');
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <main className='auth'>
      <div className={`${styles.register} column`} />
      <div className='column'>
        <form autoComplete='off' onSubmit={(e) => e.preventDefault()}>
          <h2 className='white'>Register</h2>
          <Input
            autoComplete='on'
            onChange={(value) => setEmail(value)}
            placeholder='Email'
            type='email'
            value={email}
          />
          <Input
            autoComplete='on'
            onChange={(value) => setPassword(value)}
            placeholder='Password'
            type='password'
            value={password}
          />
          <Button onClick={handleRegister} text='Register' type='filled' />
          <div className='auth-actions'>
            <p className='font-s white'>
              Already have an account?{' '}
              <span className='link semi-bold' onClick={() => navigate('/login')}>
                Login
              </span>
            </p>
          </div>
          <div className='form-messages'>
            {submitted && Boolean(warning.length) && <p className='font-s white'>{warning}</p>}
            {Boolean(error.length) && <p className='font-s white'>{error}</p>}
          </div>
        </form>
      </div>
    </main>
  );
};
