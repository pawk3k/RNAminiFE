import styled from 'styled-components';

export const Heading1 = styled.h1.attrs({ className: 'text-denim-blue font-extrabold' })`
  font-size: 40px;
  line-height: 54.56px;
`;

export const Heading2 = styled.h2.attrs({ className: 'text-denim-blue font-extrabold' })`
  font-size: 32px;
  line-height: 43.65px;
`;

export const Heading3 = styled.h3.attrs({
  className: 'text-denim-blue font-bold',
})`
  font-size: 28px;
  line-height: 38.19px;
`;

export const Heading4 = styled.h4.attrs({
  className: 'text-denim-blue font-bold',
})`
  font-size: 24px;
  line-height: 32.74px;
`;

export const Heading5 = styled.h5.attrs({
  className: 'text-denim-blue font-semibold',
})`
  font-size: 22px;
  line-height: 30.01px;
`;

export const Heading6 = styled.h6.attrs({
  className: 'text-denim-blue font-semibold',
})`
  font-size: 18px;
  line-height: 24.55px;
`;

export const Body = styled.p.attrs({
  className: 'text-nevada font-normal',
})`
  font-size: 16px;
  line-height: 21.82px;
`;

export const BodySmall = styled.p.attrs({
  className: 'text-nevada font-normal bg-dashas-pink p-2 rounded-md',
})`
  font-size: 14px;
  line-height: 19.1px;
`;

export const BodyUltraSmall = styled.p.attrs({
  className: 'text-nevada font-normal',
})`
  font-size: 12px;
  line-height: 16.37px;
`;
