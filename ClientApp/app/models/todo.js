
app.models.todo = Ext.regModel("app.models.todo", {
    fields: [
        {name: "id", type: "int"},
        {name: "details", type: "string"},
        {name: "finishDate", type: "date"},
        {name: "finished", type: "boolean"}
        
    ],
    validations: [
                { type: 'presence', field: 'id' },
                { type: 'presence', field: 'details', message: 'Please enter some details.' }
            ]
});

app.stores.todos = new Ext.data.Store({
    model: "app.models.todo",
    proxy: {
                type: 'localstorage',
                id: 'todos-app-store5'
            },
    sorters: 'finishDate',
    getGroupString : function(record) {
        var val = record.get('finishDate');
        if(!val)
          return 'DoMe anytime';
        if(val.toDateString() == (new Date()).toDateString())
          return 'DoMe Today';
        return 'DoMe by ' + val.toDateString() ;
    },
    cloneRecord: function(record){
    var now = new Date();
      var todoId = now.getTime();
      var clonedRecord = Ext.ModelMgr.create(
              { "id": todoId, "details": record.data.details, "finishDate": record.data.finishDate, "finished": record.data.finished },
              'app.models.todo'
          );
          return clonedRecord;
    }
});