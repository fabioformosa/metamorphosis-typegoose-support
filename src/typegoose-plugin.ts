import { MetamorphosisPlugin, logger, pluginRegistry } from "@fabio.formosa/metamorphosis/dist/src";
import * as mongoose from 'mongoose';
import { getClass } from '@typegoose/typegoose/lib/internal/utils';

export default class TypegoosePlugin implements MetamorphosisPlugin{

  rearrangeSourceType(sourceObj: any, targetClass: Function): Function {
    logger.log(`CONVERSION SERVICE - Typegoose support - detected sourceObj ${sourceObj.constructor.name} converting to ${targetClass.name}`);
    const actualSourceType = getClass(sourceObj) || sourceObj.constructor;
    logger.log(`CONVERSION SERVICE - Typegoose support - Rearranged sourceObj ${sourceObj.constructor.name} into actualSourceType ${actualSourceType.name} converting to ${targetClass.name}`);
    return actualSourceType;
  }

  shouldRearrangeSourceType(sourceObj: any, targetClass: Function): boolean {
    return sourceObj instanceof mongoose.Model || sourceObj instanceof mongoose.Schema.Types.Embedded
      || (sourceObj.constructor && sourceObj.constructor.name == 'EmbeddedDocument')
      || (sourceObj.constructor && sourceObj.constructor.name == 'SingleNested');
  }

}

new TypegoosePlugin();


