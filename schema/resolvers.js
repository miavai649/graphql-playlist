const { UserList, MovieList } = require("../FakeData")
const _ = require('lodash');

const resolvers = {
    Query: {
        users: (parent) => {
            // console.log(parent)
            return UserList
        },
        user: (parent, args) => {
            const id = args.id
            return _.find(UserList, { id: Number(id) });
        },
        movies: () => {
            return MovieList
        },
        movie: (parent, args, context) => {
            console.log(context)
            return _.find(MovieList, {name: args.name})
        } 
    },
    User: {
        favouriteMovies: (parent) => {
            // console.log(parent)
            return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <=2010)
        }
    },

    Mutation: {
        createUser: ( parent, args ) => {
            const user = args.input
            const lastId = UserList[UserList.length - 1].id
            user.id = lastId + 1
            UserList.push(user);
            return user;
        },
        updateUserName: (parent, args) => {
            const { id, newUserName } = args.input;
            // console.log(newUserName)
            // let userUpdated = 10
            // UserList.forEach(user => {
            //     if (user.id === id) {
            //         user.username = newUserName
            //         // return user
            //         userUpdated = user
            //         console.log(userUpdated, user)
            //     }
            // });

            // UserList.find(user => user.id === id)

            // return userUpdated
            const selectUser = _.find(UserList, {id: Number(id)})
            selectUser.username = newUserName
            return selectUser

        },

        deleteUser: (parent, args) => {
            const id = args.id
            _.remove(UserList, (user) => user.id === Number(id));
            return null;
        }

    }

}

module.exports = {resolvers}