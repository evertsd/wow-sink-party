## WoW Party-Sync scripts
This directory consists of scripts to get the frontend up and running.
Eventually, it may be used to generate scripts for AWS lambdas.

### Getting started
To get started, you'll need firebase and battlenet credentials so the app can pull down and upload party data.
- Get a `credentials.json` and put in `soap/src/secrets`
- Be sure to run `npm run build` before using any of the other node scripts

## AWS
### Pre-requistes
- Have credentials
- Have `AWS_DEFAULT_REGION` set in environment
- Create `soap/lambdas/zip`

### Lambdas
#### Deploy updated lambda
```
yarn build
yarn aws-build-lambdas
yarn aws-zip-lambdas
yarn aws-update-lambdas [lambdaName]
