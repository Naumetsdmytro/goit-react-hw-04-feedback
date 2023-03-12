import React, { useReducer } from 'react';

import { Section } from 'components/Section ';
import { Statistics } from 'components/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions';
import { Notification } from 'components/Notification';

function feedBackReducer(prevstate, action) {
  switch (action.type) {
    case 'good':
      return { ...prevstate, good: prevstate.good + action.payload };
    case 'neutral':
      return { ...prevstate, neutral: prevstate.neutral + action.payload };
    case 'bad':
      return { ...prevstate, bad: prevstate.bad + action.payload };
    default:
      throw new Error(`Unsuported action type ${action.type}`);
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(feedBackReducer, {
    good: 0,
    bad: 0,
    neutral: 0,
  });
  const { good, bad, neutral } = state;

  const onLeaveFeedback = evt => {
    const btnId = evt.target.id;
    dispatch({ type: btnId, payload: 1 });
  };

  const countTotalFeedback = () => {
    return good + bad + neutral;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedbacks = countTotalFeedback();
    if (totalFeedbacks >= 1) {
      return Math.round((good / totalFeedbacks) * 100) + '%';
    }
    return '';
  };

  return (
    <div
      style={{
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(state)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statictics">
        {countTotalFeedback() >= 1 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </div>
  );
};
