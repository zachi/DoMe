app.views.todoForm = Ext.extend(Ext.form.FormPanel, {
  dockedItems: [{
    xtype: 'toolbar',
    items: [
            {
              id: 'back',
              text: 'Back',
              ui: 'back',
              listeners: {
                'tap': function () {
                  Ext.dispatch({
                    controller: app.controllers.home,
                    action: 'index',
                    animation: { type: 'slide', direction: 'right' }
                  });
                }
              }
            },
            { xtype: 'spacer' },

            {
              id: 'save',
              text: 'Save',
              ui: 'action',
              listeners: {
                'tap': function () {
                    
                  this.form.updateRecord(this.record, false);
                  var errors = this.record.validate();
                  if (!errors.isValid()) {
                    Ext.Msg.alert('Wait!', errors.getByField('details')[0].message, Ext.emptyFn);
                    return;
                  }

                  var store = app.stores.todos;
                  var storeRecord = store.findRecord('id', this.record.data.id);
                  if (null == storeRecord) {
                    store.add(this.record);
                  }
                  else {
                    app.views.todoForm.removeRecord(storeRecord.data.id);
                    store.add(store.cloneRecord(this.record));
                  }
                  store.sync();
                  Ext.dispatch({
                    controller: app.controllers.home,
                    action: 'index',
                    id: this.record.getId(),
                    animation: { type: 'slide', direction: 'right' }
                  });

                }
              }
            }
        ]
  },
  {
    xtype: 'toolbar',
    dock: 'bottom',
    items: [
        { xtype: 'spacer' },
        {
          id: 'remove',
          iconCls: 'trash',
          iconMask: true,

          listeners: {
            'tap': function () {
              app.views.todoForm.removeRecord(this.record.data.id);
              Ext.dispatch({
                controller: app.controllers.home,
                action: 'index',
                id: this.record.getId(),
                animation: { type: 'slide', direction: 'right' }
              });
            }
          }
        },
    ]
  }],
  submitOnAction: false,
  items: [{
    xtype: 'fieldset',
    items: [{
      name: 'details',
      label: 'Details*',
      xtype: 'textareafield'
    }]},{
    xtype: 'fieldset',
    items: [{
      name: 'finishDate',
      label: 'DoMe by',
      xtype: 'datepickerfield',
      picker: { yearFrom: 2012 }

    }, {
      name: 'finished',
      label: 'Mark as done',
      xtype: 'togglefield'

    }]
  }],
  removeRecord: function (id) {
    var store = app.stores.todos;
    var storeRecord = store.findRecord('id', id);
    store.remove(storeRecord);
    store.sync();
    this.fixLocalStorageSenchaBug(id);
  },
  fixLocalStorageSenchaBug: function (id) {
    var localTodosStoreKeys = localStorage.getItem(app.stores.todos.proxy.id);
    if (!localTodosStoreKeys)
      return;
    while (localTodosStoreKeys.indexOf(id) != -1) {
      localTodosStoreKeys = localTodosStoreKeys.replace(id + ',', '')
      localTodosStoreKeys = localTodosStoreKeys.replace(',' + id, '')
      localTodosStoreKeys = localTodosStoreKeys.replace(this.id, '');
    }
    localStorage.setItem(app.stores.todos.proxy.id, localTodosStoreKeys);
  },
  //HACK: we use this method since sencha load() method fails with togglefield on the first try...
  recursiveLoad: function (record) {
    var self = this;
    try {
      this.load(record);
    }
    catch (err) {
      setTimeout(function () { self.recursiveLoad(record) }, 1);
    }
  },
  updateWithRecord: function (record) {
    this.recursiveLoad(record);
    var toolbar = this.getDockedItems()[0];
    toolbar.getComponent('back').record = record;
    toolbar.getComponent('save').record = record;
    toolbar.getComponent('save').form = this;

    var bottomToolbar = this.getDockedItems()[1];
    var btnRemove = bottomToolbar.getComponent('remove');
    if (this.isEditMode(record)) {
      btnRemove.show();
      btnRemove.form = this;
      btnRemove.record = record;
    }
    else {
      btnRemove.hide();
    }

  },
  isEditMode: function (record) {
    return app.stores.todos.findRecord('id', record.data.id) != null;
  }

});

