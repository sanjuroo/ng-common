@ECHO This is temporary until bug in Promise.d.ts is fixed
@CALL tsc

@CALL node .\node_modules\typescript\bin\tsc --outFile bundle/ng2-common.dev.js
@CALL node .\node_modules\npm-angular2-bundle\bin\npm-angular2-bundle.js bundle/ng2-common.dev.js

PAUSE