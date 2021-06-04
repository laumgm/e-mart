import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'mabuX',
          email: 'admin@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
           //customer
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
    ],
    products: [
        {
            name: "Martin & Co. Guitar",
            category: "Acoustic Guitar",
            image: "../images/ag1.png",
            price: 700,
            countInStock: 0,
            brand: "Martin & Co.",
            rating: 4.0,
            numReview: 20,
            description: "Matte finish, Dreadnought Steel String Flattop Guitar"
        },
        {
            name: "Taylor Guitar",
            category: "Acoustic Guitar",
            image: "../images/ag2.png",
            price: 1000,
            countInStock: 15,
            brand: "Taylor",
            rating: 4.5,
            numReview: 20,
            description: "Matte finish, Grand Auditorium Size Steel String Guitar"
        },
        {
            name: "Marshall Guitar",
            category: "Acoustic Guitar",
            image: "../images/ag3.png",
            price: 800,
            countInStock: 30,
            brand: "Marshall",
            rating: 4.0,
            numReview: 20,
            description: "Gloss finish, Dreadnought Steel String Guitar"
        },
        {
            name: "Fender Guitar",
            category: "Acoustic Guitar",
            image: "../images/ag4.png",
            price: 700,
            countInStock: 20,
            brand: "Fender",
            rating: 4.0,
            numReview: 30,
            description: "Matte finish, 00 Steel String Guitar"
        },
        {
            name: "Ibanez Guitar",
            category: "Acoustic Guitar",
            image: "../images/ag5.png",
            price: 800,
            countInStock: 0,
            brand: "Ibanez",
            rating: 5.0,
            numReview: 40,
            description: "Matte finish, Dreadnought Steel String Guitar"
        },
        {
            name: "Ovation Guitar",
            category: "Acoustic Guitar",
            image: "../images/ag6.png",
            price: 800,
            countInStock: 10,
            brand: "Marshall",
            rating: 3.5,
            numReview: 20,
            description: "Gloss finish, Dreadnought Steel String Guitar"
        }
    ]
}

export default data;