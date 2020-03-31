import query from './query';

const queryEnv = query.env;

const {host} = location;
const hostMatch = host.match(/(\S+)-baidu.forexample.com/);
let hostEnv = hostMatch && hostMatch[1];
hostEnv = hostEnv === '' ? 'production' : hostEnv;

let buildEnv = process.env.NODE_ENV;
// 本地默认test环境
buildEnv = buildEnv === 'development' ? 'test' : buildEnv;

export default queryEnv || hostEnv || buildEnv;
