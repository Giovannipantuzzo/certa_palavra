import React from 'react';
import Image from 'next/image';
import { FooterLogo, FooterText, FooterWrap } from './styles';

export default function Footer() {
  return (
    <FooterWrap>
      <FooterLogo>
        <Image src="/logo.png" alt="" width="90" height="90" o />
      </FooterLogo>
      <FooterText>
        <p>Rua Tomé de Souza, 860, Savassi, Belo Horizonte, Minas Gerais</p>
        <p>falacomigo@certapalavra.com.br</p>
        <p>+55 31 9277-0787</p>
      </FooterText>
    </FooterWrap>
  );
}
