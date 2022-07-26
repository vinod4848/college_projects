const graphql = require("graphql");
const College = require("../models/college")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const CollegeSchema = new GraphQLObjectType({
    name: "CollegeSchema",
    fields: () => ({
        id: { type: GraphQLString },
        CollegeName: { type: GraphQLString },
        University: { type: GraphQLString },
        Phone: { type: GraphQLString },
        CollegeCode: { type: GraphQLString },
        founder: { type: GraphQLString },
        Principal: { type: GraphQLString },
        Address: { type: GraphQLString },
        ZipCode: { type: GraphQLString },

    }),
});
exports.CollegeQuery = function () {
    return {
        updateCollege: {
            type: CollegeSchema,
            args: {
                id: { type: GraphQLString },
                CollegeName: { type: GraphQLString },
                University: { type: GraphQLString },
                Phone: { type: GraphQLString },
                CollegeCode: { type: GraphQLString },
                founder: { type: GraphQLString },
                Principal: { type: GraphQLString },
                Address: { type: GraphQLString },
                ZipCode: { type: GraphQLString },
            },

            async resolve(parent, args) {
                let updateObj = {};
                if (args.CollegeName) {
                    updateObj.CollegeName = args.CollegeName;
                }
                if (args.University) {
                    updateObj.University = args.University;
                }
                if (args.Phone) {
                    updateObj.Phone = args.Phone;
                }
                if (args.CollegeCode) {
                    updateObj.CollegeCode = args.CollegeCode;
                }
                if (args.founder) {
                    updateObj.founder = args.founder;
                }
                if (args.Principal) {
                    updateObj.Principal = args.Principal;
                }
                if (args.Address) {
                    updateObj.Address = args.Address;
                }
                if (args.ZipCode) {
                    updateObj.ZipCode = args.ZipCode;
                }
                const updateCollege = await College.findByIdAndUpdate(
                    args.id,
                    updateObj,
                    {
                        new: true,
                    }
                );
                return updateCollege;
            },
        },
        college: {
            type: new GraphQLList(CollegeSchema),
            async resolve(parent, args) {
                return College.find();
            },
        },
        removeCollege: {
            type: CollegeSchema,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return College.findByIdAndRemove(args.id);
            },
        },
    };
};

exports.AddCollegeQuery = function () {
    return {
        addCollege: {
            type: CollegeSchema,
            args: {
                CollegeName: { type: GraphQLString },
                University: { type: GraphQLString },
                Phone: { type: GraphQLString },
                CollegeCode: { type: GraphQLString },
                founder: { type: GraphQLString },
                Principal: { type: GraphQLString },
                Address: { type: GraphQLString },
                ZipCode: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let collegeObj = new College({
                    CollegeName: args.CollegeName,
                    University: args.University,
                    Phone: args.Phone,
                    CollegeCode: args.CollegeCode,
                    founder: args.founder,
                    Address: args.Address,
                    Principal: args.Principal,
                    ZipCode: args.ZipCode,

                });
                const addedCollege = await collegeObj.save();
                return addedCollege;
            },
        },
    };
};
