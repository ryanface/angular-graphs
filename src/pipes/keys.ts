import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform{
    transform(value:any, args:string[]): any {
        let keys:any[] = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        //console.log('keys',keys);
        return keys;
    }
}

@Pipe({name: 'keySplit'})
export class KeySplitPipe extends KeysPipe {}
