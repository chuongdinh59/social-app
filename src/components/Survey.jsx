import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
  Button
} from '@mui/material';

function Survey({ survey }) {
  return (
    <div>
      {survey.questions.map((q, index) => {
        return (
          <div key={index} style={{ padding: '10px' }}>
            <p>Câu hỏi: {q.content}</p>
            <div style={{ padding: '10px 0' }}>
              {q.questionType === 'CHECKBOX' && (
                <FormControl fullWidth component='fieldset'>
                  <CheckboxGroup answers={q.answers} />
                </FormControl>
              )}
              {q.questionType === 'RADIO' && (
                <FormControl fullWidth component='fieldset'>
                  <MyRadioGroup answers={q.answers} />
                </FormControl>
              )}
              {q.questionType === 'TEXT' && (
                <FormControl fullWidth>
                  <TextField label='Your Answer' variant='outlined' />
                </FormControl>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ padding: '10px' }}>
        <Button fullWidth variant='outlined'>
          Complete
        </Button>
      </div>
    </div>
  );
}

function CheckboxGroup({ answers }) {
  return (
    <div>
      {answers.map((answer, index) => (
        <FormControlLabel key={index} control={<Checkbox />} label={answer.content} />
      ))}
    </div>
  );
}

function MyRadioGroup({ answers }) {
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
        <FormControlLabel key={index} value={answer.content} control={<Radio />} label={answer.content} />
      ))}
    </RadioGroup>
  );
}

export default Survey;
