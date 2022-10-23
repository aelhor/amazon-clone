const bcrypt = require('bcrypt')

const data = {
    users: [
        {
          name: 'ahmed',
          email: 'a@mail.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'user@mail.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
      ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock:10,
            description: 'high quality product',
        },
        {
            name: 'Adidas Fit Shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 100,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            countInStock:10,

            description: 'high quality product',
        },
        {
            name: 'Lacoste Free Shirt',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 220,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 17,
            countInStock:10,

            description: 'high quality product',
        },
        {
            name: 'Nike Slim Pant',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 78,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            countInStock:10,

            description: 'high quality product',
        },
        {
            name: 'Puma Slim Pant',
            category: 'Pants',
            image: '/images/p5.jpg',
            price: 65,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            countInStock:10,

            description: 'high quality product',
        },
        {
            name: 'Adidas Fit Pant',
            category: 'Pants',
            image: '/images/p6.jpg',
            price: 139,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 15,
            countInStock:1,

            description: 'high quality product',
        },
    ],
};
module.exports =  data;