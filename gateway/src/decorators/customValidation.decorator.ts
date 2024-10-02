// import {
// 	registerDecorator,
// 	ValidationOptions,
// 	ValidationArguments,
// } from 'class-validator'
// /* eslint-disable @typescript-eslint/no-explicit-any */
// export function IsEnumCombinationValid(
// 	constraint: any[],
// 	validationOptions?: ValidationOptions,
// ): (object: object, name: string) => void {
// 	return function (object: object, propertyName: string) {
// 		registerDecorator({
// 			name: 'IsEnumCombinationValid',
// 			target: object.constructor,
// 			propertyName: propertyName,
// 			constraints: constraint,
// 			options: validationOptions,
// 			validator: {
// 				validate(value: any, args: ValidationArguments) {
// 					const [selectedEnum, ...primitiveValueArray] = args.constraints
// 					return (
// 						Object.values(selectedEnum).includes(value) ||
// 						primitiveValueArray.includes(value)
// 					)
// 				},
// 			},
// 		})
// 	}
// }
