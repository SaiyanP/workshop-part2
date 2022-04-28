const DataService = require("../services/data.service");
const path = require("path");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs/dist/bcrypt");


const usersPath = path.join(__dirname, "..", "database", "users.json");

class User {
    constructor(firstName, lastName, age, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.id = uuid();
    }
}

class AuthModel {
    static async getAllUsers() {
        return DataService.readJSONFile(usersPath);
    }
    // Creating a user and saving to database:

    static async createUser(userData) {
        const users = await this.getAllUsers();
        const userExist = users.some(user => user.email === userData.email);
        if (userExist) {
            return Promise.reject({ msg: "This user is already signed up." });
        }

        const hashedPassword = await bcrypt.hash(userData.password, 11);

        const newUser = new User(
            userData.firstName,
            userData.lastName,
            userData.age,
            userData.email,
            hashedPassword
        );

        const updatedUsers = [...users, newUser];
        await DataService.saveJSONFile(usersPath, updatedUsers);

        const { password, ...userWithoutPass } = newUser;
        return userWithoutPass;
    }

    // Login User:

    static async loginUser(credentials){
        const { email, password } = credentials;
        const users = await this.getAllUsers();

        const foundUser = users.find(user => user.email === email);
        if(!foundUser) return Promise.reject({msg: "Invalid Credentials."});

        const isThePasswordValid = await bcrypt.compare(password, foundUser.password);
        if(!isThePasswordValid) return Promise.reject({msg: "Invalid Credentials, try again."});

        const { password: hashedPassword, ...userWithoutPass } = foundUser;

        return userWithoutPass;
    }
}

module.exports = AuthModel;