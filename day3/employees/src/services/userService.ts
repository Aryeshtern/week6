// import User, {IUser} from '../models/User';

// export const createUser = async (userInfo: Partial<IUser>, departmentId: string ) : Promise<IUser> => {
//     const user = new User({
//         ...userInfo,
//         department: departmentId
//     });
//     return await user.save();
// }

// export const getAllUsers = async () : Promise<IUser[]> => {
//     return await User.find().select("-password").populate('department');
// }

// export const updateUser = async (userId: string, updatedUserInfo: Partial<IUser>) : Promise<IUser | null> => {
//     return await User.findByIdAndUpdate(userId, updatedUserInfo, { new: true }).select('-password');
// }

// export const getUserById = async (userId: string) : Promise<IUser | null> => {
//     return await User.findById(userId).select("-password").populate('department');
// }

// export const deleteUser = async (userId: string) : Promise<boolean> => {
//     await User.findByIdAndDelete(userId);
//     return true;
// }

// export const getUserByRole = async (role: "Employee"): Promise<IUser[]> => {
//     return await User.find({ role }).select("-password");
// }

// export const getUserBySalaryRange = async (minSalary: number, maxSalary: number): Promise<IUser[]> => {
//     return await User.find({
//         salary: {
//             $gte: minSalary,
//             $lte: maxSalary
//         }
//     }).select("-password");
// }

// export const getUserStatistics = async () => {

//     const highestSalary = await User.findOne().sort("-salary").select("userName salary");

//     const now = new Date();
//     const startDay = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate(),
//         0,
//         0,
//         0
//     )

//     const nine = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate(),
//         9,
//         0,
//         0
//     )

//     const lateEmployees = await User.find({
//         role: "employees",
//         lastLogin: {
//             $gte: startDay,
//             $gt: nine
//         }
//     }).select('userName lastLogin')

//     const average = await User.aggregate([
//         {$group :{
//             average: { $avg: "Salary"}
//         }}
//     ])

//     return {
//         highestSalary,
//         lateEmployees,
//         average
//     }
// }

import User, { IUser } from "../models/User";


export const createUser = async (userData: Partial<IUser>, departmentId: string): Promise<IUser> => {
    const user = new User({
        ...userData,
        department: departmentId
    });

    return await user.save()
};

// לקבל משתמש לפי ID
export const getUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select("-password").populate("department")
};

export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find().select("-password").populate("department")
}

export const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password")
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id)
}

// לקבל משתמשים לפי התפקיד שלהם
export const getUserByRole = async (role: "employee" | "manager"): Promise<IUser[]> => {
    return await User.find({ role }).select("-password");
};

// קבלת משתמשים לפי טווח שכר
export const getUSerBySalaryRange = async (minSalary: number, maxSalary: number): Promise<IUser[]> => {
    return await User.find({
        salary: { $gte: minSalary, $lte: maxSalary }
    }).select("-password")
}

export const getUserStatistics = async () => {
    // מציאת המשתמש עם השכרהגבוה ביותר
    const highestSalary = await User.findOne().sort("-salary").select("username salary");

    // הגדרת זמנים לבדיקת איחורים
    const now = new Date();

    const startOfTheDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(), // נותן את היום
        0,
        0,
        0
    )
    const nineAM = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(), // נותן את היום
        9,
        0,
        0
    )

    const lateEmployee = await User.find({
        role: "employee",
        lastLogin: { $gte: startOfTheDay, $gt: nineAM }
    }).select("username lastLogin")

    // חישוב ממוצע שכר
    const avarageSalary = await User.aggregate([
        { $group: { avgSalary: { $avg: "$salary" } } }
    ])

    return {
        highestSalary,
        lateEmployee,
        avarageSalary
    }
}

