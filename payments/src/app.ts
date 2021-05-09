import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@eg-ticketing/common';

const app = express();
// TRUST NGINX
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'test' ? true : false,
	})
);

app.all('*', () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
