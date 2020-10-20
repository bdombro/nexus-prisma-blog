// export interface UserContext {
// 	id: string;
// 	roles: string[];
// }
//
// export interface RequestWithUserContext {
// 	user: UserContext;
// }

declare namespace Express {
	export interface Request {
		user: {
			id: string;
			roles: string[];
		}
	}
}
