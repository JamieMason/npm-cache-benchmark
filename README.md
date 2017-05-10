# npm vs shrinkpack vs npm5 vs yarn

Benchmarks of [npm][1], [npm5][2], [shrinkpack][3], [yarn][4] and [npminstall][5] install times.

## Results

### OS X

| Installer | Average over 5 runs |
|:--|--:|
| npm 5.x (shrinkpacked) | 10.80s |
| npm 5.x (shrinkpacked, compressed) | 10.82s |
| npm 5.x (cached) | 13.42s |
| yarn --offline | 13.43s |
| npm 5.x | 14.21s |
| yarn | 18.90s |
| npm 4.x (shrinkpacked, compressed) | 19.42s |
| npm 4.x (shrinkpacked) | 19.81s |
| npm 4.x (cached) | 24.79s |
| npm 4.x | 28.03s |

## Running the Benchmarks

### Locally

```
git clone https://github.com/JamieMason/npm-cache-benchmark.git
cd npm-cache-benchmark
npm install -g npm5@5.0.0-beta.36 shrinkpack@0.18.1 yarn@0.24.1 npminstall@3.0.0-beta.4
node index.js
```

## Full Results

### OS X

```
$ node index.js

Run 1
npm 4.x: 28.77s (average 28.77s)
npm 4.x (cached): 23.47s (average 23.47s)
npm 4.x (shrinkpacked): 19.64s (average 19.64s)
npm 4.x (shrinkpacked, compressed): 19.87s (average 19.87s)
yarn: 19.87s (average 19.87s)
yarn --offline: 12.77s (average 12.77s)
npm 5.x: 14.96s (average 14.96s)
npm 5.x (cached): 14.48s (average 14.48s)
npm 5.x (shrinkpacked): 15.38s (average 15.38s)
npm 5.x (shrinkpacked, compressed): 14.22s (average 14.22s)

Run 2
npm 4.x: 29.52s (average 29.14s)
npm 4.x (cached): 25.86s (average 24.66s)
npm 4.x (shrinkpacked): 21.02s (average 20.33s)
npm 4.x (shrinkpacked, compressed): 20.55s (average 20.21s)
yarn: 19.59s (average 19.73s)
yarn --offline: 13.51s (average 13.14s)
npm 5.x: 14.07s (average 14.52s)
npm 5.x (cached): 11.26s (average 12.87s)
npm 5.x (shrinkpacked): 7.63s (average 11.50s)
npm 5.x (shrinkpacked, compressed): 8.07s (average 11.15s)

Run 3
npm 4.x: 26.86s (average 28.38s)
npm 4.x (cached): 24.51s (average 24.61s)
npm 4.x (shrinkpacked): 19.35s (average 20.01s)
npm 4.x (shrinkpacked, compressed): 18.84s (average 19.75s)
yarn: 18.47s (average 19.31s)
yarn --offline: 12.09s (average 12.79s)
npm 5.x: 13.90s (average 14.31s)
npm 5.x (cached): 13.79s (average 13.18s)
npm 5.x (shrinkpacked): 10.35s (average 11.12s)
npm 5.x (shrinkpacked, compressed): 10.69s (average 10.99s)

Run 4
npm 4.x: 27.78s (average 28.23s)
npm 4.x (cached): 24.69s (average 24.63s)
npm 4.x (shrinkpacked): 19.06s (average 19.77s)
npm 4.x (shrinkpacked, compressed): 18.72s (average 19.49s)
yarn: 17.92s (average 18.96s)
yarn --offline: 13.95s (average 13.08s)
npm 5.x: 13.61s (average 14.14s)
npm 5.x (cached): 13.69s (average 13.31s)
npm 5.x (shrinkpacked): 10.33s (average 10.92s)
npm 5.x (shrinkpacked, compressed): 10.53s (average 10.88s)

Run 5
npm 4.x: 27.22s (average 28.03s)
npm 4.x (cached): 25.44s (average 24.79s)
npm 4.x (shrinkpacked): 20.00s (average 19.81s)
npm 4.x (shrinkpacked, compressed): 19.13s (average 19.42s)
yarn: 18.65s (average 18.90s)
yarn --offline: 14.81s (average 13.43s)
npm 5.x: 14.51s (average 14.21s)
npm 5.x (cached): 13.88s (average 13.42s)
npm 5.x (shrinkpacked): 10.30s (average 10.80s)
npm 5.x (shrinkpacked, compressed): 10.60s (average 10.82s)
```

<!-- links -->
[1]: https://www.npmjs.com
[2]: https://www.npmjs.com/package/npm5
[3]: https://github.com/JamieMason/shrinkpack
[4]: https://github.com/yarnpkg/yarn
[5]: https://github.com/cnpm/npminstall
