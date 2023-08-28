
import express from "express" ;
const app = express();
const PORT = 3000;

const history = [];

app.use(express.json());

function calculate(operations) {
    let result = parseFloat(operations[0]);
    for (let i = 1; i < operations.length; i += 2) {
        const operator = operations[i];
        const operand = parseFloat(operations[i + 1]);
        switch (operator) {
            case 'plus':
              operations[i] = "+";
                result += operand;
                break;
            case 'minus':
              operations[i] = "-";
                result -= operand;
                break;
            case 'into':
              operations[i] = "*";
                result *= operand;
                break;
            case 'over':
              operations[i] = "/";
                result /= operand;
                break;
            case 'modulo':
              operations[i] = "%";
            result %= operand;
            break;
            case 'power':
              operations[i] = "**";
              result **=operand;
              break;
              case 'squareroot':
                operations[i] = ")½";
              result = Math.sqrt(result);
              break;
        }
    }
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
