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
        <p>CNPJ - 12.123.123/1234-12</p>
        <p>Rua &quot;Nome da Rua&quot;, Num, Bairro &quot;Nome do bairro&quot;, &quot;Cidade&quot;/&quot;Estado&quot;</p>
        <p>CEP 12345-678</p>
      </FooterText>
    </FooterWrap>
  );
}
