const basePkg=require('../package.json');
const libPkg=require('../package-lib-template.json');
libPkg.version=basePkg.version;
const fs=require('fs');
const targetFile='./lib-dist/package.json';
//write to lib folder
fs.writeFile(targetFile,JSON.stringify(libPkg,null,'\t'),'utf8', (err)=>{
    if(err){
        console.log('Error occured while wrtiting file:'+targetFile);
    } else {
    console.log('File was saved:'+targetFile);
    }
});