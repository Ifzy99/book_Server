const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;


const BookType = new GraphQLObjectType ({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        title:{type: GraphQLString},
        genre:{type: GraphQLString},
        author:{
          type: AuthorType,
          resolve(parent, args) {
             return Author.findById(parent.authorId)
        } 
      }
    })
});


const AuthorType = new GraphQLObjectType ({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        age:{type: GraphQLInt},
           books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){  
              return Book.findById({authorId:parent.id})
            }
           }
    })
});


const Mutation  = new GraphQLObjectType({
    name: 'Mutation',
      fields: {
        addAuthor:{
          type: AuthorType,
          args: {
            name:{type: new GraphQLNonNull (GraphQLString)},
            age: { type: new GraphQLNonNull (GraphQLInt)}
          },
          resolve(parent, args){
            let author = new Author ({
              name:args.name,
              age:args.age
            });
            return author.save();
          }
        },
  
         addBook: {
             type: BookType,
             args: {
                title: { type: new GraphQLNonNull (GraphQLString)},
                genre: { type: new GraphQLNonNull (GraphQLString)},
                authorId: {type: new GraphQLNonNull (GraphQLID)}
             },
             resolve(parent, args){
                  let book = new Book ({
                    title: args.title,
                    genre: args.genre,
                    authorId: args.authorId
                  });
                   return book.save();
             }
        }
      }
  })
  



const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db/ other source
                return Book.findById(args.id);
            }
        },

        author: {
            type:AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db/ other source
                return Author.findById(args.id);
            }
        },
        
        books:{
          type: new GraphQLList(BookType),
          resolve(parent, args){
            //return books;
            return Book.find({})
          }
        },

        authors:{
          type: new GraphQLList(AuthorType),
          resolve(parent, args){
            // return authors 
            return Author.find({});
          }
        }
    }
})

module.exports = new GraphQLSchema ({
     query: RootQuery,
     mutation: Mutation
});