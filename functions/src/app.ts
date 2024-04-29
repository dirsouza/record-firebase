import 'express-async-errors';
import * as express from 'express';
import { FirebaseConfig } from './configs';
import { recordRoute } from './external/routes';
import { errorsMiddleware } from './external/middlewares';

const firebaseConfig = new FirebaseConfig();
const firestore = firebaseConfig.firestore;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (_, res: express.Response) => {
  res.status(200).send("I'm alive!");
});

app.use(recordRoute(firestore));
app.use(errorsMiddleware);

export { app, firestore };
