const graphql = require("graphql");
const Admin = require("../models/admin")

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const AdminSchema = new GraphQLObjectType({
    name: "AdminSchema",
    fields: () => ({
        id: { type: GraphQLString },
        AdminName: { type: GraphQLString },
        Password: { type: GraphQLString },
        Email: { type: GraphQLString },
    }),
});

exports.AdminQuery = function () {
    return {
        updateAdmin: {
            type: AdminSchema,
            args: {
                id: { type: GraphQLID },
                AdminName: { type: GraphQLString },
                Password: { type: GraphQLString },
                Email: { type: GraphQLString },
            },

            async resolve(parent, args) {
                let updateObj = {};
                if (args.Password) {
                    updateObj.Password = args.Password;
                }
                if (args.AdminName) {
                    updateObj.AdminName = args.AdminName;
                }
                const updatedAdmin = await Admin.findByIdAndUpdate(
                    args.id,
                    updateObj,
                    {
                        new: true,
                    }
                );
                return updatedAdmin;
            },
        },
        admin: {
            type: new GraphQLList(AdminSchema),
            async resolve(parent, args) {
                return Admin.find();
            },
        },
        removeAdmin: {
            type: AdminSchema,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Admin.findByIdAndRemove(args.id);
            },
        },
    };
};
exports.AddAdminQuery = function () {
    return {
        addAdmin: {
            type: AdminSchema,
            args: {
                AdminName: { type: GraphQLString },
                Password: { type: GraphQLString },
                Email: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let adminObj = new Admin({
                    AdminName: args.AdminName,
                    Password: args.Password,
                    Email: args.Email,
                });
                const addedAdmin = await adminObj.save();
                return addedAdmin;
            },
        },
    };
};
