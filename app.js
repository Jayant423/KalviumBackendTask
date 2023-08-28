
import express from "express" ;
import { create, all } from 'mathjs'
const math = create(all,  {})
const app = express();
const PORT = 3000;

const history = [];

app.use(express.json());

function calculate(operations) {
  for (let i = 1; i < operations.length; i += 2) {
    const operator = operations[i];
    const operand = parseFloat(operations[i + 1]);
    switch (operator) {
        case 'plus':
          operations[i] = "+";
            
            break;
        case 'minus':
          operations[i] = "-";
            
            break;
        case 'into':
          operations[i] = "*";
            
            break;
        case 'over':
          operations[i] = "/";
            
            break;
        case 'modulo':
          operations[i] = "%";
        
        break;
        case 'power':
          operations[i] = "**";
          
          break;
         
    }}
  
  const expression = operations.join('');

  
  const result = math.evaluate(expression);
  
  return result;
}

app.get('/history', (req, res) => {
    res.json(history);
});

app.get('/:operation*', (req, res) => {
    const operationString = req.params.operation + req.params[0];
    const operations = operationString.split('/');

    
    const answer = calculate(operations);

    const question = operations.join(' ');
    history.push({ question, answer });
    if (history.length > 20) {
        history.shift();
    }

    res.json({ question, answer });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});