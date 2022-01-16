import { configure, getLogger } from 'log4js';
import config from '../config';

configure(config.log);

export default getLogger();
