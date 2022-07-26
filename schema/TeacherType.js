const graphql = require("graphql");
const Teacher = require("../models/teacher");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const TeacherSchema = new GraphQLObjectType({
    name: "TeacherSchema",
    fields: () => ({
        id: { type: GraphQLString },
        FullName: { type: GraphQLString },
        Email: { type: GraphQLString },
        Phone: { type: GraphQLString },
        FatherName: { type: GraphQLString },
        MotherName: { type: GraphQLString },
        Gender: { type: GraphQLString },
        Address: { type: GraphQLString },
        Subject: { type: GraphQLString },
        JoinDate: { type: GraphQLString },

    }),
});
exports.TeacherQuery = function () {
    return {
        updateTeacher: {
            type: TeacherSchema,
            args: {
                id: { type: GraphQLString },
                FullName: { type: GraphQLString },
                Email: { type: GraphQLString },
                Phone: { type: GraphQLString },
                FatherName: { type: GraphQLString },
                MotherName: { type: GraphQLString },
                Gender: { type: GraphQLString },
                Address: { type: GraphQLString },
                Subject: { type: GraphQLString },
                JoinDate: { type: GraphQLString },

            },

            async resolve(parent, args) {
                let updateObj = {};
                if (args.FullName) {
                    updateObj.FullName = args.FullName;
                }
                if (args.Email) {
                    updateObj.Email = args.Email;
                }
                if (args.Phone) {
                    updateObj.Phone = args.Phone;
                }
                if (args.FatherName) {
                    updateObj.FatherName = args.FatherName;
                }
                if (args.MotherName) {
                    updateObj.MotherName = args.MotherName;
                }
                if (args.Gender) {
                    updateObj.Gender = args.Gender;
                }
                if (args.Address) {
                    updateObj.Address = args.Address;
                }
                if (args.JoinDate) {
                    updateObj.JoinDate = args.JoinDate;
                }
                if (args.Subject) {
                    updateObj.Subject = args.Subject;
                }
                const updateTeacher = await Teacher.findByIdAndUpdate(
                    args.id,
                    updateObj,
                    {
                        new: true,
                    }
                );
                return updateTeacher;
            },
        },
        teacher: {
            type: new GraphQLList(TeacherSchema),
            async resolve(parent, args) {
                return Teacher.find();
            },
        },
        removeTecher: {
            type: TeacherSchema,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Teacher.findByIdAndRemove(args.id);
            },
        },
    };
};

exports.AddTeacherQuery = function () {
    return {
        addTeacher: {
            type: TeacherSchema,
            args: {
                FullName: { type: GraphQLString },
                Email: { type: GraphQLString },
                Phone: { type: GraphQLString },
                FatherName: { type: GraphQLString },
                MotherName: { type: GraphQLString },
                Gender: { type: GraphQLString },
                Address: { type: GraphQLString },
                Subject: { type: GraphQLString },
                JoinDate: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let teacherObj = new Teacher({
                    FullName: args.FullName,
                    Email: args.Email,
                    Phone: args.Phone,
                    FatherName: args.FatherName,
                    MotherName: args.MotherName,
                    Gender: args.Gender,
                    Address: args.Address,
                    Subject: args.Subject,
                    JoinDate: args.JoinDate
                });
                const addedTeacher = await teacherObj.save();
                return addedTeacher;
            },
        },

    };
};
