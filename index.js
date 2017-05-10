const path = require('path');
const childProcess = require('child_process');

const results = {
  'npm/npm': { average: 0, name: 'npm 4.x', runs: [] },
  'npm/npm-cached': { average: 0, name: 'npm 4.x (cached)', runs: [] },
  'npm/shrinkpack': { average: 0, name: 'npm 4.x (shrinkpacked)', runs: [] },
  'npm/shrinkpack-compressed': { average: 0, name: 'npm 4.x (shrinkpacked, compressed)', runs: [] },
  'yarn/yarn': { average: 0, name: 'yarn', runs: [] },
  'yarn/yarn-offline': { average: 0, name: 'yarn --offline', runs: [] },
  'npm5/npm': { average: 0, name: 'npm 5.x', runs: [] },
  'npm5/npm-cached': { average: 0, name: 'npm 5.x (cached)', runs: [] },
  'npm5/shrinkpack': { average: 0, name: 'npm 5.x (shrinkpacked)', runs: [] },
  'npm5/shrinkpack-compressed': { average: 0, name: 'npm 5.x (shrinkpacked, compressed)', runs: [] },
  'npminstall/npminstall': { average: 0, name: 'npminstall 3.x', runs: [] },
  'npminstall/npminstall-cached': { average: 0, name: 'npminstall 3.x (cached)', runs: [] },
};

try {
  runAll();
} catch (err) {
  onError(err);
}

// implementation

function runAll() {
  const sampleSize = 5;
  for (let i = 1; i <= sampleSize; i++) {
    console.log(`Run ${i}`);
    runBenchmark('npm', ['install'], 'npm');
    runBenchmark('npm', ['install'], 'npm-cached');
    runBenchmark('npm', ['install'], 'shrinkpack');
    runBenchmark('npm', ['install'], 'shrinkpack-compressed');
    runBenchmark('yarn', ['install'], 'yarn');
    runBenchmark('yarn', ['install', '--offline'], 'yarn-offline');
    runBenchmark('npm5', ['install'], 'npm');
    runBenchmark('npm5', ['install'], 'npm-cached');
    runBenchmark('npm5', ['install'], 'shrinkpack');
    runBenchmark('npm5', ['install'], 'shrinkpack-compressed');
    runBenchmark('npminstall', ['--no-cache'], 'npminstall');
    runBenchmark('npminstall', ['--cache-strict'], 'npminstall-cached');
    console.log('');
  }
}

function runBenchmark(installer, args, directory) {
  const key = `${installer}/${directory}`;
  const dirPath = path.resolve(directory);

  clean(dirPath);
  const start = new Date().getTime();
  spawn(installer, args, dirPath);
  const end = new Date().getTime();
  verify(dirPath);
  clean(dirPath);

  const time = (end - start) / 1000;
  const result = results[key];
  result.runs.push(time);
  result.average = average(result.runs);

  console.log(`${result.name}: ${time.toFixed(2)}s (average ${result.average.toFixed(2)}s)`);
}

function spawn(cmd, args, cwd) {
  const shell = childProcess.spawnSync(cmd, args, {
    cwd: cwd || process.cwd(),
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  const stdout = shell.output[1];
  const stderr = shell.output[2];
  shell.status !== 0 && onError(stderr);
}

function clean(dirPath) {
  if (dirPath.includes('-cached') === false) {
    spawn('npm', ['cache', 'clean'], dirPath);
    spawn('npm5', ['cache', 'clean', '--force'], dirPath);
    spawn('yarn', ['cache', 'clean'], dirPath);
  }
  if (dirPath.includes('-offline') === false) {
    spawn('rm', ['-rf', path.join(dirPath, 'npm-packages-offline-cache')]);
  }
  spawn('rm', ['-rf', path.join(dirPath, 'node_modules')]);
}

function verify(dirPath) {
  spawn('node', ['./verify.js'], dirPath);
}

function average(list) {
  return list.reduce((total, value) => total + value, 0) / list.length;
}

function onError(err) {
  console.error(err);
  process.exit(1);
}
