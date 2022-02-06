import styled from 'styled-components';

export const ListItem = styled.li.attrs({ className: 'block text-dashas-purple ' })`
  :before {
    content: counters(item, '.') ' ';
    color: black;
    counter-increment: item;
  }
`;
export const BlListItem = styled(ListItem)`
  color: black;
`;

// eslint-disable-next-line import/prefer-default-export
export const OrderedList = styled.ol.attrs({ className: '' })`
  counter-reset: item;
`;
