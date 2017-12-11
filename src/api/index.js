import { version } from '../../package.json';
import { Router } from 'express';
import tags from './tags';

export default ({ config, db }) => {
	let api = Router();

	api.use('/tags', tags());

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
