// Inheritance of the object without classes
const User1 = {
    name: "Yuli",
    sayHi: () => {
        console.log("TEST")
    }
}
const UserLeo = Object.create(User1)
UserLeo.name = "Leo"
UserLeo.sayHi()


// Constructor Function Inheritance without classes
function User(name) {
    this.name = name;
    this.sayHi = function () {
        console.log(`sayHi: ${ this.name }`)
    }
}
User.prototype.greet2 = function () {
    console.log(`greet: ${ this.name }`)
}
const testUser = new User("YYY");
testUser.sayHi()
testUser.greet2()


function UserAdmin(name) {
    this.name = name
    this.sayHi2 = function () {
        console.log(`gre2222et: ${ this.name }`)
    }
}
UserAdmin.prototype = new User()
const userLeo = new UserAdmin("Leo")
userLeo.greet2()
userLeo.sayHi2()

