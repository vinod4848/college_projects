const graphql = require("graphql");
const Student = require("../models/student");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const StudentSchema = new GraphQLObjectType({
    name: "StudentSchema",
    fields: () => ({
        CollegeId: { type: GraphQLString },
        id: { type: GraphQLString },
        FullName: { type: GraphQLString },
        Email: { type: GraphQLString },
        Phone: { type: GraphQLString },
        FatherName: { type: GraphQLString },
        MotherName: { type: GraphQLString },
        Gender: { type: GraphQLString },
        Address: { type: GraphQLString },
        Courses: { type: GraphQLString },
        AdmissionDate: { type: GraphQLString },
    }),

});
// const StudentListData = new GraphQLObjectType({
//     name: "StudentListData",
//     fields: () => ({
//         student: { type: GraphQLInt },
//         total: { type: GraphQLInt },
//         studentList: {
//             type: new GraphQLList(StudentSchema),
//         },
//     }),
// });

exports.StudentQuery = function () {
    return {
        updateStudent: {
            type: StudentSchema,
            args: {
                CollegeId: { type: GraphQLString },
                id: { type: GraphQLString },
                FullName: { type: GraphQLString },
                Email: { type: GraphQLString },
                Phone: { type: GraphQLString },
                FatherName: { type: GraphQLString },
                MotherName: { type: GraphQLString },
                Gender: { type: GraphQLString },
                Address: { type: GraphQLString },
                Courses: { type: GraphQLString },
                AdmissionDate: { type: GraphQLString },

            },
            async resolve(parent, args) {
                let updateObj = {};
                if (args.CollegeId) {
                    updateObj.CollegeId = args.CollegeId;
                }
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
                if (args.Courses) {
                    updateObj.Courses = args.Courses;
                }
                if (args.AdmissionDate) {
                    updateObj.AdmissionDate = args.AdmissionDate;
                }
                const updateStudent = await Student.findByIdAndUpdate(
                    args.id,
                    updateObj,
                    {
                        new: true,
                    }
                );
                return updateStudent;
            },
        },
        student: {
            type: new GraphQLList(StudentSchema),
            async resolve(parent, args) {
                return Student.find();
            },
        },
        removeStudent: {
            type: StudentSchema,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Student.findByIdAndRemove(args.id);
            }
        },

        // searchStudents: {
        //     type: StudentListData,
        //     args: {
        //         CollegeId: { type: GraphQLString },
        //         FullName: { type: GraphQLString },
        //         Email: { type: GraphQLString },
        //         Phone: { type: GraphQLString },
        //         FatherName: { type: GraphQLString },
        //         MotherName: { type: GraphQLString },
        //         Gender: { type: GraphQLString },
        //         Address: { type: GraphQLString },
        //         Courses: { type: GraphQLString },
        //         AdmissionDate: { type: GraphQLString },
        //         isStudent: { type: GraphQLInt },
        //         SearchKeyword: { type: GraphQLString },
        //     },
        //     async resolve(parent, args) {
        //         let total_records = 0;

        //         let isStudent = 0;

        //         if (args.isStudent) {
        //             isStudent = args.isStudent;
        //         }

        //         let Student = args.Student;

        //         let search_filter = [];
        //         if (args.SearchKeyword) {
        //             search_filter.push({
        //                 $or: [
        //                     {
        //                         "Student.FullName": {
        //                             $regex: ".*" + args.SearchKeyword + ".*",
        //                             $options: "i",
        //                         },
        //                     },
        //                     {
        //                         "Student.Email": {
        //                             $regex: ".*" + args.SearchKeyword + ".*",
        //                             $options: "i",
        //                         },
        //                     },
        //                 ],
        //             });
        //         }

        //         let list_of_documents = [];
        //         const intersectedConditions = () => {
        //             let conditionList = [];
        //             if (args.StudentType) {
        //                 conditionList.push({
        //                     StudentType: args.StudentType,
        //                 });
        //             }
        //             return conditionList;
        //         };
        //         const andFilters = intersectedConditions();

        //         if (andFilters.length > 0 && isStudent == 1) {
        //             let andApply = [];

        //             if (andFilters.length >= 1) {
        //                 andApply.push({
        //                     $and: andFilters,
        //                 });
        //             }
        //             if (search_filter.length >= 1) {
        //                 andApply.push({
        //                     $or: search_filter,
        //                 });
        //             }

        //             total_records = await Students.aggregate([
        //                 {
        //                     $lookup: {
        //                         from: "Students",
        //                         localField: "Student",
        //                         foreignField: "_id",
        //                         as: "Student",
        //                     },
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: "colleges",
        //                         localField: "collegeInfo",
        //                         foreignField: "_id",
        //                         as: "collegeInfo",
        //                     },
        //                 },
        //                 {
        //                     $project: {
        //                         id: "$_id",
        //                         StudentType: "$StudentType",
        //                         Email: "$Email",
        //                         Phone: "$Phone",
        //                         Student: "$Student",
        //                         Courses: "$Courses",
        //                         AdmissionDate: "$AdmissionDate",
        //                     },
        //                 },
        //                 {
        //                     $match: {
        //                         $and: andApply,
        //                     },
        //                 },
        //                 {
        //                     $count: "id",
        //                 },
        //             ]);
        //             if (total_records && total_records[0]) {
        //                 total_records = total_records[0].id;
        //             } else {
        //                 total_records = 0;
        //             }

        //             list_of_documents = await Students.aggregate([
        //                 {
        //                     $lookup: {
        //                         from: "teachers",
        //                         let: { _id: "$_id" },
        //                         pipeline: [
        //                             {
        //                                 $match: {
        //                                     $expr: {
        //                                         $and: _list,
        //                                     },
        //                                 },
        //                             },
        //                         ],
        //                         as: "teachersList",
        //                     },
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: "courses",
        //                         localField: "Student",
        //                         foreignField: "_id",
        //                         as: "StudentCoursesinfo",
        //                     },
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: "admins",
        //                         localField: "AdminName",
        //                         foreignField: "_id",
        //                         as: "AdminInfo",
        //                     },
        //                 },
        //                 {
        //                     $project: {
        //                         id: "$_id",
        //                         StudentType: "$StudentType",
        //                         Email: "$Email",
        //                         Phone: "$Phone",
        //                         Student: "$Student",
        //                         Courses: "$Courses",
        //                         AdmissionDate: "$AdmissionDate",
        //                     },
        //                 },
        //                 {
        //                     $match: {
        //                         $and: andApply,
        //                     },
        //                 },

        //             ]);



        //         } else if (andFilters.length > 0) {
        //             let andApply = [];

        //             if (andFilters.length >= 1) {
        //                 andApply.push({
        //                     $and: andFilters,
        //                 });
        //             }
        //             if (search_filter.length >= 1) {
        //                 andApply.push({
        //                     $or: search_filter,
        //                 });
        //             }



        //         } else {
        //             total_records = await Students.count();
        //             list_of_documents = await Students.find()
        //                 .populate("Student")
        //                 .populate("teacher")
        //                 .exec();
        //         }
        //         return {
        //             total: total_records,
        //             inventoryList: list_of_documents,
        //         };
        //     },
        // },
    };
};

exports.AddStudentQuery = function () {
    return {
        addStudent: {
            type: StudentSchema,
            args: {
                CollegeId: { type: GraphQLString },
                FullName: { type: GraphQLString },
                Email: { type: GraphQLString },
                Phone: { type: GraphQLString },
                FatherName: { type: GraphQLString },
                MotherName: { type: GraphQLString },
                Gender: { type: GraphQLString },
                Address: { type: GraphQLString },
                Courses: { type: GraphQLString },
                AdmissionDate: { type: GraphQLString },

            },
            async resolve(parent, args) {
                let studentObj = new Student({
                    CollegeId: args.CollegeId,
                    FullName: args.FullName,
                    Email: args.Email,
                    Phone: args.Phone,
                    FatherName: args.FatherName,
                    MotherName: args.MotherName,
                    Gender: args.Gender,
                    Address: args.Address,
                    Courses: args.Courses,
                    AdmissionDate: args.AdmissionDate
                });
                const addedStudent = await studentObj.save();
                return addedStudent;
            },
        },

    };
};
