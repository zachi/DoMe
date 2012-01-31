app.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(app.views, {
            todoList: new app.views.todoList(),
            todoForm: new app.views.todoForm()
        });
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
                app.views.todoList,
                app.views.todoForm,
            ]
        });
        app.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});