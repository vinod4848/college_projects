const graphql = require("graphql");
const Courses = require("../models/courses")

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const CoursesSchema = new GraphQLObjectType({
    name: "CoursesSchema",
    fields: () => ({
        id: { type: GraphQLString },
        Courses: { type: GraphQLString },
        Duration: { type: GraphQLString },
        Fees: { type: GraphQLString },
        Examination: { type: GraphQLString },
    }),
});

exports.CoursesQuery = function () {
    return {
        updateCourses: {
            type: CoursesSchema,
            args: {
                id: { type: GraphQLID },
                Courses: { type: GraphQLString },
                Duration: { type: GraphQLString },
                Fees: { type: GraphQLString },
                Examination: { type: GraphQLString },
            },

            async resolve(parent, args) {
                let updateObj = {};
                if (args.Courses) {
                    updateObj.Courses = args.Courses;
                }
                if (args.Duration) {
                    updateObj.Duration = args.Duration;
                }
                if (args.Fees) {
                    updateObj.Fees = args.Fees;
                }
                if (args.Examination) {
                    updateObj.Examination = args.Examination;
                }
                const updateCourses = await Courses.findByIdAndUpdate(
                    args.id,
                    updateObj,
                    {
                        new: true,
                    }
                );
                return updateCourses;
            },
        },
        courses: {
            type: new GraphQLList(CoursesSchema),
            async resolve(parent, args) {
                return Courses.find();
            },
        },
        removeCourses: {
            type: CoursesSchema,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Courses.findByIdAndRemove(args.id);
            }
        },
    };
};
exports.AddCoursesQuery = function () {
    return {
        addCourses: {
            type: CoursesSchema,
            args: {
                Courses: { type: GraphQLString },
                Duration: { type: GraphQLString },
                Fees: { type: GraphQLString },
                Examination: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let CoursesObj = new Courses({
                    Courses: args.Courses,
                    Duration: args.Duration,
                    Fees: args.Fees,
                    Examination: args.Examination,
                });
                const addedCourses = await CoursesObj.save();
                return addedCourses;
            },
        },
    };
};
