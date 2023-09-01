import { CheckCircle } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

function Survey({ id, survey }) {
  const [isComplete, setIsComplete] = useState(false);
  const [userResponses, setUserResponses] = useState([]);

  const handleResponseChange = (questionId, response) => {
    const updatedResponses = [...userResponses];
    const existingResponseIndex = updatedResponses.findIndex((responseObj) => responseObj.questionId === questionId);

    if (existingResponseIndex !== -1) {
      updatedResponses[existingResponseIndex].choices = response;
    } else {
      updatedResponses.push({
        questionId,
        choices: response
      });
    }
    setUserResponses(updatedResponses);
  };
  const handleCreateAnswer = () => {
    console.log('ORIGINAL', survey);
    const newSurvey = [...survey];
    newSurvey.forEach((answer) => {
      const choiced = userResponses.find((item) => item.questionId === answer.id);
      answer['choices'] = choiced;
    });
    const dataSelected = {
      id,
      questions: newSurvey
    };
    console.log(dataSelected);
    console.log(userResponses);
  };
  return (
    <div>
      {isComplete ? (
        <CompleteSurveyNotification />
      ) : (
        survey?.map((q, index) => {
          return (
            <div key={index} style={{ padding: '10px' }}>
              <p>
                Câu hỏi: {q.content}
                {!q?.isRequired && <span style={{ color: 'red' }}>*</span>}
              </p>
              <div style={{ padding: '10px 0' }}>
                {q.questionType === 'CHECKBOX' && (
                  <FormControl fullWidth component='fieldset'>
                    <CheckboxGroup
                      answers={q.choices}
                      questionId={q.id}
                      userResponses={userResponses}
                      onResponseChange={handleResponseChange}
                    />
                  </FormControl>
                )}
                {q.questionType === 'RADIO' && (
                  <FormControl fullWidth component='fieldset'>
                    <MyRadioGroup
                      answers={q.choices}
                      questionId={q.id}
                      userResponses={userResponses}
                      onResponseChange={handleResponseChange}
                    />
                  </FormControl>
                )}
                {q.questionType === 'TEXT' && (
                  <FormControl fullWidth>
                    <TextFieldAnswer
                      questionId={q.id}
                      userResponses={userResponses}
                      onResponseChange={handleResponseChange}
                    />
                  </FormControl>
                )}
              </div>
            </div>
          );
        })
      )}

      <div style={{ padding: '10px' }}>
        <Button
          fullWidth
          variant='outlined'
          onClick={() => {
            setIsComplete(true);
            handleCreateAnswer();
          }}
        >
          Complete
        </Button>
      </div>
    </div>
  );
}

function CheckboxGroup({ questionId, answers, userResponses, onResponseChange }) {
  const handleCheckboxChange = (answer) => {
    const existingResponse = userResponses.find((responseObj) => responseObj.questionId === questionId);

    if (existingResponse) {
      const updatedChoices = existingResponse.choices.includes(answer)
        ? existingResponse.choices.filter((choice) => choice !== answer)
        : [...existingResponse.choices, answer];

      onResponseChange(questionId, updatedChoices);
    } else {
      onResponseChange(questionId, [answer]);
    }
  };

  return (
    <div>
      {answers.map((answer, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={userResponses?.some(
                (responseObj) => responseObj.questionId === questionId && responseObj.choices.includes(answer)
              )}
              onChange={() => handleCheckboxChange(answer)}
            />
          }
          label={answer.content}
        />
      ))}
    </div>
  );
}

const successStyles = {
  backgroundColor: '#5cb85c', // You can customize the color
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
  padding: '12px',
  width: '90%',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  justifyContent: 'center'
};

const iconStyles = {
  fontSize: '32px',
  marginRight: '8px',
  color: 'white'
};

const CompleteSurveyNotification = () => {
  return (
    <div style={successStyles}>
      <CheckCircle style={iconStyles} />
      <Typography variant='body1' style={{ color: 'white' }}>
        Survey completed successfully!
      </Typography>
    </div>
  );
};
function TextFieldAnswer({ questionId, userResponses, onResponseChange }) {
  const handleTextChange = (text) => {
    onResponseChange(questionId, text);
  };

  return (
    <TextField
      label='Your Answer'
      variant='outlined'
      value={userResponses.find((responseObj) => responseObj.questionId === questionId)?.choices || ''}
      onChange={(e) => handleTextChange(e.currentTarget.value)}
    />
  );
}
function MyRadioGroup({ questionId, answers, userResponses, onResponseChange }) {
  const handleRadioChange = (answer) => {
    onResponseChange(questionId, answer);
  };

  return (
    <RadioGroup
      aria-labelledby='demo-radio-buttons-group-label'
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}
      name='radio-buttons-group'
    >
      {answers.map((answer, index) => (
        <FormControlLabel
          key={index}
          value={answer.content}
          control={
            <Radio
              checked={userResponses?.some(
                (responseObj) => responseObj.questionId === questionId && responseObj.choices === answer
              )}
              onChange={() => handleRadioChange([answer])}
            />
          }
          label={answer.content}
        />
      ))}
    </RadioGroup>
  );
}

export default Survey;
