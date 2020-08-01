import * as enums from './enums';
// https://lukasbehal.com/2017-05-22-enums-in-declaration-files/

interface MyInterface {
  id: number;
  text: string;
  type: enums.MyEnum;
}
