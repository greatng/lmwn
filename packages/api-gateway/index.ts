import express, { Application } from 'express';
import 'dotenv/config';
import routes from './src/routes/routes';

export const app: Application = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.get('/', (req, res) => res.send('LINE MAN Wongnai Frontend Assignment'));

try {
    if (process.env.NODE_ENV !== 'test') {
        app.listen(port, (): void => {
            console.log(`Server running on port ${port}`);
        });
    }
} catch (error) {
    console.error(`Error occured: ${(error as Error).message}`);
}

