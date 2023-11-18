import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { setIsAuthenticated } from '../redux/reducers/authentication';
import { login } from '../services/authentication.service';
import { validateCredentials } from '../tools';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const issues = validateCredentials(email, password);

    // If there is an API error, clear the error when the user starts correcting the credentials
    setError('');
    setWarning(issues);
  }, [email, password, submitted]);

  const handleLogin = async () => {
    try {
      const { token } = await login(email, password);

      localStorage.setItem('token', token);

      dispatch(setIsAuthenticated(true));

      navigate('/discover');
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    setSubmitted(true);
  };

  return (
    <main className='auth'>
      <div className='column' />
      <div className='column'>
        <form autoComplete='off' onSubmit={(e) => e.preventDefault()}>
          <h2 className='white'>Login</h2>
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
          <Button onClick={handleLogin} text='Login' type='filled' />
          <div className='auth-actions'>
            <p className='font-s white'>
              Do not have an account?{' '}
              <span className='link semi-bold' onClick={() => navigate('/register')}>
                Register
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
