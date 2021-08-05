const faker = require("faker");
const fs = require("fs");
faker.locale = "vi";

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};

const images = [
  faker.image.city(500, 500),
  faker.image.animals(500, 500),
  faker.image.image(500, 500),
  faker.image.imageUrl(500, 500),
  faker.image.food(500, 500),
  faker.image.abstract(500, 500),
  faker.image.nature(500, 500),
  faker.image.sports(500, 500),
  faker.image.transport(500, 500),
  faker.image.business(500, 500),
];

function getRandom() {
  const number = Math.floor(Math.random() * 10);
  return images[number];
}
const randomImage = () => {
  const result = [];
  for (let i = 0; i < 4; i++) {
    const img = {
      imageKey: faker.random.uuid(),
      url: getRandom(),
    };
    result.push(img);
  }
  return result;
};
const randomProductList = (categoryList, numberOfProduct) => {
  if (numberOfProduct <= 0) return [];
  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(numberOfProduct)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        images: randomImage(),
      };
      productList.push(product);
    });
  }
  return productList;
};

(() => {
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);
  const db = {
    categories: categoryList,
    products: productList,
    users: [
      {
        id: 1,
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        gender: "male",
        role: "admin",
      },
      {
        id: 2,
        name: "john",
        email: "john@gmail.com",
        password: "123456",
        gender: "male",
        role: "user",
      },
    ],
    todos: [],
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate data success!");
  });
})();
