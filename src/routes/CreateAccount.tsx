import { useState } from 'react';
import styled from 'styled-components';

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // create an account
    } catch (e) {
      // setError
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name='name'
          placeholder='Name'
          type='text'
          required
        />
        <Input
          onChange={onChange}
          name='email'
          placeholder='Email'
          type='email'
          required
        />
        <Input
          onChange={onChange}
          name='password'
          placeholder='Password'
          type='password'
          required
        />
        <Input type='submit' value='Create Account' />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: crimson;
`;
