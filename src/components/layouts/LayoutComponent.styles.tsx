import styled from 'styled-components';

export const Main = styled.main.attrs({
  className: 'flex h-max flex-grow items-center justify-center ',
})``;

export const LogosWrapper = styled.div.attrs({ className: 'relative bottom-0 left-4 flex' })``;

export const MainTileWithShadow = styled.div.attrs({
  className: 'relative flex flex-col gap-y-4 rounded-3xl shadow-2xl md:relative md:mx-16 md:mt-10',
})``;

export const AppName = styled.span.attrs({
  className: 'pl-4 text-2xl font-bold text-white text-shadow-lg sm:text-5xl pointer-events-none',
})``;
