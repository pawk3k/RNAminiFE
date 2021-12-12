import React, { FunctionComponent, useState, ReactNode } from 'react';

type Emotion = 'happy' | 'sad' | 'angry' | 'neutral';

const EmotionalState: FunctionComponent<{ render: (emotion: Emotion) => ReactNode }> = ({
  render,
}) => {
  const [emotion, setEmotion] = useState<Emotion>('sad');

  return (
    <div className="absolute bg-white w-full flex flex-col text-center">
      <div className="flex mx-auto justify-center gap-5 w-40">
        <button type="button" onClick={(): void => setEmotion('happy')}>
          😃
        </button>
        <button type="button" onClick={(): void => setEmotion('sad')}>
          😭
        </button>
      </div>
      <div className="w-full">
        <span className="text-9xl">🏦</span>
      </div>
      {render(emotion)}
    </div>
  );
};

const Guy: FunctionComponent = () => (
  <EmotionalState render={(emotion): ReactNode => <div>{emotion}</div>} />
);

const HelpView: FunctionComponent = () => (
  <div>
    <Guy />
  </div>
);

export default HelpView;
