Template.position.rendered = function(){
	$(".modal").draggable({
	    handle: ".modal-header",
		stop:function(evt,ui){
		var left = ui.position.left;
		var top = ui.position.top;
	
		Position.update($(this).attr('id'),{$set:{left:left + "px",top:top + "px"}});	
		}
	});

	if(Session.get('editing_tablename')){
        var tablesel = $('.tablename');
        tablesel.focus();
        tablesel.select();
	}
};
Template.position.editing_field = function(){
	return Session.equals('editing_field', this._id);
};
Template.position.dbfields = function(){
	return Dbfield.find({tableid:this._id});
};
Template.position.showFieldInfo = function(){
	return Session.get('showFieldInfo');
};
Template.position.events({
	'click .modal':function(evt){
		evt.preventDefault();
		evt.stopPropagation();
	},
	
	
	'dblclick .addfield':function(evt){
		evt.preventDefault();
		evt.stopPropagation();	
	},
	'click .addfield':function(evt){
		evt.preventDefault();
		evt.stopPropagation();
		Dbfield.insert({name:'New Field',type:'text',tableid:this._id,charlength:8,fieldtype:'Text'});
	},
	'dblclick .tablename':function(evt){
		evt.stopPropagation();
		evt.preventDefault();
		Session.set('editing_tablename',this._id);
	},
	'click .close':function(){
		Position.remove({_id:this._id});
	},
	'blur .tablename':function(evt,tmpl){
		evt.stopPropagation();
		evt.preventDefault();
		Position.update(this._id,{$set:{name:tmpl.find('.tablename').value}});
		Session.set('editing_tablename',null);
	},
	'keyup .tablename':function(evt,tmpl){
		evt.stopPropagation();
		evt.preventDefault();
		if(evt.which === 13){
			Position.update(this._id,{$set:{name:tmpl.find('.tablename').value}});
			Session.set('editing_tablename',null);
		}
	}
});
Template.position.editing_tablename = function(){
	return Session.equals('editing_tablename', this._id);
};
