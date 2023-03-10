import styled from 'styled-components';

const Register = () => {
  return (
    <div className='register' style={{ padding: '189px 0px 150px' }}>
      <Title>Register</Title>
      <Container>
        <Block>
          <Label>First Name</Label>
          <Input placeholder='Enter first name' />
        </Block>
        <Block>
          <Label>Last Name</Label>
          <Input placeholder='Enter last name' />
        </Block>
        <Block>
          <Label>Email</Label>
          <Input placeholder='Enter email' />
        </Block>
        <Block>
          <Label>Password</Label>
          <Input placeholder='Enter password' type='password' />
        </Block>
        <Button>Register</Button>
      </Container>
    </div>
  );
};

const Title = styled.h2`
  font-weight: 900;
  font-size: 72px;
  line-height: 70px;
  letter-spacing: 0.405em;
  text-transform: uppercase;
  color: #3b668d;
  text-align: center;
  margin-bottom: 80px;
`;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 630px;
  flex-direction: column;
`;

const Block = styled.div`
  :not(:last-child) {
    margin-bottom: 37px;
  }
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 27px;
  color: #3b3f8d;
  padding-left: 50px;
`;

const Input = styled.input`
  background: #f3f3f3;
  border-radius: 61px;
  width: 569px;
  padding: 30px 0 30px 57px;
  font-weight: 700;
  font-size: 24px;
  line-height: 27px;
  color: #adadad;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #43a1d6 0%, #907eff 100%);
  border-radius: 62px;
  padding: 26px 145px;
  font-weight: 700;
  font-size: 24px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
`;

export default Register;
