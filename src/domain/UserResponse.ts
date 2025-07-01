export interface UserResponse {
    user: {
        _id: string,
        email: string,
        username: string,
        firstname: string,
        lastname: string,
        role: string,
        avatar: string,
        id: number,
        __v: number
    },
    token: string
}