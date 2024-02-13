

export class UserModel {
    static getAll = async () => {
        return 'all users'
    }
    static findById = async (res) => {
        const { id } = res.params
        return id
    }
}