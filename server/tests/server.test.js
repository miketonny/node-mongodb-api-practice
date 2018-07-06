const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('../models/todo');


beforeEach((done) => {
    Todo.remove({}).then(() => done()); //after each done, clear table
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'test todo';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err) {
               return done(err); //pass error on screen
            }

            //check todo has been added
            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch(e => done(e));
        });
    });

    it('should not create todo with invalid body data', (done) => { 
        request(app)
        .post('/todos')
        .send({})
        .end((err, res) => {
            if(err) return done(err);
            Todo.find().then((todos) => {
                expect(todos.length).toBe(0);
                done();
            }).catch(e => done(e));
        });
    });
});