import Image from 'next/image';
import { GrLocation } from 'react-icons/gr';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import {
  ImageBox,
  Location,
  LocationContainer,
  TextBox,
  YourSpace,
  YourSpaceContainer,
  LogOut,
} from './styles';

Header.Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 25vh;
  flex-direction: column;
  @media (max-width: 800px) {
    display: none;
  }
`;

Header.Top = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  height: 75%;
  background-color: ${({ theme }) => theme.colors.rose};
`;

Header.Carrinho = styled.span`
  font-size: 12px;
  background: #ff0000;
  color: #fff;
  padding: 0 5px;
  vertical-align: top;
  margin-left: -10px;
  margin-bottom: 25px;
  margin-top: -10px;
  font-weight: 600;
  border-radius: 9px; 
`;

export default function Header() {
  const { logout } = useAuth();

  // const handleKeypress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSubmit();
  //   }
  // };

  return (
    <Header.Wrapper>
      <Header.Top>
        <ImageBox>
          <Link href="/Home">
            <Image src="/images/LogoWeb.png" alt="" width="250" height="100" />
          </Link>
        </ImageBox>
        <YourSpaceContainer>
          <YourSpace>
            <BsFillPersonFill />
          </YourSpace>
        </YourSpaceContainer>
        <LogOut onClick={logout}>
          <Link href="/login">
            <FiLogIn size="30" color="#AA4545" style={{ cursor: 'pointer' }} />
          </Link>
        </LogOut>
      </Header.Top>
    </Header.Wrapper>
  );
}
