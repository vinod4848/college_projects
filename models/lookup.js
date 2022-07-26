

searchStudents: {
    type: FilteredStudentsData,
    args: {
        FullName: { type: GraphQLString },
        Email: { type: GraphQLString },
        Phone: { type: GraphQLString },
        FatherName: { type: GraphQLString },
        MotherName: { type: GraphQLString },
        Gender: { type: GraphQLString },
        Address: { type: GraphQLString },
        Courses: { type: GraphQLString },
        AdmissionDate: { type: GraphQLString },
        CollegeName: { type: GraphQLString },
        Teacher: { type: GraphQLString },
        Duration: { type: GraphQLString },
        Fees: { type: GraphQLString },
        Examination: { type: GraphQLString },
    },
    async resolve(parent, args) {
        if (!args.StudentsType) {
            throw new Error(
                `StudentsType is a required field , choose from ["College","Student","Teacher","Course"]`
            );
        }
        let filteredList = [];
        let search = args.StudentsKeyWord ? args.StudentsKeyWord : "";
        let filterFees = args.filterFees ? args.filter : 0;
        if (
            filterStudent == 0 &&
            filterEye == 0 &&
            filterDonorType == 0 &&
            filterEthnicity == 0
        ) {
            if (filterFees == 0) {
                filterFees = { "StudentInfo.feesPerSem": 1 };
            } else {
                filterFees = { "StudentInfo.feesPerSem": -1 };
            }
        } else {
            filterFees = {};
        }

        if (filterStatus != 0) {
            filterFees["StudentsStatus"] = filterStatus;
        }
        if (filterEye != 0) {
            filterFees["DemographicInfo.EyeColor"] = filterEye;
        }
        if (filterDonorType != 0) {
            filterFees["DonorType"] = filterDonorType;
        }
        if (filterEthnicity != 0) {
            filterFees["DemographicInfo.Ethnicity"] = filterEthnicity;
        }

        if (offset < 0) {
            offset = 0;
        }
        let limit = args.Limit ? args.Limit : 8;
        if (limit < 0) {
            limit = 8;
        }

        let userId = args.userId;

        // strict Filtering
        const intersectedConditions = (inputArgs) => {
            let conditionList = [];
            Object.keys(inputArgs).forEach((inputArgKey) => {
                if (inputArgs[`${inputArgKey}`]) {
                    switch (inputArgKey) {
                        case "StudentsStatus":
                            if (inputArgs.StudentsStatus)
                                conditionList.push({
                                    StudentsStatus: inputArgs.StudentsStatus,
                                });
                            break;
                        case "StudentsType":
                            if (inputArgs.StudentsType)
                                conditionList.push({
                                    StudentsType: inputArgs.StudentsType,
                                });
                            break;
                        case "PriceRange":
                            inputArgs.PriceRange.MaxPrice != 0 ||
                                inputArgs.PriceRange.MinPrice != 0
                                ? conditionList.push({
                                    "EggInfo.PricePerSet": {
                                        $gte: parseInt(inputArgs.PriceRange.MinPrice),
                                        $lte: parseInt(inputArgs.PriceRange.MaxPrice),
                                    },
                                })
                                : "";
                            break;
                        case "DonorType":
                            if (inputArgs.DonorType)
                                conditionList.push({
                                    DonorType: inputArgs.DonorType,
                                });
                            break;
                        case "SpecialTalents":
                            if (inputArgs.SpecialTalents)
                                conditionList.push({
                                    "DemographicInfo.SpecialTalents":
                                        inputArgs.SpecialTalents,
                                });
                            break
                        case "ScreeningType":
                            if (inputArgs.ScreeningType)
                                conditionList.push({
                                    ScreeningType: inputArgs.ScreeningType,
                                });
                            break;
                        case "QuantityOfNeeds":
                            if (inputArgs.QuantityOfNeeds)
                                conditionList.push({
                                    "EggInfo.NumberofSets": {
                                        $gte: parseInt(inputArgs.QuantityOfNeeds),
                                    },
                                });
                            break;
                        case "LevelOfEducation":
                            if (inputArgs.LevelOfEducation)
                                conditionList.push({
                                    "DemographicInfo.HighestLevelOfEducation":
                                        inputArgs.LevelOfEducation,
                                });
                            break;
                        case "EyeColor":
                            if (inputArgs.EyeColor)
                                conditionList.push({
                                    "DemographicInfo.EyeColor": inputArgs.EyeColor,
                                });
                            break;
                        case "Ethinicity":
                            if (inputArgs.Ethinicity)
                                conditionList.push({
                                    "DemographicInfo.Ethnicity": inputArgs.Ethinicity,
                                });
                            break;
                        case "Race":
                            if (inputArgs.Race)
                                conditionList.push({
                                    "DemographicInfo.Race": inputArgs.Race,
                                });
                            break;
                        case "Relegion":
                            if (inputArgs.Relegion)
                                conditionList.push({
                                    "DemographicInfo.Religion": inputArgs.Relegion,
                                });
                        case "NaturalHair":
                            if (inputArgs.NaturalHair)
                                conditionList.push({
                                    "DemographicInfo.NaturalHairColor": inputArgs.NaturalHair,
                                });
                        case "FertilityNeeds":
                            if (inputArgs.FertilityNeeds)
                                conditionList.push({
                                    Gender: {
                                        $regex:
                                            ".*" + inputArgs.FertilityNeeds === "EGG"
                                                ? "Female"
                                                : "Male" + ".*",
                                    },
                                });
                            break;
                        default:
                            break;
                    }
                }
            });
            return conditionList;
        };
        // loose filtering
        const unionConditions = () => {
            let conditionList = [];
            if (search) {
                return [
                    { DonorId: { $regex: ".*" + search + ".*", $options: "i" } },
                    { FirstName: { $regex: ".*" + search + ".*", $options: "i" } },
                    { LastName: { $regex: ".*" + search + ".*", $options: "i" } },
                    {
                        "DemographicInfo.Occupation": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                    {
                        "DemographicInfo.Ethnicity": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                    {
                        "DemographicInfo.EyeColor": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                    {
                        "DemographicInfo.NaturalHairColor": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                    {
                        "DemographicInfo.Address": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                    {
                        "DemographicInfo.ZipCode": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                    {
                        "DemographicInfo.City": { $regex: ".*" + search + ".*" },
                    },
                    {
                        "DemographicInfo.State": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                    {
                        "DemographicInfo.Country": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                    {
                        "DemographicInfo.DonationType": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                    {
                        "DemographicInfo.DonorId": {
                            $regex: ".*" + search + ".*",
                            $options: "i",
                        },
                    },
                ];
            }
            return conditionList;
        };
        const intersectedFilters = intersectedConditions(args);
        const unionFilters = unionConditions(args);

        let total_records = 0;
        if (intersectedFilters.length >= 1 && unionFilters.length >= 1) {
            if (isFav == 0) {
                total_records = await Students.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    $or: unionFilters,
                                },
                                {
                                    $and: intersectedFilters,
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "favorites",
                            let: { user: "$UserId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$donorId", "$$user"] },
                                                { $eq: ["$userId", new ObjectId(userId)] },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "isFav",
                        },
                    },
                ]);

                filteredList = await Students.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    $or: unionFilters,
                                },
                                {
                                    $and: intersectedFilters,
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "favorites",
                            let: { user: "$UserId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$donorId", "$$user"] },
                                                { $eq: ["$userId", new ObjectId(userId)] },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "isFav",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "UserId",
                            foreignField: "_id",
                            as: "userInfo",
                        },
                    },
                    {
                        $project: {
                            id: "$_id",
                            UserId: "$UserId",
                            StudentsPic: "$StudentsPic",
                            FirstName: "$FirstName",
                            LastName: "$LastName",
                            ScreeningType: "$ScreeningType",
                            EggInfo: "$EggInfo",
                            DemographicInfo: "$DemographicInfo",
                            isFav: "$isFav",
                            CreatedAt: "$CreatedAt",
                            StudentsCompletness: "$StudentsCompletness",
                            StudentsStatus: "$StudentsStatus",
                            //DonorId: "$DonorId",
                            DonorType: "$DonorType",
                            DonorId: {
                                $arrayElemAt: ["$userInfo.userName", 0],
                            },
                            Email: {
                                $arrayElemAt: ["$userInfo.email", 0],
                            },
                        },
                    },
                    {
                        $sort: filterFees,
                    },
                    {
                        $skip: offset,
                    },
                    {
                        $limit: limit,
                    },
                ]);
            } else {
                total_records = await Students.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    $and: intersectedFilters,
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "favorites",
                            let: { user: "$UserId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$donorId", "$$user"] },
                                                { $eq: ["$userId", new ObjectId(userId)] },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "isFav",
                        },
                    },
                    {
                        $match: { isFav: { $ne: [] } },
                    },
                ]);
                filteredList = await Students.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    $and: intersectedFilters,
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "favorites",
                            let: { user: "$UserId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$donorId", "$$user"] },
                                                { $eq: ["$userId", new ObjectId(userId)] },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "isFav",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "UserId",
                            foreignField: "_id",
                            as: "userInfo",
                        },
                    },
                    {
                        $project: {
                            id: "$_id",
                            UserId: "$UserId",
                            StudentsPic: "$StudentsPic",
                            FirstName: "$FirstName",
                            LastName: "$LastName",
                            ScreeningType: "$ScreeningType",
                            EggInfo: "$EggInfo",
                            DemographicInfo: "$DemographicInfo",
                            isFav: "$isFav",
                            CreatedAt: "$CreatedAt",
                            StudentsCompletness: "$StudentsCompletness",
                            StudentsStatus: "$StudentsStatus",
                            //DonorId: "$DonorId",
                            DonorType: "$DonorType",
                            DonorId: {
                                $arrayElemAt: ["$userInfo.userName", 0],
                            },
                            Email: {
                                $arrayElemAt: ["$userInfo.email", 0],
                            },
                        },
                    },
                    {
                        $match: { isFav: { $ne: [] } },
                    },
                    {
                        $sort: filterFees,
                    },
                    {
                        $skip: offset,
                    },
                    {
                        $limit: limit,
                    },
                ]);
            }
        } else if (intersectedFilters.length >= 1) {
            if (isFav == 0) {
                total_records = await Students.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    $and: intersectedFilters,
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "favorites",
                            let: { user: "$UserId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$donorId", "$$user"] },
                                                { $eq: ["$userId", new ObjectId(userId)] },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "isFav",
                        },
                    },
                ]);

                filteredList = await Students.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    $and: intersectedFilters,
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "favorites",
                            let: { user: "$UserId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$donorId", "$$user"] },
                                                { $eq: ["$userId", new ObjectId(userId)] },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "isFav",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "UserId",
                            foreignField: "_id",
                            as: "userInfo",
                        },
                    },
                    {
                        $project: {
                            id: "$_id",
                            UserId: "$UserId",
                            StudentsPic: "$StudentsPic",
                            FirstName: "$FirstName",
                            LastName: "$LastName",
                            ScreeningType: "$ScreeningType",
                            EggInfo: "$EggInfo",
                            DemographicInfo: "$DemographicInfo",
                            isFav: "$isFav",
                            CreatedAt: "$CreatedAt",
                            StudentsCompletness: "$StudentsCompletness",
                            StudentsStatus: "$StudentsStatus",
                            //DonorId: "$DonorId",
                            DonorType: "$DonorType",
                            DonorId: {
                                $arrayElemAt: ["$userInfo.userName", 0],
                            },
                            Email: {
                                $arrayElemAt: ["$userInfo.email", 0],
                            },
                        },
                    },
                    {
                        $sort: filterFees,
                    },
                    {
                        $skip: offset,
                    },
                    {
                        $limit: limit,
                    },
                ]);
            } else {
                total_records = await Students.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    $and: intersectedFilters,
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "favorites",
                            let: { user: "$UserId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$donorId", "$$user"] },
                                                { $eq: ["$userId", new ObjectId(userId)] },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "isFav",
                        },
                    },
                    {
                        $match: { isFav: { $ne: [] } },
                    },
                ]);
                filteredList = await Students.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    $and: intersectedFilters,
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "favorites",
                            let: { user: "$UserId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$donorId", "$$user"] },
                                                { $eq: ["$userId", new ObjectId(userId)] },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "isFav",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "UserId",
                            foreignField: "_id",
                            as: "userInfo",
                        },
                    },
                    {
                        $project: {
                            id: "$_id",
                            UserId: "$UserId",
                            StudentsPic: "$StudentsPic",
                            FirstName: "$FirstName",
                            LastName: "$LastName",
                            ScreeningType: "$ScreeningType",
                            EggInfo: "$EggInfo",
                            DemographicInfo: "$DemographicInfo",
                            isFav: "$isFav",
                            CreatedAt: "$CreatedAt",
                            StudentsCompletness: "$StudentsCompletness",
                            StudentsStatus: "$StudentsStatus",
                            //DonorId: "$DonorId",
                            DonorType: "$DonorType",
                            DonorId: {
                                $arrayElemAt: ["$userInfo.userName", 0],
                            },
                            Email: {
                                $arrayElemAt: ["$userInfo.email", 0],
                            },
                        },
                    },
                    {
                        $match: { isFav: { $ne: [] } },
                    },
                    {
                        $sort: filterFees,
                    },
                    {
                        $skip: offset,
                    },
                    {
                        $limit: limit,
                    },
                ]);
            }
        }

        if (isFav == 0) {
            total_records = total_records.length;
        } else {
            let count = 0;

            for (let key in total_records) {
                if (filteredList[key]) {
                    let tmp = filteredList[key].isFav;
                    // console.log(tmp);
                    if (tmp.length > 0) {
                        count++;
                    }
                }
            }
            total_records = count;
        }

        if (isFav == 0) {
            for (let key in filteredList) {
                let tmp = filteredList[key].isFav;
                if (tmp.length > 0) {
                    filteredList[key].isFav = tmp[0];
                } else {
                    filteredList[key].isFav = null;
                }
            }
        } else {
            let filter_data = [];
            for (let key in filteredList) {
                let tmp = filteredList[key].isFav;
                if (tmp.length > 0) {
                    filteredList[key].isFav = tmp[0];
                    filter_data.push(filteredList[key]);
                }
            }
            filteredList = filter_data;
        }

        return {
            Offset: offset,
            Limit: limit,
            Total: total_records,
            StudentsKeyWord: search,
            Order: order,
            StudentsList: filteredList,
        };
    },
},

// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb+srv://Vinodku4848:Vinod123@cluster0.z6zy1tq.mongodb.net/test";

// MongoClient.connect(url,  function (err, db )  {
// 	if (err) throw err;
// 	var dbo = db.db("test");
// 	dbo
// 		.collection("students")
// 		.aggregate([
// 			{
// 				$lookup: {
// 					from: "students",
// 					localField: "CollegeId",
// 					foreignField: "_id",
// 					as: "studentinfo",
// 				},
// 			},
// 			{
// 				$project: {
// 					id: "$_id",
// 					FullName: "$FullName",
// 					Phone: "$Phone",
// 					Email: "$Email",
// 					FatherName: "$FatherName",
// 					MotherName: "$MotherName",
// 					Gender: "$Gender",
// 					Addres: "$Addres",
// 					Courses: "$Courses",
// 					CollegeId:"$CollegeId",
// 					AdmissionDate: "$AdmissionDate",
// 				},
// 			},			
// 		])
// 		.toArray(function (err, res) {
// 			if (err) throw err;
// 			console.log(JSON.stringify(res));
// 			db.close();
// 		});
// });

// // const mongoose = require("mongoose");
// // const { Student } = require("./student");

// // const URL = "mongodb+srv://Vinodku4848:Vinod123@cluster0.z6zy1tq.mongodb.net/test";
// // const connect = mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Student.aggregate([
//     {
//         $lookup: {
//             from: "students",
//             localField: "collegeId",
//             foreignField: "_id",
//             as: "StudentInfo",
//         },
//     },
//     {
//         $project: {
//             id: "$_id",
//             FullName: "$FullName",
//             Phone: "$Phone",
//             Email: "$Email",
//             FatherName: "$FatherName",
//             MotherName: "$MotherName",
//             Gender: "$Gender",
//             Addres: "$Addres",
//             Courses: "$Courses",
//             AdmissionDate: "$AdmissionDate",
//         },
//     },

// ]);
// // connect.then(
// //     db => {
// //         console.log("Connected correctly to server!");
// //     },
// //     err => {
// //         console.log(err);
// //     },
// // );


// // const mongoose = require("mongoose");
// // const { Student } = require("./student");

// // const URL = "mongodb+srv://Vinodku4848:Vinod123@cluster0.z6zy1tq.mongodb.net/test";
// // const connect = mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

// // Student.aggregate([
// //     {
// //         $lookup: {
// //             from: "students",
// //             localField: "collegeId",
// //             foreignField: "_id",
// //             as: "StudentInfo",
// //         },
// //     },
// //     {
// //         $project: {
// //             id: "$_id",
// //             FullName: "$FullName",
// //             Phone: "$Phone",
// //             Email: "$Email",
// //             FatherName: "$FatherName",
// //             MotherName: "$MotherName",
// //             Gender: "$Gender",
// //             Addres: "$Addres",
// //             Courses: "$Courses",
// //             AdmissionDate: "$AdmissionDate",
// //         },
// //     },

// // ]);
// // connect.then(
// //     db => {
// //         console.log("Connected correctly to server!");
// //     },
// //     err => {
// //         console.log(err);
// //     },
// // );

