// import {env} from '@/configs'
// import {
// 	CanActivate,
// 	ExecutionContext,
// 	UnauthorizedException,
// } from '@nestjs/common'
// import * as jwt from 'jsonwebtoken'
// import {decode} from 'jsonwebtoken'
// import jwksClient from 'jwks-rsa'

// export class AuthGuard implements CanActivate {
// 	async canActivate(context: ExecutionContext): Promise<boolean> {
// 		const request = context.switchToHttp().getRequest()
// 		const token = request?.headers['authorization']?.replace('Bearer ', '')
// 		if (!token) throw new UnauthorizedException()
// 		try {
// 			const tokenInfo = await this.verifyToken(token)
// 			const parsedToken = tokenInfo as unknown as {
// 				'http://vahterus/email': string
// 				'http://vahterus/roles': string[]
// 				permissions: string[]
// 			}
// 			const email = parsedToken['http://vahterus/email']
// 			const permission: string[] = parsedToken['permissions']
// 			const roles: string[] = parsedToken['http://vahterus/roles']
// 			request.user = {email, name: email, permission, roles}
// 			return true
// 		} catch (error) {
// 			throw new UnauthorizedException(error.message)
// 		}
// 	}

// 	private async verifyToken(
// 		token: string,
// 	): Promise<string | jwt.Jwt | jwt.JwtPayload> {
// 		const options: jwt.VerifyOptions = {
// 			audience: env.AUTH0.AUTH0_AUDIENCE,
// 			issuer: env.AUTH0.AUTH0_ISSUER_URL,
// 			algorithms: ['RS256'],
// 		}
// 		const decodedToken = decode(token, {complete: true})
// 		const kid = decodedToken.header.kid
// 		const signingKey = await this.getSigningKey(kid)
// 		return new Promise((resolve, reject) => {
// 			jwt.verify(
// 				token,
// 				signingKey.getPublicKey(),
// 				options,
// 				(err: object, decoded: string | jwt.Jwt | jwt.JwtPayload) => {
// 					if (err) {
// 						reject(err)
// 					} else {
// 						resolve(decoded)
// 					}
// 				},
// 			)
// 		})
// 	}

// 	// private async getSigningKey(kid: string): Promise<jwksClient.SigningKey> {
// 	// 	const client = jwksClient({
// 	// 		jwksUri: `${env.AUTH0.AUTH0_ISSUER_URL}.well-known/jwks.json`,
// 	// 	})
// 	// 	return new Promise((resolve, reject) => {
// 	// 		client.getSigningKey(kid, (err, key) => {
// 	// 			if (err) {
// 	// 				reject(err)
// 	// 			} else {
// 	// 				resolve(key)
// 	// 			}
// 	// 		})
// 	// 	})
// 	// }
// }