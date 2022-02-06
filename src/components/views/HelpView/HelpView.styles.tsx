import styled, { StyledComponent } from 'styled-components';

import { Heading4 as Heading4Base } from '@components/uiKit/Typography';
// eslint-disable-next-line import/prefer-default-export
export const InPageLink = styled.a.attrs({
  className: 'no-underline text-dashas-purple hover:opacity-80 cursor-pointer hover:underline',
})``;

export const Heading: StyledComponent<'h4', object, object, 'className'> = styled(
  Heading4Base,
).attrs({ className: 'text-dashas-pink border-b-2' })`
  ::before {
    content: '# ';
  }
`;
