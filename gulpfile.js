var gulp = require("gulp"),
    through2 = require('through2');
    
function logCopied()
{
    return through2.obj(function(vinyl, enc, callback)
    {
        console.log("Copying follow file: '" + vinyl.path + "'");
        this.push(vinyl);

        callback();
    });
}

gulp.task("copy-tsnumeraljs", function()
{
    return gulp.src("node_modules/ng2-tstypings/tsTypings/tsnumeraljs.d.ts")
        .pipe(logCopied())
        .pipe(gulp.dest("tsTypings"));
});

gulp.task("copy-tstypings", 
          ["copy-tsnumeraljs"], 
          function(cb)
{
    console.log("TsTypings have been copied.");
    
    cb();
});