import {
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common'

export class PermissionGuard implements CanActivate {
	acceptablePermissions: string[]
	constructor(acceptablePermissions: string[]) {
		this.acceptablePermissions = acceptablePermissions
	}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest()
		const userPermissions = request.user.permission as string[] | undefined
		if (!userPermissions?.length) {
			throw new UnauthorizedException()
		}
		const isApproved = userPermissions.every(userPermission => {
			return this.acceptablePermissions.includes(userPermission)
		})
		if (!isApproved) {
			throw new UnauthorizedException()
		}
		return true
	}
}
