app.views.todoList = Ext.extend(Ext.Panel, {
  dockedItems: [{
    xtype: 'toolbar',
    title: 'DoMe',
    items: [
    { xtype: 'spacer' },
    {
      id: 'new',
      text: 'New',
      ui: 'action',
      align: 'right',
      listeners: {
        'tap': function () {
          Ext.dispatch({
            controller: app.controllers.home,
            action: 'create',
            animation: { type: 'slide', direction: 'right' }
          });
        }
      }
    }]
  }],
  layout: 'fit',
  items: [{
    xtype: 'list',
    store: app.stores.todos,
    itemTpl: new Ext.XTemplate('<tpl if="finished  == &quot;1&quot;"><strike></tpl>{details}<tpl if="finished"></strike></tpl>'),
    grouped: true,
    onItemDisclosure: function (record) {
      Ext.dispatch({
        controller: app.controllers.home,
        action: 'edit',
        id: record.getId()
      });
    },
    listeners: {
      'render': function (thisComponent) {
        thisComponent.getStore().load();
      }
    }
  }],

  refreshList: function () {
    var self = this;
    var index = this.getSelectedIndex();
    if (index != -1)
      setTimeout(function () { self.getList().deselect(index); }, 1);

  },
  getList: function () {
    return app.views.todoList.items.items[0];
  },
  getSelectedIndex: function () {
    var selected = this.getList().getSelectedRecords();
    var idx = -1;
    if (selected.length > 0) {
      idx = app.stores.todos.indexOf(selected[0]);
    }
    return idx;
  }
});



