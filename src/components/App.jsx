import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackButtons } from './FeedbackButtons/FeedbackButtons';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { Container } from './App.styled';
export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = stateName => {
    if (stateName === 'good') setGood(good + 1);
    if (stateName === 'neutral') setNeutral(neutral+ 1);
    if (stateName === 'bad') setBad(bad + 1);
  };

  const totalFeedback = () => {
    let total = good + neutral + bad;
    return total;
  };

  const positiveFeedback = () => {
    if (totalFeedback() === 0) {
      return 0;
    }
    return Math.round((good / totalFeedback()) * 100);
  };

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackButtons
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        ></FeedbackButtons>
      </Section>
      <Section title="Statistics">
        {totalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback()}
            positivefeedback={positiveFeedback()}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </Container>
  );
};
