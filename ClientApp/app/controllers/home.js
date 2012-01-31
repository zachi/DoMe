app.controllers.home = new Ext.Controller({
  index: function (options) {
    app.views.todoList.refreshList()
    app.views.viewport.setActiveItem(
            app.views.todoList, options.animation
        );
  },
  show: function (options) {
    var id = parseInt(options.id),
            todo = app.stores.todos.getById(id);
    if (todo) {
      app.views.todoDetail.updateWithRecord(todo);
      app.views.viewport.setActiveItem(
                app.views.todoDetail, options.animation
            );
    }
  },
  edit: function (options) {
    var id = parseInt(options.id),
            todo = app.stores.todos.getById(id);
    if (todo) {
      app.views.todoForm.updateWithRecord(todo);
      app.views.viewport.setActiveItem(
                app.views.todoForm, options.animation
            );
    }
  },
  create: function (options) {

    
    var now = new Date();
    var todoId = now.getTime();
    var todo = Ext.ModelMgr.create(
                            { "id": todoId, "details": "", "finishDate":null, "finished": '0' },
                            'app.models.todo'
                        );
    app.views.todoForm.updateWithRecord(todo);
    app.views.viewport.setActiveItem(
                app.views.todoForm, options.animation
            );

  }

});