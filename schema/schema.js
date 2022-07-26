const graphql = require("graphql");

// const Admin = require("../models/admin")
// const College = require("../models/college");
// const Student = require("../models/student");
// const Teacher = require("../models/teacher");
// const Courses = require("../models/courses");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = graphql;

const AddAdminQuery = require("./AdminType").AddAdminQuery();
const AdminQuery = require("./AdminType").AdminQuery();

const AddCollegeQuery = require("./CollegeType").AddCollegeQuery();
const CollegeQuery = require("./CollegeType").CollegeQuery();

const AddStudentQuery = require("./StudentType").AddStudentQuery();
const StudentQuery = require("./StudentType").StudentQuery();

const AddTeacherQuery = require("./TeacherType").AddTeacherQuery();
const TeacherQuery = require("./TeacherType").TeacherQuery();

const AddCoursesQuery = require("./CoursesType").AddCoursesQuery();
const CoursesQuery = require("./CoursesType").CoursesQuery();

const AddContactQuery = require("./ContactType").AddContactQuery();
const ContactQuery = require("./ContactType").ContactQuery();

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...AdminQuery,
    ...TeacherQuery,
    ...CollegeQuery,
    ...StudentQuery,
    ...CoursesQuery,
    ...ContactQuery
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...AddAdminQuery,
    ...AddTeacherQuery,
    ...AddCollegeQuery,
    ...AddStudentQuery,
    ...AddCoursesQuery,
    ...AddContactQuery,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
