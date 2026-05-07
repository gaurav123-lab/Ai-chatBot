export function checkingHeading(str){
return /^(\*)(\*)(.*)\*$/.test(str)
}
 export function replaceHeading(str){

    return str.replace(/^(\*)(\*)|(\*)$/g,'')
 }