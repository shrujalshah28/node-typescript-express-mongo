import mockingoose from 'mockingoose';

import Book from '../../src/models/Book';

describe('test mongoose User model', () => {
  test('should return the doc with findById', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'name',
      author: 'author',
    };

    mockingoose(Book).toReturn(_doc, 'findOne');

    return Book.findById({ _id: '507f191e810c19729de860ea' }).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});
