const graphql = require("graphql");
const Contact = require("../models/contact");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const ContactSchema = new GraphQLObjectType({
    name: "ContactSchema",
    fields: () => ({
        id: { type: GraphQLString },
        What_Can_We_Help_You: { type: GraphQLString },
        Your_Name: { type: GraphQLString },
        Email_Address: { type: GraphQLString },
        Phone: { type: GraphQLString },
        Subject: { type: GraphQLString },
        Diteles: { type: GraphQLString },
    }),
});

exports.ContactQuery = function () {
    return {
        updateContact: {
            type: ContactSchema,
            args: {
                id: { type: GraphQLString },
                What_Can_We_Help_You: { type: GraphQLString },
                Your_Name: { type: GraphQLString },
                Email_Address: { type: GraphQLString },
                Phone: { type: GraphQLString },
                Subject: { type: GraphQLString },
                Diteles: { type: GraphQLString },
            },

            async resolve(parent, args) {
                let updateObj = {};
                if (args.What_Can_We_Help_You) {
                    updateObj.What_Can_We_Help_You = args.What_Can_We_Help_You;
                }
                if (args.Your_Name) {
                    updateObj.Your_Name = args.Your_Name;
                }
                if (args.Email_Address) {
                    updateObj.Email_Address = args.Email_Address;
                }
                if (args.Phone) {
                    updateObj.Phone = args.Phone;
                }
                if (args.Subject) {
                    updateObj.Subject = args.Subject;
                }
                if (args.Diteles) {
                    updateObj.Diteles = args.Diteles;
                }
                const updatedContact = await Contact.findByIdAndUpdate(
                    args.id,
                    updateObj,
                    {
                        new: true,
                    }
                );
                return updatedContact;
            },
        },
        contact: {
            type: new GraphQLList(ContactSchema),
            async resolve(parent, args) {
                return Contact.find();
            },
        },
        removeContact: {
            type: ContactSchema,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Contact.findByIdAndRemove(args.id);
            }
        }
    };
};
exports.AddContactQuery = function () {
    return {
        addContact: {
            type: ContactSchema,
            args: {
                What_Can_We_Help_You: { type: GraphQLString },
                Your_Name: { type: GraphQLString },
                Email_Address: { type: GraphQLString },
                Phone: { type: GraphQLString },
                Subject: { type: GraphQLString },
                Diteles: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let contactObj = new Contact({
                    What_Can_We_Help_You: args.What_Can_We_Help_You,
                    Your_Name: args.Your_Name,
                    Email_Address: args.Email_Address,
                    Phone: args.Phone,
                    Subject: args.Subject,
                    Diteles: args.Diteles,
                });
                const addedContact = await contactObj.save();
                return addedContact;
            },
        },
    };
};
