const models = {
    user: {
        fullname: "",
        user: "",
        role: "",
        // id: "",
        password: ""
    },
    customer: {
        // id: "",
        fullname: "",
        cedula: "",
        photo: "",
        // rentList: []
    },
    item: {
        // id: "",
        name: "",
        quantity: "",
        costPerDay: "",
        image: "",
        childCategoryId: "",
        parentCategoryId: "",
    },
    parentCategory: {
        // id: "",
        name: "",
        // childCategories: []
    },
    childCategory: {
        // id: "",
        name: "",
        // items: []
    },
    rent: {
        // id: "",
        customer: {},
        item: [],
        actualDate: "",
        promiseDate: "",
        rentDone: false
    },
    questions: {
        question1: "",
        question2: "",
        question3: "",
        question4: "",
    }
}

export default models;