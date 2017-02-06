# coding: utf-8
from flask import request, jsonify

from . import app
from .models import ToDo


@app.route("/todo", methods=["POST"])
def add_todo():
    id_ = ToDo.create(request.get_json().get("todo_text"))
    data = {"result": "success", "id": id_}
    return jsonify(data)


@app.route("/todos", methods=["GET"])
def get_todos():
    todos = [
        {"id": i.id, "text": i.text, "done": bool(i.done)}
        for i in ToDo.query.filter_by(is_delete=0).all()]
    return jsonify(todos)


@app.route("/todo/<int:id>", methods=["PUT", "DELETE"])
def done_todo(id):
    if request.method == "PUT":
        ToDo.update(id)
    if request.method == "DELETE":
        ToDo.delete(id)
    return jsonify({"result": "success"})
