# coding: utf-8

from . import db


class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(80))
    done = db.Column(db.Integer)
    is_delete = db.Column(db.Integer, default=False)

    @classmethod
    def create(cls, text, done=False):
        todo = cls(text=text, done=done)
        db.session.add(todo)
        db.session.commit()
        return todo.id

    @classmethod
    def update(cls, id_):
        todo = cls.query.get(id_)
        todo.done = True if not todo.done else False
        db.session.add(todo)
        db.session.commit()

    @classmethod
    def delete(cls, id_):
        todo = cls.query.get(id_)
        todo.is_delete = True
        db.session.add(todo)
        db.session.commit()
