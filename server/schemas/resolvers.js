const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// resolvers are the functions that execute whenever we call a query or mutation that we defined in typeDefs
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const data = await User.findOne({ _id: context.user._id })
                        .select('-__v -password')

                return data;
            }

            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;
